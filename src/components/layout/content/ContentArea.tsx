
import React from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import AIChat from '@/components/ai/AIChat';

interface ContentAreaProps {
  children: React.ReactNode;
  aiChatOpen: boolean;
  toggleAiChat: () => void;
  isMobile: boolean;
}

// Content loader with subtle animation instead of full screen blur
export const ContentLoader = () => (
  <div className="fixed inset-0 z-40 pointer-events-none">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="animate-pulse h-6 w-6 rounded-full bg-primary/30"></div>
    </div>
  </div>
);

const ContentArea: React.FC<ContentAreaProps> = ({ 
  children, 
  aiChatOpen, 
  isMobile 
}) => {
  return (
    <div className="flex-1 flex overflow-hidden h-screen">
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-screen w-full"
      >
        {/* Main content panel with proper overflow handling */}
        <ResizablePanel defaultSize={100} minSize={50} id="main-content">
          <div className="h-screen overflow-y-auto p-3 sm:p-4 md:p-5 pt-3 relative">
            {children}
          </div>
        </ResizablePanel>
        
        {/* Resizable handle - only visible on desktop when AI chat is open */}
        {!isMobile && aiChatOpen && <ResizableHandle withHandle />}
        
        {/* AI Assistant panel - only rendered on desktop when open, with reduced default size */}
        {!isMobile && aiChatOpen && (
          <ResizablePanel defaultSize={25} minSize={20} id="ai-chat">
            <AIChat />
          </ResizablePanel>
        )}
      </ResizablePanelGroup>
    </div>
  );
};

export default ContentArea;
