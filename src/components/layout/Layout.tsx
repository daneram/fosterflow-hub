
import React, { useEffect } from 'react';
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

  // This function will be called when a navigation item is clicked in the sidebar
  const closeSidebarOnMobile = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="h-screen flex bg-background overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onToggle={toggleSidebar} 
        onNavItemClick={closeSidebarOnMobile}
        toggleAiChat={toggleAiChat} 
        isMobile={isMobile}
      />

      {/* Main content and AI assistant */}
      <ContentArea 
        aiChatOpen={aiChatOpen} 
        toggleAiChat={toggleAiChat} 
        isMobile={isMobile}
      >
        {children}
      </ContentArea>
    </div>
  );
};

export default Layout;
