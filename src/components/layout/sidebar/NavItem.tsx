
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { NavItemProps } from './types';

const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, label, isOpen, onClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = location.pathname === to;

  const handleClick = (e: React.MouseEvent) => {
    // Prevent default navigation
    e.preventDefault();
    
    if (onClick) {
      // First close the sidebar if on mobile
      onClick();
    }
    
    // Only navigate if this isn't the current page
    if (!isActive) {
      // Add a slight delay to ensure the animation starts before navigation
      setTimeout(() => {
        navigate(to);
      }, 50); // Small delay to let animation start
    }
  };

  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 px-2.5 py-2 text-sm font-medium rounded-md transition-all duration-300 ease-in-out",
        isActive 
          ? "bg-primary text-primary-foreground" 
          : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground",
        !isOpen && "justify-start w-full px-2.5"
      )}
      onClick={handleClick}
      title={!isOpen ? label : undefined}
    >
      <Icon className="h-4 w-4 transition-transform duration-300" />
      <span className={cn(
        "transition-all duration-300 truncate", 
        isOpen ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"
      )}>
        {label}
      </span>
    </Link>
  );
};

export default NavItem;
