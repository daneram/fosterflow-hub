
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
      // This is a more reliable approach than setTimeout with 0ms
      setTimeout(() => {
        navigate(to);
      }, 50); // Small delay to let animation start
    }
  };

  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-2 px-2 py-1.5 text-sm font-medium transition-all duration-300 ease-in-out",
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
      <Icon className={cn("h-4 w-4 transition-all duration-300", !isOpen && "h-5 w-5")} />
      {isOpen && <span className="transition-all duration-300 opacity-100">{label}</span>}
    </Link>
  );
};

export default NavItem;
