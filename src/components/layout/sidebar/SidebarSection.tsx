import React from 'react';
import NavItem from './NavItem';
import { SidebarSectionProps } from './types';

const SidebarSection: React.FC<SidebarSectionProps> = ({ title, isOpen, items }) => {
  return (
    <div className="py-0.5">
      <nav className="flex flex-col gap-0.5">
        {items.map((item) => (
          <NavItem
            key={item.to}
            to={item.to}
            icon={item.icon}
            label={item.label}
            isOpen={isOpen}
          />
        ))}
      </nav>
    </div>
  );
};

export default SidebarSection;
