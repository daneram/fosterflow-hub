
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ChevronRight, Clock, GitBranch, GitMerge, FilePlus, Share2, Users, AlertCircle } from 'lucide-react';

interface Workflow {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'pending';
  dueDate?: string;
  assignee?: string;
  steps: number;
  completedSteps: number;
}

const WorkflowManager: React.FC = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>([
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
  ]);

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Workflow Manager</h1>
          <p className="text-muted-foreground mt-1">Track and manage case workflows and processes</p>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <Button className="flex items-center gap-2">
              <FilePlus className="h-4 w-4" />
              New Workflow
            </Button>
            <Button variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
          <div>
            <Button variant="outline">
              <Users className="h-4 w-4 mr-2" />
              Assign
            </Button>
          </div>
        </div>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2">
              {workflows
                .filter(workflow => workflow.status === 'active')
                .map(workflow => (
                  <WorkflowCard key={workflow.id} workflow={workflow} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="pending" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2">
              {workflows
                .filter(workflow => workflow.status === 'pending')
                .map(workflow => (
                  <WorkflowCard key={workflow.id} workflow={workflow} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2">
              {workflows
                .filter(workflow => workflow.status === 'completed')
                .map(workflow => (
                  <WorkflowCard key={workflow.id} workflow={workflow} />
                ))}
            </div>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Workflow Templates</CardTitle>
            <CardDescription>Standardized workflows for common case management processes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="cursor-pointer hover:bg-accent transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <GitBranch className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="text-lg font-medium">Intake Process</h3>
                      <p className="text-sm text-muted-foreground">5 steps</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="cursor-pointer hover:bg-accent transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <GitMerge className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="text-lg font-medium">Case Review</h3>
                      <p className="text-sm text-muted-foreground">6 steps</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="cursor-pointer hover:bg-accent transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <GitBranch className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="text-lg font-medium">Home Visit</h3>
                      <p className="text-sm text-muted-foreground">4 steps</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

const WorkflowCard: React.FC<{ workflow: Workflow }> = ({ workflow }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle>{workflow.name}</CardTitle>
          {getStatusIcon(workflow.status)}
        </div>
        <CardDescription>{workflow.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{workflow.completedSteps}/{workflow.steps} steps</span>
          </div>
          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full" 
              style={{ width: `${(workflow.completedSteps / workflow.steps) * 100}%` }}
            ></div>
          </div>
          {workflow.dueDate && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Due Date</span>
              <span>{workflow.dueDate}</span>
            </div>
          )}
          {workflow.assignee && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Assigned to</span>
              <span>{workflow.assignee}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button variant="ghost" className="w-full justify-between">
          View Details
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WorkflowManager;
