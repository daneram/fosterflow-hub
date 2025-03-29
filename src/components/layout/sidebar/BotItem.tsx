import React, { useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { BotItemProps } from './types';
import { useIsMobile } from '@/hooks/use-mobile';

const BotItem: React.FC<BotItemProps> = ({ to, icon: Icon, label, isOpen, onClick, fontBold }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = location.pathname === to;
  const isMobile = useIsMobile();

  const handleClick = useCallback((e: React.MouseEvent) => {
    // Prevent default navigation
    e.preventDefault();
    
    // Don't navigate if we're already on this page
    if (isActive) return;
    
    // Run the onClick handler first (which will close the sidebar on mobile)
    if (onClick) {
      onClick();
    }
    
    // Save current scroll position before navigation
    const viewport = document.querySelector('[data-radix-scroll-area-viewport]');
    if (viewport instanceof HTMLElement) {
      const isMobileView = window.innerWidth < 768;
      const storageKey = isMobileView ? 'sidebar-mobile-scroll-position' : 'sidebar-scroll-position';
      localStorage.setItem(storageKey, viewport.scrollTop.toString());
    }
    
    // Navigate immediately without delay
    navigate(to);
  }, [isActive, onClick, navigate, to]);

  return (
    <Link
      to={to}
      className={cn(
        "flex items-center font-medium",
        isMobile ? "h-10" : "h-10", // Match sidebar header height on desktop
        isActive 
          ? "bg-primary text-primary-foreground" 
          : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground",
        "pl-4 pr-3", // Adjusted padding for icon alignment
        "rounded-r-md rounded-l-none",
        // Stabilize link during transitions
        "overflow-hidden whitespace-nowrap"
      )}
      onClick={handleClick}
      title={!isOpen ? label : undefined}
      aria-current={isActive ? "page" : undefined}
    >
      <div className={cn(
        "flex items-center justify-center flex-shrink-0",
        isMobile ? "w-6 h-6" : "w-5 h-5" // Larger on mobile
      )}>
        <Icon className={cn(
          isMobile ? "h-5 w-5" : "h-4 w-4" // Larger icons on mobile
        )} />
      </div>
      <div className={cn(
        "overflow-hidden transition-all duration-75", 
        isOpen 
          ? "ml-3 opacity-100" 
          : "w-0 opacity-0 absolute pointer-events-none"
      )}>
        <span className={cn(
          "truncate",
          isMobile ? "text-sm" : "text-xs", // Larger text on mobile
          fontBold && "font-bold" // Apply bold font if fontBold prop is true
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
