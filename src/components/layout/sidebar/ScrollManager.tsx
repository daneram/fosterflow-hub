import React, { useRef, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface ScrollManagerProps {
  children: React.ReactNode;
  isOpen: boolean;
}

const ScrollManager: React.FC<ScrollManagerProps> = ({ children, isOpen }) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLElement | null>(null);
  const isMobile = useIsMobile();
  
  // Initialize viewport ref and set up scroll area
  useEffect(() => {
    if (!scrollAreaRef.current) return;
    
    const viewport = scrollAreaRef.current.querySelector('[data-scrollarea-viewport]');
    if (viewport instanceof HTMLElement) {
      viewportRef.current = viewport;
      
      // For mobile, ensure touch scrolling works
      if (isMobile) {
        viewport.classList.add('touch-action-auto', 'webkit-touch-scroll');
        viewport.style.overflowY = 'auto';
      }
    }
  }, [isMobile]);

  // Handle scroll position persistence
  useEffect(() => {
    if (!viewportRef.current) return;
    
    const viewport = viewportRef.current;
    const storageKey = isMobile ? 'sidebar-mobile-scroll-position' : 'sidebar-scroll-position';
    
    // Save scroll position when scrolling
    const handleScroll = () => {
      if (isMobile && !isOpen) return; // Don't save scroll position when mobile sidebar is closing
      localStorage.setItem(storageKey, viewport.scrollTop.toString());
    };
    
    viewport.addEventListener('scroll', handleScroll, { passive: true });
    return () => viewport.removeEventListener('scroll', handleScroll);
  }, [isMobile, isOpen]);

  // Restore scroll position when sidebar opens on mobile or component mounts on desktop
  useEffect(() => {
    if (!viewportRef.current) return;
    
    const viewport = viewportRef.current;
    const storageKey = isMobile ? 'sidebar-mobile-scroll-position' : 'sidebar-scroll-position';
    const savedPosition = localStorage.getItem(storageKey);
    
    if (savedPosition) {
      if (isMobile) {
        // For mobile, only restore when sidebar opens
        if (isOpen) {
          requestAnimationFrame(() => {
            viewport.scrollTop = parseInt(savedPosition, 10);
          });
        }
      } else {
        // For desktop, restore on mount
        requestAnimationFrame(() => {
          viewport.scrollTop = parseInt(savedPosition, 10);
        });
      }
    }
  }, [isMobile, isOpen]); // Only depend on isOpen and isMobile

  return (
    <ScrollArea 
      ref={scrollAreaRef} 
      className={cn(
        "flex-1 overflow-auto",
        isMobile ? 'mobile-scroll-area' : '',
        "min-h-0" // Ensure flex-1 works properly
      )}
      data-mobile={isMobile ? 'true' : 'false'}
    >
      {children}
    </ScrollArea>
  );
};

export default ScrollManager;
