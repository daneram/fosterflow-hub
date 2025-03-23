
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
        "flex items-center cursor-pointer mb-4 transition-all duration-300 ease-in-out h-10",
        isOpen ? "px-2.5" : "px-0 justify-center w-full"
      )}
      onClick={onToggle}
    >
      <div className={cn(
        "flex items-center justify-center", 
        isOpen ? "w-5 h-5" : "w-6 h-6"
      )}>
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
      <div 
        className={cn(
          "ml-3 transition-all duration-300 ease-in-out overflow-hidden",
          isOpen ? "opacity-100 max-w-full" : "opacity-0 max-w-0"
        )}
      >
        <h2 className="text-base font-semibold whitespace-nowrap">Indigo Fostering</h2>
      </div>
    </div>
  );
};

export default SidebarHeader;
