
import React, { useEffect, useCallback, useMemo, useState, useRef } from 'react';
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
  const sidebarRef = useRef<HTMLDivElement>(null);
  
  // Tracking content transitions instead of sidebar transitions
  const [isContentTransitioning, setIsContentTransitioning] = useState(false);

  // Set initial AI chat state based on screen size
  useEffect(() => {
    setAiChatOpen(!isMobile && !isAIAssistantPage);
  }, [isMobile, isAIAssistantPage, setAiChatOpen]);

  // Handle page transition effects for content area
  useEffect(() => {
    // Mark content as transitioning
    setIsContentTransitioning(true);
    
    // Reset transition state after a shorter delay
    const timer = setTimeout(() => {
      setIsContentTransitioning(false);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Handle sidebar toggle for mobile - keep it in sync with the main toggle
  const handleSidebarToggle = useCallback(() => {
    // Use the toggle function directly
    toggleSidebar();
    
    // Debug the toggle action
    console.log("Sidebar toggle called, new state will be:", !sidebarOpen);
  }, [toggleSidebar, sidebarOpen]);

  // Close the sidebar on mobile when a navigation item is clicked
  const closeSidebarOnMobile = useCallback(() => {
    if (isMobile && sidebarOpen) {
      setSidebarOpen(false);
      console.log("Closing sidebar on mobile after nav item click");
    }
  }, [isMobile, setSidebarOpen, sidebarOpen]);

  // Handle click outside the sidebar on mobile to close it
  // This function is simplified to always close the sidebar on mobile when clicking content
  const handleContentClick = useCallback(() => {
    if (isMobile && sidebarOpen) {
      setSidebarOpen(false);
      console.log("Closing sidebar on mobile from content click");
    }
  }, [isMobile, setSidebarOpen, sidebarOpen]);

  // Memoize the Sidebar component to prevent unnecessary re-renders
  const memoizedSidebar = useMemo(() => (
    <Sidebar 
      ref={sidebarRef}
      isOpen={sidebarOpen} 
      onToggle={handleSidebarToggle} 
      onNavItemClick={closeSidebarOnMobile} 
      toggleAiChat={toggleAiChat} 
      isMobile={isMobile}
      isTransitioning={false} // Never hide sidebar completely on transitions
    />
  ), [sidebarOpen, handleSidebarToggle, closeSidebarOnMobile, toggleAiChat, isMobile]);

  return (
    <div className="h-screen flex bg-background overflow-hidden">
      {/* Always render the sidebar, never completely hide it during transitions */}
      {memoizedSidebar}

      {/* Main content and AI assistant */}
      <ContentArea 
        aiChatOpen={aiChatOpen} 
        toggleAiChat={toggleAiChat} 
        isMobile={isMobile}
        isTransitioning={isContentTransitioning}
        onClick={handleContentClick}
      >
        {children}
      </ContentArea>
    </div>
  );
};

export default React.memo(Layout);
