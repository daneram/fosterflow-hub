import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import AIChat from '@/components/ai/AIChat';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAIChat } from '../context/AIChatContext';

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
  const location = useLocation();
  const navigate = useNavigate();
  const [isNavigating, setIsNavigating] = useState(false);
  const [prevPath, setPrevPath] = useState(location.pathname);
  const [prevIsMobile, setPrevIsMobile] = useState(isMobile);
  const { aiChatSize, handleAiChatSizeChange } = useAIChat();
  
  // Handle viewport changes and navigation
  useEffect(() => {
    const isAIAssistantPage = location.pathname === '/ai-assistant';
    
    // If switching from mobile to desktop while on AI assistant page
    if (prevIsMobile && !isMobile && isAIAssistantPage) {
      try {
        // Navigate to root path which renders the dashboard
        navigate('/', { replace: true });
      } catch (error) {
        console.error('Navigation error:', error);
      }
    }
    
    setPrevIsMobile(isMobile);
  }, [isMobile, location.pathname, navigate, prevIsMobile]);
  
  // Track navigation to prevent unwanted layout shifts
  useEffect(() => {
    if (prevPath !== location.pathname) {
      setIsNavigating(true);
      // Reset after navigation completes
      const timer = setTimeout(() => {
        setIsNavigating(false);
        setPrevPath(location.pathname);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, prevPath]);

  // Handle content click - delegated to avoid nested click handlers
  const handleContentClick = (e: React.MouseEvent) => {
    // Skip during navigation
    if (isNavigating) return;
    
    // Call onClick if provided - this will close the sidebar on mobile
    if (onClick) {
      onClick();
    }
  };

  return (
    <div 
      className={cn(
        "flex-1 relative w-full",
        isNavigating && "pointer-events-none"
      )}
      onClick={handleContentClick}
      data-navigating={isNavigating}
    >
      {/* Mobile header */}
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 h-12 z-30 bg-background/80 backdrop-blur-sm flex">
          <div className="flex-1 flex">
            <h1 className="text-base mt-0.3 pr-6 ml-auto leading-[48px] text-sidebar-foreground/100 font-bold">FosterNotes</h1>
          </div>
        </div>
      )}
      
      <ResizablePanelGroup 
        direction="horizontal" 
        className="min-h-screen w-full"
        autoSaveId="ai-chat-panel"
        style={{ display: 'flex' }}
      >
        {/* Main content panel */}
        <ResizablePanel 
          defaultSize={100 - aiChatSize}
          minSize={55}
          className="overflow-auto flex-1"
          order={1}
          style={{ minWidth: 0 }}
        >
          <div className={cn(
            "h-full w-full overflow-auto",
            isMobile 
              ? "p-6 pt-[55px]"
              : "px-6 py-4 pt-3"
          )}>
            {children}
          </div>
        </ResizablePanel>

        {/* AI Assistant panel */}
        {!isMobile && aiChatOpen && (
          <>
            <ResizableHandle withHandle className="bg-sidebar" />
            <ResizablePanel 
              defaultSize={aiChatSize}
              minSize={30}
              maxSize={45}
              className="border-l border-sidebar overflow-auto"
              onResize={handleAiChatSizeChange}
              order={2}
              style={{ minWidth: 0 }}
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
