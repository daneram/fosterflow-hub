
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GitBranch, GitMerge } from 'lucide-react';

const WorkflowTemplates: React.FC = () => {
  return (
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
  );
};

export default WorkflowTemplates;
