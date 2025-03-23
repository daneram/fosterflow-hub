
import React, { useEffect, useCallback, useMemo, useState } from 'react';
import Sidebar from './Sidebar';
import ContentArea from './content/ContentArea';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLocation } from 'react-router-dom';
import { useSidebarState } from './hooks/useSidebarState';
import { useAIChatState } from './hooks/useAIChatState';
import { SidebarProvider } from '@/components/ui/sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { sidebarOpen, setSidebarOpen, toggleSidebar } = useSidebarState();
  const { aiChatOpen, setAiChatOpen, toggleAiChat } = useAIChatState();
  const isMobile = useIsMobile();
  const location = useLocation();
  const isAIAssistantPage = location.pathname === '/ai-assistant';
  
  // Track if we're in a page transition to prevent sidebar flicker
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Set initial AI chat state based on screen size
  useEffect(() => {
    setAiChatOpen(!isMobile && !isAIAssistantPage);
  }, [isMobile, isAIAssistantPage, setAiChatOpen]);

  // Handle page transition effects
  useEffect(() => {
    // Mark as transitioning
    setIsTransitioning(true);
    
    // Close sidebar on mobile during navigation
    if (isMobile && sidebarOpen) {
      setSidebarOpen(false);
    }
    
    // Reset transition state after a short delay
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 300); // Match this with transition duration
    
    return () => clearTimeout(timer);
  }, [location.pathname, isMobile]);

  // Close the sidebar on mobile when a navigation item is clicked
  const closeSidebarOnMobile = useCallback(() => {
    // Only proceed if sidebar is open and on mobile
    if (isMobile && sidebarOpen) {
      // Set transition state to true to prevent flicker
      setIsTransitioning(true);
      
      // Set sidebar state to closed
      setSidebarOpen(false);
      
      // Reset transition state after animation completes
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }
  }, [isMobile, setSidebarOpen, sidebarOpen]);

  // Memoize the Sidebar component to prevent unnecessary re-renders
  const memoizedSidebar = useMemo(() => (
    <Sidebar 
      isOpen={sidebarOpen} 
      onToggle={toggleSidebar} 
      onNavItemClick={closeSidebarOnMobile} 
      toggleAiChat={toggleAiChat} 
      isMobile={isMobile}
      isTransitioning={isTransitioning}
    />
  ), [sidebarOpen, toggleSidebar, closeSidebarOnMobile, toggleAiChat, isMobile, isTransitioning]);

  return (
    <SidebarProvider>
      <div className="h-screen flex bg-background overflow-hidden">
        {/* Sidebar - now memoized */}
        {memoizedSidebar}

        {/* Main content and AI assistant */}
        <ContentArea 
          aiChatOpen={aiChatOpen} 
          toggleAiChat={toggleAiChat} 
          isMobile={isMobile}
        >
          {children}
        </ContentArea>
      </div>
    </SidebarProvider>
  );
};

export default React.memo(Layout);
