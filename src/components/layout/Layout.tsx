
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

  // Use a stable sidebar key to ensure the sidebar doesn't remount
  // This is CRITICAL for maintaining scroll position
  const stableSidebarKey = "sidebar-stable-instance";

  return (
    <SidebarProvider>
      <div className="h-screen flex bg-background overflow-hidden">
        {/* Use a key prop directly on Sidebar instead of Fragment */}
        <Sidebar 
          key={stableSidebarKey}
          isOpen={sidebarOpen} 
          onToggle={toggleSidebar} 
          onNavItemClick={closeSidebarOnMobile} 
          isMobile={isMobile}
          isTransitioning={false}
        />

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

// Use React.memo with a custom comparison that ignores children changes
// This prevents Layout from re-rendering when only the children change
export default React.memo(Layout, (prevProps, nextProps) => {
  // We only care about the children's identity, not their content
  return true;
});
