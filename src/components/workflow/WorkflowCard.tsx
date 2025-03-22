
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ChevronRight, Clock, AlertCircle } from 'lucide-react';
import { Workflow } from './types';

interface WorkflowCardProps {
  workflow: Workflow;
}

const WorkflowCard: React.FC<WorkflowCardProps> = ({ workflow }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <div className="w-7 h-7 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
          <Clock className="h-3.5 w-3.5 text-blue-500" />
        </div>;
      case 'completed':
        return <div className="w-7 h-7 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
          <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
        </div>;
      case 'pending':
        return <div className="w-7 h-7 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
          <AlertCircle className="h-3.5 w-3.5 text-amber-500" />
        </div>;
      default:
        return null;
    }
  };

  return (
    <Card className="overflow-hidden border-muted bg-card/50">
      <CardHeader className="pb-2 flex flex-row items-start justify-between space-y-0 pt-4">
        <div>
          <CardTitle className="text-sm font-medium">{workflow.name}</CardTitle>
          <CardDescription className="text-xs">{workflow.description}</CardDescription>
        </div>
        {getStatusIcon(workflow.status)}
      </CardHeader>
      <CardContent className="pb-2 pt-0">
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
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
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Due Date</span>
              <span>{workflow.dueDate}</span>
            </div>
          )}
          {workflow.assignee && (
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Assigned to</span>
              <span>{workflow.assignee}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-1">
        <Button variant="ghost" size="sm" className="w-full justify-between h-8 text-xs">
          View Details
          <ChevronRight className="h-3.5 w-3.5" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WorkflowCard;
