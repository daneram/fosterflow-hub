
import React from 'react';
import { RecordViewSelector } from './RecordViewSelector';

interface RecordsHeaderProps {
  viewMode: 'list' | 'grid' | 'table';
  setViewMode: (mode: 'list' | 'grid' | 'table') => void;
}

export const RecordsHeader: React.FC<RecordsHeaderProps> = ({
  viewMode,
  setViewMode
}) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold tracking-tight">Records Explorer</h1>
      <RecordViewSelector viewMode={viewMode} setViewMode={setViewMode} />
    </div>
  );
};
