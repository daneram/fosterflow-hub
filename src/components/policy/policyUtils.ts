
import { FileText, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Policy } from './types';
import React from 'react';

export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
};

export const getStatusBadge = (status: string) => {
  switch(status) {
    case 'active':
      return <Badge className="bg-green-500">Active</Badge>;
    case 'draft':
      return <Badge className="bg-amber-500">Draft</Badge>;
    case 'archived':
      return <Badge variant="outline">Archived</Badge>;
    case 'under-review':
      return <Badge className="bg-blue-500">Under Review</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

export const getFileIcon = (fileType: string) => {
  return <FileText className="h-4 w-4 text-primary" />;
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
