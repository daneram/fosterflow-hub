
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
  // Get shadcn sidebar context - now this will work because we are properly wrapped with SidebarProvider
  const { openMobile, setOpenMobile } = useSidebar();
  
  // Debug logging for Sidebar
  useEffect(() => {
    console.log('[Sidebar] Rendering with props:', { 
      isOpen, 
      isMobile, 
      isTransitioning,
      'shadcn.openMobile': openMobile
    });
  }, [isOpen, isMobile, isTransitioning, openMobile]);
  
  // For mobile: render a single sidebar that can be expanded/collapsed
  if (isMobile) {
    // Use openMobile as the expanded state for mobile
    const mobileIsOpen = openMobile;
    
    return (
      <div 
        className={cn(
          "h-screen flex flex-col bg-sidebar py-2 px-0", 
          mobileIsOpen ? "w-52" : "w-14", 
          "transition-all duration-200 ease-in-out"
        )}
      >
        <SidebarHeader 
          isOpen={mobileIsOpen} 
          onToggle={() => {
            console.log('[Sidebar] Mobile header clicked, toggling mobile sidebar');
            setOpenMobile(!openMobile);
          }} 
        />

        <ScrollManager isOpen={mobileIsOpen}>
          <div className="flex flex-col space-y-0 mt-0.5">
            {/* Always show AIChatSection on mobile, regardless of isOpen state */}
            <AIChatSection isOpen={mobileIsOpen} onNavItemClick={onNavItemClick} />
            
            {sidebarSections.map(({ key, section }) => (
              <SidebarSection 
                key={key}
                title={section.title} 
                isOpen={mobileIsOpen} 
                items={section.items} 
                onNavItemClick={onNavItemClick} 
              />
            ))}
          </div>
        </ScrollManager>

        <SidebarFooter isOpen={mobileIsOpen} />
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
          {/* Always show AIChatSection on desktop, not just when expanded */}
          <AIChatSection isOpen={isOpen} onNavItemClick={onNavItemClick} />
          
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
