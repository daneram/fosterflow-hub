
import React from 'react';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

interface QuickFilterChipsProps {
  showFavoritesOnly: boolean;
  setShowFavoritesOnly: (show: boolean) => void;
  setSelectedStatus: (status: string | null) => void;
  setSelectedType: (type: string | null) => void;
}

export const QuickFilterChips: React.FC<QuickFilterChipsProps> = ({
  showFavoritesOnly,
  setShowFavoritesOnly,
  setSelectedStatus,
  setSelectedType
}) => {
  return (
    <div className="flex flex-wrap gap-2 pb-2">
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
        className={showFavoritesOnly ? "bg-primary/10" : ""}
      >
        <Star className={`h-4 w-4 mr-1 ${showFavoritesOnly ? "text-yellow-500" : ""}`} />
        Favorites
      </Button>
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => setSelectedStatus('active')}
      >
        Active
      </Button>
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => {
          setSelectedType('case');
          setSelectedStatus('active');
        }}
      >
        Active Cases
      </Button>
    </div>
  );
};
