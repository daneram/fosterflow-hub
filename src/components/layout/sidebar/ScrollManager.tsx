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
const MOBILE_SCROLL_POSITION_KEY = 'sidebar-mobile-scroll-position';

const ScrollManager: React.FC<ScrollManagerProps> = ({ children, isOpen }) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLElement | null>(null);
  const isMobile = useIsMobile();
  const [isScrolling, setIsScrolling] = useState(false);
  
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
    
    // Calculate how much padding we need to add to push the last item to the bottom
    // This is: viewport height - (last item's position from top + its height)
    const desiredPadding = Math.max(0, viewportHeight - (lastItemTop + lastItemHeight));
    
    // Apply the padding if it's different from current padding
    if (desiredPadding !== parseInt(content.style.paddingBottom || '0', 10)) {
      content.style.paddingBottom = `${desiredPadding}px`;
    }
  }, [isMobile]);
  
  // Save scroll position based on device type
  const saveScrollPosition = useCallback(() => {
    if (!viewportRef.current) return;
    
    const scrollPosition = viewportRef.current.scrollTop;
    const storageKey = isMobile ? MOBILE_SCROLL_POSITION_KEY : SCROLL_POSITION_KEY;
    
    localStorage.setItem(storageKey, scrollPosition.toString());
  }, [isMobile]);
  
  // Restore scroll position based on device type
  const restoreScrollPosition = useCallback(() => {
    if (!viewportRef.current) return;
    
    const storageKey = isMobile ? MOBILE_SCROLL_POSITION_KEY : SCROLL_POSITION_KEY;
    const savedPosition = localStorage.getItem(storageKey);
    
    if (savedPosition) {
      viewportRef.current.scrollTop = parseInt(savedPosition, 10);
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
      
      // Restore scroll position after component mounts
      restoreScrollPosition();
      
      // Position the last item on mobile
      if (isMobile) {
        positionLastItemAtBottom();
      }
    }
  }, [isMobile, positionLastItemAtBottom, restoreScrollPosition]);
  
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
  
  // Save scroll position to localStorage with debounce
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    
    const handleScroll = () => {
      if (!isScrolling) {
        setIsScrolling(true);
        setTimeout(() => {
          saveScrollPosition();
          setIsScrolling(false);
        }, 200);
      }
    };
    
    viewport.addEventListener('scroll', handleScroll);
    return () => viewport.removeEventListener('scroll', handleScroll);
  }, [isScrolling, saveScrollPosition]);

  return (
    <ScrollArea 
      ref={scrollAreaRef} 
      className="flex-1 overflow-auto" 
    >
      {children}
    </ScrollArea>
  );
};

export default ScrollManager;
