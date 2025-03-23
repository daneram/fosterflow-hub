
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
        "flex items-center cursor-pointer mb-4 py-2 h-10 overflow-hidden transition-all duration-300 ease-in-out",
        isOpen ? "px-2.5" : "justify-center w-10 px-0"
      )}
      onClick={onToggle}
    >
      <div className={cn(
        "flex items-center justify-center",
        isOpen ? "w-5 ml-0.5" : "w-6" // Ensure logo is centered like menu icons
      )}>
        <Avatar className="h-6 w-6 flex-shrink-0">
          <AvatarImage 
            src="/lovable-uploads/6d655b66-ad8d-445b-93e9-36d9917768dc.png" 
            alt="Indigo Fostering"
          />
          <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
            IF
          </AvatarFallback>
        </Avatar>
      </div>
      <div 
        className={cn(
          "min-w-0 ml-3 transition-all duration-300 ease-in-out",
          isOpen ? "opacity-100 max-w-full" : "opacity-0 max-w-0 overflow-hidden"
        )}
      >
        <h2 className="text-base font-semibold mb-0 whitespace-nowrap break-words hyphens-auto leading-tight">Indigo Fostering</h2>
      </div>
    </div>
  );
};

export default SidebarHeader;
