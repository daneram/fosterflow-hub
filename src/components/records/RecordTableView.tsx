import React, { useCallback } from 'react';
import { Record } from './types';
import {
  Table,
  TableHeader,
  TableBody
} from '@/components/ui/table';
import { RecordTableHeader } from './table/RecordTableHeader';
import { RecordTableEmpty } from './table/RecordTableEmpty';
import { MemoizedRecordTableRow } from './table/RecordTableRow';

interface RecordTableViewProps {
  records: Record[];
  selectedRecords: string[];
  selectedRecordsSet: Set<string>;
  handleSelectAll: (checked: boolean) => void;
  handleSelectRecord: (id: string, checked: boolean) => void;
  formatDate: (date: Date) => string;
  getTypeIcon: (type: string) => React.ReactNode;
  getStatusBadge: (status: string) => React.ReactNode;
  getComplianceIcon: (compliance?: string) => React.ReactNode;
  sortField: keyof Record;
  sortDirection: 'asc' | 'desc';
  toggleSort: (field: keyof Record) => void;
}

export const RecordTableView: React.FC<RecordTableViewProps> = ({
  records,
  selectedRecordsSet,
  handleSelectRecord,
  formatDate,
  sortField,
  sortDirection,
  toggleSort
}) => {
  // Memoize the row click handler creator
  const createHandleRowClick = useCallback((id: string) => () => {
    const isSelected = selectedRecordsSet.has(id);
    handleSelectRecord(id, !isSelected);
  }, [selectedRecordsSet, handleSelectRecord]);

  return (
    <div className="w-full">
      <div className="relative w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <TableHeader>
            <RecordTableHeader 
              sortField={sortField}
              sortDirection={sortDirection}
              toggleSort={toggleSort}
            />
          </TableHeader>
          <TableBody>
            {records.length === 0 ? (
              <RecordTableEmpty />
            ) : (
              records.map((record) => (
                <MemoizedRecordTableRow
                  key={record.id}
                  record={record}
                  isSelected={selectedRecordsSet.has(record.id)}
                  formatDate={formatDate}
                  onClick={createHandleRowClick(record.id)}
                />
              ))
            )}
          </TableBody>
        </table>
      </div>
    </div>
  );
};
