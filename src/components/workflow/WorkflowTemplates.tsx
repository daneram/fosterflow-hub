
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GitBranch, GitMerge } from 'lucide-react';

const WorkflowTemplates: React.FC = () => {
  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="pb-2 pt-4">
        <CardTitle className="text-base">Workflow Templates</CardTitle>
        <CardDescription>Standardized workflows for common case management processes</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid gap-3 md:grid-cols-3">
          <Card className="cursor-pointer hover:bg-accent transition-colors border-muted bg-card/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <GitBranch className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium">Intake Process</h3>
                  <p className="text-xs text-muted-foreground">5 steps</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:bg-accent transition-colors border-muted bg-card/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <GitMerge className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium">Case Review</h3>
                  <p className="text-xs text-muted-foreground">6 steps</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:bg-accent transition-colors border-muted bg-card/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <GitBranch className="h-4 w-4 text-primary" />
                </div>
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
