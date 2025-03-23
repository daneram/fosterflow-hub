
import { ReactElement } from 'react';

export interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  isOpen: boolean;
  onClick?: () => void;
}

export interface BotItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  isOpen: boolean;
  onClick?: () => void;
}

export interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onNavItemClick?: () => void;
  toggleAiChat?: () => void;
  isMobile?: boolean;
}

export interface SidebarSectionProps {
  title: string;
  isOpen: boolean;
  onNavItemClick?: () => void;
  items: Array<{
    to: string;
    icon: React.ElementType;
    label: string;
  }>;
}
