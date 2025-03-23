
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface SidebarHeaderProps {
  isOpen: boolean;
  onToggle: () => void;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ isOpen, onToggle }) => {
  return (
    <div 
      className={cn(
        "px-2 py-1.5 flex items-center cursor-pointer",
        !isOpen && "justify-center"
      )}
      onClick={onToggle}
    >
      {isOpen ? (
        <>
          <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center mr-2">
            <span className="text-primary font-medium text-xs">FF</span>
          </div>
          <div>
            <h2 className="text-base font-semibold mb-0">FosterFlow</h2>
            <p className="text-xs text-muted-foreground">Case Management</p>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-5 w-5 ml-auto"
            onClick={onToggle}
          >
            <ChevronRight className="h-3 w-3" />
          </Button>
        </>
      ) : (
        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-primary font-medium text-xs">FF</span>
        </div>
      )}
    </div>
  );
};

export default SidebarHeader;
