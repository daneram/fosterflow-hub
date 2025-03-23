
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Folder, FileEdit, FileText, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { Record } from './types';

export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
};

export const getTypeIcon = (type: string) => {
  switch(type) {
    case 'case':
      return <Folder className="h-4 w-4 text-blue-500" />;
    case 'assessment':
      return <FileEdit className="h-4 w-4 text-amber-500" />;
    case 'report':
      return <FileText className="h-4 w-4 text-green-500" />;
    case 'document':
      return <FileText className="h-4 w-4 text-purple-500" />;
    default:
      return <FileText className="h-4 w-4" />;
  }
};

export const getStatusBadge = (status: string) => {
  switch(status) {
    case 'active':
      return <Badge className="bg-green-500">Active</Badge>;
    case 'pending':
      return <Badge className="bg-amber-500">Pending</Badge>;
    case 'closed':
      return <Badge className="bg-blue-500">Closed</Badge>;
    case 'archived':
      return <Badge variant="outline">Archived</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

export const getPriorityBadge = (priority?: string) => {
  switch(priority) {
    case 'urgent':
      return <Badge className="bg-red-500">Urgent</Badge>;
    case 'high':
      return <Badge className="bg-orange-500">High</Badge>;
    case 'medium':
      return <Badge className="bg-amber-500">Medium</Badge>;
    case 'low':
      return <Badge className="bg-green-500">Low</Badge>;
    default:
      return null;
  }
};

export const getComplianceIcon = (compliance?: string) => {
  switch(compliance) {
    case 'complete':
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'incomplete':
      return <AlertCircle className="h-4 w-4 text-amber-500" />;
    case 'overdue':
      return <XCircle className="h-4 w-4 text-red-500" />;
    default:
      return null;
  }
};

export const filterRecords = (
  records: Record[], 
  searchQuery: string, 
  selectedType: string | null, 
  selectedStatus: string | null, 
  showFavoritesOnly: boolean
) => {
  return records.filter(record => {
    const matchesSearch = searchQuery === '' || 
      record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedType === null || record.type === selectedType;
    const matchesStatus = selectedStatus === null || record.status === selectedStatus;
    const matchesFavorites = showFavoritesOnly ? record.favorite === true : true;
    
    return matchesSearch && matchesType && matchesStatus && matchesFavorites;
  });
};

export const sortRecords = (records: Record[], sortField: keyof Record, sortDirection: 'asc' | 'desc') => {
  return [...records].sort((a, b) => {
    const fieldA = a[sortField];
    const fieldB = b[sortField];
    
    if (fieldA instanceof Date && fieldB instanceof Date) {
      return sortDirection === 'asc' 
        ? fieldA.getTime() - fieldB.getTime() 
        : fieldB.getTime() - fieldA.getTime();
    }
    
    if (typeof fieldA === 'string' && typeof fieldB === 'string') {
      return sortDirection === 'asc'
        ? fieldA.localeCompare(fieldB)
        : fieldB.localeCompare(fieldA);
    }
    
    return 0;
  });
};
