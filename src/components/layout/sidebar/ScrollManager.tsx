
import React, { useRef, useEffect, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLocation } from 'react-router-dom';

interface ScrollManagerProps {
  children: React.ReactNode;
  isOpen: boolean;
}

// Store scroll positions for each route
const scrollPositions = new Map<string, number>();

const ScrollManager: React.FC<ScrollManagerProps> = ({ children, isOpen }) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLElement | null>(null);
  const isMobile = useIsMobile();
  const location = useLocation();
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Get the viewport element once the component mounts
  useEffect(() => {
    if (!scrollAreaRef.current) return;
    
    const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
    if (viewport instanceof HTMLElement) {
      viewportRef.current = viewport;
      setIsInitialized(true);
    }
  }, []);
  
  // Save scroll position when location changes or component unmounts
  useEffect(() => {
    const saveScrollPosition = () => {
      if (viewportRef.current) {
        scrollPositions.set(location.pathname, viewportRef.current.scrollTop);
        console.log('Saved scroll position for', location.pathname, viewportRef.current.scrollTop);
      }
    };

    // Save current position immediately
    saveScrollPosition();
    
    // And also save when unmounting or before navigation
    return saveScrollPosition;
  }, [location.pathname]);
  
  // Restore scroll position after navigation
  useEffect(() => {
    if (!isInitialized || !viewportRef.current) return;
    
    const restorePosition = () => {
      const savedPosition = scrollPositions.get(location.pathname);
      console.log('Attempting to restore position for', location.pathname, savedPosition);
      
      if (savedPosition !== undefined && viewportRef.current) {
        // Use multiple attempts with increasing timeouts to ensure restoration works
        const attempts = [0, 10, 50, 100];
        
        attempts.forEach(delay => {
          setTimeout(() => {
            if (viewportRef.current) {
              viewportRef.current.scrollTop = savedPosition;
              console.log('Restored scroll to', savedPosition, 'after', delay, 'ms');
            }
          }, delay);
        });
      }
    };

    // Restore position with a slight delay to ensure DOM is ready
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
