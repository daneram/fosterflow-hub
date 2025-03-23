
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
    
    // Adjust bottom padding to ensure the last item is visible but not beyond viewport
    if (isMobile) {
      // If content is shorter than viewport, don't add any padding
      if (content.scrollHeight <= viewport.clientHeight) {
        content.style.paddingBottom = '0px';
      } else {
        // Calculate appropriate padding to make the last item sit at the bottom
        // This ensures the scrollbar stops exactly at the right position
        const lastItem = content.querySelector('nav:last-child a:last-child');
        if (lastItem) {
          const lastItemHeight = (lastItem as HTMLElement).offsetHeight;
          content.style.paddingBottom = `${Math.max(lastItemHeight, 48)}px`;
        } else {
          content.style.paddingBottom = '48px';
        }
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
    
    return () => resizeObserver.disconnect();
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
