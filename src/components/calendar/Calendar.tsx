import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, Clock, Users, MapPin } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  type: 'visit' | 'meeting' | 'appointment' | 'court' | 'deadline';
  location?: string;
  description?: string;
  participants?: string[];
}

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
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('week');

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const getMonthStartDate = (date: Date) => {
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    return start;
  };

  const getMonthEndDate = (date: Date) => {
    const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return end;
  };

  const getWeekStartDate = (date: Date) => {
    const day = date.getDay();
    const diff = date.getDate() - day;
    return new Date(date.getFullYear(), date.getMonth(), diff);
  };

  const getWeekEndDate = (date: Date) => {
    const start = getWeekStartDate(date);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return end;
  };

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

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const isSameDay = (d1: Date, d2: Date) => {
    return d1.getFullYear() === d2.getFullYear() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getDate() === d2.getDate();
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => isSameDay(event.start, date));
  };

  const getEventTypeColor = (type: string) => {
    switch(type) {
      case 'visit': return 'bg-blue-500';
      case 'meeting': return 'bg-green-500';
      case 'appointment': return 'bg-purple-500';
      case 'court': return 'bg-red-500';
      case 'deadline': return 'bg-amber-500';
      default: return 'bg-gray-500';
    }
  };

  const renderWeekView = () => {
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
                        onClick={() => handleEventClick(event)}
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

  const renderDayView = () => {
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
                      onClick={() => handleEventClick(event)}
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

  const renderMonthView = () => {
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
                        onClick={() => handleEventClick(event)}
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

  return (
    <div className="w-full space-y-4 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Calendar</h1>
        <p className="text-muted-foreground text-sm">Manage your schedule and appointments</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <Button size="sm" onClick={moveToday} className="h-8">Today</Button>
          <Button variant="outline" size="icon" onClick={movePrevious} className="h-8 w-8">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={moveNext} className="h-8 w-8">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="text-sm font-medium">
          {viewMode === 'month' 
            ? `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`
            : viewMode === 'week'
              ? `${months[getWeekStartDate(currentDate).getMonth()]} ${getWeekStartDate(currentDate).getDate()} - ${months[getWeekEndDate(currentDate).getMonth()]} ${getWeekEndDate(currentDate).getDate()}, ${currentDate.getFullYear()}`
              : `${daysOfWeek[currentDate.getDay()]}, ${months[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`
          }
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Tabs defaultValue="week" onValueChange={(value) => setViewMode(value as any)}>
          <TabsList className="h-8">
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="day">Day</TabsTrigger>
          </TabsList>
        </Tabs>
        <Dialog open={isNewEventDialogOpen} onOpenChange={setIsNewEventDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="h-8">
              <Plus className="h-4 w-4 mr-1" />
              New Event
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>New Event</DialogTitle>
              <DialogDescription>
                Add a new event to your calendar
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="event-title">Title</Label>
                <Input id="event-title" placeholder="Enter event title..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="event-start">Start Time</Label>
                  <Input id="event-start" type="datetime-local" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="event-end">End Time</Label>
                  <Input id="event-end" type="datetime-local" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="event-type">Event Type</Label>
                <select className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm" id="event-type">
                  <option value="visit">Home Visit</option>
                  <option value="meeting">Meeting</option>
                  <option value="appointment">Appointment</option>
                  <option value="court">Court</option>
                  <option value="deadline">Deadline</option>
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="event-location">Location</Label>
                <Input id="event-location" placeholder="Enter location..." />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="event-description">Description</Label>
                <Textarea id="event-description" placeholder="Enter event details..." />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save Event</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="overflow-hidden">
        {viewMode === 'month' && renderMonthView()}
        {viewMode === 'week' && renderWeekView()}
        {viewMode === 'day' && renderDayView()}
      </Card>

      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <div className={`w-full h-2 rounded-full mb-2 ${selectedEvent ? getEventTypeColor(selectedEvent.type) : ''}`} />
            <DialogTitle>{selectedEvent?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-4">
            <div className="flex items-start gap-2">
              <Clock className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <div>
                  {selectedEvent && formatTime(selectedEvent.start)} - {selectedEvent && formatTime(selectedEvent.end)}
                </div>
                <div className="text-sm text-muted-foreground">
                  {selectedEvent && `${new Date(selectedEvent.start).toDateString()}`}
                </div>
              </div>
            </div>
            
            {selectedEvent?.location && (
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>{selectedEvent.location}</div>
              </div>
            )}
            
            {selectedEvent?.participants && selectedEvent.participants.length > 0 && (
              <div className="flex items-start gap-2">
                <Users className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  {selectedEvent.participants.join(', ')}
                </div>
              </div>
            )}
            
            {selectedEvent?.description && (
              <div className="pt-2 border-t">
                <h4 className="text-sm font-medium mb-1">Description</h4>
                <p className="text-sm">{selectedEvent.description}</p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedEvent(null)}>
              Close
            </Button>
            <Button>Edit Event</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Calendar;
