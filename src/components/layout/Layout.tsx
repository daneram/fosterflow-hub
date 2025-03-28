import React, { useEffect, useCallback, useMemo } from 'react';
import Sidebar from './Sidebar';
import ContentArea from './content/ContentArea';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLocation } from 'react-router-dom';
import { useSidebarState } from './hooks/useSidebarState';
import { useAIChatState } from './hooks/useAIChatState';

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

  // Handle sidebar toggle for mobile 
  const handleSidebarToggle = useCallback(() => {
    toggleSidebar();
  }, [toggleSidebar]);

  // Close the sidebar on mobile when a navigation item is clicked
  const closeSidebarOnMobile = useCallback(() => {
    if (isMobile && sidebarOpen) {
      setSidebarOpen(false);
    }
  }, [isMobile, setSidebarOpen, sidebarOpen]);

  // Handle click outside the sidebar on mobile to close it
  const handleContentClick = useCallback(() => {
    if (isMobile && sidebarOpen) {
      setSidebarOpen(false);
    }
  }, [isMobile, setSidebarOpen, sidebarOpen]);

  // Memoize the Sidebar component to prevent unnecessary re-renders
  const memoizedSidebar = useMemo(() => (
    <Sidebar 
      isOpen={sidebarOpen} 
      onToggle={handleSidebarToggle} 
      onNavItemClick={closeSidebarOnMobile} 
      toggleAiChat={toggleAiChat} 
      isMobile={isMobile}
    />
  ), [
    sidebarOpen, 
    handleSidebarToggle, 
    closeSidebarOnMobile, 
    toggleAiChat, 
    isMobile
  ]);

  return (
    <div className="h-screen flex bg-background overflow-hidden w-full">
      {/* Sidebar */}
      {memoizedSidebar}

      {/* Main content and AI assistant */}
      <div className="flex-1 flex min-w-0 w-full relative">
        <ContentArea 
          aiChatOpen={aiChatOpen} 
          toggleAiChat={toggleAiChat} 
          isMobile={isMobile}
          onClick={handleContentClick}
        >
          {children}
        </ContentArea>
      </div>
    </div>
  );
};

export default React.memo(Layout);
