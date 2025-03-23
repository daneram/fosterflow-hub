
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface SidebarHeaderProps {
  isOpen: boolean;
  onToggle: () => void;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ isOpen, onToggle }) => {
  return (
    <div 
      className={cn(
        "px-2 py-3 flex items-center cursor-pointer transition-all duration-300 ease-in-out",
        !isOpen && "justify-center"
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
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-5 w-5 ml-auto transition-opacity duration-300 ease-in-out"
            onClick={onToggle}
          >
            <ChevronRight className="h-3 w-3 transition-transform duration-300 ease-in-out" />
          </Button>
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
