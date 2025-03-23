
import React from 'react';
import { FileText } from 'lucide-react';

export const EmptyRecordList: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
      <FileText className="h-8 w-8 mb-2" />
      <p>No records found</p>
    </div>
  );
};
