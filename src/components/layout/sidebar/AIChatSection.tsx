
import React from 'react';
import BotItem from './BotItem';
import { Bot } from 'lucide-react';

interface AIChatSectionProps {
  isOpen: boolean;
  onNavItemClick?: () => void;
}

const AIChatSection: React.FC<AIChatSectionProps> = ({ isOpen, onNavItemClick }) => {
  return (
    <div className="mb-4">
      <nav className="space-y-1 px-2">
        <BotItem to="/ai-assistant" icon={Bot} label="FosterNotes AI" isOpen={isOpen} onClick={onNavItemClick} />
      </nav>
    </div>
  );
};

export default AIChatSection;
