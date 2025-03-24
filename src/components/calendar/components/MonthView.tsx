
import React from 'react';
import { CalendarEvent } from '../types';
import { daysOfWeek, getMonthStartDate, getMonthEndDate, getWeekStartDate, formatTime, isSameDay, getEventTypeColor } from '../utils/dateUtils';

interface MonthViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
}

const MonthView: React.FC<MonthViewProps> = ({ currentDate, events, onEventClick }) => {
  const getEventsForDate = (date: Date) => {
    return events.filter(event => isSameDay(event.start, date));
  };

  const monthStart = getMonthStartDate(currentDate);
  const monthEnd = getMonthEndDate(currentDate);
  const startDate = getWeekStartDate(monthStart);
  
  const daysInView = [];
  let day = new Date(startDate);
  
  while (day <= monthEnd || day.getDay() !== 0) {
    daysInView.push(new Date(day));
    day.setDate(day.getDate() + 1);
  }
  
  const weeks = [];
  for (let i = 0; i < daysInView.length; i += 7) {
    weeks.push(daysInView.slice(i, i + 7));
  }
  
  return (
    <div className="bg-card border rounded-lg overflow-hidden">
      <div className="grid grid-cols-7 border-b">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="p-2 text-center font-medium">
            {day.slice(0, 3)}
          </div>
        ))}
      </div>
      
      <div>
        {weeks.map((week, weekIdx) => (
          <div key={weekIdx} className="grid grid-cols-7 border-b last:border-0">
            {week.map((date, dateIdx) => (
              <div
                key={dateIdx}
                className={`border-r last:border-r-0 min-h-[120px] max-h-[150px] overflow-y-auto ${
                  date.getMonth() !== currentDate.getMonth() 
                    ? 'bg-muted/30 text-muted-foreground' 
                    : isSameDay(date, new Date()) 
                      ? 'bg-primary/10' 
                      : ''
                }`}
              >
                <div className="p-1 sticky top-0 bg-inherit z-10 border-b">
                  <span className={`text-sm font-medium ${
                    isSameDay(date, new Date()) ? 'text-primary' : ''
                  }`}>
                    {date.getDate()}
                  </span>
                </div>
                <div className="p-1 space-y-1">
                  {getEventsForDate(date).map((event) => (
                    <div
                      key={event.id}
                      className={`text-xs p-1 rounded truncate text-white cursor-pointer ${getEventTypeColor(event.type)}`}
                      onClick={() => onEventClick(event)}
                    >
                      {formatTime(event.start)} {event.title}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthView;
