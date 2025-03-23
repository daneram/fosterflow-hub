
import React from 'react';
import { Card } from '@/components/ui/card';
import { Record } from '../types';
import { useIsMobile } from '@/hooks/use-mobile';
import { format } from 'date-fns';

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
  
  const isMobile = useIsMobile();
  // Derive linked status from record's relatedRecords property
  const isLinked = record.relatedRecords && record.relatedRecords.length > 0;

  // Format date based on device type
  const displayDate = isMobile 
    ? format(record.updatedAt, 'dd/MM/yy')
    : formatDate(record.updatedAt);

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
            <div className="text-xs text-muted-foreground">{displayDate}</div>
          </div>
          
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span>{record.client}</span>
            <span>{record.owner || 'Unassigned'}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
