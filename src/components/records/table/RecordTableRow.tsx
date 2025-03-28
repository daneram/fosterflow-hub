import React, { useMemo, memo, useCallback } from 'react';
import { Record } from '../types';
import { useIsMobile } from '@/hooks/use-mobile';
import { format } from 'date-fns';

interface RecordTableRowProps {
  record: Record;
  isSelected: boolean;
  formatDate: (date: Date) => string;
  onClick: () => void;
}

const RecordTableRow: React.FC<RecordTableRowProps> = ({
  record,
  isSelected,
  formatDate,
  onClick
}) => {
  const isMobile = useIsMobile();
  
  // Memoize date formatting
  const displayDate = useMemo(() => 
    isMobile 
      ? format(record.updatedAt, 'dd/MM/yy')
      : formatDate(record.updatedAt),
    [isMobile, record.updatedAt, formatDate]
  );

  return (
    <tr 
      className={`border-b hover:bg-muted/50 cursor-pointer ${isSelected ? 'bg-muted/50' : ''}`}
      onClick={onClick}
    >
      <td className="py-2 px-4 font-medium">
        {isMobile ? (
          <div className="flex flex-col space-y-1">
            <div className="flex flex-col">
              <div className="font-medium">{record.title}</div>
              
              <div className="flex justify-between items-center mt-1.5">
                <span className="text-xs text-muted-foreground">
                  {record.owner || 'Unassigned'}
                </span>
                
                <span className="text-xs text-muted-foreground">
                  {displayDate}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
            <span>{record.title}</span>
          </div>
        )}
      </td>
      {!isMobile && (
        <>
          <td className="py-2 px-4">
            {record.client && (
              <span className="text-sm text-muted-foreground hover:underline cursor-pointer">
                {record.client}
              </span>
            )}
          </td>
          <td className="py-2 px-4">{record.owner || 'Unassigned'}</td>
          <td className="py-2 px-4">{displayDate}</td>
        </>
      )}
    </tr>
  );
};

// Memoize the component to prevent unnecessary re-renders
export const MemoizedRecordTableRow = memo(RecordTableRow);
