import { LucideIcon } from 'lucide-react';

export interface NavItemProps {
  to: string;
  icon: LucideIcon;
  label: string;
  isOpen: boolean;
  onClick?: () => void;
}

export interface BotItemProps {
  to: string;
  icon: LucideIcon;
  label: string;
  isOpen: boolean;
  onClick?: () => void;
  fontBold?: boolean;
}

export interface SidebarSectionProps {
  title: string;
  items: {
    to: string;
    icon: LucideIcon;
    label: string;
  }[];
  isOpen: boolean;
  onNavItemClick?: () => void;
}

export interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onNavItemClick?: () => void;
  toggleAiChat?: () => void;
  isMobile: boolean;
}
