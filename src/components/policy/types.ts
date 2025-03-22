
export interface Policy {
  id: string;
  title: string;
  description: string;
  category: string;
  lastUpdated: Date;
  status: 'active' | 'draft' | 'archived' | 'under-review';
  isNew: boolean;
  fileSize: string;
  fileType: 'pdf' | 'word' | 'excel';
}
