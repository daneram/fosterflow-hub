
import React, { useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { NavItemProps } from './types';

const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, label, isOpen, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  // Use useCallback to prevent unnecessary re-renders
  const handleClick = useCallback((e: React.MouseEvent) => {
    // Don't navigate if we're already on this page
    if (isActive) {
      e.preventDefault();
      return;
    }
    
    // Run the onClick handler if provided
    if (onClick) {
      onClick();
    }
    
    // We don't prevent default navigation, which allows the Link component
    // to handle the navigation properly while ScrollManager preserves scroll
  }, [isActive, onClick]);

  return (
    <Link
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
