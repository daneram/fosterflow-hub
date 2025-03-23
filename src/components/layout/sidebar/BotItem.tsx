
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { BotItemProps } from './types';

const BotItem: React.FC<BotItemProps> = ({ to, icon: Icon, label, isOpen, onClick }) => {
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
        "flex items-center h-10 text-sm font-medium rounded-md transition-colors duration-300 ease-in-out",
        isActive 
          ? "bg-primary text-primary-foreground" 
          : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground",
        isOpen ? "px-2.5" : "px-0 justify-center w-full"
      )}
      onClick={handleClick}
      title={!isOpen ? label : undefined}
    >
      <div className={cn(
        "flex items-center justify-center", 
        isOpen ? "w-5 h-5" : "w-6 h-6"
      )}>
        <Icon className="h-5 w-5" />
      </div>
      <div 
        className={cn(
          "ml-3 transition-all duration-300 ease-in-out overflow-hidden",
          isOpen ? "opacity-100 max-w-full" : "opacity-0 max-w-0"
        )}
      >
        <span className="truncate">{label}</span>
      </div>
    </Link>
  );
};

export default BotItem;
