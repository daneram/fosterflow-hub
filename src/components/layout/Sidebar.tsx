
import React from 'react';
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

const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  onToggle, 
  onNavItemClick, 
  isMobile,
  isTransitioning = false
}) => {
  // Render a fixed-width placeholder instead of not rendering at all
  if (isMobile && isTransitioning) {
    return (
      <div 
        className={cn(
          "h-screen flex flex-col bg-sidebar py-4 px-0",
          !isOpen ? "w-14" : "w-52"
        )} 
        aria-hidden="true"
      />
    );
  }

  return (
    <div 
      className={cn(
        "h-screen flex flex-col bg-sidebar py-2 px-0", // Reduced top padding
        isOpen ? "w-52" : "w-14", // Width based on open state
        
        // Add only opacity transition, keep width fixed during transitions
        "transition-opacity duration-200",
        
        // Never completely hide the sidebar
        isMobile && isTransitioning ? "opacity-90" : "opacity-100"
      )}
    >
      <SidebarHeader isOpen={isOpen} onToggle={onToggle} />

      <ScrollManager isOpen={isOpen}>
        <div className="flex flex-col space-y-0 mt-1">
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
};

// Update memo comparison to include the new isTransitioning prop
export default React.memo(Sidebar, (prevProps, nextProps) => {
  return (
    prevProps.isOpen === nextProps.isOpen &&
    prevProps.isMobile === nextProps.isMobile &&
    prevProps.isTransitioning === nextProps.isTransitioning
  );
});
