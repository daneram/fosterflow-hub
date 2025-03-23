
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
  
  // Set initial AI chat state based on screen size
  useEffect(() => {
    setAiChatOpen(!isMobile && !isAIAssistantPage);
  }, [isMobile, isAIAssistantPage, setAiChatOpen]);

  // Close the sidebar on mobile when a navigation item is clicked
  const closeSidebarOnMobile = useCallback(() => {
    if (isMobile && sidebarOpen) {
      setSidebarOpen(false);
    }
  }, [isMobile, setSidebarOpen, sidebarOpen]);

  // IMPORTANT: We're using useMemo to prevent the sidebar from re-rendering
  // when the location changes or when other state changes happen
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
        {/* Use a fixed key to ensure the sidebar isn't remounted */}
        <React.Fragment key="sidebar-container">
          {memoizedSidebar}
        </React.Fragment>

        <ContentArea 
          aiChatOpen={aiChatOpen} 
          toggleAiChat={toggleAiChat} 
          isMobile={isMobile}
          isTransitioning={false}
        >
          {children}
        </ContentArea>
      </div>
    </SidebarProvider>
  );
};

// Use React.memo to prevent unnecessary re-renders of the entire Layout
export default React.memo(Layout, (prevProps, nextProps) => {
  // Always return true to prevent re-renders based on children changes
  // This is safe because we're only concerned with the sidebar's state
  return true;
});
