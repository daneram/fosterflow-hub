
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
      className="h-8 bg-background hover:bg-accent"
      onClick={() => setIsAdvancedSearchOpen(!isAdvancedSearchOpen)}
    >
      <Filter className="h-4 w-4 mr-1" />
      Advanced Filters
      {isAdvancedSearchOpen ? (
        <ChevronUp className="h-4 w-4 ml-1" />
      ) : (
        <ChevronDown className="h-4 w-4 ml-1" />
      )}
    </Button>
  );
};
