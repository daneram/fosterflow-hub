
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText, ChevronUp, ChevronDown } from 'lucide-react';

interface Record {
  id: string;
  title: string;
  type: 'case' | 'assessment' | 'report' | 'document';
  client: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'active' | 'closed' | 'pending' | 'archived';
  tags: string[];
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  completeness?: number;
  owner?: string;
  lastAccessed?: Date;
  relatedRecords?: string[];
  compliance?: 'complete' | 'incomplete' | 'overdue';
  favorite?: boolean;
}

interface RecordTableViewProps {
  records: Record[];
  selectedRecords: string[];
  handleSelectAll: (checked: boolean) => void;
  handleSelectRecord: (id: string, checked: boolean) => void;
  formatDate: (date: Date) => string;
  getTypeIcon: (type: string) => React.ReactNode;
  getStatusBadge: (status: string) => React.ReactNode;
  getComplianceIcon: (compliance?: string) => React.ReactNode;
  sortField: keyof Record;
  sortDirection: 'asc' | 'desc';
  toggleSort: (field: keyof Record) => void;
}

export const RecordTableView: React.FC<RecordTableViewProps> = ({
  records,
  formatDate,
  getTypeIcon,
  sortField,
  sortDirection,
  toggleSort
}) => {
  return (
    <div className="rounded-md">
      <div className="relative w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="h-10 px-2 text-left" onClick={() => toggleSort('type')}>
                <div className="flex items-center space-x-1">
                  <span>Type</span>
                  {sortField === 'type' && (
                    sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                  )}
                </div>
              </th>
              <th className="h-10 px-4 text-left" onClick={() => toggleSort('title')}>
                <div className="flex items-center space-x-1">
                  <span>Case Name</span>
                  {sortField === 'title' && (
                    sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                  )}
                </div>
              </th>
              <th className="h-10 px-4 text-left">Case Worker</th>
              <th className="h-10 px-4 text-left" onClick={() => toggleSort('updatedAt')}>
                <div className="flex items-center space-x-1">
                  <span>Updated</span>
                  {sortField === 'updatedAt' && (
                    sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                  )}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {records.length === 0 ? (
              <tr>
                <td colSpan={4} className="h-24 text-center">
                  <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                    <FileText className="h-8 w-8 mb-2" />
                    <p>No records found</p>
                  </div>
                </td>
              </tr>
            ) : (
              records.map((record) => (
                <tr key={record.id} className="border-b hover:bg-muted/50">
                  <td className="p-2">
                    <div className="flex items-center">
                      {getTypeIcon(record.type)}
                    </div>
                  </td>
                  <td className="p-4 font-medium">
                    <div>
                      {record.title}
                      <div className="text-xs text-muted-foreground">{record.id}</div>
                    </div>
                  </td>
                  <td className="p-4">{record.owner || 'Unassigned'}</td>
                  <td className="p-4">{formatDate(record.updatedAt)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
