
import { Workflow } from './types';

export const mockWorkflows: Workflow[] = [
  {
    id: 'wf-001',
    name: 'New Client Intake',
    description: 'Initial assessment and documentation for new clients',
    status: 'active',
    dueDate: '2023-12-15',
    assignee: 'Sarah Wilson',
    steps: 5,
    completedSteps: 2
  },
  {
    id: 'wf-002',
    name: 'Home Visit Follow-up',
    description: 'Documentation and follow-up actions after home visit',
    status: 'pending',
    dueDate: '2023-12-18',
    steps: 4,
    completedSteps: 0
  },
  {
    id: 'wf-003',
    name: 'Case Review Process',
    description: 'Quarterly review of active cases',
    status: 'active',
    dueDate: '2023-12-20',
    assignee: 'James Rodriguez',
    steps: 6,
    completedSteps: 3
  },
  {
    id: 'wf-004',
    name: 'Service Plan Development',
    description: 'Create service plans for client needs',
    status: 'completed',
    assignee: 'Sarah Wilson',
    steps: 4,
    completedSteps: 4
  }
];
