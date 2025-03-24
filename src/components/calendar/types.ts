
export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  type: 'visit' | 'meeting' | 'appointment' | 'court' | 'deadline';
  location?: string;
  description?: string;
  participants?: string[];
}

export type ViewMode = 'month' | 'week' | 'day';
