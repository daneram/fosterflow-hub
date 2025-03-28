import React, { useRef, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';
import { useScrollPosition } from './hooks/useScrollPosition';
import { useMobileLayout } from './hooks/useMobileLayout';
import { useScrollVisibility } from './hooks/useScrollVisibility';
import { setupScrollHandlers } from './utils/scrollHandlers';

interface ScrollManagerProps {
  children: React.ReactNode;
  isOpen: boolean;
}

const ScrollManager: React.FC<ScrollManagerProps> = ({ children, isOpen }) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLElement | null>(null);
  const isMobile = useIsMobile();
  
  // Use our custom hooks
  const { saveScrollPosition, restoreScrollPosition } = useScrollPosition(isMobile);
  const { positionLastItemAtBottom } = useMobileLayout();
  const { 
    isScrolling, 
    setIsScrolling, 
    scrollTimeoutRef, 
    forceHideScrollbar, 
    cleanupScrollTimeout 
  } = useScrollVisibility();
  
  // Initialize viewport ref, content ref and restore scroll position
  useEffect(() => {
    if (!scrollAreaRef.current) return;
    
    // Find the viewport element using the data-attribute we added
    const viewport = scrollAreaRef.current.querySelector('[data-scrollarea-viewport]');
    if (viewport instanceof HTMLElement) {
      viewportRef.current = viewport;
      
      // Store content element reference
      if (viewport.firstElementChild instanceof HTMLElement) {
        contentRef.current = viewport.firstElementChild;
      }
      
      // For mobile, ensure touch scrolling works immediately by adding and removing a CSS class
      if (isMobile) {
        viewport.classList.add('touch-action-auto');
        // Force a reflow to ensure the touch-action property is applied
        void viewport.offsetHeight;
      }
      
      // Make sure we remove any active scrolling class initially
      viewport.classList.remove('scrolling-active');
      
      // Restore scroll position after component mounts
      restoreScrollPosition(viewport);
      
      // Position the last item on mobile
      if (isMobile) {
        positionLastItemAtBottom(viewport, contentRef.current);
      }
    }
    
    // Cleanup function to ensure we remove the class when unmounting
    return () => {
      if (viewportRef.current) {
        viewportRef.current.classList.remove('touch-action-auto');
        forceHideScrollbar(viewportRef.current);
      }
    };
  }, [isMobile, positionLastItemAtBottom, restoreScrollPosition, forceHideScrollbar]);
  
  // Recalculate when children or sidebar open state changes
  useEffect(() => {
    // Use a short delay to ensure DOM is fully rendered
    const timeoutId = setTimeout(() => {
      positionLastItemAtBottom(viewportRef.current, contentRef.current);
      forceHideScrollbar(viewportRef.current);
      
      // For mobile, ensure scrollable area is properly initialized when sidebar opens
      if (isMobile && isOpen && viewportRef.current) {
        viewportRef.current.style.overflowY = 'scroll';
        // Apply webkit-overflow-scrolling through CSS className instead
        viewportRef.current.classList.add('webkit-touch-scroll');
      }
    }, 200);
    
    return () => clearTimeout(timeoutId);
  }, [children, isOpen, isMobile, positionLastItemAtBottom, forceHideScrollbar]);
  
  // Set up resize observer
  useEffect(() => {
    if (!contentRef.current || !viewportRef.current) return;
    
    const resizeObserver = new ResizeObserver(() => {
      positionLastItemAtBottom(viewportRef.current, contentRef.current);
      // Also ensure scrollbar is hidden after resize
      forceHideScrollbar(viewportRef.current);
    });
    
    resizeObserver.observe(contentRef.current);
    resizeObserver.observe(viewportRef.current);
    
    return () => resizeObserver.disconnect();
  }, [positionLastItemAtBottom, forceHideScrollbar]);
  
  // Handle scroll events
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    
    // Set up scroll handlers and get cleanup function
    const cleanup = setupScrollHandlers(
      viewport,
      isScrolling,
      setIsScrolling,
      saveScrollPosition,
      scrollTimeoutRef
    );
    
    // Return cleanup function
    return () => {
      cleanup();
      cleanupScrollTimeout();
    };
  }, [isScrolling, saveScrollPosition, setIsScrolling, scrollTimeoutRef, cleanupScrollTimeout]);

  return (
    <ScrollArea 
      ref={scrollAreaRef} 
      className={`flex-1 overflow-auto ${isMobile ? 'mobile-scroll-area' : ''}`}
      data-mobile={isMobile ? 'true' : 'false'}
    >
      {children}
    </ScrollArea>
  );
};

export default ScrollManager;
