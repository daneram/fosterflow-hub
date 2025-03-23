
import React from 'react';
import NavItem from './NavItem';
import { SidebarSectionProps } from './types';

const SidebarSection: React.FC<SidebarSectionProps> = ({ title, isOpen, items, onNavItemClick }) => {
  return (
    <div className="mb-6">
      <nav className="space-y-1 px-2">
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
    </div>
  );
};

export default SidebarSection;
