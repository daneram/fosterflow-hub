
import React from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Download, Users, Badge } from 'lucide-react';

interface RecordBulkActionsProps {
  selectedCount: number;
}

export const RecordBulkActions: React.FC<RecordBulkActionsProps> = ({ selectedCount }) => {
  if (selectedCount === 0) return null;
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          Bulk Actions ({selectedCount})
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Download className="h-4 w-4 mr-2" />
          Download Selected
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Users className="h-4 w-4 mr-2" />
          Change Owner
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Badge className="mr-2">Status</Badge>
          Mark as Active
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Badge className="mr-2">Status</Badge>
          Mark as Closed
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
