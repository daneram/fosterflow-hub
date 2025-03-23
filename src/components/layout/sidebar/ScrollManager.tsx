
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
  
  // Get viewport element from the scroll area
  useEffect(() => {
    if (!scrollAreaRef.current) return;
    
    const findViewport = () => {
      if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
        
        if (viewport instanceof HTMLElement) {
          console.log('Viewport found and ready');
          setViewportReady(true);
        } else {
          // Retry a few times if viewport is not found immediately
          if (restoreAttempts.current < 10) {
            restoreAttempts.current++;
            setTimeout(findViewport, 50);
          }
        }
      }
    };
    
    findViewport();
    
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);
  
  // Save scroll position when navigating away from the current page
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
    
    // Save the old position before updating the ref
    saveScrollPosition();
    
    // Update the ref to the new location
    locationPathRef.current = location.pathname;
    
    // Reset attempts counter for the new page
    restoreAttempts.current = 0;
  }, [location.pathname, viewportReady]);
  
  // Restore scroll position when component mounts or when isOpen changes
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
          
          console.log(`Attempting to restore scroll for ${location.pathname} to ${scrollPos}`);
          
          // Use requestAnimationFrame for smoother restoration
          const applyScroll = () => {
            if (viewport.scrollTop !== scrollPos) {
              viewport.scrollTop = scrollPos;
              
              // If we haven't reached the target position, try again
              if (Math.abs(viewport.scrollTop - scrollPos) > 1 && restoreAttempts.current < 10) {
                restoreAttempts.current++;
                frameRef.current = requestAnimationFrame(applyScroll);
              } else {
                console.log(`Scroll position restored to ${viewport.scrollTop}`);
              }
            }
          };
          
          // Start the restoration process
          frameRef.current = requestAnimationFrame(applyScroll);
        }
      }
    };
    
    // Give time for the DOM to be ready before restoring
    const timer = setTimeout(restoreScrollPosition, 100);
    
    return () => {
      clearTimeout(timer);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [location.pathname, isOpen, viewportReady]);
  
  return (
    <ScrollArea 
      ref={scrollAreaRef} 
      className="flex-1 overflow-hidden"
      data-sidebar-scroll-area={sidebarId || 'main'}
    >
      {children}
    </ScrollArea>
  );
};

export default React.memo(ScrollManager);
