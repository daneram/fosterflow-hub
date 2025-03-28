import React from 'react';
import { Button } from '@/components/ui/button';
import { useSidebar } from './sidebar-context';
import { cn } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';

interface SidebarTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  hideOnMobile?: boolean;
}

export const SidebarTrigger: React.FC<SidebarTriggerProps> = ({
  className,
  hideOnMobile = false,
  ...props
}) => {
  const { 
    isOpen, 
    viewport, 
    toggle,
    isTransitioning 
  } = useSidebar();

  // Don't render on mobile if hideOnMobile is true
  if (viewport === 'mobile' && hideOnMobile) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        'h-9 w-9 shrink-0 cursor-pointer transition-transform duration-300',
        isOpen && 'rotate-180',
        isTransitioning && 'pointer-events-none',
        viewport === 'mobile' && 'absolute right-4 top-4 z-50',
        className
      )}
      onClick={toggle}
      disabled={isTransitioning}
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
      <span className="sr-only">Toggle sidebar</span>
    </Button>
  );
}; 