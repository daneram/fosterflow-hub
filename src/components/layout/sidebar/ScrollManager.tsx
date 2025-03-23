
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLocation } from 'react-router-dom';

interface ScrollManagerProps {
  children: React.ReactNode;
  isOpen: boolean;
}

// A unique key for storing scroll position in localStorage
const SCROLL_POSITION_KEY = 'sidebar-scroll-position';

const ScrollManager: React.FC<ScrollManagerProps> = ({ children, isOpen }) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLElement | null>(null);
  const isMobile = useIsMobile();
  const location = useLocation();
  const [isScrolling, setIsScrolling] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(0);
  
  // Position the last menu item at the bottom of the screen on mobile
  const positionLastItemAtBottom = useCallback(() => {
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
    const contentScrollHeight = content.scrollHeight;
    const currentPadding = parseInt(content.style.paddingBottom || '0', 10);
    
    // Calculate how much padding we need to add to push the last item to the bottom
    // This is: viewport height - (last item's position from top + its height)
    const desiredPadding = Math.max(0, viewportHeight - (lastItemTop + lastItemHeight));
    
    // Apply the padding if it's different from current padding
    if (desiredPadding !== currentPadding) {
      content.style.paddingBottom = `${desiredPadding}px`;
    }
  }, [isMobile]);
  
  // Initialize viewport ref, content ref and restore scroll position
  useEffect(() => {
    if (!scrollAreaRef.current) return;
    
    const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
    if (viewport instanceof HTMLElement) {
      viewportRef.current = viewport;
      
      // Store content element reference
      if (viewport.firstElementChild instanceof HTMLElement) {
        contentRef.current = viewport.firstElementChild;
      }
      
      // Only restore scroll position on desktop
      if (!isMobile) {
        const savedPosition = localStorage.getItem(SCROLL_POSITION_KEY);
        if (savedPosition) {
          viewport.scrollTop = parseInt(savedPosition, 10);
        }
      }
      
      // Position the last item on mobile
      positionLastItemAtBottom();
    }
  }, [isMobile, positionLastItemAtBottom]);
  
  // Recalculate when children or sidebar open state changes
  useEffect(() => {
    // Use a short delay to ensure DOM is fully rendered
    const timeoutId = setTimeout(() => {
      positionLastItemAtBottom();
    }, 200);
    
    return () => clearTimeout(timeoutId);
  }, [children, isOpen, positionLastItemAtBottom]);
  
  // Set up resize observer
  useEffect(() => {
    if (!contentRef.current || !viewportRef.current) return;
    
    const resizeObserver = new ResizeObserver(() => {
      positionLastItemAtBottom();
    });
    
    resizeObserver.observe(contentRef.current);
    resizeObserver.observe(viewportRef.current);
    
    return () => resizeObserver.disconnect();
  }, [positionLastItemAtBottom]);
  
  // Only reset scroll to top on navigation changes for mobile if not preserving scroll
  useEffect(() => {
    if (isMobile && viewportRef.current && !isScrolling) {
      // Check if we should preserve scroll position
      const shouldPreserveScroll = location.state && (location.state as any).preserveScroll;
      
      if (!shouldPreserveScroll) {
        viewportRef.current.scrollTop = 0;
        
        // Reposition after scrolling to top
        const timeoutId = setTimeout(() => {
          positionLastItemAtBottom();
        }, 100);
        
        return () => clearTimeout(timeoutId);
      }
    }
  }, [location.pathname, isMobile, isScrolling, positionLastItemAtBottom, location.state]);
  
  // Save scroll position to localStorage with debounce
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || isMobile) return;
    
    const handleScroll = () => {
      if (!isScrolling) {
        setIsScrolling(true);
        setTimeout(() => {
          if (viewport && !isMobile) {
            localStorage.setItem(SCROLL_POSITION_KEY, viewport.scrollTop.toString());
          }
          setIsScrolling(false);
        }, 200);
      }
    };
    
    viewport.addEventListener('scroll', handleScroll);
    return () => viewport.removeEventListener('scroll', handleScroll);
  }, [isMobile, isScrolling]);

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
