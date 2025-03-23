
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface AdvancedFiltersProps {
  isOpen: boolean;
  selectedStatus: string | null;
  setSelectedStatus: (status: string | null) => void;
}

export const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({ 
  isOpen, 
  selectedStatus, 
  setSelectedStatus 
}) => {
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
  const [toDate, setToDate] = useState<Date | undefined>(undefined);
  const [fromDateOpen, setFromDateOpen] = useState(false);
  const [toDateOpen, setToDateOpen] = useState(false);
  const isMobile = useIsMobile();
  
  // Reset state when component is closed (which happens after clear filters)
  useEffect(() => {
    if (!isOpen) {
      setFromDate(undefined);
      setToDate(undefined);
    }
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  // Format date based on device type
  const formatDateDisplay = (date: Date) => {
    if (isMobile) {
      return format(date, "dd/MM/yy");
    }
    return format(date, "PPP");
  };
  
  return (
    <div className="space-y-4 py-2">
      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Popover open={fromDateOpen} onOpenChange={setFromDateOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full h-8 justify-start text-left font-normal text-xs md:text-sm",
                    !fromDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-0.5 h-3.5 w-3.5 opacity-70" />
                  {fromDate ? (
                    <span className="truncate text-xs md:text-sm">{formatDateDisplay(fromDate)}</span>
                  ) : (
                    "From"
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
                  classNames={{
                    day_selected: "bg-neutral-900 text-white hover:bg-neutral-800 hover:text-white focus:bg-neutral-900 focus:text-white"
                  }}
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
                    "w-full h-8 justify-start text-left font-normal text-xs md:text-sm",
                    !toDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-0.5 h-3.5 w-3.5 opacity-70" />
                  {toDate ? (
                    <span className="truncate text-xs md:text-sm">{formatDateDisplay(toDate)}</span>
                  ) : (
                    "To"
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
                  classNames={{
                    day_selected: "bg-neutral-900 text-white hover:bg-neutral-800 hover:text-white focus:bg-neutral-900 focus:text-white"
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <Select>
          <SelectTrigger className="h-8">
            <SelectValue placeholder="Assigned to" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Anyone</SelectItem>
            <SelectItem value="sarah">Sarah Wilson</SelectItem>
            <SelectItem value="michael">Michael Brown</SelectItem>
            <SelectItem value="emily">Emily Davis</SelectItem>
            <SelectItem value="robert">Robert Johnson</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <div className={isMobile ? "flex justify-center" : "flex flex-wrap"}>
          <div className={isMobile ? "flex flex-wrap justify-center gap-2" : "flex flex-wrap gap-2"}>
            <Button 
              variant={selectedStatus === 'complete' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSelectedStatus(selectedStatus === 'complete' ? null : 'complete')}
            >
              Compliant
            </Button>
            <Button 
              variant={selectedStatus === 'incomplete' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSelectedStatus(selectedStatus === 'incomplete' ? null : 'incomplete')}
            >
              Non-Compliant
            </Button>
            <Button 
              variant={selectedStatus === 'overdue' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSelectedStatus(selectedStatus === 'overdue' ? null : 'overdue')}
            >
              Overdue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
