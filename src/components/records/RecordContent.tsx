import React, { useMemo } from 'react';
import { RecordList } from './list/RecordList';
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
  
  // Memoize the selected records lookup for better performance
  const selectedRecordsSet = useMemo(
    () => new Set(selectedRecords),
    [selectedRecords]
  );

  // Memoize utility functions to prevent unnecessary re-renders
  const utils = useMemo(() => ({
    formatDate,
    getTypeIcon,
    getStatusBadge,
    getPriorityBadge,
    getComplianceIcon
  }), []);

  return (
    <div className="w-full">
      {isMobile ? (
        <RecordList
          records={filteredRecords}
          selectedRecords={selectedRecords}
          selectedRecordsSet={selectedRecordsSet}
          handleSelectRecord={handleSelectRecord}
          handleSelectAll={handleSelectAll}
          {...utils}
        />
      ) : (
        <RecordTableView
          records={filteredRecords}
          selectedRecords={selectedRecords}
          selectedRecordsSet={selectedRecordsSet}
          handleSelectRecord={handleSelectRecord}
          handleSelectAll={handleSelectAll}
          sortField={sortField}
          sortDirection={sortDirection}
          toggleSort={toggleSort}
          {...utils}
        />
      )}
    </div>
  );
};
