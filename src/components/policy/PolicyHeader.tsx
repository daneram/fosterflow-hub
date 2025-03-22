
import React from 'react';
import { Input } from '@/components/ui/input';
import { FileText, Search } from 'lucide-react';

interface PolicyHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const PolicyHeader: React.FC<PolicyHeaderProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">Policy Library</h1>

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <FileText className="h-5 w-5 text-primary" />
          <span className="text-xl font-medium">Policies and Procedures</span>
        </div>
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search policies..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
    </>
  );
};

export default PolicyHeader;
