
import React from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { CalendarIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface DatePickerButtonProps {
  date: Date | undefined;
  placeholder: string;
  onDateChange: (date: Date | undefined) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DatePickerButton: React.FC<DatePickerButtonProps> = ({
  date,
  placeholder,
  onDateChange,
  open,
  setOpen
}) => {
  const isMobile = useIsMobile();
  
  // Format date based on device type
  const formatDateDisplay = (date: Date) => {
    if (isMobile) {
      return format(date, "dd/MM/yy");
    }
    return format(date, "dd MMMM yyyy");
  };
  
  // Clear date handler
  const clearDate = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent popover from opening
    onDateChange(undefined);
    setOpen(false); // Also ensure the popover is closed
  };
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full h-9 justify-start text-left font-normal relative focus:outline-none",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
          {date ? (
            <span>{formatDateDisplay(date)}</span>
          ) : (
            placeholder
          )}
          {date && (
            <div 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer z-10"
              onClick={clearDate}
            >
              <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date) => {
            onDateChange(date);
            setOpen(false);
          }}
          initialFocus
          className="pointer-events-auto focus:outline-none"
        />
      </PopoverContent>
    </Popover>
  );
};

interface DateRangePickerProps {
  fromDate: Date | undefined;
  setFromDate: (date: Date | undefined) => void;
  toDate: Date | undefined;
  setToDate: (date: Date | undefined) => void;
  fromDateOpen: boolean;
  setFromDateOpen: (open: boolean) => void;
  toDateOpen: boolean;
  setToDateOpen: (open: boolean) => void;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  fromDateOpen,
  setFromDateOpen,
  toDateOpen,
  setToDateOpen
}) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      <div>
        <DatePickerButton
          date={fromDate}
          placeholder="From"
          onDateChange={setFromDate}
          open={fromDateOpen}
          setOpen={setFromDateOpen}
        />
      </div>
      <div>
        <DatePickerButton
          date={toDate}
          placeholder="To"
          onDateChange={setToDate}
          open={toDateOpen}
          setOpen={setToDateOpen}
        />
      </div>
    </div>
  );
};
