
import { useState, useEffect, useCallback } from 'react';

export const useSidebarState = () => {
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    // Get saved state from localStorage, default to true if not found
    const saved = localStorage.getItem('sidebar-state');
    console.log('[useSidebarState] Initial state from localStorage:', saved);
    return saved ? saved === 'open' : true;
  });

  // Save sidebar state to localStorage when it changes
  useEffect(() => {
    console.log('[useSidebarState] Saving sidebar state:', sidebarOpen ? 'open' : 'closed');
    localStorage.setItem('sidebar-state', sidebarOpen ? 'open' : 'closed');
  }, [sidebarOpen]);

  // Enhanced toggle with logging
  const toggleSidebar = useCallback(() => {
    console.log('[useSidebarState] Toggling sidebar from:', sidebarOpen);
    setSidebarOpen(prev => {
      const newState = !prev;
      console.log('[useSidebarState] Setting sidebar to:', newState);
      return newState;
    });
  }, [sidebarOpen]);

  return { 
    sidebarOpen, 
    setSidebarOpen, 
    toggleSidebar 
  };
};
