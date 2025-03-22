
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import WorkflowCard from './WorkflowCard';
import { Workflow } from './types';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';

interface WorkflowTabsProps {
  workflows: Workflow[];
}

const WorkflowTabs: React.FC<WorkflowTabsProps> = ({ workflows }) => {
  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="pb-2 pt-4">
        <CardTitle className="text-base">Workflows</CardTitle>
        <CardDescription>Manage and track your active case workflows</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3 h-10">
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="mt-2">
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {workflows
                .filter(workflow => workflow.status === 'active')
                .map(workflow => (
                  <WorkflowCard key={workflow.id} workflow={workflow} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="pending" className="mt-2">
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {workflows
                .filter(workflow => workflow.status === 'pending')
                .map(workflow => (
                  <WorkflowCard key={workflow.id} workflow={workflow} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="mt-2">
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {workflows
                .filter(workflow => workflow.status === 'completed')
                .map(workflow => (
                  <WorkflowCard key={workflow.id} workflow={workflow} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default WorkflowTabs;
