
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
  
  // Tracking content transitions instead of sidebar transitions
  const [isContentTransitioning, setIsContentTransitioning] = useState(false);

  // Set initial AI chat state based on screen size and page
  useEffect(() => {
    // Only set AI chat open on desktop and when not on the AI assistant page
    if (!isMobile && !isAIAssistantPage) {
      setAiChatOpen(true);
    } else {
      setAiChatOpen(false);
    }
  }, [isMobile, isAIAssistantPage, setAiChatOpen]);

  // Handle page transition effects for content area
  useEffect(() => {
    // Mark content as transitioning
    setIsContentTransitioning(true);
    
    // Close sidebar on mobile during navigation if needed
    if (isMobile && sidebarOpen) {
      setSidebarOpen(false);
    }
    
    // Close AI chat on mobile or when navigating to AI assistant page
    if (isMobile || location.pathname === '/ai-assistant') {
      setAiChatOpen(false);
    }
    
    // Reset transition state after a shorter delay
    const timer = setTimeout(() => {
      setIsContentTransitioning(false);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [location.pathname, isMobile, setSidebarOpen, sidebarOpen, setAiChatOpen]);

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
      toggleAiChat={toggleAiChat} 
      isMobile={isMobile}
      isTransitioning={false} // Never hide sidebar completely on transitions
    />
  ), [sidebarOpen, toggleSidebar, closeSidebarOnMobile, toggleAiChat, isMobile]);

  return (
    <SidebarProvider>
      <div className="h-screen flex bg-background overflow-hidden">
        {/* Always render the sidebar, never completely hide it during transitions */}
        {memoizedSidebar}

        {/* Main content and AI assistant */}
        <ContentArea 
          aiChatOpen={aiChatOpen && !isAIAssistantPage} 
          toggleAiChat={toggleAiChat} 
          isMobile={isMobile}
          isTransitioning={isContentTransitioning}
        >
          {children}
        </ContentArea>
      </div>
    </SidebarProvider>
  );
};

export default React.memo(Layout);
