
import React from 'react';
import { Button } from '@/components/ui/button';
import { CardHeader, CardTitle } from '@/components/ui/card';

interface FilterHeaderProps {
  clearFilters: () => void;
}

export const FilterHeader: React.FC<FilterHeaderProps> = ({ clearFilters }) => {
  return (
    <CardHeader className="py-3 flex-shrink-0">
      <CardTitle className="text-lg flex items-center justify-between">
        Filters
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={clearFilters}
        >
          Clear
        </Button>
      </CardTitle>
    </CardHeader>
  );
};
