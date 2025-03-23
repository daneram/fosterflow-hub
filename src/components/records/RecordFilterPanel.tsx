
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
  clearFilters: () => void;
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
  onSelectPreset,
  clearFilters
}) => {
  return (
    <Card className="shadow-sm border border-border/60">
      <FilterHeader clearFilters={clearFilters} />
      <CardContent className="p-3">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
          {/* Quick filters and favorites - Takes less space */}
          <div className="lg:col-span-3">
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
          
          {/* Type and Status filters - Takes more space */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
          
          {/* Advanced toggle - Takes less space */}
          <div className="lg:col-span-2 flex items-end">
            <div className="w-full">
              <AdvancedFiltersToggle 
                isAdvancedSearchOpen={isAdvancedSearchOpen}
                setIsAdvancedSearchOpen={setIsAdvancedSearchOpen}
              />
            </div>
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
