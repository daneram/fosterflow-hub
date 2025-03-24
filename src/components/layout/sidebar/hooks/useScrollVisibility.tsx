
import { useState, useRef, useCallback } from 'react';

/**
 * Hook to manage scroll visibility states and timeouts
 */
export const useScrollVisibility = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<number | null>(null);
  
  // Hide scrollbar forcefully
  const forceHideScrollbar = useCallback((viewportElement: HTMLElement | null) => {
    if (viewportElement) {
      viewportElement.classList.remove('scrolling-active');
      setIsScrolling(false);
    }
  }, []);
  
  // Handle cleanup of timeout
  const cleanupScrollTimeout = useCallback(() => {
    if (scrollTimeoutRef.current) {
      window.clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = null;
    }
  }, []);

  return {
    isScrolling,
    setIsScrolling,
    scrollTimeoutRef,
    forceHideScrollbar,
    cleanupScrollTimeout
  };
};
