
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TypeFilter } from './filter/TypeFilter';
import { AdvancedFiltersToggle } from './filter/AdvancedFiltersToggle';
import { AdvancedFilters } from './filter/AdvancedFilters';
import { useIsMobile } from '@/hooks/use-mobile';
import { DateRangePicker } from './filter/DateRangePicker';

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
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
  const [toDate, setToDate] = useState<Date | undefined>(undefined);
  const [fromDateOpen, setFromDateOpen] = useState(false);
  const [toDateOpen, setToDateOpen] = useState(false);
  const [selectedAssignee, setSelectedAssignee] = useState<string | null>(null);
  
  const clearAdvancedFilters = () => {
    if (selectedStatus) {
      setSelectedStatus(null);
    }
    if (selectedAssignee) {
      setSelectedAssignee(null);
    }
  };
  
  return (
    <Card className="shadow-sm border border-border/60">
      <CardContent className={isMobile ? "px-3 pb-3 pt-4" : "px-3 py-3"}>
        <div className="flex flex-col space-y-4">
          {/* Top row with type filters */}
          <div className={isMobile ? "flex flex-col justify-center space-y-4" : "flex items-center justify-between gap-3"}>
            {/* Type filter */}
            <div className={isMobile ? "flex justify-center" : ""}>
              <TypeFilter selectedType={selectedType} setSelectedType={setSelectedType} />
            </div>
            
            {/* Advanced toggle - only shown on desktop here */}
            {!isMobile && (
              <div>
                <AdvancedFiltersToggle 
                  isAdvancedSearchOpen={isAdvancedSearchOpen} 
                  setIsAdvancedSearchOpen={setIsAdvancedSearchOpen}
                  clearAdvancedFilters={clearAdvancedFilters} 
                />
              </div>
            )}
          </div>
          
          {/* Date pickers row */}
          <DateRangePicker 
            fromDate={fromDate}
            setFromDate={setFromDate}
            toDate={toDate}
            setToDate={setToDate}
            fromDateOpen={fromDateOpen}
            setFromDateOpen={setFromDateOpen}
            toDateOpen={toDateOpen}
            setToDateOpen={setToDateOpen}
          />
          
          {/* Advanced toggle for mobile - placed after date pickers */}
          {isMobile && (
            <div className="w-full mt-2">
              <AdvancedFiltersToggle 
                isAdvancedSearchOpen={isAdvancedSearchOpen} 
                setIsAdvancedSearchOpen={setIsAdvancedSearchOpen}
                clearAdvancedFilters={clearAdvancedFilters} 
              />
            </div>
          )}
        </div>
        
        {/* Advanced Filters Panel */}
        <div className={`${isAdvancedSearchOpen ? 'mt-4 animate-fade-in' : 'mt-0'}`}>
          <AdvancedFilters 
            isOpen={isAdvancedSearchOpen} 
            selectedStatus={selectedStatus} 
            setSelectedStatus={setSelectedStatus}
            selectedAssignee={selectedAssignee}
            setSelectedAssignee={setSelectedAssignee}
          />
        </div>
      </CardContent>
    </Card>
  );
};
