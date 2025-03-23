
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AdvancedFiltersProps {
  isOpen: boolean;
}

export const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({ isOpen }) => {
  if (!isOpen) return null;
  
  return (
    <div className="space-y-3 pt-2">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Date Range</h3>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-xs text-muted-foreground mb-1">From</p>
            <Input type="date" className="h-8" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">To</p>
            <Input type="date" className="h-8" />
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Assigned To</h3>
        <Select>
          <SelectTrigger className="h-8">
            <SelectValue placeholder="Select user" />
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
        <h3 className="text-sm font-medium">Compliance Status</h3>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">Complete</Button>
          <Button variant="outline" size="sm">Incomplete</Button>
          <Button variant="outline" size="sm">Overdue</Button>
        </div>
      </div>
      
      <div className="pt-2">
        <Button size="sm" className="w-full">Apply Filters</Button>
      </div>
    </div>
  );
};
