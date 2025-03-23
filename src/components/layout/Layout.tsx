import React, { useEffect, useCallback, useMemo, useState } from 'react';
import Sidebar from './Sidebar';
import ContentArea from './content/ContentArea';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLocation } from 'react-router-dom';
import { useSidebarState } from './hooks/useSidebarState';
import { useAIChatState } from './hooks/useAIChatState';
import { SidebarProvider } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { sidebarOpen, setSidebarOpen, toggleSidebar } = useSidebarState();
  const { aiChatOpen, setAiChatOpen, toggleAiChat } = useAIChatState();
  const isMobile = useIsMobile();
  const location = useLocation();
  const isAIAssistantPage = location.pathname === '/ai-assistant';
  
  const [isContentTransitioning, setIsContentTransitioning] = useState(false);

  useEffect(() => {
    setAiChatOpen(!isMobile && !isAIAssistantPage);
  }, [isMobile, isAIAssistantPage, setAiChatOpen]);

  useEffect(() => {
    setIsContentTransitioning(true);
    
    if (isMobile && sidebarOpen) {
      setSidebarOpen(false);
    }
    
    const timer = setTimeout(() => {
      setIsContentTransitioning(false);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [location.pathname, isMobile]);

  const closeSidebarOnMobile = useCallback(() => {
    if (isMobile && sidebarOpen) {
      setSidebarOpen(false);
    }
  }, [isMobile, setSidebarOpen, sidebarOpen]);

  const memoizedSidebar = useMemo(() => (
    <Sidebar 
      isOpen={sidebarOpen} 
      onToggle={toggleSidebar} 
      onNavItemClick={closeSidebarOnMobile} 
      toggleAiChat={toggleAiChat} 
      isMobile={isMobile}
      isTransitioning={isContentTransitioning}
    />
  ), [sidebarOpen, toggleSidebar, closeSidebarOnMobile, toggleAiChat, isMobile, isContentTransitioning]);

  return (
    <SidebarProvider>
      <div className="h-screen flex bg-background overflow-hidden relative">
        <div className={cn(
          "w-full transition-all duration-200",
          isMobile && sidebarOpen ? "filter backdrop-blur-sm bg-white/40" : ""
        )}>
          <ContentArea 
            aiChatOpen={aiChatOpen} 
            toggleAiChat={toggleAiChat} 
            isMobile={isMobile}
            isTransitioning={isContentTransitioning}
          >
            {children}
          </ContentArea>
        </div>

        <div className={cn(
          "absolute top-0 left-0 h-full z-40",
          isMobile ? "transition-transform duration-200" : "relative",
          isMobile && !sidebarOpen ? "-translate-x-full" : "translate-x-0"
        )}>
          {memoizedSidebar}
        </div>
      </div>
    </SidebarProvider>
  );
};

export default React.memo(Layout);
