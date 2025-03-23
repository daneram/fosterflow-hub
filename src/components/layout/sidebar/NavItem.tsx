
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { NavItemProps } from './types';

const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, label, isOpen, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  const handleClick = (e: React.MouseEvent) => {
    // Don't prevent default navigation - just call onClick if provided
    if (onClick) {
      onClick();
    }
    
    // If we're already on this page, prevent the navigation
    if (isActive) {
      e.preventDefault();
    }
  };

  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-2 px-2 py-1.5 text-sm font-medium transition-all duration-200",
        isActive 
          ? "bg-primary text-primary-foreground" 
          : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground",
        isOpen 
          ? "rounded-md" 
          : "rounded-r-md rounded-l-none",
        !isOpen && "justify-center px-0"
      )}
      onClick={handleClick}
      title={!isOpen ? label : undefined}
    >
      <Icon className={cn("h-4 w-4", !isOpen && "h-5 w-5")} />
      {isOpen && <span>{label}</span>}
    </Link>
  );
};

export default NavItem;
