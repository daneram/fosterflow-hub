
import { useState } from 'react';
import { Record } from '../types';

export const useRecordSelection = (records: Record[]) => {
  const [selectedRecords, setSelectedRecords] = useState<string[]>([]);

  const handleSelectRecord = (id: string, checked: boolean) => {
    if (checked) {
      // Only allow one selection at a time
      setSelectedRecords([id]);
    } else {
      setSelectedRecords([]);
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      // Since we only allow one selection, this could select the first record
      // or just clear the selection depending on the desired behavior
      setSelectedRecords(records.length > 0 ? [records[0].id] : []);
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
