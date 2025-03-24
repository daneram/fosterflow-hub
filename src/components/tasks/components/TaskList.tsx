
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Task } from '../types';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  searchQuery: string;
  onToggleStatus: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, searchQuery, onToggleStatus }) => {
  return (
    <ScrollArea className="h-[60vh]">
      <div className="divide-y">
        {tasks.length > 0 ? (
          tasks.map(task => (
            <TaskItem 
              key={task.id} 
              task={task} 
              onToggleStatus={onToggleStatus} 
            />
          ))
        ) : (
          <div className="p-8 text-center text-muted-foreground">
            <p>No tasks found</p>
            {searchQuery && (
              <p className="text-sm mt-1">Try a different search term</p>
            )}
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default TaskList;
