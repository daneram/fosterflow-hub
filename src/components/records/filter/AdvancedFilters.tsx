import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { ChevronDown, X, User, TextSelect } from 'lucide-react';

interface AdvancedFiltersProps {
  isOpen: boolean;
  selectedStatus: string | null;
  setSelectedStatus: (status: string | null) => void;
  selectedAssignee: string | null;
  setSelectedAssignee: (assignee: string | null) => void;
  selectedType: string | null;
  setSelectedType: (type: string | null) => void;
}

export const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({ 
  isOpen, 
  selectedStatus, 
  setSelectedStatus,
  selectedAssignee,
  setSelectedAssignee,
  selectedType,
  setSelectedType
}) => {
  const isMobile = useIsMobile();
  
  if (!isOpen) return null;

  // Function to handle status button click
  const handleStatusButtonClick = (status: string) => {
    // If clicking the already selected status, deselect it
    if (selectedStatus === status) {
      setSelectedStatus(null);
    } else {
      setSelectedStatus(status);
    }
  };

  // Function to handle assignee selection
  const handleAssigneeChange = (value: string) => {
    setSelectedAssignee(value === "any" ? null : value);
  };
  
  // Function to handle type selection
  const handleTypeChange = (value: string) => {
    setSelectedType(value === "any" ? null : value);
  };
  
  // Function to clear assignee
  const clearAssignee = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent dropdown from opening
    setSelectedAssignee(null);
  };

  // Function to clear type
  const clearType = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedType(null);
  };

  // Map for assignee display names
  const assigneeNames: Record<string, string> = {
    "sarah": "Sarah Wilson",
    "michael": "Michael Brown",
    "emily": "Emily Davis",
    "robert": "Robert Johnson"
  };

  // Record type options
  const recordTypes: Record<string, string> = {
    "case": "Cases",
    "assessment": "Assessments",
    "report": "Reports",
    "document": "Documents"
  };
  
  return (
    <div className="space-y-2 sm:space-y-2 pt-2 pb-1 sm:pb-1">
      <div className="space-y-2">
        {/* User and Type filters side by side */}
        <div className="flex gap-2">
          {/* User filter */}
          <div className="flex-1 relative">
            <Select
              value={selectedAssignee || ""}
              onValueChange={handleAssigneeChange}
            >
              <SelectTrigger 
                className={cn(
                  "h-9 pl-8 text-muted-foreground justify-start", 
                  selectedAssignee ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""
                )}
                hideDefaultChevron
              >
                <User className={cn(
                  "absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4", 
                  selectedAssignee ? "text-primary-foreground" : "text-muted-foreground"
                )} />
                <SelectValue placeholder="User" className="pl-0 mt-[1px]">
                  {selectedAssignee && assigneeNames[selectedAssignee]}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Anyone</SelectItem>
                {Object.entries(assigneeNames).map(([value, name]) => (
                  <SelectItem key={value} value={value}>{name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedAssignee && (
              <button
                onClick={clearAssignee}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-foreground z-10"
                aria-label="Clear user selection"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Type filter */}
          <div className="flex-1 relative">
            <Select
              value={selectedType || ""}
              onValueChange={handleTypeChange}
            >
              <SelectTrigger 
                className={cn(
                  "h-9 pl-8 text-muted-foreground justify-start", 
                  selectedType ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""
                )}
                hideDefaultChevron
              >
                <TextSelect className={cn(
                  "absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4", 
                  selectedType ? "text-primary-foreground" : "text-muted-foreground"
                )} />
                <SelectValue placeholder="Type" className="pl-0 mt-[1px]">
                  {selectedType && recordTypes[selectedType]}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any type</SelectItem>
                {Object.entries(recordTypes).map(([value, name]) => (
                  <SelectItem key={value} value={value}>{name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedType && (
              <button
                onClick={clearType}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-foreground z-10"
                aria-label="Clear type selection"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
      
      <div className={isMobile ? "space-y-2" : "space-y-2"}>
        <div className={isMobile ? "flex justify-center" : "flex flex-wrap"}>
          <div className={isMobile ? "flex flex-wrap justify-center gap-2" : "flex flex-wrap gap-2"}>
            <Button 
              variant={selectedStatus === 'complete' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => handleStatusButtonClick('complete')}
              className={selectedStatus === 'complete' ? 'text-primary-foreground' : ''}
            >
              Compliant
            </Button>
            <Button 
              variant={selectedStatus === 'incomplete' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => handleStatusButtonClick('incomplete')}
              className={selectedStatus === 'incomplete' ? 'text-primary-foreground' : ''}
            >
              Non-Compliant
            </Button>
            <Button 
              variant={selectedStatus === 'overdue' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => handleStatusButtonClick('overdue')}
              className={selectedStatus === 'overdue' ? 'text-primary-foreground' : ''}
            >
              Overdue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
