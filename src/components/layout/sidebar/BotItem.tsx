
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { BotItemProps } from './types';

const BotItem: React.FC<BotItemProps> = ({ to, icon: Icon, label, isOpen, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      // Call the onClick handler (closeSidebarOnMobile) first
      onClick();
    }
    
    // If this is the current page, prevent default navigation
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
        !isOpen && "justify-center px-0",
        !isOpen && "w-full flex justify-center"
      )}
      onClick={handleClick}
      title={!isOpen ? label : undefined}
    >
      <Icon className={cn("h-4 w-4", !isOpen && "h-5 w-5")} />
      {isOpen && <span>{label}</span>}
    </Link>
  );
};

export default BotItem;
