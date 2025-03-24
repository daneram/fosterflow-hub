
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
  const isAIAssistantPage = location.pathname === '/ai-assistant';
  
  // Always show the sidebar item, regardless of whether we're on the AI Assistant page
  // The actual chat panel visibility is handled elsewhere
  
  return (
    <div className="py-1">
      <nav className="flex flex-col gap-1">
        <BotItem to="/ai-assistant" icon={Bot} label="FosterNotes AI" isOpen={isOpen} onClick={onNavItemClick} />
      </nav>
    </div>
  );
};

export default AIChatSection;
