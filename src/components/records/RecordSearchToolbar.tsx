
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';

interface RecordSearchToolbarProps {
  selectedRecords: string[];
  recordCount: number;
}

export const RecordSearchToolbar: React.FC<RecordSearchToolbarProps> = ({
  selectedRecords,
  recordCount
}) => {
  return (
    <div className="flex justify-end items-center py-0.5">
      {selectedRecords.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8">
              Bulk Actions ({selectedRecords.length})
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
              <Badge className="mr-2 h-5">Status</Badge>
              Mark as Active
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Badge className="mr-2 h-5">Status</Badge>
              Mark as Closed
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};
