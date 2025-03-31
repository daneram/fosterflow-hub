import React, { useState } from "react";
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Plus, Search, Filter, Settings } from 'lucide-react';

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  type: 'visit' | 'review' | 'training' | 'meeting';
  description?: string;
}

const CalendarPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('week');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isNewEventDialogOpen, setIsNewEventDialogOpen] = useState(false);
  const [events] = useState<CalendarEvent[]>([]);

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 7 PM

  const moveToday = () => setCurrentDate(new Date());
  const movePrevious = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'month') newDate.setMonth(currentDate.getMonth() - 1);
    else if (viewMode === 'week') newDate.setDate(currentDate.getDate() - 7);
    else newDate.setDate(currentDate.getDate() - 1);
    setCurrentDate(newDate);
  };
  const moveNext = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'month') newDate.setMonth(currentDate.getMonth() + 1);
    else if (viewMode === 'week') newDate.setDate(currentDate.getDate() + 7);
    else newDate.setDate(currentDate.getDate() + 1);
    setCurrentDate(newDate);
  };

  return (
    <Layout>
      <div className="space-y-5 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <h1 className="text-xl font-bold tracking-tight">Calendar</h1>
            <p className="text-muted-foreground text-sm">Manage your schedule and appointments</p>
          </div>
          <div className="flex items-center gap-2 mt-2 md:mt-0">
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search events..." 
                className="pl-9 h-9 md:w-[200px] lg:w-[300px]"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-auto h-9">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                <SelectItem value="visits">Visits</SelectItem>
                <SelectItem value="reviews">Reviews</SelectItem>
                <SelectItem value="training">Training</SelectItem>
                <SelectItem value="meetings">Meetings</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" className="h-9 w-9">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
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
            <span className="text-sm font-medium self-center ml-2">
              {viewMode === 'month' 
                ? `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`
                : viewMode === 'week'
                  ? `${months[getWeekStartDate(currentDate).getMonth()]} ${getWeekStartDate(currentDate).getDate()} - ${months[getWeekEndDate(currentDate).getMonth()]} ${getWeekEndDate(currentDate).getDate()}, ${currentDate.getFullYear()}`
                  : `${daysOfWeek[currentDate.getDay()]}, ${months[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`
              }
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as any)} className="hidden sm:block">
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
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Event</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Event Title</Label>
                    <Input id="title" placeholder="Enter event title" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Start Time</Label>
                      <Input type="datetime-local" />
                    </div>
                    <div className="space-y-2">
                      <Label>End Time</Label>
                      <Input type="datetime-local" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Event Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="visit">Visit</SelectItem>
                        <SelectItem value="review">Review</SelectItem>
                        <SelectItem value="training">Training</SelectItem>
                        <SelectItem value="meeting">Meeting</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Add event description" />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsNewEventDialogOpen(false)}>Cancel</Button>
                    <Button>Create Event</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            {viewMode === 'month' && renderMonthView()}
            {viewMode === 'week' && (
              <div className="bg-card border rounded-lg overflow-auto h-[600px]">
                <div className="grid grid-cols-[60px_1fr_1fr_1fr_1fr_1fr_1fr_1fr] border-b sticky top-0 z-10 bg-card">
                  <div className="p-2 border-r"></div>
                  {getWeekDays().map((day, index) => (
                    <div
                      key={index}
                      className={cn(
                        "p-2 text-center font-medium border-r",
                        isSameDay(day, new Date()) && "bg-primary/10"
                      )}
                    >
                      <div>{daysOfWeek[day.getDay()].slice(0, 3)}</div>
                      <div className={cn(
                        "text-2xl",
                        isSameDay(day, new Date()) && "text-primary"
                      )}>
                        {day.getDate()}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-[60px_1fr_1fr_1fr_1fr_1fr_1fr_1fr]">
                  {hours.map((hour) => (
                    <React.Fragment key={hour}>
                      <div className="border-r border-b p-2 text-xs text-right pr-2">
                        {hour % 12 === 0 ? 12 : hour % 12}{hour < 12 ? 'am' : 'pm'}
                      </div>
                      {getWeekDays().map((day, dayIndex) => (
                        <div key={dayIndex} className="border-r border-b relative min-h-[60px]">
                          {events
                            .filter(event => 
                              isSameDay(event.start, day) && 
                              event.start.getHours() === hour
                            )
                            .map((event) => (
                              <div
                                key={event.id}
                                className={cn(
                                  "absolute mx-1 p-1 rounded text-white text-xs cursor-pointer",
                                  getEventTypeColor(event.type)
                                )}
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
            )}
            {viewMode === 'day' && renderDayView()}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

// Helper functions
const getWeekStartDate = (date: Date) => {
  const d = new Date(date);
  const day = d.getDay();
  d.setDate(d.getDate() - day);
  return d;
};

const getWeekEndDate = (date: Date) => {
  const d = new Date(date);
  const day = d.getDay();
  d.setDate(d.getDate() + (6 - day));
  return d;
};

const getWeekDays = () => {
  const startDate = getWeekStartDate(new Date());
  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(startDate);
    day.setDate(startDate.getDate() + i);
    return day;
  });
};

const isSameDay = (date1: Date, date2: Date) => {
  return date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear();
};

const formatTime = (date: Date) => {
  return date.toLocaleTimeString('en-US', { 
    hour: 'numeric',
    minute: '2-digit',
    hour12: true 
  });
};

const getEventTypeColor = (type: CalendarEvent['type']) => {
  switch (type) {
    case 'visit':
      return 'bg-blue-500';
    case 'review':
      return 'bg-green-500';
    case 'training':
      return 'bg-purple-500';
    case 'meeting':
      return 'bg-orange-500';
    default:
      return 'bg-gray-500';
  }
};

const handleEventClick = (event: CalendarEvent) => {
  console.log('Event clicked:', event);
};

const renderMonthView = () => {
  // TODO: Implement month view
  return <div>Month view coming soon</div>;
};

const renderDayView = () => {
  // TODO: Implement day view
  return <div>Day view coming soon</div>;
};

export default CalendarPage;
