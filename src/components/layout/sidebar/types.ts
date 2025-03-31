import { LucideIcon } from 'lucide-react';

export interface NavItemProps {
  to: string;
  icon: LucideIcon;
  label: string;
  isOpen: boolean;
  onClick?: (to: string) => void;
}

export interface BotItemProps {
  to: string;
  icon: LucideIcon;
  label: string;
  isOpen: boolean;
  onClick?: (to: string) => void;
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
  onNavItemClick?: (to: string) => void;
}

export interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onNavItemClick?: (to: string) => void;
  toggleAiChat?: () => void;
  isMobile: boolean;
}
