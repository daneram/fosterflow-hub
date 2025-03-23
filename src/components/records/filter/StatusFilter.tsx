
import React from 'react';

interface StatusFilterProps {
  selectedStatus: string | null;
  setSelectedStatus: (status: string | null) => void;
}

export const StatusFilter: React.FC<StatusFilterProps> = () => {
  // No status filters anymore
  return null;
};
