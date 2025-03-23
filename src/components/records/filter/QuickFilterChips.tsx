
import React from 'react';

interface QuickFilterChipsProps {
  showFavoritesOnly: boolean;
  setShowFavoritesOnly: (show: boolean) => void;
  setSelectedStatus: (status: string | null) => void;
  setSelectedType: (type: string | null) => void;
}

export const QuickFilterChips: React.FC<QuickFilterChipsProps> = () => {
  // No quick filter chips anymore
  return null;
};
