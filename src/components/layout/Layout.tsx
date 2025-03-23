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
      isTransitioning={false}
    />
  ), [sidebarOpen, toggleSidebar, closeSidebarOnMobile, toggleAiChat, isMobile]);

  return (
    <SidebarProvider>
      <div className="h-screen flex bg-background overflow-hidden relative">
        <div className={cn(
          "md:static absolute z-50 h-full",
          isMobile ? "transition-transform duration-300 ease-in-out" : "",
          isMobile && !sidebarOpen ? "-translate-x-full" : "translate-x-0"
        )}>
          {memoizedSidebar}
        </div>

        {isMobile && sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <div className={cn(
          "flex-1 transition-all duration-300",
          isMobile && sidebarOpen ? "backdrop-blur-[6px]" : ""
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
      </div>
    </SidebarProvider>
  );
};

export default React.memo(Layout);
