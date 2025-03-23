
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

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle, onNavItemClick, isMobile }) => {
  return (
    <div className={cn(
      "h-screen flex flex-col bg-sidebar py-4 px-0", // Removed horizontal padding
      isOpen ? "w-52" : "w-14" // Fixed width without transitions
    )}>
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
};

// Use React.memo with custom comparison to prevent unnecessary re-renders
export default React.memo(Sidebar, (prevProps, nextProps) => {
  // Only re-render if these specific props change
  return (
    prevProps.isOpen === nextProps.isOpen &&
    prevProps.isMobile === nextProps.isMobile
  );
});
