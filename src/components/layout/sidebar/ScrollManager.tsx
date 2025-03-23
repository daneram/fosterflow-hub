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
  const pathRef = useRef(location.pathname);
  
  // Initialize viewport ref and store content element reference
  useEffect(() => {
    if (!scrollAreaRef.current) return;
    
    const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
    if (viewport instanceof HTMLElement) {
      viewportRef.current = viewport;
      setIsInitialized(true);
    }
  }, []);
  
  // Save scroll position when route changes
  useEffect(() => {
    return () => {
      if (viewportRef.current) {
        // Save scroll position when unmounting
        scrollPositions.set(location.pathname, viewportRef.current.scrollTop);
      }
    };
  }, [location.pathname]);
  
  // Restore scroll position when returning to a route
  useEffect(() => {
    if (!isInitialized || !viewportRef.current) return;
    
    const savedPosition = scrollPositions.get(location.pathname);
    if (savedPosition !== undefined) {
      // Use setTimeout to ensure the DOM has updated before setting scroll position
      setTimeout(() => {
        if (viewportRef.current) {
          viewportRef.current.scrollTop = savedPosition;
        }
      }, 0);
    }
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

export default ScrollManager;
