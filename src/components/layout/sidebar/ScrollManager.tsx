
import React, { useRef, useEffect } from 'react';
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
  
  // Find the viewport element and store a reference to it
  useEffect(() => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (viewport instanceof HTMLElement) {
        viewportRef.current = viewport;
      }
    }
  }, [scrollAreaRef.current]);
  
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
  // This is key to maintaining the scroll position
  useEffect(() => {
    const viewport = viewportRef.current;
    if (viewport && scrollPositionRef.current > 0) {
      // Use RAF to ensure we restore after the browser's layout calculations
      requestAnimationFrame(() => {
        viewport.scrollTop = scrollPositionRef.current;
      });
    }
  }, [location.pathname]);

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
