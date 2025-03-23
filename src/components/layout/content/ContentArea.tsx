
import React from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import AIChat from '@/components/ai/AIChat';

interface ContentAreaProps {
  children: React.ReactNode;
  aiChatOpen: boolean;
  toggleAiChat: () => void;
  isMobile: boolean;
}

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
        <ResizablePanel defaultSize={75} minSize={50} id="main-content">
          <div className="h-screen overflow-y-auto p-3 sm:p-4 md:p-5 pt-3">{children}</div>
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
