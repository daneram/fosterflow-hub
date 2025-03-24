
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
import { Sheet, SheetContent } from '@/components/ui/sheet';

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
  
  // For mobile: render both the collapsed sidebar and the sheet
  if (isMobile) {
    return (
      <>
        {/* Collapsed sidebar that's always visible on mobile */}
        <div className="h-screen flex flex-col bg-sidebar py-2 px-0 w-14 z-10">
          <SidebarHeader 
            isOpen={false} 
            onToggle={() => {
              console.log('[Sidebar] Mobile header clicked, opening sheet');
              setOpenMobile(true);
            }} 
          />

          <ScrollManager isOpen={false}>
            <div className="flex flex-col space-y-0 mt-0.5">
              {sidebarSections.map(({ key, section }) => (
                <SidebarSection 
                  key={key}
                  title={section.title} 
                  isOpen={false} 
                  items={section.items} 
                  onNavItemClick={onNavItemClick} 
                />
              ))}
            </div>
          </ScrollManager>

          <SidebarFooter isOpen={false} />
        </div>

        {/* Full sidebar in a sheet for mobile */}
        <Sheet open={openMobile} onOpenChange={setOpenMobile}>
          <SheetContent 
            side="left" 
            className="p-0 w-[280px] bg-sidebar"
          >
            <div className="h-screen flex flex-col bg-sidebar py-2 px-0">
              <SidebarHeader 
                isOpen={true} 
                onToggle={() => setOpenMobile(false)} 
              />

              <ScrollManager isOpen={true}>
                <div className="flex flex-col space-y-0 mt-0.5">
                  <AIChatSection isOpen={true} onNavItemClick={() => {
                    onNavItemClick();
                    setOpenMobile(false);
                  }} />
                  
                  {sidebarSections.map(({ key, section }) => (
                    <SidebarSection 
                      key={key}
                      title={section.title} 
                      isOpen={true} 
                      items={section.items} 
                      onNavItemClick={() => {
                        onNavItemClick();
                        setOpenMobile(false);
                      }} 
                    />
                  ))}
                </div>
              </ScrollManager>

              <SidebarFooter isOpen={true} />
            </div>
          </SheetContent>
        </Sheet>
      </>
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
          {isOpen && <AIChatSection isOpen={isOpen} onNavItemClick={onNavItemClick} />}
          
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
