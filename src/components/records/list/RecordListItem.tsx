import React, { useMemo, useCallback, memo } from 'react';
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

const RecordListItem: React.FC<RecordListItemProps> = ({
  record,
  isSelected,
  onSelectRecord,
  formatDate,
}) => {
  const handleClick = useCallback(() => {
    onSelectRecord(record.id, !isSelected);
  }, [record.id, isSelected, onSelectRecord]);
  
  const isMobile = useIsMobile();
  
  // Derive linked status from record's relatedRecords property
  const isLinked = record.relatedRecords && record.relatedRecords.length > 0;

  // Memoize date formatting
  const displayDate = useMemo(() => 
    isMobile 
      ? format(record.updatedAt, 'dd/MM/yy')
      : formatDate(record.updatedAt),
    [isMobile, record.updatedAt, formatDate]
  );

  return (
    <Card 
      className={`overflow-hidden cursor-pointer ${isSelected ? 'bg-muted/50' : ''}`}
      onClick={handleClick}
    >
      <div className="flex items-center">
        <div className="flex flex-col flex-1 p-3">
          <div className="flex justify-between items-center mb-1">
            <div className="text-sm font-medium">{record.title}</div>
            <div className="text-[11px] text-muted-foreground">{displayDate}</div>
          </div>
          
          <div className="flex justify-between items-center">
            {record.client && (
              <div className="flex flex-wrap items-center gap-1">
                {record.client.split(',').map((person, index) => (
                  <React.Fragment key={index}>
                    <span 
                      className="text-[11px] text-primary hover:underline cursor-pointer"
                    >
                      {person.trim()}
                    </span>
                    {index < record.client.split(',').length - 1 && (
                      <span className="text-[11px] text-muted-foreground">-</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
            <span className="text-[11px] text-primary hover:underline cursor-pointer">
              {record.owner || 'Unassigned'}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

// Memoize the component to prevent unnecessary re-renders
export const MemoizedRecordListItem = memo(RecordListItem);
