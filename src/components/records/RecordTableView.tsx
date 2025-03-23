
import React from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Eye, Download, MoreHorizontal, Star, FileEdit, Users, ChevronUp, ChevronDown, FileText } from 'lucide-react';

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
  selectedRecords,
  handleSelectAll,
  handleSelectRecord,
  formatDate,
  getTypeIcon,
  getStatusBadge,
  getComplianceIcon,
  sortField,
  sortDirection,
  toggleSort
}) => {
  return (
    <div className="rounded-md border">
      <div className="relative w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="h-10 px-2 text-left">
                <Checkbox 
                  checked={selectedRecords.length === records.length && records.length > 0}
                  onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
                />
              </th>
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
                  <span>Title</span>
                  {sortField === 'title' && (
                    sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                  )}
                </div>
              </th>
              <th className="h-10 px-4 text-left">Client</th>
              <th className="h-10 px-4 text-left">Status</th>
              <th className="h-10 px-4 text-left" onClick={() => toggleSort('updatedAt')}>
                <div className="flex items-center space-x-1">
                  <span>Updated</span>
                  {sortField === 'updatedAt' && (
                    sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                  )}
                </div>
              </th>
              <th className="h-10 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.length === 0 ? (
              <tr>
                <td colSpan={7} className="h-24 text-center">
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
                    <Checkbox 
                      checked={selectedRecords.includes(record.id)} 
                      onCheckedChange={(checked) => handleSelectRecord(record.id, checked as boolean)}
                    />
                  </td>
                  <td className="p-2">
                    <div className="flex items-center">
                      {getTypeIcon(record.type)}
                      {record.favorite && <Star className="h-4 w-4 ml-1 text-yellow-500" />}
                    </div>
                  </td>
                  <td className="p-4 font-medium">
                    <div>
                      {record.title}
                      <div className="text-xs text-muted-foreground">{record.id}</div>
                    </div>
                  </td>
                  <td className="p-4">{record.client}</td>
                  <td className="p-4">
                    <div className="flex flex-col space-y-1">
                      {getStatusBadge(record.status)}
                      {record.compliance && (
                        <div className="flex items-center mt-1">
                          {getComplianceIcon(record.compliance)}
                          <span className="ml-1 text-xs">{record.compliance}</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4">{formatDate(record.updatedAt)}</td>
                  <td className="p-4">
                    <div className="flex items-center justify-center space-x-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Star className="h-4 w-4 mr-2" />
                            {record.favorite ? 'Remove Favorite' : 'Add to Favorites'}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileEdit className="h-4 w-4 mr-2" />
                            Edit Record
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Users className="h-4 w-4 mr-2" />
                            Change Owner
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
