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
      <td className="py-2 px-4">
        {isMobile ? (
          <div className="flex flex-col space-y-1">
            <div className="flex flex-col">
              <div className="text-sm font-medium">{record.title}</div>
              
              <div className="flex flex-col gap-1 mt-1">
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
                <span className="text-[11px] text-muted-foreground">
                  {displayDate}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
            <span className="text-sm">{record.title}</span>
          </div>
        )}
      </td>
      {!isMobile && (
        <>
          <td className="py-2 px-4">
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
          </td>
          <td className="py-2 px-4">
            <span className="text-[11px] text-primary hover:underline cursor-pointer">
              {record.owner || 'Unassigned'}
            </span>
          </td>
          <td className="py-2 px-4 text-[11px]">{displayDate}</td>
        </>
      )}
    </tr>
  );
};

// Memoize the component to prevent unnecessary re-renders
export const MemoizedRecordTableRow = memo(RecordTableRow);
