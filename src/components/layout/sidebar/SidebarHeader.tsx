
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
        "flex items-center cursor-pointer transition-all duration-300 ease-in-out mb-4",
        isOpen ? "px-3" : "justify-center"
      )}
      onClick={onToggle}
    >
      {isOpen ? (
        <>
          <Avatar className="w-7 h-7 mr-2">
            <AvatarImage 
              src="/lovable-uploads/6d655b66-ad8d-445b-93e9-36d9917768dc.png" 
              alt="Indigo Fostering"
            />
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
              IF
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0 transition-opacity duration-300 ease-in-out">
            <h2 className="text-base font-semibold mb-0 truncate">Indigo Fostering</h2>
          </div>
        </>
      ) : (
        <Avatar className="w-7 h-7 transition-all duration-300 ease-in-out">
          <AvatarImage 
            src="/lovable-uploads/6d655b66-ad8d-445b-93e9-36d9917768dc.png" 
            alt="Indigo Fostering"
          />
          <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
            IF
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default SidebarHeader;
