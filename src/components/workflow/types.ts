
export interface Workflow {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'pending';
  dueDate?: string;
  assignee?: string;
  steps: number;
  completedSteps: number;
}
