
import { useState } from 'react';
import { Record } from '../types';

export const useRecordSelection = (records: Record[]) => {
  const [selectedRecords, setSelectedRecords] = useState<string[]>([]);

  const handleSelectRecord = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedRecords(prev => [...prev, id]);
    } else {
      setSelectedRecords(prev => prev.filter(recordId => recordId !== id));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRecords(records.map(record => record.id));
    } else {
      setSelectedRecords([]);
    }
  };

  return {
    selectedRecords,
    handleSelectRecord,
    handleSelectAll
  };
};
