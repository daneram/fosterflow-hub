
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TypeFilter } from './filter/TypeFilter';
import { AdvancedFiltersToggle } from './filter/AdvancedFiltersToggle';
import { AdvancedFilters } from './filter/AdvancedFilters';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { CalendarIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  
  const clearAdvancedFilters = () => {
    // Clear filters but only status for now as it's part of advanced filters
    if (selectedStatus) {
      setSelectedStatus(null);
    }
  };

  // Clear from date handler
  const clearFromDate = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent popover from opening
    setFromDate(undefined);
    setFromDateOpen(false); // Also ensure the popover is closed
  };

  // Clear to date handler
  const clearToDate = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent popover from opening
    setToDate(undefined);
    setToDateOpen(false); // Also ensure the popover is closed
  };

  // Format date based on device type
  const formatDateDisplay = (date: Date) => {
    if (isMobile) {
      return format(date, "dd/MM/yy");
    }
    return format(date, "dd MMMM yyyy");
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
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Popover open={fromDateOpen} onOpenChange={setFromDateOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full h-9 justify-start text-left font-normal relative",
                      !fromDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
                    {fromDate ? (
                      <span>{formatDateDisplay(fromDate)}</span>
                    ) : (
                      "From"
                    )}
                    {fromDate && (
                      <div 
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer z-10"
                        onClick={clearFromDate}
                      >
                        <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                      </div>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={fromDate}
                    onSelect={(date) => {
                      setFromDate(date);
                      setFromDateOpen(false);
                    }}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Popover open={toDateOpen} onOpenChange={setToDateOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full h-9 justify-start text-left font-normal relative",
                      !toDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
                    {toDate ? (
                      <span>{formatDateDisplay(toDate)}</span>
                    ) : (
                      "To"
                    )}
                    {toDate && (
                      <div 
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer z-10"
                        onClick={clearToDate}
                      >
                        <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                      </div>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={toDate}
                    onSelect={(date) => {
                      setToDate(date);
                      setToDateOpen(false);
                    }}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
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
          <AdvancedFilters isOpen={isAdvancedSearchOpen} selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} />
        </div>
      </CardContent>
    </Card>
  );
};
