
import React from 'react';
import { TableHead } from '@/components/ui/table';
import { Record } from '../types';
import { useIsMobile } from '@/hooks/use-mobile';

interface RecordTableHeaderProps {
  sortField: keyof Record;
  sortDirection: 'asc' | 'desc';
  toggleSort: (field: keyof Record) => void;
}

export const RecordTableHeader: React.FC<RecordTableHeaderProps> = ({
  sortField,
  sortDirection,
  toggleSort
}) => {
  const isMobile = useIsMobile();

  return (
    <tr className="border-b bg-muted/50">
      <TableHead className="h-10 px-4 text-left">
        <span>Document</span>
      </TableHead>
      {!isMobile && (
        <>
          <TableHead className="h-10 px-4 text-left">
            <span>Linked</span>
          </TableHead>
          <TableHead className="h-10 px-4 text-left">Staff</TableHead>
          <TableHead className="h-10 px-4 text-left">
            <span>Updated</span>
          </TableHead>
        </>
      )}
    </tr>
  );
};
