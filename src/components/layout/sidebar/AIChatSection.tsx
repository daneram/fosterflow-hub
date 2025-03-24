
import React from 'react';
import BotItem from './BotItem';
import { Bot } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

interface AIChatSectionProps {
  isOpen: boolean;
  onNavItemClick?: () => void;
}

const AIChatSection: React.FC<AIChatSectionProps> = ({ isOpen, onNavItemClick }) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  // On desktop, don't show the AI assistant in the sidebar
  if (!isMobile) {
    return null;
  }
  
  // Only show the menu item on mobile
  return (
    <div className="py-1">
      <nav className="flex flex-col gap-1">
        <BotItem to="/ai-assistant" icon={Bot} label="FosterNotes AI" isOpen={isOpen} onClick={onNavItemClick} />
      </nav>
    </div>
  );
};

export default AIChatSection;
