import React, { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { NavItemProps } from './types';
import { useIsMobile } from '@/hooks/use-mobile';

/**
 * NavItem component that handles navigation with React Router Links.
 * This is a simplified implementation with minimal logic.
 */
const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, label, isOpen, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  const isMobile = useIsMobile();
  const [isClicking, setIsClicking] = useState(false);
  const linkRef = useRef<HTMLAnchorElement>(null);

  // Handle click - delegate navigation to parent
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (isActive) return;

    setIsClicking(true);

    if (linkRef.current) {
      const link = linkRef.current;
      const viewport = link.closest('[data-scrollarea-viewport]');
      
      if (viewport instanceof HTMLElement) {
        const linkRect = link.getBoundingClientRect();
        const viewportRect = viewport.getBoundingClientRect();
        const currentScroll = viewport.scrollTop;
        const itemOffset = link.offsetTop;
        
        let targetScroll = currentScroll;
        
        // If item is partially visible at the bottom
        if (linkRect.bottom > viewportRect.bottom) {
          // Add padding to ensure it's not right at the edge
          targetScroll = currentScroll + (linkRect.bottom - viewportRect.bottom) + 8;
        }
        // If item is partially visible or near the top
        else if (itemOffset < currentScroll + 8) {
          // Scroll to show the item at the top with padding
          targetScroll = Math.max(0, itemOffset - 8);
        }
        
        // For mobile, save the calculated position
        if (isMobile) {
          localStorage.setItem('sidebar-mobile-scroll-position', targetScroll.toString());
        } else {
          // For desktop, scroll immediately
          viewport.scrollTop = targetScroll;
          localStorage.setItem('sidebar-scroll-position', targetScroll.toString());
        }
      }
    }

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
      ref={linkRef}
      to={to}
      className={cn(
        "flex items-center font-medium",
        isMobile ? "h-10" : "h-9", 
        isActive 
          ? "bg-primary text-primary-foreground" 
          : !isClicking && "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground",
        "pl-4 pr-3", 
        "rounded-r-md rounded-l-none",
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
          isMobile ? "h-5 w-5" : "h-4 w-4" 
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
          "transition-opacity duration-300"
        )}>{label}</span>
      </div>
    </Link>
  );
};

export default React.memo(NavItem, (prevProps, nextProps) => {
  return (
    prevProps.isOpen === nextProps.isOpen &&
    prevProps.to === nextProps.to
  );
});
