
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
    <Card className="shadow-sm bg-card/80 backdrop-blur-sm">
      <FilterHeader clearFilters={clearFilters} />
      <CardContent className="py-3">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Left column - Quick filters and favorites */}
          <div className="md:col-span-1">
            <div className="space-y-3">
              <QuickFilterChips 
                showFavoritesOnly={showFavoritesOnly}
                setShowFavoritesOnly={setShowFavoritesOnly}
                setSelectedStatus={setSelectedStatus}
                setSelectedType={setSelectedType}
              />
              
              <SavedFiltersSection onSelectPreset={onSelectPreset} />
            </div>
          </div>
          
          {/* Middle columns - Type and Status filters */}
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TypeFilter 
                selectedType={selectedType}
                setSelectedType={setSelectedType}
              />
              
              <StatusFilter
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
              />
            </div>
          </div>
          
          {/* Right column - Advanced toggle and filters */}
          <div className="md:col-span-1 flex flex-col justify-between">
            <div className="mt-auto">
              <AdvancedFiltersToggle 
                isAdvancedSearchOpen={isAdvancedSearchOpen}
                setIsAdvancedSearchOpen={setIsAdvancedSearchOpen}
              />
            </div>
          </div>
        </div>
        
        {/* Advanced Filters Panel */}
        <div className="mt-4 animate-fade-in">
          <AdvancedFilters isOpen={isAdvancedSearchOpen} />
        </div>
      </CardContent>
    </Card>
  );
};
