
import React from 'react';
import { Record } from './types';
import {
  Table,
  TableHeader,
  TableBody
} from '@/components/ui/table';
import { RecordTableHeader } from './table/RecordTableHeader';
import { RecordTableEmpty } from './table/RecordTableEmpty';
import { RecordTableRow } from './table/RecordTableRow';

interface RecordTableViewProps {
  records: Record[];
  selectedRecords: string[];
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
  selectedRecords,
  handleSelectRecord,
  formatDate,
  sortField,
  sortDirection,
  toggleSort
}) => {
  const handleRowClick = (id: string) => {
    // If already selected, deselect it
    const isSelected = selectedRecords.includes(id);
    handleSelectRecord(id, !isSelected);
  };

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
                <RecordTableRow
                  key={record.id}
                  record={record}
                  isSelected={selectedRecords.includes(record.id)}
                  formatDate={formatDate}
                  onClick={() => handleRowClick(record.id)}
                />
              ))
            )}
          </TableBody>
        </table>
      </div>
    </div>
  );
};
