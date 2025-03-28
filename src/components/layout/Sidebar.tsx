import React, { forwardRef } from 'react';
import { useLocation } from 'react-router-dom';
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
  
  // Combine all sections into an array
  const sidebarSections = [
    { key: 'dashboard', section: dashboardSection },
    { key: 'core', section: coreSection },
    { key: 'fostering', section: fosteringSection },
    { key: 'organization', section: organizationSection },
    { key: 'tools', section: toolsSection }
  ];
  
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
        ref={ref}
        className={cn(
          "h-screen flex flex-col bg-sidebar pt-1 pb-1 px-0",
          // Base width
          isOpen ? "w-52" : "w-14",
          // Transform and transitions
          isMobile && (isOpen 
            ? "translate-x-0" 
            : "-translate-x-full"),
          "transform-gpu", // Use GPU acceleration for smoother animations
          "transition-all duration-300 ease-in-out will-change-transform",
          // Fixed positioning for mobile
          isMobile && "fixed left-0 top-0 z-40 shadow-2xl shadow-black/[0.12]",
          // Add backdrop blur to the sidebar itself
          isMobile && "bg-white/[0.98] backdrop-blur-xl"
        )}
        aria-expanded={isOpen}
        data-state={isOpen ? "open" : "closed"}
      >
        {/* Always render header inside sidebar */}
        <SidebarHeader isOpen={isOpen} onToggle={onToggle} />

        <ScrollManager isOpen={isOpen}>
          <div className={cn(
            "flex flex-col space-y-0",
            // Remove opacity transition from here as it affects all content
            "transition-all duration-200"
          )}>
            {isMobile && (
              <AIChatSection isOpen={isOpen} onNavItemClick={onNavItemClick} />
            )}
            
            {sidebarSections.map(({ key, section }) => (
              <SidebarSection 
                key={key}
                title={section.title} 
                isOpen={isOpen} 
                items={section.items} 
                onNavItemClick={onNavItemClick} 
              />
            ))}
          </div>
        </ScrollManager>

        <SidebarFooter isOpen={isOpen} />
      </div>
      
      {/* Backdrop with blur effect for mobile */}
      {isMobile && (
        <div 
          className={cn(
            "fixed inset-0 z-30",
            "transition-all duration-300 ease-in-out",
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
