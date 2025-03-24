
import React from 'react';
import { cn } from '@/lib/utils';
import AIChat from '@/components/ai/AIChat';
import { ResizablePanelGroup, ResizablePanel } from '@/components/ui/resizable';

interface ContentAreaProps {
  children: React.ReactNode;
  aiChatOpen: boolean;
  toggleAiChat: () => void;
  isMobile: boolean;
  onClick?: () => void;
}

const ContentArea: React.FC<ContentAreaProps> = ({ 
  children, 
  aiChatOpen, 
  toggleAiChat, 
  isMobile,
  onClick
}) => {
  // Handle content click - improve the click detection to make sure it properly detects
  // clicks on the content area but doesn't interfere with child elements
  const handleContentClick = (e: React.MouseEvent) => {
    // Call onClick if provided - this will close the sidebar on mobile
    if (onClick) {
      onClick();
    }
  };

  return (
    <div 
      className="flex-1 overflow-auto"
      onClick={handleContentClick}
    >
      <ResizablePanelGroup direction="horizontal" className="min-h-screen">
        {/* Main content panel */}
        <ResizablePanel 
          defaultSize={100} 
          minSize={25}
          className="overflow-auto"
        >
          <div className="p-6 h-full overflow-auto">
            {children}
          </div>
        </ResizablePanel>

        {/* AI Assistant panel - only show on desktop and when open */}
        {!isMobile && aiChatOpen && (
          <>
            <ResizablePanel 
              defaultSize={40} 
              minSize={30}
              className="border-l overflow-auto"
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
