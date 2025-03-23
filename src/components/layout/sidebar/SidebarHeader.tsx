
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
        "flex items-center cursor-pointer mb-4 h-10 px-2.5"
      )}
      onClick={onToggle}
    >
      <div className="flex items-center justify-center w-6 h-6 flex-shrink-0">
        <Avatar className="h-5 w-5">
          <AvatarImage 
            src="/lovable-uploads/6d655b66-ad8d-445b-93e9-36d9917768dc.png" 
            alt="Indigo Fostering"
          />
          <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
            IF
          </AvatarFallback>
        </Avatar>
      </div>
      <div className={cn("ml-3 overflow-hidden transition-opacity duration-100", 
                         isOpen ? "opacity-100" : "opacity-0 w-0")}>
        <h2 className="text-base font-semibold whitespace-nowrap">Indigo Fostering</h2>
      </div>
    </div>
  );
};

export default SidebarHeader;
