
import React from 'react';
import { FileText } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

export const EmptyRecordList: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex flex-col items-center justify-center h-60 text-muted-foreground rounded-lg border border-dashed border-border bg-muted/20">
      <FileText className="h-10 w-10 mb-3 opacity-70" />
      <p className="text-base font-medium">No records found</p>
      {!isMobile && <p className="text-sm mt-1">Try adjusting your filters or search criteria</p>}
    </div>
  );
};
