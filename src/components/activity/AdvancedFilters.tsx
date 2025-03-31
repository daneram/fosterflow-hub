import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { ChevronDown, X, User, TextSelect } from 'lucide-react';

interface AdvancedFiltersProps {
  isOpen: boolean;
  selectedUser: string | null;
  setSelectedUser: (user: string | null) => void;
  selectedActivityType: string | null;
  setSelectedActivityType: (type: string | null) => void;
}

export const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({ 
  isOpen, 
  selectedUser,
  setSelectedUser,
  selectedActivityType,
  setSelectedActivityType
}) => {
  const isMobile = useIsMobile();
  
  if (!isOpen) return null;

  // Function to handle user selection
  const handleUserChange = (value: string) => {
    setSelectedUser(value === "any" ? null : value);
  };

  // Function to handle activity type selection
  const handleActivityTypeChange = (value: string) => {
    setSelectedActivityType(value === "any" ? null : value);
  };
  
  // Function to clear user
  const clearUser = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedUser(null);
  };

  // Function to clear activity type
  const clearActivityType = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedActivityType(null);
  };

  // Map for user display names
  const userNames: Record<string, string> = {
    "sarah": "Sarah Williams",
    "james": "James Clark",
    "emily": "Emily Johnson",
    "daniel": "Daniel Wilson",
    "lisa": "Lisa Martinez",
    "michael": "Michael Rodriguez"
  };

  // Activity type options
  const activityTypes: Record<string, string> = {
    "access": "Access",
    "document": "Documents",
    "message": "Messages",
    "visit": "Visits",
    "call": "Calls",
    "status": "Status Updates",
    "meeting": "Meetings"
  };
  
  return (
    <div className="space-y-4">
      {/* User and Type filters side by side */}
      <div className="flex gap-2 pb-2 sm:pb-2">
        {/* User filter */}
        <div className="flex-1 relative">
          <Select
            value={selectedUser || ""}
            onValueChange={handleUserChange}
          >
            <SelectTrigger 
              className={cn(
                "w-full pl-8 text-muted-foreground justify-start", 
                selectedUser ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""
              )}
              hideDefaultChevron
            >
              <User className={cn(
                "absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4",
                selectedUser ? "text-primary-foreground" : "text-muted-foreground"
              )} />
              <SelectValue placeholder="User" className="pl-0 mt-[1px]">
                {selectedUser && userNames[selectedUser]}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any user</SelectItem>
              {Object.entries(userNames).map(([value, name]) => (
                <SelectItem key={value} value={value}>{name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selectedUser && (
            <button
              onClick={clearUser}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-foreground z-10"
              aria-label="Clear user selection"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Activity Type filter */}
        <div className="flex-1 relative">
          <Select
            value={selectedActivityType || ""}
            onValueChange={handleActivityTypeChange}
          >
            <SelectTrigger 
              className={cn(
                "w-full pl-8 text-muted-foreground justify-start", 
                selectedActivityType ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""
              )}
              hideDefaultChevron
            >
              <TextSelect className={cn(
                "absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4",
                selectedActivityType ? "text-primary-foreground" : "text-muted-foreground"
              )} />
              <SelectValue placeholder="Type" className="pl-0 mt-[1px]">
                {selectedActivityType && activityTypes[selectedActivityType]}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any type</SelectItem>
              {Object.entries(activityTypes).map(([value, name]) => (
                <SelectItem key={value} value={value}>{name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selectedActivityType && (
            <button
              onClick={clearActivityType}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-foreground z-10"
              aria-label="Clear type selection"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}; 