
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Search, Calendar, Download, Eye, Bookmark, Clock, AlertTriangle } from 'lucide-react';

interface Policy {
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

const MOCK_POLICIES: Policy[] = [
  {
    id: 'POL-001',
    title: 'Child Placement Guidelines',
    description: 'Standard operating procedures for child placement decisions and documentation.',
    category: 'Child Services',
    lastUpdated: new Date('2023-07-15'),
    status: 'active',
    isNew: true,
    fileSize: '1.2 MB',
    fileType: 'pdf'
  },
  {
    id: 'POL-002',
    title: 'Case Documentation Requirements',
    description: 'Requirements for documenting case information, contacts, and assessments.',
    category: 'Documentation',
    lastUpdated: new Date('2023-05-10'),
    status: 'active',
    isNew: false,
    fileSize: '875 KB',
    fileType: 'pdf'
  },
  {
    id: 'POL-003',
    title: 'Foster Home Licensing Standards',
    description: 'Standards and procedures for licensing and monitoring foster homes.',
    category: 'Foster Care',
    lastUpdated: new Date('2023-06-22'),
    status: 'under-review',
    isNew: false,
    fileSize: '2.1 MB',
    fileType: 'word'
  },
  {
    id: 'POL-004',
    title: 'Mandated Reporting Guidelines',
    description: 'Guidelines for mandated reporters and agency reporting procedures.',
    category: 'Compliance',
    lastUpdated: new Date('2023-02-18'),
    status: 'active',
    isNew: false,
    fileSize: '950 KB',
    fileType: 'pdf'
  },
  {
    id: 'POL-005',
    title: 'Interstate Compact Procedures',
    description: 'Protocols for managing cases across state lines.',
    category: 'Legal',
    lastUpdated: new Date('2023-08-01'),
    status: 'draft',
    isNew: true,
    fileSize: '1.5 MB',
    fileType: 'word'
  },
  {
    id: 'POL-006',
    title: 'Family Preservation Services',
    description: 'Guidelines for delivering family preservation and support services.',
    category: 'Family Services',
    lastUpdated: new Date('2022-11-30'),
    status: 'archived',
    isNew: false,
    fileSize: '1.1 MB',
    fileType: 'pdf'
  }
];

const PolicyLibrary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filteredPolicies = MOCK_POLICIES.filter(policy => {
    const matchesSearch = 
      policy.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      policy.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      policy.category.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'active') return matchesSearch && policy.status === 'active';
    if (activeTab === 'drafts') return matchesSearch && policy.status === 'draft';
    if (activeTab === 'archived') return matchesSearch && policy.status === 'archived';
    
    return matchesSearch;
  });

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'draft':
        return <Badge className="bg-amber-500">Draft</Badge>;
      case 'archived':
        return <Badge variant="outline">Archived</Badge>;
      case 'under-review':
        return <Badge className="bg-blue-500">Under Review</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getFileIcon = (fileType: string) => {
    return <FileText className="h-4 w-4 text-primary" />;
  };

  return (
    <Layout>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Policy Library</h1>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-primary" />
            <span className="text-xl font-medium">Policies and Procedures</span>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search policies..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Policy Documents</CardTitle>
            <CardDescription>Access current agency policies and procedures</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Policies</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="drafts">Drafts</TabsTrigger>
                <TabsTrigger value="archived">Archived</TabsTrigger>
              </TabsList>
              
              <div className="space-y-4">
                {filteredPolicies.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
                    <FileText className="h-8 w-8 mb-2" />
                    <p>No policies found</p>
                  </div>
                ) : (
                  filteredPolicies.map((policy) => (
                    <Card key={policy.id} className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="p-4 flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center space-x-2">
                                {getFileIcon(policy.fileType)}
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
                              {getStatusBadge(policy.status)}
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
                  ))
                )}
              </div>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Last synchronized: Today at 9:42 AM</span>
            </div>
            <Button>
              <AlertTriangle className="h-4 w-4 mr-2" />
              Report Policy Issue
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default PolicyLibrary;
