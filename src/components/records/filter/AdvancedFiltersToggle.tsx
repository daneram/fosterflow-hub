import React from 'react';
import { Button } from '@/components/ui/button';
import { Filter, ChevronDown, X } from 'lucide-react';

interface AdvancedFiltersToggleProps {
  isAdvancedSearchOpen: boolean;
  setIsAdvancedSearchOpen: (open: boolean) => void;
  clearAdvancedFilters: () => void;
}

export const AdvancedFiltersToggle: React.FC<AdvancedFiltersToggleProps> = ({
  isAdvancedSearchOpen,
  setIsAdvancedSearchOpen,
  clearAdvancedFilters
}) => {
  const handleToggleClick = () => {
    if (isAdvancedSearchOpen) {
      clearAdvancedFilters();
      setIsAdvancedSearchOpen(false);
    } else {
      setIsAdvancedSearchOpen(!isAdvancedSearchOpen);
    }
  };

  return (
    <Button 
      variant={isAdvancedSearchOpen ? "default" : "outline"}
      size="sm" 
      className="h-8 w-full justify-between py-1 pl-8 relative"
      onClick={handleToggleClick}
    >
      <div className="flex items-center">
        <Filter className="h-3.5 w-3.5 absolute left-2.5 top-1/2 -translate-y-1/2" />
        <span className="pl-0 mt-[1px]">Management Filters</span>
      </div>
      {isAdvancedSearchOpen ? (
        <X className="h-3.5 w-3.5" />
      ) : (
        <ChevronDown className="h-3.5 w-3.5" />
      )}
    </Button>
  );
};
