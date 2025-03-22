
import React from 'react';
import { FileText } from 'lucide-react';
import { Policy } from './types';
import PolicyCard from './PolicyCard';

interface PolicyListProps {
  policies: Policy[];
}

const PolicyList: React.FC<PolicyListProps> = ({ policies }) => {
  if (policies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
        <FileText className="h-8 w-8 mb-2" />
        <p>No policies found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {policies.map((policy) => (
        <PolicyCard key={policy.id} policy={policy} />
      ))}
    </div>
  );
};

export default PolicyList;
