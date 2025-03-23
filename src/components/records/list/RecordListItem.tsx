
import React from 'react';
import { Card } from '@/components/ui/card';
import { Users, Calendar } from 'lucide-react';
import { Record } from '../types';

interface RecordListItemProps {
  record: Record;
  isSelected: boolean;
  onSelectRecord: (id: string, checked: boolean) => void;
  formatDate: (date: Date) => string;
  getTypeIcon: (type: string) => React.ReactNode;
  getStatusBadge: (status: string) => React.ReactNode;
  getPriorityBadge: (priority?: string) => React.ReactNode;
  getComplianceIcon: (compliance?: string) => React.ReactNode;
}

export const RecordListItem: React.FC<RecordListItemProps> = ({
  record,
  formatDate,
  getTypeIcon,
}) => {
  return (
    <Card key={record.id} className="overflow-hidden">
      <div className="flex items-center">
        {/* Record Content */}
        <div className="flex flex-col flex-1 p-3">
          <div className="flex items-start space-x-3">
            <div>
              {getTypeIcon(record.type)}
            </div>
            <div className="flex-1">
              <div className="font-medium">{record.title}</div>
              <div className="text-xs text-muted-foreground">ID: {record.id}</div>
            </div>
          </div>
          
          <div className="flex items-center mt-2 space-x-4 text-sm">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              {record.owner || 'Unassigned'}
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              Updated: {formatDate(record.updatedAt)}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
