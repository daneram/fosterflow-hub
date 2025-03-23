
import React from 'react';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

interface SavedFilterPresetsProps {
  onSelectPreset: (preset: string) => void;
}

export const SavedFilterPresets: React.FC<SavedFilterPresetsProps> = ({ onSelectPreset }) => {
  const presets = [
    { id: 'recent-active-cases', name: 'Recent Active Cases', favorite: true },
    { id: 'incomplete-assessments', name: 'Incomplete Assessments', favorite: true },
    { id: 'my-documents', name: 'My Assigned Documents', favorite: false }
  ];
  
  return (
    <div className="space-y-2 text-sm">
      {presets.map(preset => (
        <Button 
          key={preset.id}
          variant="ghost" 
          size="sm" 
          className="w-full justify-start"
          onClick={() => onSelectPreset(preset.id)}
        >
          {preset.favorite && <Star className="h-4 w-4 mr-2 text-yellow-500" />}
          {preset.name}
        </Button>
      ))}
    </div>
  );
};
