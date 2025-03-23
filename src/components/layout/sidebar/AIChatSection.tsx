
import React from 'react';
import BotItem from './BotItem';
import { Bot } from 'lucide-react';

interface AIChatSectionProps {
  isOpen: boolean;
  onNavItemClick?: () => void;
}

const AIChatSection: React.FC<AIChatSectionProps> = ({ isOpen, onNavItemClick }) => {
  return (
    <>
      {isOpen && <div className="text-xs font-medium text-muted-foreground mb-1.5">FOSTERNOTES AI</div>}
      <nav className="space-y-0.5 mb-4">
        <BotItem to="/ai-assistant" icon={Bot} label="FosterNotes AI" isOpen={isOpen} onClick={onNavItemClick} />
      </nav>
    </>
  );
};

export default AIChatSection;
