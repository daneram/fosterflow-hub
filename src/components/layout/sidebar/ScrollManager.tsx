
import React, { useRef, useEffect, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLocation } from 'react-router-dom';

interface ScrollManagerProps {
  children: React.ReactNode;
  isOpen: boolean;
}

// A unique key for storing scroll position in localStorage
const SCROLL_POSITION_KEY = 'sidebar-scroll-position';

const ScrollManager: React.FC<ScrollManagerProps> = ({ children, isOpen }) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLElement | null>(null);
  const isMobile = useIsMobile();
  const location = useLocation();
  const [isScrolling, setIsScrolling] = useState(false);
  
  // Initialize viewport ref and restore scroll position from localStorage
  useEffect(() => {
    if (!scrollAreaRef.current) return;
    
    const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
    if (viewport instanceof HTMLElement) {
      viewportRef.current = viewport;
      
      // Only restore scroll position on desktop
      if (!isMobile) {
        const savedPosition = localStorage.getItem(SCROLL_POSITION_KEY);
        if (savedPosition) {
          viewport.scrollTop = parseInt(savedPosition, 10);
        }
      }
    }
  }, [isMobile]);
  
  // Reset scroll to top on navigation changes for mobile
  useEffect(() => {
    if (isMobile && viewportRef.current) {
      // Small delay to ensure DOM updates have completed
      setTimeout(() => {
        if (viewportRef.current) {
          viewportRef.current.scrollTop = 0;
        }
      }, 50);
    }
  }, [location.pathname, isMobile]);
  
  // Save scroll position to localStorage with debounce
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || isMobile) return;
    
    const handleScroll = () => {
      if (!isScrolling) {
        setIsScrolling(true);
        setTimeout(() => {
          if (viewport && !isMobile) {
            localStorage.setItem(SCROLL_POSITION_KEY, viewport.scrollTop.toString());
          }
          setIsScrolling(false);
        }, 100);
      }
    };
    
    viewport.addEventListener('scroll', handleScroll);
    return () => viewport.removeEventListener('scroll', handleScroll);
  }, [isMobile, isScrolling]);

  return (
    <ScrollArea 
      ref={scrollAreaRef} 
      className="flex-1 overflow-hidden"
    >
      {children}
      {/* Add padding at the bottom to prevent last items from being cut off */}
      {isMobile && <div className="h-16" />}
    </ScrollArea>
  );
};

export default ScrollManager;
