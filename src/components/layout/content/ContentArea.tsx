
import React, { useEffect, useRef } from 'react';
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

// Store panel sizes in localStorage to maintain consistency between page navigations
const PANEL_STORAGE_KEY = 'lovable-panel-sizes';
const DEFAULT_MAIN_SIZE = 65; // Main content takes 65% by default
const DEFAULT_AI_SIZE = 35;   // AI assistant takes 35% by default

const ContentArea: React.FC<ContentAreaProps> = ({ 
  children, 
  aiChatOpen, 
  toggleAiChat, 
  isMobile,
  isTransitioning = false
}) => {
  // Reference to track if panels have been initialized
  const panelsInitialized = useRef(false);

  // Load saved panel sizes from localStorage on component mount
  useEffect(() => {
    // Only try to restore panel sizes once
    if (!panelsInitialized.current) {
      panelsInitialized.current = true;
    }
  }, []);

  // Save panel sizes when they change
  const handlePanelResize = (sizes: number[]) => {
    if (sizes.length === 2) {
      localStorage.setItem(PANEL_STORAGE_KEY, JSON.stringify(sizes));
    }
  };

  // Try to get saved panel sizes, fallback to defaults
  const getInitialPanelSizes = (): [number, number] => {
    try {
      const savedSizes = localStorage.getItem(PANEL_STORAGE_KEY);
      if (savedSizes) {
        const [mainSize, aiSize] = JSON.parse(savedSizes);
        return [mainSize, aiSize];
      }
    } catch (e) {
      console.error('Failed to load panel sizes', e);
    }
    return [DEFAULT_MAIN_SIZE, DEFAULT_AI_SIZE];
  };
  
  const [mainPanelSize, aiPanelSize] = getInitialPanelSizes();

  return (
    <div className={cn(
      "flex-1 overflow-hidden w-full", 
      isTransitioning ? "opacity-90 transition-opacity duration-100" : "opacity-100"
    )}>
      <ResizablePanelGroup 
        direction="horizontal" 
        className="min-h-screen w-full"
        onLayout={handlePanelResize}
      >
        {/* Main content panel */}
        <ResizablePanel 
          defaultSize={mainPanelSize} 
          minSize={50}
          maxSize={85}
          className="w-full overflow-auto"
        >
          <div className="px-4 py-4 sm:px-6 sm:py-6 w-full max-w-full">
            {children}
          </div>
        </ResizablePanel>

        {/* AI Assistant panel - only show on desktop and when open */}
        {!isMobile && aiChatOpen && (
          <>
            <ResizableHandle withHandle />
            <ResizablePanel 
              defaultSize={aiPanelSize} 
              minSize={15}
              maxSize={50}
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
