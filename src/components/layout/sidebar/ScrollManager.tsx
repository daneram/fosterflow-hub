
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
  
  // Save scroll position before navigation
  useEffect(() => {
    const currentPath = location.pathname;
    
    // Save current scroll position when unmounting or changing routes
    const saveScrollPosition = () => {
      if (viewportRef.current) {
        scrollPositions.set(currentPath, viewportRef.current.scrollTop);
      }
    };
    
    // Save position before unmounting
    return () => {
      saveScrollPosition();
    };
  }, [location.pathname]);
  
  // Restore scroll position after navigation
  useEffect(() => {
    // Only proceed if we have initialized and have a viewport reference
    if (!isInitialized || !viewportRef.current) return;
    
    const currentPath = location.pathname;
    const savedPosition = scrollPositions.get(currentPath);
    
    // If we have a saved position, restore it in the next animation frame
    // This ensures we wait for any DOM updates to complete
    if (savedPosition !== undefined) {
      requestAnimationFrame(() => {
        if (viewportRef.current) {
          viewportRef.current.scrollTop = savedPosition;
        }
      });
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
