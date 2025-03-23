
import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface SidebarHeaderProps {
  isOpen: boolean;
  onToggle: () => void;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ isOpen, onToggle }) => {
  return (
    <div 
      className={cn(
        "flex items-center cursor-pointer mb-4 h-10",
        isOpen ? "justify-between" : "justify-center"
      )}
      onClick={onToggle}
    >
      <div className="flex items-center">
        <div className="flex items-center justify-center w-6 h-6">
          <Avatar className="h-6 w-6">
            <AvatarImage 
              src="/lovable-uploads/6d655b66-ad8d-445b-93e9-36d9917768dc.png" 
              alt="Indigo Fostering"
            />
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
              IF
            </AvatarFallback>
          </Avatar>
        </div>
        {isOpen && (
          <div className="ml-3 overflow-hidden">
            <h2 className="text-base font-semibold whitespace-nowrap">Indigo Fostering</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarHeader;
