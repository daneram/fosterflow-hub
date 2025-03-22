
import { FileText, AlertTriangle } from 'lucide-react';
import { Policy } from './types';

export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
};

// Return status badge configuration object instead of JSX
export const getStatusConfig = (status: string) => {
  switch(status) {
    case 'active':
      return { text: 'Active', className: "bg-green-500", variant: 'default' };
    case 'draft':
      return { text: 'Draft', className: "bg-amber-500", variant: 'default' };
    case 'archived':
      return { text: 'Archived', className: "", variant: 'outline' };
    case 'under-review':
      return { text: 'Under Review', className: "bg-blue-500", variant: 'default' };
    default:
      return { text: status, className: "", variant: 'default' };
  }
};

// Return file icon configuration instead of JSX
export const getFileIconConfig = () => {
  return { className: "h-4 w-4 text-primary" };
};

export const filterPolicies = (policies: Policy[], searchQuery: string, activeTab: string) => {
  return policies.filter(policy => {
    const matchesSearch = 
      policy.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      policy.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      policy.category.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'active') return matchesSearch && policy.status === 'active';
    if (activeTab === 'drafts') return matchesSearch && policy.status === 'draft';
    if (activeTab === 'archived') return matchesSearch && policy.status === 'archived';
    
    return matchesSearch;
  });
};
