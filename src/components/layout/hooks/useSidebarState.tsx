
import { useCallback, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSidebar } from '@/components/ui/sidebar';

// Local storage key for sidebar state
const SIDEBAR_STATE_KEY = 'indigo-fostering-sidebar-state';

export const useSidebarState = () => {
  const isMobile = useIsMobile();
  const { open: sidebarOpen, setOpen: setSidebarOpen, openMobile, setOpenMobile, toggleSidebar: contextToggleSidebar } = useSidebar();
  
  // Load saved state on initial render
  useEffect(() => {
    try {
      const savedState = localStorage.getItem(SIDEBAR_STATE_KEY);
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        // Apply saved state based on device type
        if (isMobile) {
          setOpenMobile(false); // Always start closed on mobile
        } else {
          setSidebarOpen(parsedState.desktop ?? true);
        }
      }
    } catch (error) {
      console.error('Error loading sidebar state:', error);
    }
  }, [isMobile, setSidebarOpen, setOpenMobile]);
  
  // Toggle function that works on both mobile and desktop
  const toggleSidebar = useCallback(() => {
    if (isMobile) {
      setOpenMobile(!openMobile);
    } else {
      const newState = !sidebarOpen;
      contextToggleSidebar();
      
      // Save desktop state to localStorage
      try {
        localStorage.setItem(SIDEBAR_STATE_KEY, JSON.stringify({ 
          desktop: newState 
        }));
      } catch (error) {
        console.error('Error saving sidebar state:', error);
      }
    }
  }, [isMobile, openMobile, setOpenMobile, sidebarOpen, contextToggleSidebar]);

  // Function to explicitly set sidebar state
  const setSidebarOpenState = useCallback((state: boolean) => {
    if (isMobile) {
      setOpenMobile(state);
    } else {
      setSidebarOpen(state);
      
      // Save desktop state to localStorage
      try {
        localStorage.setItem(SIDEBAR_STATE_KEY, JSON.stringify({ 
          desktop: state 
        }));
      } catch (error) {
        console.error('Error saving sidebar state:', error);
      }
    }
  }, [isMobile, setSidebarOpen, setOpenMobile]);

  // The exposed sidebarOpen state should be either the mobile or desktop state
  // depending on the current view
  const effectiveSidebarOpen = isMobile ? openMobile : sidebarOpen;

  return { 
    sidebarOpen: effectiveSidebarOpen, 
    setSidebarOpen: setSidebarOpenState, 
    toggleSidebar 
  };
};
