
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, FileText, Folder, Users, Calendar, Download, Eye, FileEdit } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

interface Record {
  id: string;
  title: string;
  type: 'case' | 'assessment' | 'report' | 'document';
  client: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'active' | 'closed' | 'pending' | 'archived';
  tags: string[];
}

const MOCK_RECORDS: Record[] = [
  {
    id: 'CAS-2023-001',
    title: 'Johnson Family Case',
    type: 'case',
    client: 'Johnson Family',
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-05-10'),
    status: 'active',
    tags: ['urgent', 'court-involved']
  },
  {
    id: 'ASS-2023-042',
    title: 'Smith Initial Assessment',
    type: 'assessment',
    client: 'Smith, John',
    createdAt: new Date('2023-03-22'),
    updatedAt: new Date('2023-03-25'),
    status: 'pending',
    tags: ['initial', 'behavioral']
  },
  {
    id: 'REP-2023-087',
    title: 'Monthly Progress Report - Williams',
    type: 'report',
    client: 'Williams, Sarah',
    createdAt: new Date('2023-04-30'),
    updatedAt: new Date('2023-04-30'),
    status: 'closed',
    tags: ['monthly', 'progress']
  },
  {
    id: 'DOC-2023-156',
    title: 'Medical Records - Thompson Children',
    type: 'document',
    client: 'Thompson Family',
    createdAt: new Date('2023-02-18'),
    updatedAt: new Date('2023-02-18'),
    status: 'active',
    tags: ['medical', 'confidential']
  },
  {
    id: 'CAS-2023-002',
    title: 'Davis Family Reunification',
    type: 'case',
    client: 'Davis Family',
    createdAt: new Date('2023-01-05'),
    updatedAt: new Date('2023-05-01'),
    status: 'active',
    tags: ['reunification', 'court-involved']
  },
  {
    id: 'DOC-2023-198',
    title: 'School Records - Jones Children',
    type: 'document',
    client: 'Jones Family',
    createdAt: new Date('2023-03-10'),
    updatedAt: new Date('2023-03-10'),
    status: 'archived',
    tags: ['education', 'school']
  }
];

const RecordsExplorer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const filteredRecords = MOCK_RECORDS.filter(record => {
    const matchesSearch = searchQuery === '' || 
      record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedType === null || record.type === selectedType;
    const matchesStatus = selectedStatus === null || record.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'case':
        return <Folder className="h-4 w-4 text-blue-500" />;
      case 'assessment':
        return <FileEdit className="h-4 w-4 text-amber-500" />;
      case 'report':
        return <FileText className="h-4 w-4 text-green-500" />;
      case 'document':
        return <FileText className="h-4 w-4 text-purple-500" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'pending':
        return <Badge className="bg-amber-500">Pending</Badge>;
      case 'closed':
        return <Badge className="bg-blue-500">Closed</Badge>;
      case 'archived':
        return <Badge variant="outline">Archived</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <Layout>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Records Explorer</h1>
        
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="w-full md:w-1/4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Record Type</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      variant={selectedType === null ? 'default' : 'outline'} 
                      size="sm"
                      onClick={() => setSelectedType(null)}
                    >
                      All
                    </Button>
                    <Button 
                      variant={selectedType === 'case' ? 'default' : 'outline'} 
                      size="sm"
                      onClick={() => setSelectedType('case')}
                    >
                      Cases
                    </Button>
                    <Button 
                      variant={selectedType === 'assessment' ? 'default' : 'outline'} 
                      size="sm"
                      onClick={() => setSelectedType('assessment')}
                    >
                      Assessments
                    </Button>
                    <Button 
                      variant={selectedType === 'report' ? 'default' : 'outline'} 
                      size="sm"
                      onClick={() => setSelectedType('report')}
                    >
                      Reports
                    </Button>
                    <Button 
                      variant={selectedType === 'document' ? 'default' : 'outline'} 
                      size="sm"
                      onClick={() => setSelectedType('document')}
                    >
                      Documents
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Status</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      variant={selectedStatus === null ? 'default' : 'outline'} 
                      size="sm"
                      onClick={() => setSelectedStatus(null)}
                    >
                      All
                    </Button>
                    <Button 
                      variant={selectedStatus === 'active' ? 'default' : 'outline'} 
                      size="sm"
                      onClick={() => setSelectedStatus('active')}
                    >
                      Active
                    </Button>
                    <Button 
                      variant={selectedStatus === 'pending' ? 'default' : 'outline'} 
                      size="sm"
                      onClick={() => setSelectedStatus('pending')}
                    >
                      Pending
                    </Button>
                    <Button 
                      variant={selectedStatus === 'closed' ? 'default' : 'outline'} 
                      size="sm"
                      onClick={() => setSelectedStatus('closed')}
                    >
                      Closed
                    </Button>
                    <Button 
                      variant={selectedStatus === 'archived' ? 'default' : 'outline'} 
                      size="sm"
                      onClick={() => setSelectedStatus('archived')}
                    >
                      Archived
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="w-full md:w-3/4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Records</CardTitle>
                  <div className="relative w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search records..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <CardDescription>
                  {filteredRecords.length} {filteredRecords.length === 1 ? 'record' : 'records'} found
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredRecords.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
                      <FileText className="h-8 w-8 mb-2" />
                      <p>No records found</p>
                    </div>
                  ) : (
                    filteredRecords.map((record) => (
                      <Card key={record.id} className="overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                          <div className="p-4 flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="flex items-center space-x-2">
                                  {getTypeIcon(record.type)}
                                  <span className="font-medium">{record.title}</span>
                                </div>
                                <div className="text-sm text-muted-foreground mt-1">
                                  ID: {record.id}
                                </div>
                              </div>
                              <div>
                                {getStatusBadge(record.status)}
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
                            </div>
                            
                            <div className="mt-3 flex flex-wrap gap-2">
                              {record.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div className="bg-muted/30 p-4 flex items-center space-x-2 md:border-l">
                            <HoverCard>
                              <HoverCardTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <Eye className="h-4 w-4 mr-1" />
                                  View
                                </Button>
                              </HoverCardTrigger>
                              <HoverCardContent>
                                Preview functionality coming soon
                              </HoverCardContent>
                            </HoverCard>
                            
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
              <CardFooter className="border-t">
                <div className="flex justify-between items-center w-full">
                  <Button variant="outline" size="sm">
                    Previous
                  </Button>
                  <div className="text-sm text-muted-foreground">
                    Page 1 of 1
                  </div>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RecordsExplorer;
