
import { useState, useEffect, useCallback } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

export const useSidebarState = () => {
  const isMobile = useIsMobile();
  
  // Get initial state from localStorage with mobile-aware default
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    // Check localStorage first
    const saved = localStorage.getItem('sidebar-state');
    if (saved) {
      return saved === 'open';
    }
    // Default to closed on mobile, open on desktop
    return !isMobile;
  });

  // Save sidebar state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('sidebar-state', sidebarOpen ? 'open' : 'closed');
  }, [sidebarOpen]);

  // Toggle function that prevents automatic closing on mobile
  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  // Function to explicitly set sidebar state
  const setSidebarOpenState = useCallback((state: boolean) => {
    setSidebarOpen(state);
  }, []);

  return { 
    sidebarOpen, 
    setSidebarOpen: setSidebarOpenState, 
    toggleSidebar 
  };
};
