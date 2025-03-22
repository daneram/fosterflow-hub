
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GitBranch, GitMerge } from 'lucide-react';

const WorkflowTemplates: React.FC = () => {
  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="pb-2 px-3 pt-3">
        <CardTitle className="text-sm font-medium">Workflow Templates</CardTitle>
        <CardDescription className="text-xs">Standardized workflows for common case management processes</CardDescription>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <div className="grid gap-3 md:grid-cols-3">
          <Card className="cursor-pointer hover:bg-accent transition-colors border-muted bg-card/50">
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <GitBranch className="h-5 w-5 text-primary" />
                <div>
                  <h3 className="text-sm font-medium">Intake Process</h3>
                  <p className="text-xs text-muted-foreground">5 steps</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:bg-accent transition-colors border-muted bg-card/50">
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <GitMerge className="h-5 w-5 text-primary" />
                <div>
                  <h3 className="text-sm font-medium">Case Review</h3>
                  <p className="text-xs text-muted-foreground">6 steps</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:bg-accent transition-colors border-muted bg-card/50">
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <GitBranch className="h-5 w-5 text-primary" />
                <div>
                  <h3 className="text-sm font-medium">Home Visit</h3>
                  <p className="text-xs text-muted-foreground">4 steps</p>
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
