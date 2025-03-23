
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronUp, ChevronDown, FileText, User, Clock } from 'lucide-react';
import { Record } from './types';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from '@/components/ui/table';
import { useIsMobile } from '@/hooks/use-mobile';

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
  handleSelectRecord,
  formatDate,
  getTypeIcon,
  sortField,
  sortDirection,
  toggleSort
}) => {
  const isMobile = useIsMobile();
  
  // Function to format the unique identifier
  const formatUniqueIdentifier = (record: Record) => {
    let prefix = '';
    let formattedId = '';
    
    // Format based on record type
    switch(record.type) {
      case 'case':
        // Extract 3 uppercase letters for case ID from the record title
        const titleWords = record.title.split(' ');
        const letters = titleWords.map(word => word[0] || '').join('').substring(0, 3).toUpperCase();
        
        // Format date as DDMMYY
        const dateString = record.createdAt.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit'
        }).replace(/\//g, '');
        
        // Get the numeric part from the ID or default to sequential number
        const numericPart = record.id.match(/\d+/) ? record.id.match(/\d+/)[0].padStart(3, '0') : '001';
        
        formattedId = `CAS-${dateString}-${numericPart}`;
        break;
        
      case 'assessment':
        // For assessments, use year-date-sequential format
        const yearPart = record.createdAt.getFullYear();
        const monthDay = record.createdAt.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit'
        }).replace(/\//g, '');
        
        const assessmentNum = record.id.match(/\d+/) ? record.id.match(/\d+/)[0].padStart(3, '0') : '001';
        formattedId = `${yearPart}-${monthDay}-${assessmentNum}`;
        break;
        
      case 'report':
        // Format reports with year-date-ID format with REP prefix
        const reportYear = record.createdAt.getFullYear();
        const reportDate = record.createdAt.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit'
        }).replace(/\//g, '');
        
        const reportNum = record.id.match(/\d+/) ? record.id.match(/\d+/)[0].padStart(3, '0') : '001';
        formattedId = `REP-${reportYear}-${reportDate}-${reportNum}`;
        break;
        
      case 'document':
        // Format documents with date-ID format
        const docDate = record.createdAt.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit'
        }).replace(/\//g, '');
        
        const docNum = record.id.match(/\d+/) ? record.id.match(/\d+/)[0].padStart(3, '0') : '001';
        formattedId = `DOC-${docDate}-${docNum}`;
        break;
        
      default:
        // For any other type, just use the ID as is
        formattedId = record.id;
    }
    
    return formattedId;
  };

  const handleRowClick = (id: string) => {
    const isSelected = selectedRecords.includes(id);
    handleSelectRecord(id, !isSelected);
  };

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
              {!isMobile && (
                <>
                  <th className="h-10 px-4 text-left">
                    <span>Linked</span>
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
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {records.length === 0 ? (
              <tr>
                <td colSpan={isMobile ? 1 : 4} className="h-24 text-center">
                  <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                    <FileText className="h-8 w-8 mb-2" />
                    <p>No records found</p>
                  </div>
                </td>
              </tr>
            ) : (
              records.map((record) => (
                <tr 
                  key={record.id} 
                  className={`border-b hover:bg-muted/50 cursor-pointer ${selectedRecords.includes(record.id) ? 'bg-muted/50' : ''}`}
                  onClick={() => handleRowClick(record.id)}
                >
                  <td className="py-2 px-4 font-medium">
                    {isMobile ? (
                      <div className="flex justify-between">
                        <div className="flex-1">
                          <div className="font-medium">{record.title}</div>
                          <div className="text-xs text-muted-foreground">{formatUniqueIdentifier(record)}</div>
                        </div>
                        <div className="flex flex-col text-right text-xs text-muted-foreground">
                          {record.client && (
                            <div className="mb-1 flex items-center justify-end">
                              <User className="h-3 w-3 mr-1" />
                              <span>{record.client}</span>
                            </div>
                          )}
                          <div className="flex items-center justify-end">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{formatDate(record.updatedAt)}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col">
                        <span>{record.title}</span>
                        <div className="text-xs text-muted-foreground">{formatUniqueIdentifier(record)}</div>
                      </div>
                    )}
                  </td>
                  {!isMobile && (
                    <>
                      <td className="py-2 px-4">
                        {record.client && (
                          <span className="text-sm text-muted-foreground hover:underline cursor-pointer">
                            {record.client}
                          </span>
                        )}
                      </td>
                      <td className="py-2 px-4">{record.owner || 'Unassigned'}</td>
                      <td className="py-2 px-4">{formatDate(record.updatedAt)}</td>
                    </>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
