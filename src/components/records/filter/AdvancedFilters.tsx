
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface AdvancedFiltersProps {
  isOpen: boolean;
  selectedStatus: string | null;
  setSelectedStatus: (status: string | null) => void;
  selectedAssignee: string | null;
  setSelectedAssignee: (assignee: string | null) => void;
}

export const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({ 
  isOpen, 
  selectedStatus, 
  setSelectedStatus,
  selectedAssignee,
  setSelectedAssignee
}) => {
  const isMobile = useIsMobile();
  
  if (!isOpen) return null;

  // Function to handle status button click
  const handleStatusButtonClick = (status: string) => {
    setSelectedStatus(status);
  };

  // Function to handle assignee selection
  const handleAssigneeChange = (value: string) => {
    setSelectedAssignee(value === "any" ? null : value);
  };
  
  // Function to clear assignee
  const clearAssignee = () => {
    setSelectedAssignee(null);
  };

  // Map for assignee display names
  const assigneeNames: Record<string, string> = {
    "sarah": "Sarah Wilson",
    "michael": "Michael Brown",
    "emily": "Emily Davis",
    "robert": "Robert Johnson"
  };
  
  return (
    <div className="space-y-4 py-2">
      <div className="space-y-2">
        <div className="relative flex items-center">
          <Select 
            value={selectedAssignee || ""} 
            onValueChange={handleAssigneeChange}
          >
            <SelectTrigger 
              className={cn(
                "h-9 pr-10", 
                selectedAssignee ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""
              )}
            >
              <SelectValue placeholder="Assigned to">
                {selectedAssignee && assigneeNames[selectedAssignee]}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Anyone</SelectItem>
              <SelectItem value="sarah">Sarah Wilson</SelectItem>
              <SelectItem value="michael">Michael Brown</SelectItem>
              <SelectItem value="emily">Emily Davis</SelectItem>
              <SelectItem value="robert">Robert Johnson</SelectItem>
            </SelectContent>
          </Select>
          
          {selectedAssignee && (
            <button
              onClick={clearAssignee}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-foreground"
              aria-label="Clear selection"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
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
