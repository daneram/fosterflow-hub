
import React, { useRef, useEffect, useState } from 'react';
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
  const isMobile = useIsMobile();
  const location = useLocation();
  const [isScrolling, setIsScrolling] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  
  // Initialize viewport ref and restore scroll position from localStorage
  useEffect(() => {
    if (!scrollAreaRef.current) return;
    
    const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
    if (viewport instanceof HTMLElement) {
      viewportRef.current = viewport;
      
      // Only restore scroll position on desktop
      if (!isMobile) {
        const savedPosition = localStorage.getItem(SCROLL_POSITION_KEY);
        if (savedPosition) {
          viewport.scrollTop = parseInt(savedPosition, 10);
        }
      }
      
      // Store viewport height for calculations
      setViewportHeight(viewport.clientHeight);
    }
  }, [isMobile]);
  
  // Calculate content height to determine if we need to add padding
  useEffect(() => {
    if (viewportRef.current && viewportRef.current.firstElementChild) {
      const contentEl = viewportRef.current.firstElementChild as HTMLElement;
      setContentHeight(contentEl.scrollHeight);
    }
  }, [children, isOpen]);
  
  // Reset scroll to top on navigation changes for mobile 
  // but make sure we don't reset during scrolling
  useEffect(() => {
    if (isMobile && viewportRef.current && !isScrolling) {
      // Clear any pending timeouts to prevent race conditions
      const timeoutId = setTimeout(() => {
        if (viewportRef.current) {
          viewportRef.current.scrollTop = 0;
        }
      }, 100);
      
      return () => clearTimeout(timeoutId);
    }
  }, [location.pathname, isMobile, isScrolling]);
  
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
        }, 200); // Increased debounce time
      }
    };
    
    viewport.addEventListener('scroll', handleScroll);
    return () => viewport.removeEventListener('scroll', handleScroll);
  }, [isMobile, isScrolling]);

  // Calculate how much padding we need to add at the bottom
  // This ensures the last item is fully visible and not cut off
  const getBottomPadding = () => {
    if (!isMobile) return 0;
    
    // Add extra padding to ensure the last item is fully visible 
    // and doesn't cause scroll jumping behavior
    return Math.max(32, viewportHeight * 0.2); // At least 32px or 20% of viewport height
  };

  return (
    <ScrollArea 
      ref={scrollAreaRef} 
      className="flex-1 overflow-hidden"
    >
      {children}
      {/* Add dynamic padding to ensure last items are fully visible */}
      {isMobile && <div style={{ height: `${getBottomPadding()}px` }} />}
    </ScrollArea>
  );
};

export default ScrollManager;
