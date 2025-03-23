
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FilterHeader } from './filter/FilterHeader';
import { TypeFilter } from './filter/TypeFilter';
import { AdvancedFiltersToggle } from './filter/AdvancedFiltersToggle';
import { AdvancedFilters } from './filter/AdvancedFilters';

interface RecordFilterPanelProps {
  selectedType: string | null;
  setSelectedType: (type: string | null) => void;
  selectedStatus: string | null;
  setSelectedStatus: (status: string | null) => void;
  showFavoritesOnly: boolean;
  setShowFavoritesOnly: (show: boolean) => void;
  isAdvancedSearchOpen: boolean;
  setIsAdvancedSearchOpen: (open: boolean) => void;
  onSelectPreset: (preset: string) => void;
  clearFilters: () => void;
}

export const RecordFilterPanel: React.FC<RecordFilterPanelProps> = ({
  selectedType,
  setSelectedType,
  isAdvancedSearchOpen,
  setIsAdvancedSearchOpen,
  clearFilters
}) => {
  return (
    <Card className="shadow-sm border border-border/60">
      <FilterHeader clearFilters={clearFilters} />
      <CardContent className="p-3">
        <div className="grid grid-cols-1 gap-3">
          {/* Type filter */}
          <div>
            <TypeFilter 
              selectedType={selectedType}
              setSelectedType={setSelectedType}
            />
          </div>
          
          {/* Advanced toggle - Moved underneath */}
          <div className="w-full">
            <AdvancedFiltersToggle 
              isAdvancedSearchOpen={isAdvancedSearchOpen}
              setIsAdvancedSearchOpen={setIsAdvancedSearchOpen}
            />
          </div>
        </div>
        
        {/* Advanced Filters Panel */}
        <div className={`mt-3 ${isAdvancedSearchOpen ? 'animate-fade-in' : ''}`}>
          <AdvancedFilters isOpen={isAdvancedSearchOpen} />
        </div>
      </CardContent>
    </Card>
  );
};
