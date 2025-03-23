
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';

interface RecordListHeaderProps {
  selectedRecordsCount: number;
  totalRecords: number;
  onSelectAll: (checked: boolean) => void;
}

export const RecordListHeader: React.FC<RecordListHeaderProps> = ({
  selectedRecordsCount,
  totalRecords,
  onSelectAll
}) => {
  return (
    <div className="flex items-center py-1.5 border-b border-border/40 mb-3">
      <Checkbox 
        id="select-all" 
        checked={selectedRecordsCount === totalRecords && totalRecords > 0}
        onCheckedChange={(checked) => onSelectAll(checked as boolean)}
      />
      <label htmlFor="select-all" className="ml-2 text-sm font-medium">
        Select All {selectedRecordsCount > 0 && `(${selectedRecordsCount}/${totalRecords})`}
      </label>
    </div>
  );
};
