
import React, { useRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ScrollManagerProps {
  children: React.ReactNode;
  isOpen: boolean;
}

const ScrollManager: React.FC<ScrollManagerProps> = ({ children, isOpen }) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef<number>(0);
  const viewportRef = useRef<HTMLElement | null>(null);
  const location = useLocation();
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Find the viewport element and store a reference to it
  useEffect(() => {
    if (!scrollAreaRef.current) return;
    
    const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
    if (viewport instanceof HTMLElement) {
      viewportRef.current = viewport;
      setIsInitialized(true);
    }
  }, []);
  
  // Save scroll position when scrolling
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    
    const handleScroll = () => {
      scrollPositionRef.current = viewport.scrollTop;
    };
    
    viewport.addEventListener('scroll', handleScroll);
    return () => {
      viewport.removeEventListener('scroll', handleScroll);
    };
  }, [viewportRef.current]);
  
  // When route changes, restore scroll position in the sidebar
  useEffect(() => {
    if (!isInitialized) return;
    
    // Use a more aggressive approach to ensure scroll position is maintained
    const restoreScrollPosition = () => {
      const viewport = viewportRef.current;
      if (!viewport) return;
      
      // Apply the stored scroll position multiple times to ensure it sticks
      const applyScroll = () => {
        if (viewport) {
          viewport.scrollTop = scrollPositionRef.current;
        }
      };
      
      // Apply immediately
      applyScroll();
      
      // And then in successive animation frames to handle any layout shifts
      requestAnimationFrame(() => {
        applyScroll();
        requestAnimationFrame(() => {
          applyScroll();
        });
      });
    };
    
    restoreScrollPosition();
  }, [location.pathname, isInitialized]);

  return (
    <ScrollArea 
      ref={scrollAreaRef} 
      className={isOpen ? "px-2 mt-4 flex-1 overflow-hidden" : "px-0 mt-4 flex-1 overflow-hidden"}
    >
      {children}
    </ScrollArea>
  );
};

export default ScrollManager;
