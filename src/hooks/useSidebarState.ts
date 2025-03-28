import { useState, useCallback, useEffect, useRef, useLayoutEffect } from 'react';

interface SidebarState {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  toggle: () => void;
}

// Debug logging utility
const debugSidebar = (event: string, data?: any) => {
  console.log(
    `%c SIDEBAR_STATE [${new Date().toISOString().split('T')[1].split('.')[0]}]: ${event}`,
    'background: #2563eb; color: white; padding: 2px 4px; border-radius: 2px;',
    data || ''
  );
};

export const useSidebarState = (): SidebarState => {
  // Track mount phase
  const mountPhaseRef = useRef<'pre-mount' | 'mounting' | 'mounted'>('pre-mount');
  const initTimeRef = useRef(Date.now());
  
  debugSidebar('Pre-initialization', {
    phase: mountPhaseRef.current,
    windowWidth: window.innerWidth,
    isMobile: window.innerWidth < 768,
    timestamp: Date.now(),
    timeSinceInit: Date.now() - initTimeRef.current
  });

  // Initialize with a function to ensure proper initial state
  const [isOpen, setIsOpen] = useState(() => {
    const isMobile = window.innerWidth < 768;
    const initialState = false; // Always start collapsed
    
    debugSidebar('State initialization', {
      phase: mountPhaseRef.current,
      windowWidth: window.innerWidth,
      isMobile,
      initialState,
      timestamp: Date.now(),
      timeSinceInit: Date.now() - initTimeRef.current
    });
    
    mountPhaseRef.current = 'mounting';
    return initialState;
  });

  // Use layout effect to ensure we catch any early changes
  useLayoutEffect(() => {
    debugSidebar('Layout effect (early check)', {
      phase: mountPhaseRef.current,
      isOpen,
      windowWidth: window.innerWidth,
      isMobile: window.innerWidth < 768,
      timestamp: Date.now(),
      timeSinceInit: Date.now() - initTimeRef.current
    });

    // Force mobile state on mount
    const isMobile = window.innerWidth < 768;
    if (isMobile && isOpen) {
      debugSidebar('Forcing closed state on mobile', {
        phase: mountPhaseRef.current,
        previousState: isOpen,
        timestamp: Date.now(),
        timeSinceInit: Date.now() - initTimeRef.current
      });
      setIsOpen(false);
    }

    mountPhaseRef.current = 'mounted';
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const isMobile = width < 768;
      
      debugSidebar('Window resize', {
        phase: mountPhaseRef.current,
        windowWidth: width,
        isMobile,
        currentState: isOpen,
        timestamp: Date.now(),
        timeSinceInit: Date.now() - initTimeRef.current
      });

      // On mobile, ensure sidebar is closed
      if (isMobile && isOpen) {
        setIsOpen(false);
      }
      // On desktop after mount, can open
      else if (!isMobile && mountPhaseRef.current === 'mounted') {
        setIsOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  const toggle = useCallback(() => {
    const isMobile = window.innerWidth < 768;
    debugSidebar('Toggle called', {
      phase: mountPhaseRef.current,
      currentState: isOpen,
      newState: !isOpen,
      isMobile,
      timestamp: Date.now(),
      timeSinceInit: Date.now() - initTimeRef.current
    });
    setIsOpen(prev => !prev);
  }, [isOpen]);

  const wrappedSetIsOpen = useCallback((newState: boolean) => {
    const isMobile = window.innerWidth < 768;
    debugSidebar('setIsOpen called', {
      phase: mountPhaseRef.current,
      currentState: isOpen,
      newState,
      isMobile,
      timestamp: Date.now(),
      timeSinceInit: Date.now() - initTimeRef.current
    });
    
    // Prevent opening on mobile
    if (isMobile && newState) {
      debugSidebar('Prevented opening on mobile', {
        phase: mountPhaseRef.current,
        timestamp: Date.now()
      });
      return;
    }
    
    setIsOpen(newState);
  }, [isOpen]);

  // Log all state changes
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    debugSidebar('State changed', {
      phase: mountPhaseRef.current,
      isOpen,
      isMobile,
      timestamp: Date.now(),
      timeSinceInit: Date.now() - initTimeRef.current
    });

    // Safety check - ensure mobile stays collapsed
    if (isMobile && isOpen) {
      debugSidebar('Safety check - forcing mobile closed', {
        phase: mountPhaseRef.current,
        timestamp: Date.now()
      });
      setIsOpen(false);
    }
  }, [isOpen]);

  return {
    isOpen,
    setIsOpen: wrappedSetIsOpen,
    toggle
  };
}; 