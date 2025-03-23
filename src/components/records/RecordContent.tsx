
import React from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { FileText } from 'lucide-react';
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
        <div className="space-y-4">
          {filteredRecords.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
              <FileText className="h-8 w-8 mb-2" />
              <p>No records found</p>
            </div>
          ) : (
            <>
              {/* Select All Checkbox */}
              <div className="flex items-center pb-2">
                <Checkbox 
                  id="select-all" 
                  checked={selectedRecords.length === filteredRecords.length && filteredRecords.length > 0}
                  onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
                />
                <label htmlFor="select-all" className="ml-2 text-sm font-medium">
                  Select All
                </label>
              </div>
              
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
            </>
          )}
        </div>
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
