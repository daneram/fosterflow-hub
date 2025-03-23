
import React, { useRef, useEffect, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLocation } from 'react-router-dom';

interface ScrollManagerProps {
  children: React.ReactNode;
  isOpen: boolean;
}

// Create a persistent map to store scroll positions
// Using a module-level variable ensures it persists even if the component remounts
const scrollPositions = new Map<string, number>();

const ScrollManager: React.FC<ScrollManagerProps> = ({ children, isOpen }) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLElement | null>(null);
  const location = useLocation();
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Get the viewport element once the component mounts
  useEffect(() => {
    if (!scrollAreaRef.current) return;
    
    // Find the scroll viewport element
    const findViewport = () => {
      const viewport = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
      if (viewport instanceof HTMLElement) {
        viewportRef.current = viewport;
        setIsInitialized(true);
      } else {
        // If not found immediately, try again after a short delay
        setTimeout(findViewport, 50);
      }
    };

    findViewport();
  }, []);
  
  // Save scroll position when location changes or component unmounts
  useEffect(() => {
    const saveScrollPosition = () => {
      if (viewportRef.current) {
        const currentScroll = viewportRef.current.scrollTop;
        scrollPositions.set(location.pathname, currentScroll);
        console.log('Saved scroll position for', location.pathname, currentScroll);
      }
    };

    // Create an interval to continuously save the scroll position
    // This ensures we always have the latest position
    const intervalId = setInterval(saveScrollPosition, 500);
    
    // Also save when unmounting or before navigation
    return () => {
      clearInterval(intervalId);
      saveScrollPosition();
    };
  }, [location.pathname]);
  
  // Restore scroll position after navigation
  useEffect(() => {
    if (!isInitialized || !viewportRef.current) return;
    
    const restorePosition = () => {
      const savedPosition = scrollPositions.get(location.pathname);
      console.log('Attempting to restore position for', location.pathname, savedPosition);
      
      if (savedPosition !== undefined && viewportRef.current) {
        // Use multiple attempts with increasing timeouts to ensure restoration works
        [0, 10, 50, 100, 250, 500].forEach(delay => {
          setTimeout(() => {
            if (viewportRef.current) {
              viewportRef.current.scrollTop = savedPosition;
              console.log('Restored scroll to', savedPosition, 'after', delay, 'ms');
            }
          }, delay);
        });
      }
    };

    // Restore position with multiple attempts
    restorePosition();
  }, [location.pathname, isInitialized]);

  return (
    <ScrollArea 
      ref={scrollAreaRef} 
      className="flex-1 overflow-hidden"
    >
      {children}
    </ScrollArea>
  );
};

export default React.memo(ScrollManager);
