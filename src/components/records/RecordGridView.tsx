
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Eye, Download, FileEdit, MoreHorizontal, Star, Users, Calendar, FileText } from 'lucide-react';

interface Record {
  id: string;
  title: string;
  type: 'case' | 'assessment' | 'report' | 'document';
  client: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'active' | 'closed' | 'pending' | 'archived';
  tags: string[];
  favorite?: boolean;
  compliance?: string;
  priority?: string;
}

interface RecordGridViewProps {
  records: Record[];
  selectedRecords: string[];
  handleSelectRecord: (id: string, checked: boolean) => void;
  formatDate: (date: Date) => string;
  getTypeIcon: (type: string) => React.ReactNode;
  getStatusBadge: (status: string) => React.ReactNode;
  getPriorityBadge?: (priority?: string) => React.ReactNode;
  getComplianceIcon: (compliance?: string) => React.ReactNode;
}

export const RecordGridView: React.FC<RecordGridViewProps> = ({
  records,
  selectedRecords,
  handleSelectRecord,
  formatDate,
  getTypeIcon,
  getStatusBadge,
  getPriorityBadge,
  getComplianceIcon
}) => {
  if (records.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center h-40 text-muted-foreground">
        <FileText className="h-8 w-8 mb-2" />
        <p>No records found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {records.map((record) => (
        <Card key={record.id} className="overflow-hidden">
          <CardHeader className="p-4 pb-2">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2">
                {getTypeIcon(record.type)}
                <CardTitle className="text-base">{record.title}</CardTitle>
                {record.favorite && <Star className="h-4 w-4 text-yellow-500" />}
              </div>
              <Checkbox 
                checked={selectedRecords.includes(record.id)} 
                onCheckedChange={(checked) => handleSelectRecord(record.id, checked as boolean)}
              />
            </div>
            <CardDescription>{record.id}</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="flex items-center justify-between mt-2">
              <div className="flex space-x-2">
                {getStatusBadge(record.status)}
                {getPriorityBadge && record.priority && getPriorityBadge(record.priority)}
              </div>
              {record.compliance && getComplianceIcon(record.compliance)}
            </div>
            
            <div className="mt-3 text-sm">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {record.client}
              </div>
              <div className="flex items-center mt-1">
                <Calendar className="h-4 w-4 mr-1" />
                {formatDate(record.updatedAt)}
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-2 bg-muted/30 flex justify-between">
            <Button variant="ghost" size="sm">
              <Eye className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <FileEdit className="h-4 w-4" />
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
                  <Users className="h-4 w-4 mr-2" />
                  Change Owner
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
