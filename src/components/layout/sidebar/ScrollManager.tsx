
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
  const [scrollAreaViewport, setScrollAreaViewport] = useState<HTMLElement | null>(null);
  const location = useLocation();
  
  useEffect(() => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (viewport instanceof HTMLElement) {
        setScrollAreaViewport(viewport);
      }
    }
  }, [scrollAreaRef.current]);
  
  useEffect(() => {
    if (!scrollAreaViewport) return;
    
    const handleScroll = () => {
      scrollPositionRef.current = scrollAreaViewport.scrollTop;
    };
    
    scrollAreaViewport.addEventListener('scroll', handleScroll);
    return () => {
      scrollAreaViewport.removeEventListener('scroll', handleScroll);
    };
  }, [scrollAreaViewport]);
  
  useEffect(() => {
    if (scrollAreaViewport && scrollPositionRef.current > 0) {
      const restoreScroll = () => {
        scrollAreaViewport.scrollTop = scrollPositionRef.current;
      };
      
      requestAnimationFrame(restoreScroll);
    }
  }, [location.pathname, scrollAreaViewport]);

  return (
    <ScrollArea 
      ref={scrollAreaRef} 
      className={isOpen ? "px-2 mt-4 flex-1" : "px-0 mt-4 flex-1"}
    >
      {children}
    </ScrollArea>
  );
};

export default ScrollManager;
