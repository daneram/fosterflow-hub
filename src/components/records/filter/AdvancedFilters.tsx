
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdvancedFiltersProps {
  isOpen: boolean;
}

export const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({ isOpen }) => {
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
  const [toDate, setToDate] = useState<Date | undefined>(undefined);
  const [fromDateOpen, setFromDateOpen] = useState(false);
  const [toDateOpen, setToDateOpen] = useState(false);
  
  if (!isOpen) return null;
  
  return (
    <div className="space-y-3 pt-2">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Date Range</h3>
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
                  <CalendarIcon className="mr-1 h-3.5 w-3.5 opacity-70" />
                  {fromDate ? (
                    <span className="truncate text-xs md:text-sm">{format(fromDate, "PPP")}</span>
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
                  <CalendarIcon className="mr-1 h-3.5 w-3.5 opacity-70" />
                  {toDate ? (
                    <span className="truncate text-xs md:text-sm">{format(toDate, "PPP")}</span>
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
        <h3 className="text-sm font-medium">Assigned To</h3>
        <Select>
          <SelectTrigger className="h-8">
            <SelectValue placeholder="Select user" />
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
        <h3 className="text-sm font-medium">Compliance Status</h3>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">Complete</Button>
          <Button variant="outline" size="sm">Incomplete</Button>
          <Button variant="outline" size="sm">Overdue</Button>
        </div>
      </div>
      
      <div className="pt-2">
        <Button size="sm" className="w-full">Apply Filters</Button>
      </div>
    </div>
  );
};
