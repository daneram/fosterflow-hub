
import React from 'react';
import { Button } from '@/components/ui/button';
import { FilePlus, Share2, Users } from 'lucide-react';

const WorkflowHeader: React.FC = () => {
  return (
    <>
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
    </>
  );
};

export default WorkflowHeader;
