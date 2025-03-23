
import React, { useRef, useEffect, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLocation } from 'react-router-dom';

interface ScrollManagerProps {
  children: React.ReactNode;
  isOpen: boolean;
}

// Create a persistent map to store scroll positions
// This will persist across component unmounts/remounts
const scrollPositions = new Map<string, number>();

const ScrollManager: React.FC<ScrollManagerProps> = ({ children, isOpen }) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLElement | null>(null);
  const location = useLocation();
  const [isInitialized, setIsInitialized] = useState(false);
  const pathRef = useRef(location.pathname);
  
  // Get the viewport element once the component mounts
  useEffect(() => {
    if (!scrollAreaRef.current) return;
    
    // Find the scroll viewport element
    const findViewport = () => {
      const viewport = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
      if (viewport instanceof HTMLElement) {
        viewportRef.current = viewport;
        setIsInitialized(true);
        console.log('Viewport found for scroll management');
      } else {
        // If not found immediately, try again after a short delay
        setTimeout(findViewport, 50);
      }
    };

    findViewport();
    
    // Clean up function
    return () => {
      if (viewportRef.current) {
        const currentPath = pathRef.current;
        const scrollTop = viewportRef.current.scrollTop;
        scrollPositions.set(currentPath, scrollTop);
        console.log(`Saved scroll position ${scrollTop} for ${currentPath} on unmount`);
      }
    };
  }, []);
  
  // Save scroll position when location changes
  useEffect(() => {
    if (viewportRef.current) {
      // Save the old path's scroll position before updating pathRef
      const scrollTop = viewportRef.current.scrollTop;
      scrollPositions.set(pathRef.current, scrollTop);
      console.log(`Saved scroll position ${scrollTop} for ${pathRef.current} on navigation`);
      
      // Update the current path reference
      pathRef.current = location.pathname;
    }
  }, [location.pathname]);
  
  // Restore scroll position after navigation or sidebar toggle
  useEffect(() => {
    if (!isInitialized || !viewportRef.current) return;
    
    const restorePosition = () => {
      const savedPosition = scrollPositions.get(location.pathname);
      
      if (savedPosition !== undefined && viewportRef.current) {
        console.log(`Attempting to restore scroll to ${savedPosition} for ${location.pathname}`);
        
        // Use requestAnimationFrame for smoother restoration
        requestAnimationFrame(() => {
          if (viewportRef.current) {
            viewportRef.current.scrollTop = savedPosition;
            
            // Double-check the restoration with a slight delay
            setTimeout(() => {
              if (viewportRef.current && viewportRef.current.scrollTop !== savedPosition) {
                viewportRef.current.scrollTop = savedPosition;
                console.log(`Forced scroll restoration to ${savedPosition}`);
              }
            }, 100);
          }
        });
      }
    };

    // Restore scroll position with a small delay to ensure DOM is ready
    setTimeout(restorePosition, 50);
  }, [location.pathname, isInitialized, isOpen]);

  return (
    <ScrollArea 
      ref={scrollAreaRef} 
      className="flex-1 overflow-hidden"
    >
      {children}
    </ScrollArea>
  );
};

export default React.memo(ScrollManager);
