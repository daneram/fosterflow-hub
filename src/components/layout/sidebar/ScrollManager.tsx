
import React, { useRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ScrollManagerProps {
  children: React.ReactNode;
  isOpen: boolean;
}

const ScrollManager: React.FC<ScrollManagerProps> = ({ children, isOpen }) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLElement | null>(null);
  const location = useLocation();
  
  // Find the viewport element and store a reference to it
  useEffect(() => {
    if (!scrollAreaRef.current) return;
    
    const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
    if (viewport instanceof HTMLElement) {
      viewportRef.current = viewport;
    }
  }, []);
  
  // Don't add any scroll restoration logic
  // We want the scroll position to remain exactly as the user left it
  // The NavItem and BotItem components will prevent navigation for active items

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
