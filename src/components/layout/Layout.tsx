
import React, { useEffect, useCallback, useState } from 'react';
import Sidebar from './Sidebar';
import ContentArea from './content/ContentArea';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLocation } from 'react-router-dom';
import { useSidebarState } from './hooks/useSidebarState';
import { useAIChatState } from './hooks/useAIChatState';
import { 
  SidebarProvider, 
  useSidebar
} from '@/components/ui/sidebar';

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

  // Debug initial state
  useEffect(() => {
    console.log('[Layout] Initial state:', {
      isMobile,
      sidebarOpen,
      aiChatOpen,
      isAIAssistantPage,
      path: location.pathname
    });
  }, []);

  // Set initial AI chat state based on screen size and don't change it during navigation
  useEffect(() => {
    console.log('[Layout] Setting initial AI chat state');
    // Only set AI chat state on initial load, not during navigation
    const storedAiChatState = localStorage.getItem('aiChatOpen');
    if (storedAiChatState === null) {
      // First time visit, set default based on device and page
      const defaultState = !isMobile && !isAIAssistantPage;
      console.log('[Layout] First visit, setting aiChatOpen to:', defaultState);
      setAiChatOpen(defaultState);
      localStorage.setItem('aiChatOpen', String(defaultState));
    } else {
      // Return visit, use stored preference unless on AI Assistant page
      const savedState = storedAiChatState === 'true';
      console.log('[Layout] Return visit, setting aiChatOpen to:', isAIAssistantPage ? false : savedState);
      setAiChatOpen(isAIAssistantPage ? false : savedState);
    }
  }, [isMobile, isAIAssistantPage, setAiChatOpen]);

  // Save AI chat state when it changes
  useEffect(() => {
    if (!isAIAssistantPage) {
      console.log('[Layout] Saving aiChatOpen state:', aiChatOpen);
      localStorage.setItem('aiChatOpen', String(aiChatOpen));
    }
  }, [aiChatOpen, isAIAssistantPage]);

  // Handle page transition effects for content area
  useEffect(() => {
    console.log('[Layout] Page transition detected:', location.pathname);
    // Mark content as transitioning
    setIsContentTransitioning(true);
    
    // Reset transition state after a shorter delay
    const timer = setTimeout(() => {
      setIsContentTransitioning(false);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Custom toggle for AI chat that also stores the state
  const handleToggleAiChat = useCallback(() => {
    console.log('[Layout] Toggling AI chat');
    toggleAiChat();
  }, [toggleAiChat]);

  // Close the sidebar on mobile when a navigation item is clicked
  const closeSidebarOnMobile = useCallback(() => {
    if (isMobile) {
      console.log('[Layout] Closing sidebar on mobile after nav item click');
      // Use the shadcn sidebar context to close mobile sidebar
      const { setOpenMobile } = useSidebar();
      setOpenMobile(false);
    }
  }, [isMobile]);

  // Log when sidebar state changes
  useEffect(() => {
    console.log('[Layout] Sidebar state changed:', { sidebarOpen });
  }, [sidebarOpen]);

  return (
    <SidebarProvider defaultOpen={sidebarOpen} onOpenChange={setSidebarOpen}>
      <div className="h-screen flex bg-background overflow-hidden w-full">
        {/* For both mobile and desktop, render our custom Sidebar */}
        <Sidebar 
          isOpen={sidebarOpen}
          onToggle={toggleSidebar}
          onNavItemClick={closeSidebarOnMobile}
          isMobile={isMobile}
          isTransitioning={false}
        />

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
