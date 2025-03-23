
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Eye, Download, FileEdit, MoreHorizontal, Star, Users, Calendar, Folder, FileText, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

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

interface RecordListViewProps {
  records: Record[];
  selectedRecords: string[];
  handleSelectAll: (checked: boolean) => void;
  handleSelectRecord: (id: string, checked: boolean) => void;
  formatDate: (date: Date) => string;
  getTypeIcon: (type: string) => React.ReactNode;
  getStatusBadge: (status: string) => React.ReactNode;
  getPriorityBadge: (priority?: string) => React.ReactNode;
  getComplianceIcon: (compliance?: string) => React.ReactNode;
}

export const RecordListView: React.FC<RecordListViewProps> = ({
  records,
  selectedRecords,
  handleSelectAll,
  handleSelectRecord,
  formatDate,
  getTypeIcon,
  getStatusBadge,
  getPriorityBadge,
  getComplianceIcon
}) => {
  return (
    <div className="space-y-4">
      {records.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
          <FileText className="h-8 w-8 mb-2" />
          <p>No records found</p>
        </div>
      ) : (
        <>
          {/* Select All Checkbox */}
          <div className="flex items-center pb-2">
            <Checkbox 
              id="select-all" 
              checked={selectedRecords.length === records.length && records.length > 0}
              onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
            />
            <label htmlFor="select-all" className="ml-2 text-sm font-medium">
              Select All
            </label>
          </div>
          
          {records.map((record) => (
            <Card key={record.id} className="overflow-hidden">
              <div className="flex items-center">
                {/* Selection Checkbox */}
                <div className="px-3">
                  <Checkbox 
                    id={`select-${record.id}`}
                    checked={selectedRecords.includes(record.id)} 
                    onCheckedChange={(checked) => handleSelectRecord(record.id, checked as boolean)}
                  />
                </div>
                
                {/* Record Content */}
                <div className="flex flex-col md:flex-row flex-1">
                  <div className="p-4 flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          {getTypeIcon(record.type)}
                          <span className="font-medium">{record.title}</span>
                          {record.favorite && <Star className="h-4 w-4 text-yellow-500" />}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          ID: {record.id}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {getStatusBadge(record.status)}
                        {getPriorityBadge(record.priority)}
                      </div>
                    </div>
                    
                    <div className="flex items-center mt-3 space-x-4 text-sm">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {record.client}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Updated: {formatDate(record.updatedAt)}
                      </div>
                      {record.owner && (
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {record.owner}
                        </div>
                      )}
                      {record.compliance && (
                        <div className="flex items-center">
                          {getComplianceIcon(record.compliance)}
                          <span className="ml-1">{record.compliance}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-3 flex flex-wrap gap-2">
                      {record.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    {/* Expandable Content - Normally hidden, shown on expand */}
                    <Collapsible>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm" className="mt-2">
                          Show more
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="pt-2">
                        <div className="space-y-2 text-sm">
                          {record.completeness !== undefined && (
                            <div className="flex items-center space-x-2">
                              <span>Completeness:</span>
                              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-blue-500 rounded-full" 
                                  style={{ width: `${record.completeness}%` }} 
                                />
                              </div>
                              <span>{record.completeness}%</span>
                            </div>
                          )}
                          
                          {record.relatedRecords && record.relatedRecords.length > 0 && (
                            <div>
                              <h4 className="font-medium mb-1">Related Records:</h4>
                              <div className="flex flex-wrap gap-1">
                                {record.relatedRecords.map(relId => (
                                  <Badge key={relId} variant="outline" className="text-xs">
                                    {relId}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {record.lastAccessed && (
                            <div>
                              <span className="text-muted-foreground">
                                Last accessed: {formatDate(record.lastAccessed)}
                              </span>
                            </div>
                          )}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                  
                  <div className="bg-muted/30 p-4 flex md:flex-col items-center justify-start md:border-l space-x-2 md:space-x-0 md:space-y-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Download
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
                </div>
              </div>
            </Card>
          ))}
        </>
      )}
    </div>
  );
};
