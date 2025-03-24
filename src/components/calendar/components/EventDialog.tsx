
import React from 'react';
import { CalendarEvent } from '../types';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Clock, Users, MapPin } from 'lucide-react';
import { formatTime, getEventTypeColor } from '../utils/dateUtils';

interface EventDialogProps {
  event: CalendarEvent | null;
  onClose: () => void;
}

const EventDialog: React.FC<EventDialogProps> = ({ event, onClose }) => {
  if (!event) return null;

  return (
    <Dialog open={!!event} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <div className={`w-full h-2 rounded-full mb-2 ${getEventTypeColor(event.type)}`} />
          <DialogTitle>{event.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 py-4">
          <div className="flex items-start gap-2">
            <Clock className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
            <div>
              <div>
                {formatTime(event.start)} - {formatTime(event.end)}
              </div>
              <div className="text-sm text-muted-foreground">
                {new Date(event.start).toDateString()}
              </div>
            </div>
          </div>
          
          {event.location && (
            <div className="flex items-start gap-2">
              <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>{event.location}</div>
            </div>
          )}
          
          {event.participants && event.participants.length > 0 && (
            <div className="flex items-start gap-2">
              <Users className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                {event.participants.join(', ')}
              </div>
            </div>
          )}
          
          {event.description && (
            <div className="pt-2 border-t">
              <h4 className="text-sm font-medium mb-1">Description</h4>
              <p className="text-sm">{event.description}</p>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button>Edit Event</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EventDialog;
