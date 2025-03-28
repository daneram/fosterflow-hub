/**
 * Set up scroll event handlers for the sidebar viewport
 */
export const setupScrollHandlers = (
  viewport: HTMLElement,
  isScrolling: boolean,
  setIsScrolling: (value: boolean) => void,
  saveScrollPosition: (element: HTMLElement) => void,
  scrollTimeoutRef: React.MutableRefObject<number | null>
) => {
  // Function to handle scroll events
  const handleScroll = () => {
    if (!isScrolling) {
      // Add the active class when scrolling starts
      viewport.classList.add('scrolling-active');
      setIsScrolling(true);
    }
    
    // Save position
    saveScrollPosition(viewport);
    
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
  
  // Function to handle mouse enter - ensure scrollbar is hidden
  const mouseEnterHandler = () => {
    // Always force hide scrollbar on mouse enter
    if (!isScrolling) {
      viewport.classList.remove('scrolling-active');
    }
  };
  
  // Function to handle mouse leave - always hide scrollbar
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
  
  // Add touch start handler to immediately activate scrolling mode on mobile
  const touchStartHandler = () => {
    // This ensures scroll is activated immediately on first touch
    viewport.classList.add('scrolling-active');
    setIsScrolling(true);
  };
  
  // Force hide scrollbar initially
  const forceInitialHide = () => {
    viewport.classList.remove('scrolling-active');
    setIsScrolling(false);
  };
  
  // Run force hide once
  forceInitialHide();
  
  // Add all event listeners
  viewport.addEventListener('scroll', handleScroll, { passive: true });
  viewport.addEventListener('mouseenter', mouseEnterHandler);
  viewport.addEventListener('mouseleave', mouseLeaveHandler);
  viewport.addEventListener('touchstart', touchStartHandler, { passive: true });
  
  // Return cleanup function
  return () => {
    viewport.removeEventListener('scroll', handleScroll);
    viewport.removeEventListener('mouseenter', mouseEnterHandler);
    viewport.removeEventListener('mouseleave', mouseLeaveHandler);
    viewport.removeEventListener('touchstart', touchStartHandler);
    
    // Ensure class is removed on cleanup
    viewport.classList.remove('scrolling-active');
  };
};
