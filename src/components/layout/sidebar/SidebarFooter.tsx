
import React from 'react';

interface SidebarFooterProps {
  isOpen: boolean;
}

const SidebarFooter: React.FC<SidebarFooterProps> = ({ isOpen }) => {
  if (!isOpen) return null;
  
  return (
    <div className="mt-auto px-3 py-3 border-t border-sidebar-border">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-primary font-medium text-xs">SW</span>
        </div>
        <div>
          <div className="text-xs font-medium">Social Worker</div>
          <div className="text-xs text-muted-foreground">Online</div>
        </div>
      </div>
    </div>
  );
};

export default SidebarFooter;
