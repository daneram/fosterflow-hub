
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
  
  // Tracking content transitions
  const [isContentTransitioning, setIsContentTransitioning] = useState(false);

  // Set initial AI chat state based on screen size
  useEffect(() => {
    setAiChatOpen(!isMobile && !isAIAssistantPage);
  }, [isMobile, isAIAssistantPage, setAiChatOpen]);

  // Handle page transition effects for content area
  useEffect(() => {
    // Mark content as transitioning
    setIsContentTransitioning(true);
    
    // Close sidebar on mobile during navigation if needed
    if (isMobile && sidebarOpen) {
      setSidebarOpen(false);
    }
    
    // Reset transition state after a shorter delay
    const timer = setTimeout(() => {
      setIsContentTransitioning(false);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [location.pathname, isMobile]);

  // Close the sidebar on mobile when a navigation item is clicked
  const closeSidebarOnMobile = useCallback(() => {
    if (isMobile && sidebarOpen) {
      setSidebarOpen(false);
    }
  }, [isMobile, setSidebarOpen, sidebarOpen]);

  // Memoize the Sidebar component to prevent unnecessary re-renders
  const memoizedSidebar = useMemo(() => (
    <Sidebar 
      isOpen={sidebarOpen} 
      onToggle={toggleSidebar} 
      onNavItemClick={closeSidebarOnMobile} 
      isMobile={isMobile}
      isTransitioning={false}
    />
  ), [sidebarOpen, toggleSidebar, closeSidebarOnMobile, isMobile]);

  return (
    <SidebarProvider>
      <div className="h-screen flex bg-background overflow-hidden">
        {/* Always render the sidebar */}
        {memoizedSidebar}

        {/* Main content and AI assistant */}
        <ContentArea 
          aiChatOpen={aiChatOpen} 
          toggleAiChat={toggleAiChat} 
          isMobile={isMobile}
          isTransitioning={isContentTransitioning}
          sidebarOpen={sidebarOpen}
        >
          {children}
        </ContentArea>
      </div>
    </SidebarProvider>
  );
};

export default React.memo(Layout);
