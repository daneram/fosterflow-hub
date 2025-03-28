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
    <div className="mb-0.5">
      <div 
        className={cn(
          "flex items-center cursor-pointer font-medium",
          "h-10 pl-3.5 pr-3",
          "flex items-center",
          "transition-opacity duration-100",
          isMobile && !isOpen && "opacity-0"
        )}
        onClick={handleHeaderToggle}
      >
        <div className={cn(
          "flex items-center justify-center h-9",
          "transition-opacity duration-300",
          isMobile && !isOpen && "opacity-0"
        )}>
          <Avatar className="h-6 w-6 flex items-center justify-center">
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
        
        {/* Text container with consistent spacing */}
        <div className={cn(
          "overflow-hidden transition-all duration-300",
          isOpen 
            ? "ml-3 opacity-100 w-auto" 
            : "w-0 opacity-0 absolute pointer-events-none"
        )}>
          <span className="text-sm font-medium truncate text-black">Indigo Fostering</span>
        </div>
      </div>
      
      {/* Only show separator when sidebar is open */}
      {isOpen && (
        <Separator className="my-1" />
      )}
    </div>
  );
};

// Use React.memo with custom comparison to prevent unnecessary re-renders
export default React.memo(SidebarHeader, (prevProps, nextProps) => {
  // Only re-render if isOpen changes
  return prevProps.isOpen === nextProps.isOpen;
});
