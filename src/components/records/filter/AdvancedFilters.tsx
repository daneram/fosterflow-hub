import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface AdvancedFiltersProps {
  isOpen: boolean;
  selectedStatus: string | null;
  setSelectedStatus: (status: string | null) => void;
}

export const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({ 
  isOpen, 
  selectedStatus, 
  setSelectedStatus 
}) => {
  const isMobile = useIsMobile();
  const [selectedAssignee, setSelectedAssignee] = React.useState<string | null>(null);
  
  if (!isOpen) return null;

  // Function to handle status button click
  const handleStatusButtonClick = (status: string) => {
    // If the same status is clicked, don't reset to null
    // Only change the status to the new one that was clicked
    setSelectedStatus(status);
  };

  // Function to handle assignee selection
  const handleAssigneeChange = (value: string) => {
    setSelectedAssignee(value === "any" ? null : value);
  };
  
  return (
    <div className="space-y-4 py-2">
      <div className="space-y-2">
        <Select onValueChange={handleAssigneeChange} value={selectedAssignee || undefined}>
          <SelectTrigger 
            className={cn("h-9", selectedAssignee ? "bg-primary text-primary-foreground hover:bg-primary/90" : "")}
          >
            <SelectValue placeholder="Assigned to" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Anyone</SelectItem>
            <SelectItem value="sarah">Sarah Wilson</SelectItem>
            <SelectItem value="michael">Michael Brown</SelectItem>
            <SelectItem value="emily">Emily Davis</SelectItem>
            <SelectItem value="robert">Robert Johnson</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <div className={isMobile ? "flex justify-center" : "flex flex-wrap"}>
          <div className={isMobile ? "flex flex-wrap justify-center gap-2" : "flex flex-wrap gap-2"}>
            <Button 
              variant={selectedStatus === 'complete' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => handleStatusButtonClick('complete')}
            >
              Compliant
            </Button>
            <Button 
              variant={selectedStatus === 'incomplete' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => handleStatusButtonClick('incomplete')}
            >
              Non-Compliant
            </Button>
            <Button 
              variant={selectedStatus === 'overdue' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => handleStatusButtonClick('overdue')}
            >
              Overdue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
