import React from 'react';
import BotItem from './BotItem';
import { Bot } from 'lucide-react';

interface AIChatSectionProps {
  isOpen: boolean;
  onNavItemClick?: () => void;
}

const AIChatSection: React.FC<AIChatSectionProps> = ({ isOpen, onNavItemClick }) => {
  return (
    <div className="py-0.5">
      <nav className="flex flex-col">
        <BotItem 
          to="/ai-assistant" 
          icon={Bot} 
          label="FosterNotes AI" 
          isOpen={isOpen} 
          onClick={onNavItemClick}
          fontBold={true}
        />
      </nav>
    </div>
  );
};

export default AIChatSection;
