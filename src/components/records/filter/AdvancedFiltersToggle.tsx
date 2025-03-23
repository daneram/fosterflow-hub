
import React from 'react';
import { Button } from '@/components/ui/button';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';

interface AdvancedFiltersToggleProps {
  isAdvancedSearchOpen: boolean;
  setIsAdvancedSearchOpen: (open: boolean) => void;
}

export const AdvancedFiltersToggle: React.FC<AdvancedFiltersToggleProps> = ({
  isAdvancedSearchOpen,
  setIsAdvancedSearchOpen
}) => {
  return (
    <Button 
      variant="outline" 
      size="sm" 
      className="h-8 bg-background hover:bg-accent w-full justify-between"
      onClick={() => setIsAdvancedSearchOpen(!isAdvancedSearchOpen)}
    >
      <div className="flex items-center">
        <Filter className="h-3.5 w-3.5 mr-1.5" />
        Advanced Filters
      </div>
      {isAdvancedSearchOpen ? (
        <ChevronUp className="h-3.5 w-3.5" />
      ) : (
        <ChevronDown className="h-3.5 w-3.5" />
      )}
    </Button>
  );
};
