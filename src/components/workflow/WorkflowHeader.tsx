
import React from 'react';
import { Button } from '@/components/ui/button';
import { FilePlus, Share2, Users } from 'lucide-react';

const WorkflowHeader: React.FC = () => {
  return (
    <>
      <div className="mb-3">
        <h1 className="text-2xl font-semibold">Workflow Manager</h1>
        <p className="text-sm text-muted-foreground">Track and manage case workflows and processes</p>
      </div>

      <div className="flex justify-between items-center mb-3">
        <div className="flex space-x-2">
          <Button size="sm" className="flex items-center gap-1">
            <FilePlus className="h-4 w-4" />
            New Workflow
          </Button>
          <Button size="sm" variant="outline">
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </Button>
        </div>
        <div>
          <Button size="sm" variant="outline">
            <Users className="h-4 w-4 mr-1" />
            Assign
          </Button>
        </div>
      </div>
    </>
  );
};

export default WorkflowHeader;
