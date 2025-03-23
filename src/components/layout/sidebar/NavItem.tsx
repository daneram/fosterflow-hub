
import React, { useCallback, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { NavItemProps } from './types';

const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, label, isOpen, onClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = location.pathname === to;
  const linkRef = useRef<HTMLAnchorElement>(null);

  // Use useCallback to prevent unnecessary re-renders
  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default link behavior
    
    // Don't navigate if we're already on this page
    if (isActive) {
      return;
    }
    
    // Run the onClick handler if provided (for mobile sidebar closing)
    if (onClick) {
      onClick();
    }
    
    // Store the current scroll position before navigation
    const sidebarElement = document.getElementById('sidebar-container');
    if (sidebarElement) {
      const scrollArea = sidebarElement.querySelector('[data-radix-scroll-area-viewport]') as HTMLElement;
      if (scrollArea) {
        // Get the current scroll position
        const scrollPos = scrollArea.scrollTop;
        console.log(`Saving pre-navigation scroll position for ${location.pathname}: ${scrollPos}`);
        
        // Save the scroll position to sessionStorage keyed by current route
        sessionStorage.setItem(`sidebar-scroll-${location.pathname}`, scrollPos.toString());
      }
    }
    
    // Use navigate with state to preserve scroll
    navigate(to, { 
      replace: false, // Don't replace history entry
      state: { 
        preserveScroll: true,
        sidebarScroll: true,
        from: location.pathname,
        timestamp: Date.now() // Add timestamp to ensure state is always unique
      }
    });
  }, [isActive, onClick, navigate, to, location.pathname]);

  return (
    <Link
      ref={linkRef}
      to={to}
      className={cn(
        "flex items-center h-10 text-sm font-medium",
        isActive 
          ? "bg-primary text-primary-foreground" 
          : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground",
        "pl-4 pr-3", // Adjusted padding for icon alignment
        "rounded-r-md rounded-l-none"
      )}
      onClick={handleClick}
      title={!isOpen ? label : undefined}
      data-testid={`nav-item-${label.toLowerCase()}`}
    >
      <div className="flex items-center justify-center w-5 h-5 flex-shrink-0">
        <Icon className="h-5 w-5" />
      </div>
      <div className={cn("ml-3 overflow-hidden", 
                       isOpen ? "opacity-100" : "opacity-0 w-0")}>
        <span className="truncate">{label}</span>
      </div>
    </Link>
  );
};

export default React.memo(NavItem);
