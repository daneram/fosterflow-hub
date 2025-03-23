
import React from 'react';
import { Button } from '@/components/ui/button';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { X } from 'lucide-react';

interface FilterHeaderProps {
  clearFilters: () => void;
}

export const FilterHeader: React.FC<FilterHeaderProps> = ({ clearFilters }) => {
  return (
    <CardHeader className="py-2.5 px-4 border-b flex-shrink-0">
      <CardTitle className="text-base flex items-center justify-between">
        Filters
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={clearFilters}
          className="h-7 px-2"
        >
          <X className="h-3.5 w-3.5 mr-[-4px]" />
          Clear
        </Button>
      </CardTitle>
    </CardHeader>
  );
};
