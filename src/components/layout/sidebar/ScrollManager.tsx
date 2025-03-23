
import React, { useRef, useEffect, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLocation } from 'react-router-dom';

interface ScrollManagerProps {
  children: React.ReactNode;
  isOpen: boolean;
}

// Store scroll positions for each route
const scrollPositions = new Map<string, number>();

const ScrollManager: React.FC<ScrollManagerProps> = ({ children, isOpen }) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLElement | null>(null);
  const isMobile = useIsMobile();
  const location = useLocation();
  const [hasInitialized, setHasInitialized] = useState(false);
  
  // Position the last menu item at the bottom of the screen on mobile
  const positionLastItemAtBottom = () => {
    if (!isMobile || !viewportRef.current || !contentRef.current) return;
    
    const viewport = viewportRef.current;
    const content = contentRef.current;
    
    // Find the last navigation item in the sidebar
    const allNavSections = content.querySelectorAll('nav');
    const lastNavSection = allNavSections[allNavSections.length - 1];
    
    if (!lastNavSection) return;
    
    const lastItem = lastNavSection.querySelector('a:last-child');
    if (!lastItem) return;
    
    // Get heights and positions
    const viewportHeight = viewport.clientHeight;
    const lastItemHeight = (lastItem as HTMLElement).offsetHeight;
    const lastItemTop = (lastItem as HTMLElement).offsetTop;
    const currentPadding = parseInt(content.style.paddingBottom || '0', 10);
    
    // Calculate how much padding we need to add to push the last item to the bottom
    // This is: viewport height - (last item's position from top + its height)
    const desiredPadding = Math.max(0, viewportHeight - (lastItemTop + lastItemHeight));
    
    // Apply the padding if it's different from current padding
    if (desiredPadding !== currentPadding) {
      content.style.paddingBottom = `${desiredPadding}px`;
    }
  };

  // Initialize viewport ref and restore scroll position
  useEffect(() => {
    if (!scrollAreaRef.current) return;
    
    const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
    if (viewport instanceof HTMLElement) {
      viewportRef.current = viewport;
      
      // Store content element reference
      if (viewport.firstElementChild instanceof HTMLElement) {
        contentRef.current = viewport.firstElementChild;
      }
      
      // Restore scroll position for current route
      const savedPosition = scrollPositions.get(location.pathname);
      if (savedPosition !== undefined) {
        requestAnimationFrame(() => {
          if (viewportRef.current) {
            viewportRef.current.scrollTop = savedPosition;
          }
        });
      }
      
      positionLastItemAtBottom();
      setHasInitialized(true);
    }
  }, [location.pathname, isMobile]);
  
  // Save current scroll position when route changes
  useEffect(() => {
    return () => {
      if (viewportRef.current) {
        // Save scroll position when unmounting
        scrollPositions.set(location.pathname, viewportRef.current.scrollTop);
      }
    };
  }, [location.pathname]);
  
  // Update positioning when sidebar open state changes
  useEffect(() => {
    if (!hasInitialized) return;
    
    // Use requestAnimationFrame to ensure DOM has updated
    requestAnimationFrame(() => {
      positionLastItemAtBottom();
      
      // Restore scroll position
      const savedPosition = scrollPositions.get(location.pathname);
      if (savedPosition !== undefined && viewportRef.current) {
        viewportRef.current.scrollTop = savedPosition;
      }
    });
  }, [isOpen, hasInitialized, location.pathname]);
  
  // Set up resize observer
  useEffect(() => {
    if (!contentRef.current || !viewportRef.current) return;
    
    const resizeObserver = new ResizeObserver(() => {
      positionLastItemAtBottom();
    });
    
    resizeObserver.observe(contentRef.current);
    resizeObserver.observe(viewportRef.current);
    
    return () => resizeObserver.disconnect();
  }, []);

  // Save scroll position on scroll
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    
    const handleScroll = () => {
      // Save current scroll position
      scrollPositions.set(location.pathname, viewport.scrollTop);
    };
    
    viewport.addEventListener('scroll', handleScroll, { passive: true });
    return () => viewport.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  return (
    <ScrollArea 
      ref={scrollAreaRef} 
      className="flex-1 overflow-hidden"
    >
      {children}
    </ScrollArea>
  );
};

export default ScrollManager;
