
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';

interface NewEventDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const NewEventDialog: React.FC<NewEventDialogProps> = ({ isOpen, onOpenChange }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
  );
};

export default NewEventDialog;
