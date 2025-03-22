
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Download, Bookmark, Calendar, FileText, AlertTriangle } from 'lucide-react';
import { Policy } from './types';
import { formatDate, getStatusConfig, getFileIconConfig } from './policyUtils';

interface PolicyCardProps {
  policy: Policy;
}

const PolicyCard: React.FC<PolicyCardProps> = ({ policy }) => {
  const statusConfig = getStatusConfig(policy.status);
  const fileIconConfig = getFileIconConfig();

  return (
    <Card key={policy.id} className="overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="p-4 flex-1">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <FileText className={fileIconConfig.className} />
                <span className="font-medium">{policy.title}</span>
                {policy.isNew && (
                  <Badge className="bg-primary ml-2">New</Badge>
                )}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {policy.category} • {policy.id}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className={statusConfig.className} variant={statusConfig.variant as any}>
                {statusConfig.text}
              </Badge>
              {policy.status === 'under-review' && (
                <AlertTriangle className="h-4 w-4 text-amber-500" />
              )}
            </div>
          </div>
          
          <p className="text-sm mt-2">{policy.description}</p>
          
          <div className="flex items-center mt-3 space-x-4 text-xs text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              Updated: {formatDate(policy.lastUpdated)}
            </div>
            <div className="flex items-center">
              <FileText className="h-4 w-4 mr-1" />
              {policy.fileSize} • {policy.fileType.toUpperCase()}
            </div>
          </div>
        </div>
        
        <div className="bg-muted/30 p-4 flex md:flex-col space-x-2 md:space-x-0 md:space-y-2 items-center md:border-l">
          <Button variant="outline" size="sm" className="w-full">
            <Eye className="h-4 w-4 mr-1" />
            View
          </Button>
          <Button variant="ghost" size="sm" className="w-full">
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>
          <Button variant="ghost" size="sm" className="w-full">
            <Bookmark className="h-4 w-4 mr-1" />
            Save
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PolicyCard;
