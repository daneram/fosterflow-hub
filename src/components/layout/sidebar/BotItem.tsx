
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { BotItemProps } from './types';

const BotItem: React.FC<BotItemProps> = ({ to, icon: Icon, label, isOpen, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  const handleClick = (e: React.MouseEvent) => {
    // If we're already on this page, completely prevent navigation
    if (isActive) {
      e.preventDefault();
      e.stopPropagation();
      
      // Still call the onClick handler if provided (for mobile sidebar closing, etc.)
      if (onClick) {
        onClick();
      }
      return;
    }
    
    // For actual navigation to new pages, call the onClick handler
    if (onClick) {
      onClick();
    }
  };

  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-2 px-2 py-1.5 rounded-md text-sm font-medium transition-all duration-200",
        isActive 
          ? "bg-primary text-primary-foreground" 
          : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground",
        !isOpen && "justify-center px-0",
        !isOpen && "w-full flex justify-center"
      )}
      onClick={handleClick}
      title={!isOpen ? label : undefined}
    >
      <Icon className="h-4 w-4" />
      {isOpen && <span>{label}</span>}
    </Link>
  );
};

export default BotItem;
