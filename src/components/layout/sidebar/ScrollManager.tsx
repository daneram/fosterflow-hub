
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
  const scrollTimeoutRef = useRef<number | null>(null);
  
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
  
  // Ensure scrollbar is always hidden unless actively scrolling
  const forceHideScrollbar = useCallback(() => {
    if (viewportRef.current) {
      viewportRef.current.classList.remove('scrolling-active');
      setIsScrolling(false);
    }
  }, []);
  
  // Initialize viewport ref, content ref and restore scroll position
  useEffect(() => {
    if (!scrollAreaRef.current) return;
    
    // Always force hide scrollbar initially
    const initialForceHideTimer = setTimeout(() => {
      forceHideScrollbar();
    }, 50);
    
    // Find the viewport element using the data-attribute we added
    const viewport = scrollAreaRef.current.querySelector('[data-scrollarea-viewport]');
    if (viewport instanceof HTMLElement) {
      viewportRef.current = viewport;
      
      // Store content element reference
      if (viewport.firstElementChild instanceof HTMLElement) {
        contentRef.current = viewport.firstElementChild;
      }
      
      // Make sure we remove any active scrolling class initially
      viewport.classList.remove('scrolling-active');
      
      // Restore scroll position after component mounts
      restoreScrollPosition();
      
      // Position the last item on mobile
      if (isMobile) {
        positionLastItemAtBottom();
      }
    }
    
    // Cleanup function to ensure we remove the class when unmounting
    return () => {
      clearTimeout(initialForceHideTimer);
      forceHideScrollbar();
    };
  }, [isMobile, positionLastItemAtBottom, restoreScrollPosition, forceHideScrollbar]);
  
  // Recalculate when children or sidebar open state changes
  useEffect(() => {
    // Use a short delay to ensure DOM is fully rendered
    const timeoutId = setTimeout(() => {
      positionLastItemAtBottom();
      forceHideScrollbar();
    }, 200);
    
    return () => clearTimeout(timeoutId);
  }, [children, isOpen, positionLastItemAtBottom, forceHideScrollbar]);
  
  // Set up resize observer
  useEffect(() => {
    if (!contentRef.current || !viewportRef.current) return;
    
    const resizeObserver = new ResizeObserver(() => {
      positionLastItemAtBottom();
      // Also ensure scrollbar is hidden after resize
      forceHideScrollbar();
    });
    
    resizeObserver.observe(contentRef.current);
    resizeObserver.observe(viewportRef.current);
    
    return () => resizeObserver.disconnect();
  }, [positionLastItemAtBottom, forceHideScrollbar]);
  
  // Handle scroll events - completely rewritten for reliability
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    
    // Clear any existing scroll listeners to prevent duplicates
    const handleScroll = () => {
      if (!isScrolling) {
        // Add the active class when scrolling starts
        viewport.classList.add('scrolling-active');
        setIsScrolling(true);
      }
      
      // Save position
      saveScrollPosition();
      
      // Clear any existing timeout
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
      
      // Set a timeout to remove the active class after scrolling stops
      scrollTimeoutRef.current = window.setTimeout(() => {
        viewport.classList.remove('scrolling-active');
        setIsScrolling(false);
        scrollTimeoutRef.current = null;
      }, 800); // Longer timeout for better user experience
    };
    
    // These handlers are critical - they ensure the scrollbar never shows on hover
    const mouseEnterHandler = () => {
      // Always force hide scrollbar on mouse enter
      if (!isScrolling) {
        viewport.classList.remove('scrolling-active');
      }
    };
    
    // Force remove active class when mouse leaves
    const mouseLeaveHandler = () => {
      // Always hide scrollbar on mouse leave
      viewport.classList.remove('scrolling-active');
      setIsScrolling(false);
      
      // Clear timeout to prevent it from showing again
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = null;
      }
    };
    
    // Force hide if mouse is not over element
    const forceInitialHide = () => {
      viewport.classList.remove('scrolling-active');
      setIsScrolling(false);
    };
    
    // Ensure it's hidden initially
    forceInitialHide();
    
    // Add all event listeners
    viewport.addEventListener('scroll', handleScroll, { passive: true });
    viewport.addEventListener('mouseenter', mouseEnterHandler);
    viewport.addEventListener('mouseleave', mouseLeaveHandler);
    
    return () => {
      viewport.removeEventListener('scroll', handleScroll);
      viewport.removeEventListener('mouseenter', mouseEnterHandler);
      viewport.removeEventListener('mouseleave', mouseLeaveHandler);
      
      // Clean up timeout on unmount
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
      
      // Ensure class is removed on cleanup
      viewport.classList.remove('scrolling-active');
    };
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
