import { useState, useCallback, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

// Debug logging utility
const stateDebug = (event: string, data?: any) => {
  console.log(
    `%c SIDEBAR_STATE [${new Date().toISOString().split('T')[1].split('.')[0]}]: ${event}`,
    'background: #9333ea; color: white; padding: 2px 4px; border-radius: 2px;',
    data || ''
  );
};

interface SidebarState {
  sidebarOpen: boolean;
  setSidebarOpen: (state: boolean) => void;
  toggleSidebar: () => void;
  isNavigating: boolean;
  startNavigation: () => void;
  endNavigation: () => void;
}

export const useSidebarState = (): SidebarState => {
  const isMobile = useIsMobile();
  // Initialize sidebar state based on device type
  const [sidebarOpen, setSidebarOpen] = useState(() => !isMobile);
  const [isNavigating, setIsNavigating] = useState(false);
  const [navigationTimeout, setNavigationTimeout] = useState<NodeJS.Timeout>();

  const startNavigation = useCallback(() => {
    stateDebug('Starting navigation');
    setIsNavigating(true);
  }, []);

  const endNavigation = useCallback(() => {
    stateDebug('Ending navigation');
    setIsNavigating(false);
  }, []);

  const toggleSidebar = useCallback(() => {
    stateDebug('Toggling sidebar', { currentState: sidebarOpen });
    setSidebarOpen(prev => !prev);
  }, [sidebarOpen]);

  // Close sidebar when switching to mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [isMobile]);

  // Cleanup navigation timeout on unmount
  useEffect(() => {
    return () => {
      if (navigationTimeout) {
        clearTimeout(navigationTimeout);
      }
    };
  }, [navigationTimeout]);

  return {
    sidebarOpen,
    setSidebarOpen,
    toggleSidebar,
    isNavigating,
    startNavigation,
    endNavigation
  };
}; 