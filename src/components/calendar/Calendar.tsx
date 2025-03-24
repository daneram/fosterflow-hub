
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { CalendarEvent, ViewMode } from './types';
import MonthView from './components/MonthView';
import WeekView from './components/WeekView';
import DayView from './components/DayView';
import CalendarHeader from './components/CalendarHeader';
import EventDialog from './components/EventDialog';
import NewEventDialog from './components/NewEventDialog';

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: 'evt1',
      title: 'Home Visit - Johnson Family',
      start: new Date(2023, 11, 15, 10, 0),
      end: new Date(2023, 11, 15, 11, 30),
      type: 'visit',
      location: '123 Main St, Anytown',
      description: 'Regular monthly home visit to check on children and home conditions.',
      participants: ['Sarah Wilson', 'Michael Rodriguez']
    },
    {
      id: 'evt2',
      title: 'Team Meeting',
      start: new Date(2023, 11, 15, 14, 0),
      end: new Date(2023, 11, 15, 15, 0),
      type: 'meeting',
      location: 'Conference Room B',
      description: 'Weekly team meeting to discuss active cases and priorities.',
      participants: ['All Case Managers', 'Supervisor']
    },
    {
      id: 'evt3',
      title: 'Court Hearing - Smith Case',
      start: new Date(2023, 11, 16, 9, 0),
      end: new Date(2023, 11, 16, 11, 0),
      type: 'court',
      location: 'County Courthouse, Room 304',
      description: 'Custody hearing for Smith children.',
      participants: ['Sarah Wilson', 'County Attorney']
    },
    {
      id: 'evt4',
      title: 'Case Review - Williams',
      start: new Date(2023, 11, 17, 13, 0),
      end: new Date(2023, 11, 17, 14, 0),
      type: 'appointment',
      location: 'Office',
      description: 'Monthly case review to assess progress against service plan goals.',
      participants: ['Michael Rodriguez', 'Dr. Thompson']
    },
    {
      id: 'evt5',
      title: 'Report Deadline',
      start: new Date(2023, 11, 18, 17, 0),
      end: new Date(2023, 11, 18, 17, 0),
      type: 'deadline',
      description: 'Quarterly reports due to state department.',
    }
  ]);
  const [isNewEventDialogOpen, setIsNewEventDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('week');

  const moveNext = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'month') {
      newDate.setMonth(newDate.getMonth() + 1);
    } else if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    setCurrentDate(newDate);
  };

  const movePrevious = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'month') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setDate(newDate.getDate() - 1);
    }
    setCurrentDate(newDate);
  };

  const moveToday = () => {
    setCurrentDate(new Date());
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
  };

  return (
    <div className="w-full space-y-4 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Calendar</h1>
        <p className="text-muted-foreground text-sm">Manage your schedule and appointments</p>
      </div>

      <CalendarHeader 
        currentDate={currentDate}
        viewMode={viewMode}
        onViewModeChange={(mode) => setViewMode(mode)}
        onPrevious={movePrevious}
        onNext={moveNext}
        onToday={moveToday}
        onNewEvent={() => setIsNewEventDialogOpen(true)}
      />

      <Card className="overflow-hidden">
        {viewMode === 'month' && (
          <MonthView 
            currentDate={currentDate} 
            events={events} 
            onEventClick={handleEventClick}
          />
        )}
        {viewMode === 'week' && (
          <WeekView 
            currentDate={currentDate} 
            events={events} 
            onEventClick={handleEventClick}
          />
        )}
        {viewMode === 'day' && (
          <DayView 
            currentDate={currentDate} 
            events={events} 
            onEventClick={handleEventClick}
          />
        )}
      </Card>

      <EventDialog 
        event={selectedEvent} 
        onClose={() => setSelectedEvent(null)}
      />

      <NewEventDialog 
        isOpen={isNewEventDialogOpen} 
        onOpenChange={setIsNewEventDialogOpen}
      />
    </div>
  );
};

export default Calendar;
