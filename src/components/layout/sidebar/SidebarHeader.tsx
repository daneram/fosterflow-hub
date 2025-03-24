
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSidebar } from '@/components/ui/sidebar';

interface SidebarHeaderProps {
  isOpen: boolean;
  onToggle: () => void;
}

// Global constant for the logo URL
const LOGO_URL = "/lovable-uploads/6d655b66-ad8d-445b-93e9-36d9917768dc.png";

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ isOpen, onToggle }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const isMobile = useIsMobile();
  
  // Handle image loading
  useEffect(() => {
    // Create an image object to check if it's already in browser cache
    const img = new Image();
    
    const handleLoad = () => {
      setImageLoaded(true);
    };
    
    // If image is already complete (cached), set loaded state immediately
    if (img.complete) {
      setImageLoaded(true);
    } else {
      img.onload = handleLoad;
    }
    
    img.src = LOGO_URL;
    
    return () => {
      img.onload = null;
    };
  }, []);

  // Clear and direct logo click handler
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('[SidebarHeader] Logo clicked, calling onToggle');
    onToggle();
  };
  
  return (
    <div className="mb-0">
      <div 
        className={cn(
          "flex items-center cursor-pointer h-10 text-sm font-medium",
          "pl-4 pr-3" // Adjusted padding to match NavItems
        )}
        onClick={handleLogoClick}
      >
        <div className="flex items-center justify-center w-5 h-5 flex-shrink-0">
          <Avatar className="h-6 w-6">
            {imageLoaded ? (
              <AvatarImage 
                ref={imageRef}
                src={LOGO_URL}
                alt="Indigo Fostering"
                loading="eager"
                className="object-contain bg-white"
                draggable={false}
                onLoad={() => setImageLoaded(true)}
              />
            ) : (
              <AvatarFallback className="bg-white">
                <img 
                  src={LOGO_URL} 
                  alt="Indigo Fostering"
                  className="h-full w-full object-contain"
                  style={{ visibility: imageLoaded ? 'visible' : 'hidden' }}
                  onLoad={() => setImageLoaded(true)}
                  draggable={false}
                />
              </AvatarFallback>
            )}
          </Avatar>
        </div>
        <div className={cn("ml-3 overflow-hidden transition-opacity duration-100", 
                         isOpen ? "opacity-100" : "opacity-0 w-0")}>
          <span className="truncate font-bold">Indigo Fostering</span>
        </div>
      </div>
      {isOpen && <Separator className="my-0.5 bg-sidebar-border" />}
    </div>
  );
};

export default React.memo(SidebarHeader, (prevProps, nextProps) => {
  return prevProps.isOpen === nextProps.isOpen;
});
