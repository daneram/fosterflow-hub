
import React from 'react';
import { CalendarEvent } from '../types';
import { daysOfWeek, getWeekStartDate, formatTime, isSameDay, getEventTypeColor } from '../utils/dateUtils';

interface WeekViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
}

const WeekView: React.FC<WeekViewProps> = ({ currentDate, events, onEventClick }) => {
  const startDate = getWeekStartDate(currentDate);
  const weekDays = [];
  const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 7 PM

  for (let i = 0; i < 7; i++) {
    const day = new Date(startDate);
    day.setDate(startDate.getDate() + i);
    weekDays.push(day);
  }

  return (
    <div className="bg-card border rounded-lg overflow-auto max-h-[calc(100vh-270px)]">
      <div className="grid grid-cols-8 border-b sticky top-0 z-10 bg-card">
        <div className="p-2 border-r"></div>
        {weekDays.map((day, index) => (
          <div
            key={index}
            className={`p-2 text-center font-medium border-r ${
              isSameDay(day, new Date()) ? 'bg-primary/10' : ''
            }`}
          >
            <div>{daysOfWeek[day.getDay()].slice(0, 3)}</div>
            <div className={`text-2xl ${isSameDay(day, new Date()) ? 'text-primary' : ''}`}>
              {day.getDate()}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-8">
        {hours.map((hour) => (
          <React.Fragment key={hour}>
            <div className="border-r border-b p-2 text-xs text-right pr-2">
              {hour % 12 === 0 ? 12 : hour % 12}{hour < 12 ? 'am' : 'pm'}
            </div>
            {weekDays.map((day, dayIndex) => (
              <div key={dayIndex} className="border-r border-b relative min-h-[60px]">
                {events
                  .filter(event => 
                    isSameDay(event.start, day) && 
                    event.start.getHours() === hour
                  )
                  .map((event) => (
                    <div
                      key={event.id}
                      className={`absolute mx-1 p-1 rounded text-white text-xs cursor-pointer ${getEventTypeColor(event.type)}`}
                      style={{
                        top: `${(event.start.getMinutes() / 60) * 100}%`,
                        height: `${Math.max(30, ((event.end.getTime() - event.start.getTime()) / (1000 * 60 * 60)) * 100)}%`,
                        width: 'calc(100% - 0.5rem)',
                        overflow: 'hidden'
                      }}
                      onClick={() => onEventClick(event)}
                    >
                      <div className="font-medium truncate">{event.title}</div>
                      <div className="truncate">{formatTime(event.start)} - {formatTime(event.end)}</div>
                    </div>
                  ))}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default WeekView;
