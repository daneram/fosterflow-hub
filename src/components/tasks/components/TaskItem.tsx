
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Clock } from 'lucide-react';
import { Task } from '../types';
import { getPriorityColor, formatDueDate } from '../utils/taskUtils';

interface TaskItemProps {
  task: Task;
  onToggleStatus: (taskId: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleStatus }) => {
  return (
    <div className="p-4 flex items-start gap-3">
      <Checkbox 
        checked={task.completed}
        onCheckedChange={() => onToggleStatus(task.id)}
        className="mt-1"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
            {task.title}
          </p>
          <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`} />
        </div>
        {task.description && (
          <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
            {task.description}
          </p>
        )}
        <div className="flex flex-wrap gap-3 mt-2 text-xs text-muted-foreground">
          {task.dueDate && (
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{formatDueDate(task.dueDate)}</span>
            </div>
          )}
          {task.category && (
            <div className="bg-secondary px-2 py-0.5 rounded-full">
              {task.category}
            </div>
          )}
          {task.assignedTo && (
            <div className="flex items-center gap-1 ml-auto">
              <span>Assigned to: {task.assignedTo}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
