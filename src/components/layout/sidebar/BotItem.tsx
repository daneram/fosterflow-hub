import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { BotItemProps } from './types';
import { useIsMobile } from '@/hooks/use-mobile';

const BotItem: React.FC<BotItemProps> = ({ to, icon: Icon, label, isOpen, onClick, fontBold }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  const isMobile = useIsMobile();
  const [isClicking, setIsClicking] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (isActive) return;

    setIsClicking(true);
    // Call the onClick handler with the target path
    onClick?.(to);
  };

  // Reset clicking state after transition
  React.useEffect(() => {
    if (isClicking) {
      const timer = setTimeout(() => {
        setIsClicking(false);
      }, 300); // Match the transition duration
      return () => clearTimeout(timer);
    }
  }, [isClicking]);

  return (
    <Link
      to={to}
      className={cn(
        "flex items-center font-medium",
        isMobile ? "h-10" : "h-10", // Match sidebar header height on desktop
        isActive 
          ? "bg-primary text-primary-foreground" 
          : !isClicking && "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground",
        "pl-4 pr-3", // Adjusted padding for icon alignment
        "rounded-r-md rounded-l-none",
        // Stabilize link during transitions
        "overflow-hidden whitespace-nowrap",
        "transition-all duration-300"
      )}
      onClick={handleClick}
      title={!isOpen ? label : undefined}
      aria-current={isActive ? "page" : undefined}
    >
      <div className={cn(
        "flex items-center justify-center flex-shrink-0",
        isMobile ? "w-6 h-6" : "w-5 h-5",
        "transition-transform duration-300"
      )}>
        <Icon className={cn(
          isMobile ? "h-5 w-5" : "h-4 w-4",
          fontBold && "font-bold"
        )} />
      </div>
      <div className={cn(
        "overflow-hidden transition-all duration-300",
        isOpen 
          ? "ml-3 opacity-100 w-auto" 
          : "w-0 opacity-0 ml-0",
        "flex-shrink-0"
      )}>
        <span className={cn(
          "truncate",
          isMobile ? "text-sm" : "text-sm",
          "transition-opacity duration-300",
          fontBold && "font-bold"
        )}>{label}</span>
      </div>
    </Link>
  );
};

export default React.memo(BotItem, (prevProps, nextProps) => {
  return (
    prevProps.isOpen === nextProps.isOpen &&
    prevProps.to === nextProps.to
  );
});
