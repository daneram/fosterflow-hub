
import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';
import SidebarHeader from './sidebar/SidebarHeader';
import SidebarFooter from './sidebar/SidebarFooter';
import SidebarSection from './sidebar/SidebarSection';
import ScrollManager from './sidebar/ScrollManager';
import AIChatSection from './sidebar/AIChatSection';
import { SidebarProps } from './sidebar/types';
import { useSidebar } from '@/components/ui/sidebar';
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
  // Get shadcn sidebar context
  const { openMobile } = useSidebar();
  
  // Debug logging for Sidebar
  useEffect(() => {
    console.log('[Sidebar] Rendering with props:', { 
      isOpen, 
      isMobile, 
      isTransitioning,
      'shadcn.openMobile': openMobile
    });
  }, [isOpen, isMobile, isTransitioning, openMobile]);
  
  // For mobile, content is rendered inside the Sheet component
  // with a fixed open state (true) since the Sheet handles visibility
  if (isMobile) {
    console.log('[Sidebar] On mobile, rendering content for sheet');
    return (
      <div className="h-screen flex flex-col bg-sidebar py-2 px-0 w-52">
        <SidebarHeader 
          isOpen={true} 
          onToggle={onToggle} 
        />

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
    );
  }

  // For desktop, we manage the visibility ourselves
  return (
    <div 
      className={cn(
        "h-screen flex flex-col bg-sidebar py-2 px-0", 
        isOpen ? "w-52" : "w-14", 
        "transition-opacity duration-200",
        isTransitioning ? "opacity-90" : "opacity-100"
      )}
    >
      <SidebarHeader 
        isOpen={isOpen} 
        onToggle={onToggle} 
      />

      <ScrollManager isOpen={isOpen}>
        <div className="flex flex-col space-y-0 mt-0.5">
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

// Keep the memo comparison function
export default React.memo(Sidebar, (prevProps, nextProps) => {
  return (
    prevProps.isOpen === nextProps.isOpen &&
    prevProps.isMobile === nextProps.isMobile &&
    prevProps.isTransitioning === nextProps.isTransitioning
  );
});
