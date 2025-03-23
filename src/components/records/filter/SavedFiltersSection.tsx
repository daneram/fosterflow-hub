
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { SavedFilterPresets } from '../SavedFilterPresets';

interface SavedFiltersSectionProps {
  onSelectPreset: (preset: string) => void;
}

export const SavedFiltersSection: React.FC<SavedFiltersSectionProps> = ({
  onSelectPreset
}) => {
  return (
    <Collapsible>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Saved Filters</h3>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">
            <Plus className="h-4 w-4" />
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="pt-2">
        <SavedFilterPresets onSelectPreset={onSelectPreset} />
      </CollapsibleContent>
    </Collapsible>
  );
};
