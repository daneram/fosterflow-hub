
import React from 'react';
import { Card } from '@/components/ui/card';
import { Record } from '../types';
import { formatUniqueIdentifier } from '../table/RecordIdFormatter';

interface RecordListItemProps {
  record: Record;
  isSelected: boolean;
  onSelectRecord: (id: string, checked: boolean) => void;
  formatDate: (date: Date) => string;
  getTypeIcon: (type: string) => React.ReactNode;
  getStatusBadge: (status: string) => React.ReactNode;
  getPriorityBadge: (priority?: string) => React.ReactNode;
  getComplianceIcon: (compliance?: string) => React.ReactNode;
}

export const RecordListItem: React.FC<RecordListItemProps> = ({
  record,
  isSelected,
  onSelectRecord,
  formatDate,
}) => {
  const handleClick = () => {
    onSelectRecord(record.id, !isSelected);
  };

  return (
    <Card 
      key={record.id} 
      className={`overflow-hidden cursor-pointer ${isSelected ? 'bg-muted/50' : ''}`}
      onClick={handleClick}
    >
      <div className="flex items-center">
        <div className="flex flex-col flex-1 p-3">
          <div className="flex justify-between items-center mb-1">
            <div className="text-sm font-medium">{record.title}</div>
            <div className="text-xs text-muted-foreground">{formatDate(record.updatedAt)}</div>
          </div>
          
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span>{formatUniqueIdentifier(record)}</span>
            <span>{record.owner || 'Unassigned'}</span>
            <span>Linked</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
