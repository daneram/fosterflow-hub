
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

  // Set initial AI chat state based on screen size and don't change it during navigation
  useEffect(() => {
    // Only set AI chat state on initial load, not during navigation
    const storedAiChatState = localStorage.getItem('aiChatOpen');
    if (storedAiChatState === null) {
      // First time visit, set default based on device and page
      const defaultState = !isMobile && !isAIAssistantPage;
      setAiChatOpen(defaultState);
      localStorage.setItem('aiChatOpen', String(defaultState));
    } else {
      // Return visit, use stored preference unless on AI Assistant page
      const savedState = storedAiChatState === 'true';
      setAiChatOpen(isAIAssistantPage ? false : savedState);
    }
  }, [isMobile, isAIAssistantPage, setAiChatOpen]);

  // Save AI chat state when it changes
  useEffect(() => {
    if (!isAIAssistantPage) {
      localStorage.setItem('aiChatOpen', String(aiChatOpen));
    }
  }, [aiChatOpen, isAIAssistantPage]);

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
  }, [location.pathname, isMobile, sidebarOpen, setSidebarOpen]);

  // Custom toggle for AI chat that also stores the state
  const handleToggleAiChat = useCallback(() => {
    toggleAiChat();
  }, [toggleAiChat]);

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
      toggleAiChat={handleToggleAiChat} 
      isMobile={isMobile}
      isTransitioning={false} // Never hide sidebar completely on transitions
    />
  ), [sidebarOpen, toggleSidebar, closeSidebarOnMobile, handleToggleAiChat, isMobile]);

  return (
    <SidebarProvider>
      <div className="h-screen flex bg-background overflow-hidden w-full">
        {/* Always render the sidebar, never completely hide it during transitions */}
        {memoizedSidebar}

        {/* Main content and AI assistant */}
        <ContentArea 
          aiChatOpen={aiChatOpen} 
          toggleAiChat={handleToggleAiChat} 
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
