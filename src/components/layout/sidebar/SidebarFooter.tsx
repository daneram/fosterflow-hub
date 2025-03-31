import React from 'react';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarFooterProps {
  isOpen: boolean;
}

const SidebarFooter: React.FC<SidebarFooterProps> = ({ isOpen }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="mt-auto">
      <Separator className="mb-1 bg-sidebar-border" />
      <div className={cn(
        "py-2",
        isMobile ? "pl-[14px] pr-3" : "pl-[12px] pr-3",
        "flex items-center",
        "h-[40px]"
      )}>
        <div className={cn(
          "w-7 h-7",
          "rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0"
        )}>
          <span className="text-primary font-medium text-xs">SW</span>
        </div>
        <div className={cn(
          "overflow-hidden transition-all duration-300",
          "flex items-center",
          isOpen && (
            isMobile 
              ? "ml-[10px] opacity-100 w-auto"
              : "ml-2 opacity-100 w-auto"
          ),
          !isOpen && "w-0 opacity-0 ml-0"
        )}>
          <span className="text-sm font-medium text-black">Social Worker</span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(SidebarFooter, (prevProps, nextProps) => {
  return prevProps.isOpen === nextProps.isOpen;
});
