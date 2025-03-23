
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

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle, onNavItemClick, isMobile }) => {
  return (
    <div className={cn(
      "h-screen flex flex-col bg-sidebar py-4 transition-all duration-300 ease-in-out overflow-hidden",
      isOpen ? "w-52 opacity-100" : "w-14 opacity-90"
    )}>
      <SidebarHeader isOpen={isOpen} onToggle={onToggle} />

      <ScrollManager isOpen={isOpen}>
        {isMobile && (
          <AIChatSection isOpen={isOpen} onNavItemClick={onNavItemClick} />
        )}
        
        <SidebarSection 
          title={dashboardSection.title} 
          isOpen={isOpen} 
          items={dashboardSection.items} 
          onNavItemClick={onNavItemClick} 
        />
        
        <SidebarSection 
          title={coreSection.title} 
          isOpen={isOpen} 
          items={coreSection.items} 
          onNavItemClick={onNavItemClick} 
        />
        
        <SidebarSection 
          title={fosteringSection.title} 
          isOpen={isOpen} 
          items={fosteringSection.items} 
          onNavItemClick={onNavItemClick} 
        />
        
        <SidebarSection 
          title={organizationSection.title} 
          isOpen={isOpen} 
          items={organizationSection.items} 
          onNavItemClick={onNavItemClick} 
        />
        
        <SidebarSection 
          title={toolsSection.title} 
          isOpen={isOpen} 
          items={toolsSection.items} 
          onNavItemClick={onNavItemClick} 
        />
      </ScrollManager>

      <SidebarFooter isOpen={isOpen} />
    </div>
  );
};

export default Sidebar;
