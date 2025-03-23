
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FilterHeader } from './filter/FilterHeader';
import { TypeFilter } from './filter/TypeFilter';
import { AdvancedFiltersToggle } from './filter/AdvancedFiltersToggle';
import { AdvancedFilters } from './filter/AdvancedFilters';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();
  
  const handleClearFilters = () => {
    clearFilters();
    if (isAdvancedSearchOpen) {
      setIsAdvancedSearchOpen(false);
    }
  };
  
  return <Card className="shadow-sm border border-border/60">
      <FilterHeader clearFilters={handleClearFilters} />
      <CardContent className="px-3 py-4">
        {isMobile ? (
          <div className="flex flex-col justify-center space-y-4">
            {/* Center type filters on mobile */}
            <div className="flex justify-center">
              <TypeFilter selectedType={selectedType} setSelectedType={setSelectedType} />
            </div>
            
            {/* Advanced toggle - Full width on mobile */}
            <div className="w-full">
              <AdvancedFiltersToggle isAdvancedSearchOpen={isAdvancedSearchOpen} setIsAdvancedSearchOpen={setIsAdvancedSearchOpen} />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-3">
            {/* Type filter */}
            <div>
              <TypeFilter selectedType={selectedType} setSelectedType={setSelectedType} />
            </div>
            
            {/* Advanced toggle - Right side on desktop */}
            <div>
              <AdvancedFiltersToggle isAdvancedSearchOpen={isAdvancedSearchOpen} setIsAdvancedSearchOpen={setIsAdvancedSearchOpen} />
            </div>
          </div>
        )}
        
        {/* Advanced Filters Panel */}
        <div className={`mt-3 ${isAdvancedSearchOpen ? 'animate-fade-in' : ''}`}>
          <AdvancedFilters isOpen={isAdvancedSearchOpen} selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} />
        </div>
      </CardContent>
    </Card>;
};
