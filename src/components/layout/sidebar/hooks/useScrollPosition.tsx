
import { useCallback } from 'react';

// Constants for localStorage keys
export const SCROLL_POSITION_KEY = 'sidebar-scroll-position';
export const MOBILE_SCROLL_POSITION_KEY = 'sidebar-mobile-scroll-position';

/**
 * Hook to handle saving and restoring scroll position
 */
export const useScrollPosition = (isMobile: boolean) => {
  // Save scroll position based on device type
  const saveScrollPosition = useCallback((viewportElement: HTMLElement | null) => {
    if (!viewportElement) return;
    
    const scrollPosition = viewportElement.scrollTop;
    const storageKey = isMobile ? MOBILE_SCROLL_POSITION_KEY : SCROLL_POSITION_KEY;
    
    localStorage.setItem(storageKey, scrollPosition.toString());
  }, [isMobile]);
  
  // Restore scroll position based on device type
  const restoreScrollPosition = useCallback((viewportElement: HTMLElement | null) => {
    if (!viewportElement) return;
    
    const storageKey = isMobile ? MOBILE_SCROLL_POSITION_KEY : SCROLL_POSITION_KEY;
    const savedPosition = localStorage.getItem(storageKey);
    
    if (savedPosition) {
      viewportElement.scrollTop = parseInt(savedPosition, 10);
    }
  }, [isMobile]);

  return {
    saveScrollPosition,
    restoreScrollPosition
  };
};
