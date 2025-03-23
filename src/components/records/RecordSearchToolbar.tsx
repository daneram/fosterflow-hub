import React from 'react';

interface RecordSearchToolbarProps {
  selectedRecords: string[];
  recordCount: number;
}

export const RecordSearchToolbar: React.FC<RecordSearchToolbarProps> = ({
  selectedRecords,
  recordCount
}) => {
  return (
    <div className="flex justify-end items-center py-0.5">
      {/* Bulk actions removed as requested */}
    </div>
  );
};
