import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { NavItemProps } from './types';
import { useIsMobile } from '@/hooks/use-mobile';

/**
 * NavItem component that handles navigation with React Router Links.
 * This is a simplified implementation with minimal logic.
 */
const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, label, isOpen, onClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = location.pathname === to;
  const isMobile = useIsMobile();

  // Handle click - close sidebar on mobile first, then navigate
  const handleClick = (e: React.MouseEvent) => {
    // Prevent default navigation behavior
    e.preventDefault();
    
    // Don't do anything if we're already on this page
    if (isActive) {
      return;
    }
    
    // For mobile sidebar navigation, close the sidebar first
    if (isMobile && isOpen && onClick) {
      // Call the onClick handler to close the sidebar
      onClick();
      
      // Wait for the sidebar to fully collapse before navigating
      // This ensures the logo header stays visible during the transition
      const transitionDuration = 300; // Match the sidebar's transition duration
      const checkInterval = 50; // Check every 50ms
      const startTime = Date.now();
      
      const checkSidebarState = () => {
        const elapsed = Date.now() - startTime;
        if (elapsed >= transitionDuration) {
          // Sidebar should be fully collapsed now
          navigate(to);
          return;
        }
        // Check again in a short while
        setTimeout(checkSidebarState, checkInterval);
      };
      
      // Start checking after a short delay to ensure the sidebar has started collapsing
      setTimeout(checkSidebarState, checkInterval);
    } else {
      // For desktop or already-collapsed sidebar, just navigate
      navigate(to);
    }
  };

  return (
    <Link
      to={to}
      className={cn(
        "flex items-center font-medium",
        isMobile ? "h-10" : "h-9", 
        isActive 
          ? "bg-primary text-primary-foreground" 
          : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground",
        "pl-4 pr-3", 
        "rounded-r-md rounded-l-none",
        "overflow-hidden whitespace-nowrap"
      )}
      onClick={handleClick}
      title={!isOpen ? label : undefined}
      aria-current={isActive ? "page" : undefined}
    >
      <div className={cn(
        "flex items-center justify-center flex-shrink-0",
        isMobile ? "w-6 h-6" : "w-5 h-5" 
      )}>
        <Icon className={cn(
          isMobile ? "h-5 w-5" : "h-4 w-4" 
        )} />
      </div>
      <div className={cn(
        "overflow-hidden transition-all duration-200", 
        isOpen 
          ? "ml-3 opacity-100 w-auto" 
          : "w-0 opacity-0 absolute pointer-events-none"
      )}>
        <span className={cn(
          "truncate",
          isMobile ? "text-sm" : "text-xs" 
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
