
import React from 'react';
import { Button } from '@/components/ui/button';
import { FilePlus, Share2, Users } from 'lucide-react';

const WorkflowHeader: React.FC = () => {
  return (
    <div className="flex flex-col space-y-1.5">
      <div>
        <h2 className="text-lg font-semibold leading-tight">Workflow Manager</h2>
        <p className="text-xs text-muted-foreground">Track and manage case workflows and processes</p>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <Button size="sm" variant="default" className="h-7 px-2 py-0 text-xs flex items-center gap-1">
            <FilePlus className="h-3 w-3" />
            New Workflow
          </Button>
          <Button size="sm" variant="outline" className="h-7 px-2 py-0 text-xs">
            <Share2 className="h-3 w-3 mr-1" />
            Share
          </Button>
        </div>
        <div>
          <Button size="sm" variant="outline" className="h-7 px-2 py-0 text-xs">
            <Users className="h-3 w-3 mr-1" />
            Assign
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WorkflowHeader;
