
import React from 'react';
import { RecordListView } from './RecordListView';
import { RecordTableView } from './RecordTableView';
import { Record } from './types';
import { 
  formatDate, 
  getTypeIcon, 
  getStatusBadge, 
  getPriorityBadge, 
  getComplianceIcon
} from './RecordUtils';
import { useIsMobile } from '@/hooks/use-mobile';

interface RecordContentProps {
  filteredRecords: Record[];
  selectedRecords: string[];
  handleSelectRecord: (id: string, checked: boolean) => void;
  handleSelectAll: (checked: boolean) => void;
  sortField: keyof Record;
  sortDirection: 'asc' | 'desc';
  toggleSort: (field: keyof Record) => void;
}

export const RecordContent: React.FC<RecordContentProps> = ({
  filteredRecords,
  selectedRecords,
  handleSelectRecord,
  handleSelectAll,
  sortField,
  sortDirection,
  toggleSort
}) => {
  const isMobile = useIsMobile();
  const viewMode = isMobile ? 'list' : 'table';

  return (
    <div className="w-full">
      {viewMode === 'list' ? (
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
      ) : (
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
      )}
    </div>
  );
};
