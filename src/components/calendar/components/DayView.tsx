
import React from 'react';
import { CalendarEvent } from '../types';
import { daysOfWeek, months, formatTime, isSameDay, getEventTypeColor } from '../utils/dateUtils';
import { MapPin } from 'lucide-react';

interface DayViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
}

const DayView: React.FC<DayViewProps> = ({ currentDate, events, onEventClick }) => {
  const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 7 PM
  
  return (
    <div className="bg-card border rounded-lg overflow-auto max-h-[calc(100vh-270px)]">
      <div className="sticky top-0 z-10 bg-card p-4 text-center border-b">
        <div className="text-lg">{daysOfWeek[currentDate.getDay()]}</div>
        <div className="text-3xl font-bold">
          {currentDate.getDate()} {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </div>
      </div>

      <div className="grid grid-cols-1">
        {hours.map((hour) => (
          <div key={hour} className="grid grid-cols-5 border-b">
            <div className="col-span-1 border-r p-3 text-right">
              {hour % 12 === 0 ? 12 : hour % 12}{hour < 12 ? 'am' : 'pm'}
            </div>
            <div className="col-span-4 relative min-h-[100px]">
              {events
                .filter(event => 
                  isSameDay(event.start, currentDate) && 
                  event.start.getHours() === hour
                )
                .map((event) => (
                  <div
                    key={event.id}
                    className={`m-1 p-2 rounded text-white cursor-pointer ${getEventTypeColor(event.type)}`}
                    style={{
                      position: 'absolute',
                      top: `${(event.start.getMinutes() / 60) * 100}%`,
                      height: `${Math.max(30, ((event.end.getTime() - event.start.getTime()) / (1000 * 60 * 60)) * 100)}%`,
                      width: 'calc(100% - 0.5rem)',
                    }}
                    onClick={() => onEventClick(event)}
                  >
                    <div className="font-medium">{event.title}</div>
                    <div className="text-sm">{formatTime(event.start)} - {formatTime(event.end)}</div>
                    {event.location && (
                      <div className="text-sm flex items-center mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {event.location}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DayView;
