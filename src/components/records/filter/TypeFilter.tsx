import React from 'react';
import { Button } from '@/components/ui/button';

interface TypeFilterProps {
  selectedType: string | null;
  setSelectedType: (type: string | null) => void;
}

export const TypeFilter: React.FC<TypeFilterProps> = ({
  selectedType,
  setSelectedType
}) => {
  return (
    <div className="flex flex-wrap gap-2 py-1">
      <Button 
        variant={selectedType === null ? 'default' : 'outline'} 
        size="sm"
        onClick={() => setSelectedType(null)}
        className={selectedType === null ? 'text-primary-foreground' : ''}
      >
        All
      </Button>
      <Button 
        variant={selectedType === 'children' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => setSelectedType('children')}
        className={selectedType === 'children' ? 'text-primary-foreground' : ''}
      >
        Children
      </Button>
      <Button 
        variant={selectedType === 'carers' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => setSelectedType('carers')}
        className={selectedType === 'carers' ? 'text-primary-foreground' : ''}
      >
        Carers
      </Button>
    </div>
  );
};
