
import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import SidebarHeader from './sidebar/SidebarHeader';
import SidebarFooter from './sidebar/SidebarFooter';
import SidebarSection from './sidebar/SidebarSection';
import ScrollManager from './sidebar/ScrollManager';
import AIChatSection from './sidebar/AIChatSection';
import { SidebarProps } from './sidebar/types';
import {
  dashboardSection,
  coreSection,
  fosteringSection,
  organizationSection,
  toolsSection
} from './sidebar/sidebarSections';

// Create a memoized list of sections to prevent re-creation on each render
const sidebarSections = [
  { key: 'dashboard', section: dashboardSection },
  { key: 'core', section: coreSection },
  { key: 'fostering', section: fosteringSection },
  { key: 'organization', section: organizationSection },
  { key: 'tools', section: toolsSection }
];

const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(({ 
  isOpen, 
  onToggle, 
  onNavItemClick, 
  isMobile,
  isTransitioning = false
}, ref) => {
  // Apply fixed width styles for both states to prevent transition flicker
  return (
    <div 
      ref={ref}
      className={cn(
        "h-screen flex flex-col bg-sidebar py-4 px-0", // Base styles
        isOpen ? "w-52" : "w-14", // Width based on open state
        
        // Important: Use visibility and opacity for transitions instead of width
        // This prevents the sidebar from changing size during page transitions
        "transition-all duration-100",
        isMobile && isTransitioning ? "opacity-90" : "opacity-100"
      )}
      data-state={isOpen ? "open" : "closed"}
    >
      <SidebarHeader isOpen={isOpen} onToggle={onToggle} />

      <ScrollManager isOpen={isOpen}>
        <div className="flex flex-col space-y-0">
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
  );
});

// Set display name
Sidebar.displayName = 'Sidebar';

// Update memo comparison to include the new isTransitioning prop
export default React.memo(Sidebar, (prevProps, nextProps) => {
  return (
    prevProps.isOpen === nextProps.isOpen &&
    prevProps.isMobile === nextProps.isMobile &&
    prevProps.isTransitioning === nextProps.isTransitioning
  );
});
