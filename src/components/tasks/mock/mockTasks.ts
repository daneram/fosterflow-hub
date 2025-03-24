
import { Task } from '../types';

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Complete case notes for Johnson family',
    description: 'Review and finalize all case notes from last home visit',
    dueDate: new Date(2023, 11, 18),
    completed: false,
    priority: 'high',
    category: 'Documentation',
    assignedTo: 'Me'
  },
  {
    id: '2',
    title: 'Schedule team meeting',
    description: 'Coordinate with all case managers for quarterly review',
    dueDate: new Date(2023, 11, 20),
    completed: false,
    priority: 'medium',
    category: 'Meetings',
    assignedTo: 'Me'
  },
  {
    id: '3',
    title: 'File court report',
    description: 'Complete and submit report for Smith case hearing',
    dueDate: new Date(2023, 11, 15),
    completed: true,
    priority: 'high',
    category: 'Legal',
    assignedTo: 'Sarah'
  },
  {
    id: '4',
    title: 'Follow up with school counselor',
    description: 'Check on academic progress for Williams children',
    dueDate: new Date(2023, 11, 22),
    completed: false,
    priority: 'medium',
    category: 'Education',
    assignedTo: 'John'
  },
  {
    id: '5',
    title: 'Review budget allocation',
    description: 'Analyze Q4 spending and prepare for next quarter',
    dueDate: new Date(2023, 12, 5),
    completed: false,
    priority: 'low',
    category: 'Finance',
    assignedTo: 'Me'
  },
];
