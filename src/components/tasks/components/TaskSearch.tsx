
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Filter, Plus } from 'lucide-react';

interface TaskSearchProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const TaskSearch: React.FC<TaskSearchProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:items-center justify-between">
      <div className="relative w-full max-w-md">
        <Input
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-8"
        />
        <Filter className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      </div>
      
      <Button size="sm" className="sm:self-end">
        <Plus className="h-4 w-4 mr-1" />
        New Task
      </Button>
    </div>
  );
};

export default TaskSearch;
