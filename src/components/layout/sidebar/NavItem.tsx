
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
        "flex items-center py-2 text-sm font-medium rounded-md transition-colors duration-300 ease-in-out h-10",
        isActive 
          ? "bg-primary text-primary-foreground" 
          : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground",
        isOpen ? "px-2.5" : "justify-center w-10 px-0"
      )}
      onClick={handleClick}
      title={!isOpen ? label : undefined}
    >
      <Icon className="h-4 w-4 flex-shrink-0 ml-0" />
      {isOpen && <span className="ml-3 truncate">{label}</span>}
    </Link>
  );
};

export default NavItem;
