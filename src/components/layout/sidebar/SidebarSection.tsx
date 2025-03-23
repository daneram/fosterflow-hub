
import React from 'react';
import NavItem from './NavItem';
import { SidebarSectionProps } from './types';

const SidebarSection: React.FC<SidebarSectionProps> = ({ title, isOpen, items, onNavItemClick }) => {
  return (
    <>
      {isOpen && <div className="text-xs font-medium text-muted-foreground mt-4 mb-1.5">{title}</div>}
      <nav className="space-y-0.5">
        {items.map((item) => (
          <NavItem
            key={item.to}
            to={item.to}
            icon={item.icon}
            label={item.label}
            isOpen={isOpen}
            onClick={onNavItemClick}
          />
        ))}
      </nav>
    </>
  );
};

export default SidebarSection;
