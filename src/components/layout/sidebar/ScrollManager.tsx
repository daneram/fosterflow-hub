
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
  
  // Calculate the size of scrollable content and available space
  const calculateScrollMetrics = useCallback(() => {
    if (!viewportRef.current || !contentRef.current) return;
    
    const viewport = viewportRef.current;
    const content = contentRef.current;
    setViewportHeight(viewport.clientHeight);
    
    if (isMobile) {
      const lastNavSection = content.querySelector('nav:last-child');
      const lastItem = lastNavSection?.querySelector('a:last-child');
      
      if (lastItem) {
        // Get the height of the last item
        const lastItemHeight = (lastItem as HTMLElement).offsetHeight;
        
        // Calculate the space needed to push the last item to the bottom of the viewport
        const contentHeight = content.scrollHeight - parseInt(content.style.paddingBottom || '0', 10);
        const lastItemPosition = (lastItem as HTMLElement).offsetTop;
        
        // Calculate needed padding: viewport height - (lastItemPosition + lastItemHeight)
        // This will position the last item at the bottom of the viewport
        const neededPadding = Math.max(
          0,
          viewport.clientHeight - ((lastItemPosition - content.offsetTop) + lastItemHeight)
        );
        
        // Apply padding to position the last item at the bottom
        if (neededPadding > 0) {
          content.style.paddingBottom = `${neededPadding}px`;
        } else {
          // If content is taller than viewport, use a default padding
          content.style.paddingBottom = '16px';
        }
      }
    } else {
      // Reset padding on desktop
      if (content.style.paddingBottom) {
        content.style.paddingBottom = '0px';
      }
    }
  }, [isMobile]);
  
  // Initialize viewport ref, content ref and restore scroll position
  useEffect(() => {
    if (!scrollAreaRef.current) return;
    
    const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
    if (viewport instanceof HTMLElement) {
      viewportRef.current = viewport;
      
      // Store content element reference to apply padding
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
      
      // Calculate initial metrics
      calculateScrollMetrics();
    }
  }, [isMobile, calculateScrollMetrics]);
  
  // Recalculate when children or sidebar open state changes
  useEffect(() => {
    calculateScrollMetrics();
    
    // Add resize observer to handle dynamic content changes
    const resizeObserver = new ResizeObserver(() => {
      calculateScrollMetrics();
    });
    
    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }
    
    if (viewportRef.current) {
      resizeObserver.observe(viewportRef.current);
    }
    
    // Force recalculation after a small delay to ensure all elements are rendered
    const timeoutId = setTimeout(() => {
      calculateScrollMetrics();
    }, 300);
    
    return () => {
      resizeObserver.disconnect();
      clearTimeout(timeoutId);
    };
  }, [children, isOpen, calculateScrollMetrics]);
  
  // Reset scroll to top on navigation changes for mobile 
  useEffect(() => {
    if (isMobile && viewportRef.current && !isScrolling) {
      const timeoutId = setTimeout(() => {
        if (viewportRef.current) {
          viewportRef.current.scrollTop = 0;
          calculateScrollMetrics();
        }
      }, 100);
      
      return () => clearTimeout(timeoutId);
    }
  }, [location.pathname, isMobile, isScrolling, calculateScrollMetrics]);
  
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
