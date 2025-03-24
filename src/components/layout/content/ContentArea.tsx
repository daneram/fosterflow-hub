
import React from 'react';
import { cn } from '@/lib/utils';
import AIChat from '@/components/ai/AIChat';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';

interface ContentAreaProps {
  children: React.ReactNode;
  aiChatOpen: boolean;
  toggleAiChat: () => void;
  isMobile: boolean;
  isTransitioning?: boolean;
}

const ContentArea: React.FC<ContentAreaProps> = ({ 
  children, 
  aiChatOpen, 
  toggleAiChat, 
  isMobile,
  isTransitioning = false
}) => {
  return (
    <div className={cn(
      "flex-1 overflow-hidden w-full", 
      isTransitioning ? "opacity-90 transition-opacity duration-100" : "opacity-100"
    )}>
      <ResizablePanelGroup direction="horizontal" className="min-h-screen w-full">
        {/* Main content panel */}
        <ResizablePanel 
          defaultSize={aiChatOpen && !isMobile ? 65 : 100} 
          minSize={50}
          className="overflow-auto w-full"
        >
          <div className="w-full h-full px-4 py-4 sm:px-6 sm:py-6 max-w-full">
            {children}
          </div>
        </ResizablePanel>

        {/* AI Assistant panel - only show on desktop and when open */}
        {!isMobile && aiChatOpen && (
          <>
            <ResizableHandle withHandle />
            <ResizablePanel 
              defaultSize={35} 
              minSize={25}
              maxSize={45}
              className="border-l"
            >
              <AIChat />
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>
    </div>
  );
};

export default ContentArea;
