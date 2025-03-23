
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
      <CardContent className="space-y-4">
        {/* Quick Filter Chips */}
        <QuickFilterChips 
          showFavoritesOnly={showFavoritesOnly}
          setShowFavoritesOnly={setShowFavoritesOnly}
          setSelectedStatus={setSelectedStatus}
          setSelectedType={setSelectedType}
        />
        
        {/* Saved Filters Section */}
        <SavedFiltersSection onSelectPreset={onSelectPreset} />
        
        {/* Standard Filter Sections */}
        <TypeFilter 
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />
        
        <StatusFilter
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
        />
        
        {/* Advanced Filters Toggle */}
        <AdvancedFiltersToggle 
          isAdvancedSearchOpen={isAdvancedSearchOpen}
          setIsAdvancedSearchOpen={setIsAdvancedSearchOpen}
        />
        
        {/* Advanced Filters Panel */}
        <AdvancedFilters isOpen={isAdvancedSearchOpen} />
      </CardContent>
    </Card>
  );
};
