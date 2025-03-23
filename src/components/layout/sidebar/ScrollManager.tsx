
import React, { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ScrollManagerProps {
  children: React.ReactNode;
  isOpen: boolean;
}

const ScrollManager: React.FC<ScrollManagerProps> = ({ children, isOpen }) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLElement | null>(null);
  const scrollPositionRef = useRef<number>(0);
  const location = useLocation();
  
  // Find the viewport element and store a reference to it
  useEffect(() => {
    if (!scrollAreaRef.current) return;
    
    const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
    if (viewport instanceof HTMLElement) {
      viewportRef.current = viewport;
      
      // Restore the previous scroll position if we have one
      if (scrollPositionRef.current > 0) {
        viewport.scrollTop = scrollPositionRef.current;
      }
    }
  }, [location.pathname]); // Re-run when pathname changes
  
  // Store scroll position whenever it changes
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    
    const handleScroll = () => {
      scrollPositionRef.current = viewport.scrollTop;
    };
    
    viewport.addEventListener('scroll', handleScroll);
    return () => viewport.removeEventListener('scroll', handleScroll);
  }, [viewportRef.current]);

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
