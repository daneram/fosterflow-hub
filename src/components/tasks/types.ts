
export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: Date;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category?: string;
  assignedTo?: string;
}

export type TaskFilter = 'all' | 'active' | 'completed';
