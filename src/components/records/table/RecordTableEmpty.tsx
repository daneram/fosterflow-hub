
import React from 'react';
import { FileText } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

export const RecordTableEmpty: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <tr>
      <td colSpan={isMobile ? 1 : 4} className="h-24 text-center">
        <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
          <FileText className="h-8 w-8 mb-2" />
          <p>No records found</p>
        </div>
      </td>
    </tr>
  );
};
