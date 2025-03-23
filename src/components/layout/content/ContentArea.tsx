
import React from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import AIChat from '@/components/ai/AIChat';

interface ContentAreaProps {
  children: React.ReactNode;
  aiChatOpen: boolean;
  toggleAiChat: () => void;
  isMobile: boolean;
}

// Separate the main content panel into its own memoized component
const MainContentPanel = React.memo(({ children }: { children: React.ReactNode }) => {
  return (
    <ResizablePanel defaultSize={75} minSize={50} id="main-content">
      <div className="h-screen overflow-y-auto p-3 sm:p-4 md:p-5 pt-3">
        {children}
      </div>
    </ResizablePanel>
  );
});

MainContentPanel.displayName = 'MainContentPanel';

// Separate the AI chat panel into its own memoized component
const AIChatPanel = React.memo(() => {
  return (
    <ResizablePanel defaultSize={25} minSize={20} id="ai-chat">
      <AIChat />
    </ResizablePanel>
  );
});

AIChatPanel.displayName = 'AIChatPanel';

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
        <MainContentPanel>
          {children}
        </MainContentPanel>
        
        {/* Resizable handle - only visible on desktop when AI chat is open */}
        {!isMobile && aiChatOpen && <ResizableHandle withHandle />}
        
        {/* AI Assistant panel - only rendered on desktop when open */}
        {!isMobile && aiChatOpen && <AIChatPanel />}
      </ResizablePanelGroup>
    </div>
  );
};

export default React.memo(ContentArea);
