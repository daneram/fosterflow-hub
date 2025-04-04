import React from 'react';
import { Record } from '../types';
import { MemoizedRecordListItem } from './RecordListItem';
import { EmptyRecordList } from './EmptyRecordList';

interface RecordListProps {
  records: Record[];
  selectedRecords: string[];
  selectedRecordsSet: Set<string>;
  handleSelectRecord: (id: string, checked: boolean) => void;
  handleSelectAll: (checked: boolean) => void;
  formatDate: (date: Date) => string;
  getTypeIcon: (type: string) => React.ReactNode;
  getStatusBadge: (status: string) => React.ReactNode;
  getPriorityBadge: (priority?: string) => React.ReactNode;
  getComplianceIcon: (compliance?: string) => React.ReactNode;
}

export const RecordList: React.FC<RecordListProps> = ({
  records,
  selectedRecordsSet,
  handleSelectRecord,
  formatDate,
  getTypeIcon,
  getStatusBadge,
  getPriorityBadge,
  getComplianceIcon
}) => {
  if (records.length === 0) {
    return <EmptyRecordList />;
  }
  
  return (
    <div className="space-y-2.5">
      {records.map((record) => (
        <MemoizedRecordListItem
          key={record.id}
          record={record}
          isSelected={selectedRecordsSet.has(record.id)}
          onSelectRecord={handleSelectRecord}
          formatDate={formatDate}
          getTypeIcon={getTypeIcon}
          getStatusBadge={getStatusBadge}
          getPriorityBadge={getPriorityBadge}
          getComplianceIcon={getComplianceIcon}
        />
      ))}
    </div>
  );
};
