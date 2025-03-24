
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarHeaderProps {
  isOpen: boolean;
  onToggle: () => void;
}

// Use the same logo URL constant for consistency
const LOGO_URL = "/lovable-uploads/6d655b66-ad8d-445b-93e9-36d9917768dc.png";

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ isOpen, onToggle }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const isMobile = useIsMobile();
  
  // Check if the logo is already cached on component mount
  useEffect(() => {
    // Try to get the logo URL from localStorage first
    const cachedLogoUrl = localStorage.getItem('app_logo_url') || LOGO_URL;
    
    // Check if image is already in browser cache
    const img = new Image();
    
    if (img.complete) {
      setImageLoaded(true);
    } else {
      img.onload = () => setImageLoaded(true);
      img.onerror = () => console.warn("Failed to load logo image");
    }
    
    // Set the source to trigger loading or cache check
    img.src = cachedLogoUrl;
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, []);
  
  // Handle the toggle specifically for the header
  const handleHeaderToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggle();
    
    if (isMobile) {
      console.log("Mobile logo toggle activated");
    }
  };
  
  return (
    <div className="mb-1">
      <div 
        className={cn(
          "flex items-center cursor-pointer h-10 text-sm font-medium",
          "pl-4 pr-3" // Adjusted padding to match NavItems
        )}
        onClick={handleHeaderToggle}
      >
        <div className="flex items-center justify-center w-5 h-5 flex-shrink-0">
          <Avatar className="h-6 w-6">
            {imageLoaded ? (
              <AvatarImage 
                src={LOGO_URL}
                alt="Indigo Fostering"
                loading="eager"
                className="object-contain bg-white"
                draggable={false}
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
        
        {/* Text container with consistent spacing */}
        <div className={cn(
          "ml-3 overflow-hidden transition-all duration-100",
          isOpen ? "opacity-100 max-w-[120px]" : "opacity-0 max-w-0 w-0"
        )}>
          <span className="truncate font-bold">Indigo Fostering</span>
        </div>
      </div>
      
      {/* Only render separator when sidebar is open, but maintain consistent height */}
      <div className={cn(
        "transition-all duration-100 h-2", 
        isOpen ? "opacity-100" : "opacity-0"
      )}>
        {isOpen && <Separator className="bg-sidebar-border" />}
      </div>
    </div>
  );
};

// Use React.memo with custom comparison to prevent unnecessary re-renders
export default React.memo(SidebarHeader, (prevProps, nextProps) => {
  // Only re-render if isOpen changes
  return prevProps.isOpen === nextProps.isOpen;
});
