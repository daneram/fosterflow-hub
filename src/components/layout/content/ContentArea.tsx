
import React from 'react';
import { cn } from '@/lib/utils';
import AIChat from '@/components/ai/AIChat';
import { ResizablePanelGroup, ResizablePanel } from '@/components/ui/resizable';

interface ContentAreaProps {
  children: React.ReactNode;
  aiChatOpen: boolean;
  toggleAiChat: () => void;
  isMobile: boolean;
  isTransitioning?: boolean;
  sidebarOpen?: boolean;
}

const ContentArea: React.FC<ContentAreaProps> = ({ 
  children, 
  aiChatOpen, 
  toggleAiChat, 
  isMobile,
  isTransitioning = false,
  sidebarOpen = false
}) => {
  return (
    <div className={cn(
      "flex-1 overflow-hidden", 
      isTransitioning ? "opacity-90 transition-opacity duration-100" : "opacity-100",
      isMobile && sidebarOpen ? "ml-14" : "" // Keep content aligned the same as when sidebar is closed
    )}>
      <ResizablePanelGroup direction="horizontal" className="min-h-screen">
        {/* Main content panel */}
        <ResizablePanel 
          defaultSize={100} 
          minSize={25}
          className="overflow-auto"
        >
          <div className="p-6">
            {children}
          </div>
        </ResizablePanel>

        {/* AI Assistant panel - only show on desktop and when open */}
        {!isMobile && aiChatOpen && (
          <>
            <ResizablePanel 
              defaultSize={40} 
              minSize={30}
              className="border-l"
            >
              {/* Remove the toggleAiChat prop if AIChat doesn't accept it */}
              <AIChat />
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>
    </div>
  );
};

export default ContentArea;
