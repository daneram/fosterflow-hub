
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
    <div className="flex flex-wrap gap-2">
      <Button 
        variant={selectedType === null ? 'default' : 'outline'} 
        size="sm"
        onClick={() => setSelectedType(null)}
      >
        All
      </Button>
      <Button 
        variant={selectedType === 'children' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => setSelectedType('children')}
      >
        Children
      </Button>
      <Button 
        variant={selectedType === 'carers' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => setSelectedType('carers')}
      >
        Carers
      </Button>
      <Button 
        variant={selectedType === 'staff' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => setSelectedType('staff')}
      >
        Staff
      </Button>
    </div>
  );
};
