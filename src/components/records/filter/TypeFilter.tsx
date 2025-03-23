
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
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Record Type</h3>
      <div className="flex flex-wrap gap-2">
        <Button 
          variant={selectedType === null ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setSelectedType(null)}
        >
          All
        </Button>
        <Button 
          variant={selectedType === 'case' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setSelectedType('case')}
        >
          Cases
        </Button>
        <Button 
          variant={selectedType === 'assessment' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setSelectedType('assessment')}
        >
          Assessments
        </Button>
        <Button 
          variant={selectedType === 'report' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setSelectedType('report')}
        >
          Reports
        </Button>
        <Button 
          variant={selectedType === 'document' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setSelectedType('document')}
        >
          Documents
        </Button>
      </div>
    </div>
  );
};
