
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
      {/* Sidebar with optimized width */}
      <div className={cn(
        "h-screen transition-all duration-300 ease-in-out flex-shrink-0",
        sidebarOpen ? "w-56" : "w-14"
      )}>
        <Sidebar 
          isOpen={sidebarOpen} 
          onToggle={toggleSidebar} 
          onNavItemClick={() => isMobile && setSidebarOpen(false)} 
        />
      </div>

      {/* Main content and AI assistant with better spacing */}
      <div className="flex-1 flex overflow-hidden h-screen">
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-screen w-full"
        >
          {/* Main content panel with reduced padding */}
          <ResizablePanel defaultSize={75} minSize={50}>
            <div className="min-h-screen p-3 sm:p-4 md:p-5 overflow-auto">{children}</div>
          </ResizablePanel>
          
          {/* Resizable handle - only visible on desktop when AI chat is open */}
          {!isMobile && aiChatOpen && <ResizableHandle withHandle />}
          
          {/* AI Assistant panel - only rendered on desktop when open, with reduced default size */}
          {!isMobile && aiChatOpen && (
            <ResizablePanel defaultSize={25} minSize={20}>
              <AIChat />
            </ResizablePanel>
          )}
        </ResizablePanelGroup>
        
        {/* Mobile AI Chat toggle button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden fixed right-3 top-3 z-50"
          onClick={toggleAiChat}
        >
          <Bot className="h-5 w-5" />
        </Button>
        
        {/* Mobile AI Chat overlay - only rendered on mobile when open */}
        {isMobile && aiChatOpen && (
          <div className="fixed inset-0 z-40 bg-background">
            <div className="absolute top-3 right-3">
              <Button variant="ghost" size="icon" onClick={toggleAiChat}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="h-full pt-12">
              <AIChat />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;
