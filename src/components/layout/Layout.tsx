
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { cn } from '@/lib/utils';
import { Bot, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import AIChat from '@/components/ai/AIChat';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const isMobile = useIsMobile();

  // Set initial AI chat state based on screen size
  useEffect(() => {
    setAiChatOpen(!isMobile);
  }, [isMobile]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleAiChat = () => {
    setAiChatOpen(!aiChatOpen);
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Mobile AI chat toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden fixed right-4 top-4 z-50"
        onClick={toggleAiChat}
      >
        <Bot className="h-5 w-5" />
      </Button>

      {/* Sidebar - always visible but in different states (collapsed/expanded) */}
      <div className="fixed inset-y-0 left-0 z-40 transition-all duration-300 ease-in-out">
        <Sidebar 
          isOpen={sidebarOpen} 
          onToggle={toggleSidebar} 
          onNavItemClick={() => isMobile && setSidebarOpen(false)} 
        />
      </div>

      {/* Overlay for mobile sidebar - removed the blur effect */}
      {sidebarOpen && isMobile && (
        <div
          className="fixed inset-0 z-30 bg-background/80 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Main content and AI assistant using ResizablePanelGroup */}
      <div className={cn(
        "flex-1 transition-all duration-300 ease-in-out",
        sidebarOpen ? "lg:ml-64" : "lg:ml-16"
      )}>
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-screen"
        >
          {/* Main content panel */}
          <ResizablePanel defaultSize={70} minSize={40}>
            <div className="min-h-screen p-4 sm:p-6 md:p-8">{children}</div>
          </ResizablePanel>
          
          {/* Resizable handle - only visible on desktop when AI chat is open */}
          {!isMobile && aiChatOpen && <ResizableHandle withHandle />}
          
          {/* AI Assistant panel - only rendered on desktop when open */}
          {!isMobile && aiChatOpen && (
            <ResizablePanel defaultSize={30} minSize={20}>
              <AIChat />
            </ResizablePanel>
          )}
        </ResizablePanelGroup>
        
        {/* Mobile AI Chat overlay - only rendered on mobile when open */}
        {isMobile && aiChatOpen && (
          <div className="fixed inset-0 z-40 bg-background">
            <div className="absolute top-4 right-4">
              <Button variant="ghost" size="icon" onClick={toggleAiChat}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="h-full pt-14">
              <AIChat />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;
