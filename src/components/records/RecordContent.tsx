
import React from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { RecordListView } from './RecordListView';
import { RecordGridView } from './RecordGridView';
import { RecordTableView } from './RecordTableView';
import { Record } from './types';
import { 
  formatDate, 
  getTypeIcon, 
  getStatusBadge, 
  getPriorityBadge, 
  getComplianceIcon
} from './RecordUtils';

interface RecordContentProps {
  viewMode: 'list' | 'grid' | 'table';
  filteredRecords: Record[];
  selectedRecords: string[];
  handleSelectRecord: (id: string, checked: boolean) => void;
  handleSelectAll: (checked: boolean) => void;
  sortField: keyof Record;
  sortDirection: 'asc' | 'desc';
  toggleSort: (field: keyof Record) => void;
}

export const RecordContent: React.FC<RecordContentProps> = ({
  viewMode,
  filteredRecords,
  selectedRecords,
  handleSelectRecord,
  handleSelectAll,
  sortField,
  sortDirection,
  toggleSort
}) => {
  return (
    <Tabs value={viewMode} className="w-full">
      <TabsContent value="list" className="mt-0">
        <RecordListView
          records={filteredRecords}
          selectedRecords={selectedRecords}
          handleSelectRecord={handleSelectRecord}
          handleSelectAll={handleSelectAll}
          formatDate={formatDate}
          getTypeIcon={getTypeIcon}
          getStatusBadge={getStatusBadge}
          getPriorityBadge={getPriorityBadge}
          getComplianceIcon={getComplianceIcon}
        />
      </TabsContent>
      
      <TabsContent value="grid" className="mt-0">
        <RecordGridView
          records={filteredRecords}
          selectedRecords={selectedRecords}
          handleSelectRecord={handleSelectRecord}
          formatDate={formatDate}
          getTypeIcon={getTypeIcon}
          getStatusBadge={getStatusBadge}
          getPriorityBadge={getPriorityBadge}
          getComplianceIcon={getComplianceIcon}
        />
      </TabsContent>
      
      <TabsContent value="table" className="mt-0">
        <RecordTableView
          records={filteredRecords}
          selectedRecords={selectedRecords}
          handleSelectRecord={handleSelectRecord}
          handleSelectAll={handleSelectAll}
          formatDate={formatDate}
          getTypeIcon={getTypeIcon}
          getStatusBadge={getStatusBadge}
          getComplianceIcon={getComplianceIcon}
          sortField={sortField}
          sortDirection={sortDirection}
          toggleSort={toggleSort}
        />
      </TabsContent>
    </Tabs>
  );
};
