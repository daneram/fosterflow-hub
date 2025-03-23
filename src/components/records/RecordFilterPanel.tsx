
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FilterHeader } from './filter/FilterHeader';
import { QuickFilterChips } from './filter/QuickFilterChips';
import { SavedFiltersSection } from './filter/SavedFiltersSection';
import { TypeFilter } from './filter/TypeFilter';
import { StatusFilter } from './filter/StatusFilter';
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
}

export const RecordFilterPanel: React.FC<RecordFilterPanelProps> = ({
  selectedType,
  setSelectedType,
  selectedStatus,
  setSelectedStatus,
  showFavoritesOnly,
  setShowFavoritesOnly,
  isAdvancedSearchOpen,
  setIsAdvancedSearchOpen,
  onSelectPreset
}) => {
  const clearFilters = () => {
    setSelectedType(null);
    setSelectedStatus(null);
    setShowFavoritesOnly(false);
  };

  return (
    <Card>
      <FilterHeader clearFilters={clearFilters} />
      <CardContent>
        <div className="flex flex-wrap gap-4">
          {/* Quick Filter Chips */}
          <div className="flex-shrink-0">
            <QuickFilterChips 
              showFavoritesOnly={showFavoritesOnly}
              setShowFavoritesOnly={setShowFavoritesOnly}
              setSelectedStatus={setSelectedStatus}
              setSelectedType={setSelectedType}
            />
          </div>
          
          {/* Type Filter */}
          <div className="flex-shrink-0">
            <TypeFilter 
              selectedType={selectedType}
              setSelectedType={setSelectedType}
            />
          </div>
          
          {/* Status Filter */}
          <div className="flex-shrink-0">
            <StatusFilter
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
            />
          </div>
          
          {/* Saved Filters Section */}
          <div className="flex-shrink-0">
            <SavedFiltersSection onSelectPreset={onSelectPreset} />
          </div>
          
          {/* Advanced Filters Toggle */}
          <div className="flex-shrink-0 flex items-end">
            <AdvancedFiltersToggle 
              isAdvancedSearchOpen={isAdvancedSearchOpen}
              setIsAdvancedSearchOpen={setIsAdvancedSearchOpen}
            />
          </div>
        </div>
        
        {/* Advanced Filters Panel */}
        <div className="mt-4">
          <AdvancedFilters isOpen={isAdvancedSearchOpen} />
        </div>
      </CardContent>
    </Card>
  );
};
