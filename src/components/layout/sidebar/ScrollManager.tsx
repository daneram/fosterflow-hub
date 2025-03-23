
import React, { useRef, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
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
  const location = useLocation();
  
  // Initialize viewport ref
  useEffect(() => {
    if (!scrollAreaRef.current) return;
    
    const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
    if (viewport instanceof HTMLElement) {
      viewportRef.current = viewport;
      
      // Restore scroll position from localStorage
      const savedPosition = localStorage.getItem(SCROLL_POSITION_KEY);
      if (savedPosition) {
        viewport.scrollTop = parseInt(savedPosition, 10);
      }
    }
  }, []);
  
  // Save scroll position to localStorage whenever it changes
  // but only if we're not in the middle of a navigation
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    
    // Debounced scroll handler to avoid excessive saves
    let scrollTimeout: number | null = null;
    
    const handleScroll = () => {
      if (scrollTimeout) {
        window.clearTimeout(scrollTimeout);
      }
      
      scrollTimeout = window.setTimeout(() => {
        // Don't save scroll positions that would hide the last menu items
        const maxScrollHeight = viewport.scrollHeight - viewport.clientHeight;
        const scrollTop = viewport.scrollTop;
        
        // Save the scroll position with buffer to prevent jumps at the bottom
        localStorage.setItem(SCROLL_POSITION_KEY, 
          Math.min(scrollTop, maxScrollHeight - 20).toString());
      }, 100);
    };
    
    viewport.addEventListener('scroll', handleScroll);
    return () => {
      if (scrollTimeout) window.clearTimeout(scrollTimeout);
      viewport.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Reset scroll position when changing routes on mobile
  useEffect(() => {
    // Only reset on mobile
    if (window.innerWidth < 768 && viewportRef.current) {
      // Small delay to ensure the navigation completed
      setTimeout(() => {
        if (viewportRef.current) {
          viewportRef.current.scrollTop = 0;
          localStorage.setItem(SCROLL_POSITION_KEY, '0');
        }
      }, 50);
    }
  }, [location.pathname]);

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
