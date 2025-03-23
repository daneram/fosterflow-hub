
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link, Users, ChevronUp, ChevronDown, FileText } from 'lucide-react';
import { Record } from './types';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from '@/components/ui/table';

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
    <div className="w-full">
      <div className="relative w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="h-10 px-4 text-left" onClick={() => toggleSort('title')}>
                <div className="flex items-center space-x-1">
                  <span>Document</span>
                  {sortField === 'title' && (
                    sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                  )}
                </div>
              </th>
              <th className="h-10 px-4 text-left">
                <div className="flex items-center space-x-1">
                  <span>Linked</span>
                  <Link className="h-4 w-4 ml-1 text-muted-foreground" />
                </div>
              </th>
              <th className="h-10 px-4 text-left">Staff</th>
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
                  <td className="p-4 font-medium">
                    <div className="flex items-center">
                      {getTypeIcon(record.type)}
                      <span className="ml-2">{record.title}</span>
                      <div className="text-xs text-muted-foreground ml-2">{record.id}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    {record.client && (
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1.5 text-muted-foreground" />
                        <span className="text-sm text-blue-600 hover:underline cursor-pointer">
                          {record.client}
                        </span>
                      </div>
                    )}
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
