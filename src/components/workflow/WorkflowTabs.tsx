
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import WorkflowCard from './WorkflowCard';
import { Workflow } from './types';

interface WorkflowTabsProps {
  workflows: Workflow[];
}

const WorkflowTabs: React.FC<WorkflowTabsProps> = ({ workflows }) => {
  return (
    <Tabs defaultValue="active" className="w-full">
      <TabsList className="grid w-full max-w-sm grid-cols-3 p-0.5 h-8 text-xs">
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="pending">Pending</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
      </TabsList>

      <TabsContent value="active" className="p-3 pt-4">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {workflows
            .filter(workflow => workflow.status === 'active')
            .map(workflow => (
              <WorkflowCard key={workflow.id} workflow={workflow} />
            ))}
        </div>
      </TabsContent>

      <TabsContent value="pending" className="p-3 pt-4">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {workflows
            .filter(workflow => workflow.status === 'pending')
            .map(workflow => (
              <WorkflowCard key={workflow.id} workflow={workflow} />
            ))}
        </div>
      </TabsContent>

      <TabsContent value="completed" className="p-3 pt-4">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {workflows
            .filter(workflow => workflow.status === 'completed')
            .map(workflow => (
              <WorkflowCard key={workflow.id} workflow={workflow} />
            ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default WorkflowTabs;
