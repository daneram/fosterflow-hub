
import { useState, useEffect, useCallback } from 'react';

export const useSidebarState = () => {
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    // Get saved state from localStorage, default to true if not found
    const saved = localStorage.getItem('sidebar-state');
    return saved ? saved === 'open' : true;
  });

  // Save sidebar state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('sidebar-state', sidebarOpen ? 'open' : 'closed');
  }, [sidebarOpen]);

  // Ensure this function is stable across renders
  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  return { 
    sidebarOpen, 
    setSidebarOpen, 
    toggleSidebar 
  };
};
