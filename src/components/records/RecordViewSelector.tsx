
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { List, Grid, Table as TableIcon, Plus } from 'lucide-react';

interface RecordViewSelectorProps {
  viewMode: 'list' | 'grid' | 'table';
  setViewMode: (mode: 'list' | 'grid' | 'table') => void;
}

export const RecordViewSelector: React.FC<RecordViewSelectorProps> = ({
  viewMode,
  setViewMode
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Button size="sm">
        <Plus className="h-4 w-4 mr-1" />
        New Record
      </Button>
      <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'list' | 'grid' | 'table')}>
        <TabsList className="grid grid-cols-3 w-auto">
          <TabsTrigger value="list" title="List View">
            <List className="h-4 w-4" />
          </TabsTrigger>
          <TabsTrigger value="grid" title="Grid View">
            <Grid className="h-4 w-4" />
          </TabsTrigger>
          <TabsTrigger value="table" title="Table View">
            <TableIcon className="h-4 w-4" />
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};
