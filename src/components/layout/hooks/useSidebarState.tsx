
import { useCallback } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSidebar } from '@/components/ui/sidebar';

export const useSidebarState = () => {
  const isMobile = useIsMobile();
  const { open: sidebarOpen, setOpen: setSidebarOpen, openMobile, setOpenMobile, toggleSidebar: contextToggleSidebar } = useSidebar();
  
  // Toggle function that works on both mobile and desktop
  const toggleSidebar = useCallback(() => {
    if (isMobile) {
      setOpenMobile(!openMobile);
    } else {
      contextToggleSidebar();
    }
  }, [isMobile, openMobile, setOpenMobile, contextToggleSidebar]);

  // Function to explicitly set sidebar state
  const setSidebarOpenState = useCallback((state: boolean) => {
    if (isMobile) {
      setOpenMobile(state);
    } else {
      setSidebarOpen(state);
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
