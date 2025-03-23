import React from 'react';
import { Record } from '../types';
import { useIsMobile } from '@/hooks/use-mobile';
import { formatUniqueIdentifier } from './RecordIdFormatter';
import { Users, Calendar } from 'lucide-react';

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
          <div className="flex flex-col space-y-2">
            <div className="flex flex-col">
              <div className="font-medium">{record.title}</div>
              <div className="text-xs text-muted-foreground">{formatUniqueIdentifier(record)}</div>
            </div>
            
            <div className="flex flex-col space-y-2">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                <span>{record.owner || 'Unassigned'}</span>
              </div>
              
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Updated: {formatDate(record.updatedAt)}</span>
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
