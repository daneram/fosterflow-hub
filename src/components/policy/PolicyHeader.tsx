
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface PolicyHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const PolicyHeader: React.FC<PolicyHeaderProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
      <div className="flex items-center space-x-2 text-sm font-medium">
        <span>Filter policies by keyword</span>
      </div>
      <div className="relative max-w-xs">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search policies..."
          className="pl-8 h-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
};

export default PolicyHeader;
