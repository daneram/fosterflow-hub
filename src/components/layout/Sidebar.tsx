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
import { Sidebar as ShadcnSidebar } from '@/components/ui/sidebar';
import { useSidebar } from '@/components/ui/sidebar';

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
  // Get the sidebar context values
  const { openMobile } = useSidebar();
  
  // Use the shadcn/ui Sidebar component for mobile
  if (isMobile) {
    return (
      <ShadcnSidebar>
        <div className="h-screen flex flex-col bg-sidebar py-2 px-0">
          <SidebarHeader isOpen={true} onToggle={onToggle} />

          <ScrollManager isOpen={true}>
            <div className="flex flex-col space-y-0 mt-0.5">
              <AIChatSection isOpen={true} onNavItemClick={onNavItemClick} />
              
              {sidebarSections.map(({ key, section }) => (
                <SidebarSection 
                  key={key}
                  title={section.title} 
                  isOpen={true} 
                  items={section.items} 
                  onNavItemClick={onNavItemClick} 
                />
              ))}
            </div>
          </ScrollManager>

          <SidebarFooter isOpen={true} />
        </div>
      </ShadcnSidebar>
    );
  }

  // Desktop sidebar implementation remains the same
  return (
    <div 
      className={cn(
        "h-screen flex flex-col bg-sidebar py-2 px-0", 
        isOpen ? "w-52" : "w-14", 
        "transition-opacity duration-200",
        isMobile && isTransitioning ? "opacity-90" : "opacity-100"
      )}
    >
      <SidebarHeader isOpen={isOpen} onToggle={onToggle} />

      <ScrollManager isOpen={isOpen}>
        <div className="flex flex-col space-y-0 mt-0.5">
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

// Update memo comparison to include the new openMobile state
export default React.memo(Sidebar, (prevProps, nextProps) => {
  return (
    prevProps.isOpen === nextProps.isOpen &&
    prevProps.isMobile === nextProps.isMobile &&
    prevProps.isTransitioning === nextProps.isTransitioning
  );
});
