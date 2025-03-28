import { useState, useMemo, useCallback } from 'react';
import { Record } from '../types';

export const useRecordSelection = (records: Record[]) => {
  const [selectedRecords, setSelectedRecords] = useState<string[]>([]);

  // Memoize the Set for O(1) lookups
  const selectedRecordsSet = useMemo(
    () => new Set(selectedRecords),
    [selectedRecords]
  );

  const handleSelectRecord = useCallback((id: string, checked: boolean) => {
    if (checked) {
      // Only allow one selection at a time
      setSelectedRecords([id]);
    } else {
      setSelectedRecords([]);
    }
  }, []);

  const handleSelectAll = useCallback((checked: boolean) => {
    if (checked && records.length > 0) {
      // Since we only allow one selection, select the first record
      setSelectedRecords([records[0].id]);
    } else {
      setSelectedRecords([]);
    }
  }, [records]);

  return {
    selectedRecords,
    selectedRecordsSet,
    handleSelectRecord,
    handleSelectAll
  };
};
