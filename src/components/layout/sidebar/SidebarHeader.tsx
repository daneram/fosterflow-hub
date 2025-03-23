
import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

interface SidebarHeaderProps {
  isOpen: boolean;
  onToggle: () => void;
}

// Global constant to ensure the URL is consistent across renders and component mounts
const LOGO_URL = "/lovable-uploads/6d655b66-ad8d-445b-93e9-36d9917768dc.png";

// Preload the image at the module level
const preloadedImage = new Image();
preloadedImage.src = LOGO_URL;

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ isOpen, onToggle }) => {
  return (
    <div className="px-2 mb-1">
      <div 
        className={cn(
          "flex items-center cursor-pointer h-10 text-sm font-medium rounded-md",
          "px-2.5"
        )}
        onClick={onToggle}
      >
        <div className="flex items-center justify-center w-6 h-6 flex-shrink-0">
          <Avatar className="h-6 w-6">
            <AvatarImage 
              src={LOGO_URL}
              alt="Indigo Fostering"
              loading="eager"
              fetchPriority="high"
              className="object-contain bg-white"
              draggable={false}
            />
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
              IF
            </AvatarFallback>
          </Avatar>
        </div>
        <div className={cn("ml-3 overflow-hidden transition-opacity duration-100", 
                        isOpen ? "opacity-100" : "opacity-0 w-0")}>
          <span className="truncate font-bold">Indigo Fostering</span>
        </div>
      </div>
      {isOpen && <Separator className="my-2 bg-sidebar-border" />}
    </div>
  );
};

export default React.memo(SidebarHeader);
