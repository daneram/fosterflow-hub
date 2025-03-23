
import React from 'react';
import { Button } from '@/components/ui/button';

interface StatusFilterProps {
  selectedStatus: string | null;
  setSelectedStatus: (status: string | null) => void;
}

export const StatusFilter: React.FC<StatusFilterProps> = ({
  selectedStatus,
  setSelectedStatus
}) => {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Status</h3>
      <div className="flex flex-wrap gap-2">
        <Button 
          variant={selectedStatus === null ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setSelectedStatus(null)}
        >
          All
        </Button>
        <Button 
          variant={selectedStatus === 'active' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setSelectedStatus('active')}
        >
          Active
        </Button>
        <Button 
          variant={selectedStatus === 'pending' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setSelectedStatus('pending')}
        >
          Pending
        </Button>
        <Button 
          variant={selectedStatus === 'closed' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setSelectedStatus('closed')}
        >
          Closed
        </Button>
        <Button 
          variant={selectedStatus === 'archived' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setSelectedStatus('archived')}
        >
          Archived
        </Button>
      </div>
    </div>
  );
};
