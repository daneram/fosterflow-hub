
import React from 'react';
import { Record } from './types';
import { RecordList } from './list/RecordList';

interface RecordListViewProps {
  records: Record[];
  selectedRecords: string[];
  handleSelectAll: (checked: boolean) => void;
  handleSelectRecord: (id: string, checked: boolean) => void;
  formatDate: (date: Date) => string;
  getTypeIcon: (type: string) => React.ReactNode;
  getStatusBadge: (status: string) => React.ReactNode;
  getPriorityBadge: (priority?: string) => React.ReactNode;
  getComplianceIcon: (compliance?: string) => React.ReactNode;
}

export const RecordListView: React.FC<RecordListViewProps> = (props) => {
  return (
    <div className="w-full max-w-full">
      <RecordList {...props} />
    </div>
  );
};
