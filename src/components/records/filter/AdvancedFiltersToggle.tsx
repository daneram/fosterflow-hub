
import React from 'react';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';

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
      className="h-8"
      onClick={() => setIsAdvancedSearchOpen(!isAdvancedSearchOpen)}
    >
      <Filter className="h-4 w-4 mr-1" />
      Advanced Filters
    </Button>
  );
};
