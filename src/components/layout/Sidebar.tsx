import React, { forwardRef, useRef, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { SidebarProps } from './sidebar/types';
import SidebarHeader from './sidebar/SidebarHeader';
import ScrollManager from './sidebar/ScrollManager';
import AIChatSection from './sidebar/AIChatSection';
import SidebarSection from './sidebar/SidebarSection';
import SidebarFooter from './sidebar/SidebarFooter';
import { 
  dashboardSection,
  coreSection,
  fosteringSection,
  organizationSection,
  toolsSection
} from './sidebar/sidebarSections';

const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(({ 
  isOpen, 
  onToggle, 
  onNavItemClick, 
  isMobile
}, ref) => {
  const location = useLocation();
  const navigate = useNavigate();
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const [previousLocation, setPreviousLocation] = useState(location.pathname);
  const didNavigateRef = useRef(false);
  const isCollapsingRef = useRef(false);
  const [frozenContent, setFrozenContent] = useState<boolean>(false);
  
  // Sync the forwarded ref with our local ref
  React.useImperativeHandle(ref, () => sidebarRef.current as HTMLDivElement);
  
  // Handle location changes - when we navigate, close the sidebar smoothly
  useEffect(() => {
    // Only run this effect when location actually changes
    if (location.pathname !== previousLocation) {
      // Mark that we just navigated
      didNavigateRef.current = true;
      
      // Update previous location
      setPreviousLocation(location.pathname);
      
      // Close sidebar after navigation (if on mobile and open)
      if (isMobile && isOpen) {
        // Freeze the sidebar content before starting transition
        setFrozenContent(true);
        isCollapsingRef.current = true;
        
        // Give the new page content a moment to render before closing
        // This prevents flickering as the sidebar transition starts
        requestAnimationFrame(() => {
          onToggle();
          
          // Reset frozen state after transition completes
          setTimeout(() => {
            isCollapsingRef.current = false;
            setFrozenContent(false);
          }, 300); // Match the transition duration
        });
      }
    }
  }, [location.pathname, previousLocation, isMobile, isOpen, onToggle]);
  
  // Detect sidebar closing manually (not from navigation)
  useEffect(() => {
    if (!isOpen && !isCollapsingRef.current) {
      // If sidebar was just closed manually (not from navigation)
      setFrozenContent(true);
      
      // Unfreeze after transition completes
      const timeout = setTimeout(() => {
        setFrozenContent(false);
      }, 300);
      
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);
  
  // Combine all sections into an array
  const sidebarSections = [
    { key: 'dashboard', section: dashboardSection },
    { key: 'core', section: coreSection },
    { key: 'fostering', section: fosteringSection },
    { key: 'organization', section: organizationSection },
    { key: 'tools', section: toolsSection }
  ];
  
  // Handle navigation from nav items
  const handleNavItemClick = (to: string) => {
    // If we're on the same page, just close the sidebar
    if (location.pathname === to) {
      if (isMobile && isOpen) {
        // Freeze content during transition
        setFrozenContent(true);
        isCollapsingRef.current = true;
        
        onToggle();
        
        // Reset frozen state after transition completes
        setTimeout(() => {
          isCollapsingRef.current = false;
          setFrozenContent(false);
        }, 300); // Match the transition duration
      }
      return;
    }
    
    // Freeze content immediately when navigating
    setFrozenContent(true);
    
    // First, directly navigate to the new route
    // This loads the new page immediately, which is what we want
    navigate(to);
    
    // The useEffect will handle closing the sidebar after navigation
  };
  
  return (
    <>
      {/* Mobile menu button - always visible when sidebar is closed */}
      {isMobile && !isOpen && (
        <div className="fixed top-2.5 left-5 z-50">
          <div 
            className={cn(
              "h-8 w-8 flex items-center justify-center cursor-pointer",
              "bg-white/90 backdrop-blur-sm",
              "rounded-lg overflow-hidden",
              "shadow-lg shadow-black/[0.08]",
              "ring-1 ring-black/[0.08]",
              "hover:bg-white/95 hover:shadow-xl",
              "active:scale-95",
              "transition-all duration-300"
            )}
            onClick={onToggle}
          >
            <img 
              src="/lovable-uploads/6d655b66-ad8d-445b-93e9-36d9917768dc.png"
              alt="Menu"
              className="w-full h-full object-contain p-1.5"
              draggable={false}
            />
          </div>
        </div>
      )}
      
      {/* Main sidebar content */}
      <div 
        ref={sidebarRef}
        className={cn(
          "h-screen flex flex-col bg-sidebar",
          // Base width
          isOpen ? "w-52" : "w-14",
          // Transform and transitions
          isMobile && (isOpen 
            ? "translate-x-0" 
            : "-translate-x-full"),
          "transform-gpu", // Keep GPU acceleration
          isMobile 
            ? "transition-transform duration-300 ease-in-out" // Mobile: only animate transform
            : "transition-all duration-300 ease-in-out", // Desktop: animate all properties
          // Fixed positioning for mobile
          isMobile && "fixed left-0 top-0 z-40 shadow-2xl shadow-black/[0.12]",
          // Add backdrop blur to the sidebar itself
          isMobile && "bg-white/[0.98] backdrop-blur-xl",
          // Prevent any animations during transition
          frozenContent && "contents-frozen"
        )}
        aria-expanded={isOpen}
        data-state={isOpen ? "open" : "closed"}
        data-frozen={frozenContent ? "true" : "false"}
        style={frozenContent ? { willChange: 'transform', contentVisibility: 'auto' } : {}}
      >
        {/* Always render header inside sidebar */}
        <div className="flex-shrink-0 sidebar-header">
          <SidebarHeader isOpen={isOpen} onToggle={onToggle} />
        </div>

        <ScrollManager isOpen={isOpen} disableScrolling={frozenContent}>
          <div className={cn(
            "flex flex-col space-y-0",
            !isMobile && "transition-all duration-200", // Keep desktop content transition
            frozenContent && "motion-reduce"
          )}>
            {isMobile && (
              <AIChatSection isOpen={isOpen} onNavItemClick={handleNavItemClick} />
            )}
            
            <div className={cn(
              "flex flex-col",
              frozenContent && "motion-reduce pointer-events-none"
            )}>
              {sidebarSections.map(({ key, section }) => (
                <SidebarSection 
                  key={key}
                  title={section.title} 
                  isOpen={isOpen} 
                  items={section.items} 
                  onNavItemClick={handleNavItemClick} 
                  disabled={frozenContent}
                />
              ))}
            </div>
          </div>
        </ScrollManager>

        <div className="flex-shrink-0 sidebar-footer">
          <SidebarFooter isOpen={isOpen} />
        </div>
      </div>
      
      {/* Backdrop with blur effect for mobile */}
      {isMobile && (
        <div 
          className={cn(
            "fixed inset-0 z-30",
            isOpen 
              ? "backdrop-blur-sm bg-black/[0.02] pointer-events-auto" 
              : "backdrop-blur-none bg-transparent pointer-events-none opacity-0"
          )}
          onClick={onToggle}
          aria-hidden="true"
        />
      )}
    </>
  );
});

// Set display name
Sidebar.displayName = 'Sidebar';

export default React.memo(Sidebar, (prevProps, nextProps) => {
  return (
    prevProps.isOpen === nextProps.isOpen &&
    prevProps.isMobile === nextProps.isMobile
  );
});
