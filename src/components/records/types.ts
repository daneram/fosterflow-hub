
export interface Record {
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
