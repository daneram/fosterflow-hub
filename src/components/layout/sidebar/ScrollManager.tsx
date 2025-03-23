import React, { useRef, useEffect, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLocation } from 'react-router-dom';

interface ScrollManagerProps {
  children: React.ReactNode;
  isOpen: boolean;
  sidebarId?: string;
}

const ScrollManager: React.FC<ScrollManagerProps> = ({ children, isOpen, sidebarId }) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const [viewportReady, setViewportReady] = useState(false);
  const locationPathRef = useRef(location.pathname);
  const restoreAttempts = useRef(0);
  const frameRef = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Find viewport element and set it as ready when found
  useEffect(() => {
    if (!scrollAreaRef.current) return;
    
    const findViewport = () => {
      if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
        
        if (viewport instanceof HTMLElement) {
          console.log(`Viewport found for ${location.pathname}`);
          setViewportReady(true);
        } else if (restoreAttempts.current < 20) {
          // Retry more aggressively
          restoreAttempts.current++;
          setTimeout(findViewport, 50);
        }
      }
    };
    
    findViewport();
    
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  
  // When the location changes, save the scroll position for the previous path 
  // and attempt to restore the scroll position for the new path
  useEffect(() => {
    if (!viewportReady || !scrollAreaRef.current) return;
    
    const saveScrollPosition = () => {
      const viewport = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
      if (viewport instanceof HTMLElement) {
        const scrollPos = viewport.scrollTop;
        const key = `sidebar-scroll-${locationPathRef.current}`;
        
        console.log(`Saving scroll position for ${locationPathRef.current}: ${scrollPos}`);
        sessionStorage.setItem(key, scrollPos.toString());
      }
    };
    
    // Save the scroll position of the previous path
    saveScrollPosition();
    
    // Update the ref to the new location path
    locationPathRef.current = location.pathname;
    
    // Reset attempts counter
    restoreAttempts.current = 0;
    
    // Set up persistent restoration attempts
    const attemptToRestoreScroll = () => {
      const viewport = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
      
      if (viewport instanceof HTMLElement) {
        // Get the saved scroll position for this route
        const key = `sidebar-scroll-${location.pathname}`;
        const savedScrollPosition = sessionStorage.getItem(key);
        
        if (savedScrollPosition) {
          const scrollPos = parseInt(savedScrollPosition, 10);
          
          console.log(`Attempting to restore scroll for ${location.pathname} to ${scrollPos}`);
          
          // Use requestAnimationFrame for smoother restoration
          const applyScroll = () => {
            if (viewport.scrollTop !== scrollPos) {
              viewport.scrollTop = scrollPos;
              
              // If we haven't reached the target position, try again
              if (Math.abs(viewport.scrollTop - scrollPos) > 1 && restoreAttempts.current < 15) {
                restoreAttempts.current++;
                frameRef.current = requestAnimationFrame(applyScroll);
              } else {
                console.log(`Scroll position ${viewport.scrollTop === scrollPos ? 'successfully' : 'not'} restored to ${viewport.scrollTop}`);
              }
            }
          };
          
          frameRef.current = requestAnimationFrame(applyScroll);
        }
      }
    };
    
    // Immediately try to restore
    setTimeout(attemptToRestoreScroll, 50);
    
    // And also set up an interval to keep trying for a short time
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = setInterval(() => {
      if (restoreAttempts.current < 10) {
        attemptToRestoreScroll();
      } else {
        // Clear the interval after a number of attempts
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }
    }, 100);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [location.pathname, viewportReady]);
  
  // Additionally restore scroll when isOpen changes
  useEffect(() => {
    if (!viewportReady || !scrollAreaRef.current) return;
    
    const restoreScrollPosition = () => {
      const viewport = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
      
      if (viewport instanceof HTMLElement) {
        // Get the saved scroll position for this route
        const key = `sidebar-scroll-${location.pathname}`;
        const savedScrollPosition = sessionStorage.getItem(key);
        
        if (savedScrollPosition) {
          const scrollPos = parseInt(savedScrollPosition, 10);
          console.log(`Attempting to restore scroll after sidebar toggle: ${scrollPos}`);
          viewport.scrollTop = scrollPos;
        }
      }
    };
    
    // Wait a bit for the UI to settle after opening/closing
    const timer = setTimeout(restoreScrollPosition, 150);
    
    return () => {
      clearTimeout(timer);
    };
  }, [isOpen, viewportReady, location.pathname]);
  
  return (
    <ScrollArea 
      ref={scrollAreaRef} 
      className="flex-1 overflow-hidden"
      data-sidebar-scroll-area={sidebarId || 'main'}
      data-current-path={location.pathname}
    >
      {children}
    </ScrollArea>
  );
};

export default React.memo(ScrollManager);
