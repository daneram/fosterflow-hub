
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
    <div className="flex items-center pb-2">
      <Checkbox 
        id="select-all" 
        checked={selectedRecordsCount === totalRecords && totalRecords > 0}
        onCheckedChange={(checked) => onSelectAll(checked as boolean)}
      />
      <label htmlFor="select-all" className="ml-2 text-sm font-medium">
        Select All
      </label>
    </div>
  );
};
