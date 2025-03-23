
import React from 'react';
import { Record } from '../types';
import { useIsMobile } from '@/hooks/use-mobile';
import { formatUniqueIdentifier } from './RecordIdFormatter';

interface RecordTableRowProps {
  record: Record;
  isSelected: boolean;
  formatDate: (date: Date) => string;
  onClick: () => void;
}

export const RecordTableRow: React.FC<RecordTableRowProps> = ({
  record,
  isSelected,
  formatDate,
  onClick
}) => {
  const isMobile = useIsMobile();

  return (
    <tr 
      className={`border-b hover:bg-muted/50 cursor-pointer ${isSelected ? 'bg-muted/50' : ''}`}
      onClick={onClick}
    >
      <td className="py-2 px-4 font-medium">
        {isMobile ? (
          <div className="flex justify-between">
            <div className="flex-1">
              <div className="font-medium">{record.title}</div>
              <div className="text-xs text-muted-foreground">{formatUniqueIdentifier(record)}</div>
            </div>
            <div className="flex flex-col text-right text-xs text-muted-foreground space-y-1">
              {record.client && (
                <div className="flex items-center justify-end">
                  <span>{record.client}</span>
                </div>
              )}
              <div className="flex items-center justify-end">
                <span>{formatDate(record.updatedAt)}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
            <span>{record.title}</span>
            <div className="text-xs text-muted-foreground">{formatUniqueIdentifier(record)}</div>
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
          <td className="py-2 px-4">{formatDate(record.updatedAt)}</td>
        </>
      )}
    </tr>
  );
};
