
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ViewMode } from '../types';
import { months, getWeekStartDate, getWeekEndDate, daysOfWeek } from '../utils/dateUtils';

interface CalendarHeaderProps {
  currentDate: Date;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onPrevious: () => void;
  onNext: () => void;
  onToday: () => void;
  onNewEvent: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  viewMode,
  onViewModeChange,
  onPrevious,
  onNext,
  onToday,
  onNewEvent
}) => {
  const getHeaderText = () => {
    if (viewMode === 'month') {
      return `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    } else if (viewMode === 'week') {
      return `${months[getWeekStartDate(currentDate).getMonth()]} ${getWeekStartDate(currentDate).getDate()} - ${months[getWeekEndDate(currentDate).getMonth()]} ${getWeekEndDate(currentDate).getDate()}, ${currentDate.getFullYear()}`;
    } else {
      return `${daysOfWeek[currentDate.getDay()]}, ${months[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <Button size="sm" onClick={onToday} className="h-8">Today</Button>
          <Button variant="outline" size="icon" onClick={onPrevious} className="h-8 w-8">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={onNext} className="h-8 w-8">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="text-sm font-medium">
          {getHeaderText()}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Tabs defaultValue={viewMode} onValueChange={(value) => onViewModeChange(value as ViewMode)}>
          <TabsList className="h-8">
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="day">Day</TabsTrigger>
          </TabsList>
        </Tabs>
        <Button size="sm" className="h-8" onClick={onNewEvent}>
          <ChevronLeft className="h-4 w-4 mr-1" />
          New Event
        </Button>
      </div>
    </>
  );
};

export default CalendarHeader;
