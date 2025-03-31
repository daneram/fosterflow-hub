import React, { useState, useEffect } from 'react';
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
    const img = new Image();
    
    if (img.complete) {
      setImageLoaded(true);
    } else {
      img.onload = () => setImageLoaded(true);
      img.onerror = () => console.warn("Failed to load logo image");
    }
    
    img.src = LOGO_URL;
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, []);
  
  // Handle the toggle specifically for the header
  const handleHeaderToggle = () => {
    onToggle();
  };
  
  return (
    <div className="mb-0">
      <div 
        className={cn(
          "flex items-center cursor-pointer font-medium",
          isMobile ? "h-11" : "h-12", // Slightly smaller height on mobile
          "pl-3.5 pr-3",
          "flex items-center",
          // Remove transition for mobile
          !isMobile && "transition-opacity duration-100"
        )}
        onClick={handleHeaderToggle}
      >
        <div className={cn(
          "flex items-center justify-center",
          isMobile ? "h-9" : "h-10", // Slightly smaller height on mobile
          // Remove transition for mobile
          !isMobile && "transition-opacity duration-300"
        )}>
          <Avatar className={cn(
            "flex items-center justify-center", 
            isMobile ? "h-6 w-6" : "h-7 w-7" // Slightly smaller avatar on mobile
          )}>
            {imageLoaded ? (
              <AvatarImage 
                src={LOGO_URL}
                alt="Indigo Fostering"
                loading="eager"
                className="object-contain bg-white p-0.5"
                draggable={false}
              />
            ) : (
              <AvatarFallback className="bg-white flex items-center justify-center">
                <img 
                  src={LOGO_URL} 
                  alt="Indigo Fostering"
                  className="h-full w-full object-contain p-0.5"
                  style={{ visibility: imageLoaded ? 'visible' : 'hidden' }}
                  onLoad={() => setImageLoaded(true)}
                  draggable={false}
                />
              </AvatarFallback>
            )}
          </Avatar>
        </div>
        
        {/* Text container - no transitions on mobile */}
        <div className={cn(
          "overflow-hidden",
          // Only apply transitions on desktop
          !isMobile && "transition-all duration-300",
          isOpen 
            ? isMobile 
              ? "ml-3.5 w-auto" // Mobile: no transitions
              : "ml-[10px] opacity-100 w-auto" // Desktop: keep transitions
            : isMobile
              ? "w-0 absolute" // Mobile: no transitions or opacity
              : "w-0 opacity-0 absolute pointer-events-none" // Desktop: keep transitions
        )}>
          <span className="text-sm font-medium truncate text-black">Indigo Fostering</span>
        </div>
      </div>
      
      {/* Always show separator */}
      <Separator className="mt-1 mb-0" />
    </div>
  );
};

// Use React.memo with custom comparison to prevent unnecessary re-renders
export default React.memo(SidebarHeader, (prevProps, nextProps) => {
  // Only re-render if isOpen changes
  return prevProps.isOpen === nextProps.isOpen;
});
