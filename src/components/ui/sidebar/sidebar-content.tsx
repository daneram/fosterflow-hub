import React from 'react';
import { cn } from '@/lib/utils';
import { useSidebar } from './sidebar-context';

interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {
  collapsible?: boolean;
}

export const SidebarContent: React.FC<SidebarContentProps> = ({
  className,
  collapsible = true,
  children,
  ...props
}) => {
  const { isOpen, viewport, isTransitioning } = useSidebar();

  return (
    <div
      className={cn(
        'flex h-full w-full flex-col overflow-hidden transition-opacity duration-300',
        viewport === 'desktop' && collapsible && !isOpen && 'opacity-0',
        isTransitioning && 'pointer-events-none',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}; 