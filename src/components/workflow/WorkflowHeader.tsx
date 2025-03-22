
import React from 'react';
import { Button } from '@/components/ui/button';
import { FilePlus, Share2, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const WorkflowHeader: React.FC = () => {
  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="pb-2 pt-4">
        <CardTitle className="text-base">Actions</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-2">
          <Button size="sm" className="h-9 text-xs flex items-center gap-1">
            <FilePlus className="h-4 w-4 mr-1" />
            New Workflow
          </Button>
          <Button size="sm" variant="outline" className="h-9 text-xs">
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </Button>
          <Button size="sm" variant="outline" className="h-9 text-xs">
            <Users className="h-4 w-4 mr-1" />
            Assign
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkflowHeader;
