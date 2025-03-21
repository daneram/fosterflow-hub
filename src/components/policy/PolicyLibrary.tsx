
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, FileText, Clock, BookOpen, ArrowUpDown, Download, AlertCircle, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Policy {
  id: string;
  title: string;
  description: string;
  category: string;
  lastUpdated: Date;
  effectiveDate: Date;
  status: 'active' | 'draft' | 'archived' | 'pending';
  important: boolean;
  version: string;
  fileSize: string;
}

const MOCK_POLICIES: Policy[] = [
  {
    id: 'POL-001',
    title: 'Child Safety and Protection Protocols',
    description: 'Comprehensive guidelines for ensuring child safety in all case management scenarios.',
    category: 'Safety',
    lastUpdated: new Date('2023-04-15'),
    effectiveDate: new Date('2023-05-01'),
    status: 'active',
    important: true,
    version: '3.2',
    fileSize: '1.2 MB'
  },
  {
    id: 'POL-002',
    title: 'Case Documentation Standards',
    description: 'Standards and requirements for maintaining proper case documentation.',
    category: 'Documentation',
    lastUpdated: new Date('2023-03-10'),
    effectiveDate: new Date('2023-03-15'),
    status: 'active',
    important: false,
    version: '2.1',
    fileSize: '845 KB'
  },
  {
    id: 'POL-003',
    title: 'Family Reunification Guidelines',
    description: 'Process and requirements for family reunification assessment and planning.',
    category: 'Reunification',
    lastUpdated: new Date('2023-02-22'),
    effectiveDate: new Date('2023-03-01'),
    status: 'active',
    important: true,
    version: '1.5',
    fileSize: '1.8 MB'
  },
  {
    id: 'POL-004',
    title: 'Confidentiality and Privacy Procedures',
    description: 'Requirements for handling sensitive information and maintaining client privacy.',
    category: 'Privacy',
    lastUpdated: new Date('2023-01-15'),
    effectiveDate: new Date('2023-02-01'),
    status: 'active',
    important: true,
    version: '4.0',
    fileSize: '1.0 MB'
  },
  {
    id: 'POL-005',
    title: 'Foster Home Assessment Process',
    description: 'Standardized process for evaluating potential foster home placements.',
    category: 'Placement',
    lastUpdated: new Date('2023-05-05'),
    effectiveDate: new Date('2023-05-20'),
    status: 'draft',
    important: false,
    version: '2.3',
    fileSize: '956 KB'
  },
  {
    id: 'POL-006',
    title: 'Emergency Response Procedures',
    description: 'Guidelines for responding to emergency situations involving children at risk.',
    category: 'Emergency',
    lastUpdated: new Date('2023-04-18'),
    effectiveDate: new Date('2023-05-01'),
    status: 'active',
    important: true,
    version: '3.7',
    fileSize: '1.5 MB'
  },
  {
    id: 'POL-007',
    title: 'Case Transfer Protocol',
    description: 'Requirements and procedures for transferring cases between social workers.',
    category: 'Administrative',
    lastUpdated: new Date('2023-03-25'),
    effectiveDate: new Date('2023-04-10'),
    status: 'pending',
    important: false,
    version: '1.2',
    fileSize: '780 KB'
  }
];

const PolicyLibrary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortField, setSortField] = useState<string>('effectiveDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [showImportantOnly, setShowImportantOnly] = useState(false);

  const categories = Array.from(new Set(MOCK_POLICIES.map(policy => policy.category)));

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredPolicies = MOCK_POLICIES.filter(policy => {
    const matchesSearch = searchQuery === '' || 
      policy.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      policy.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      policy.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === null || policy.category === selectedCategory;
    const matchesImportant = !showImportantOnly || policy.important;
    
    return matchesSearch && matchesCategory && matchesImportant;
  }).sort((a, b) => {
    if (sortField === 'title') {
      return sortDirection === 'asc' 
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    }
    if (sortField === 'effectiveDate') {
      return sortDirection === 'asc' 
        ? a.effectiveDate.getTime() - b.effectiveDate.getTime()
        : b.effectiveDate.getTime() - a.effectiveDate.getTime();
    }
    if (sortField === 'lastUpdated') {
      return sortDirection === 'asc' 
        ? a.lastUpdated.getTime() - b.lastUpdated.getTime()
        : b.lastUpdated.getTime() - a.lastUpdated.getTime();
    }
    return 0;
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
      case 'pending':
        return <Badge className="bg-blue-500">Pending</Badge>;
      case 'archived':
        return <Badge variant="outline">Archived</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Count how many policies were updated in the last month
  const recentlyUpdatedCount = MOCK_POLICIES.filter(policy => {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    return policy.lastUpdated > oneMonthAgo;
  }).length;

  return (
    <Layout>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Policy Library</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Policy Updates</CardTitle>
              <CardDescription>
                Stay informed about policy changes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">Recently Updated</div>
                    <div className="text-sm text-muted-foreground">
                      {recentlyUpdatedCount} policies updated in the last 30 days
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                    <AlertCircle className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <div className="font-medium">Important Policies</div>
                    <div className="text-sm text-muted-foreground">
                      {MOCK_POLICIES.filter(p => p.important).length} critical policies to review
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Subscribe to Updates
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Quick Access</CardTitle>
              <CardDescription>
                Most frequently accessed policies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {MOCK_POLICIES.filter(policy => policy.important)
                .slice(0, 3)
                .map(policy => (
                  <Card key={policy.id} className="bg-accent/30">
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium">{policy.title}</h3>
                          <div className="text-sm text-muted-foreground mt-1">
                            {policy.category} • Version {policy.version}
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle className="text-lg">All Policies</CardTitle>
                <CardDescription>
                  {filteredPolicies.length} {filteredPolicies.length === 1 ? 'policy' : 'policies'} found
                </CardDescription>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search policies..."
                    className="pl-8 w-full md:w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button 
                    variant={showImportantOnly ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setShowImportantOnly(!showImportantOnly)}
                  >
                    {showImportantOnly ? 'Important Only' : 'All Policies'}
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="mb-4 border-b pb-2">
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant={selectedCategory === null ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                >
                  All Categories
                </Button>
                {categories.map(category => (
                  <Button 
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-sm">
                      <button 
                        className="flex items-center"
                        onClick={() => handleSort('title')}
                      >
                        Title
                        {sortField === 'title' && (
                          <ArrowUpDown className="h-4 w-4 ml-1" />
                        )}
                      </button>
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-sm">Category</th>
                    <th className="text-left py-3 px-4 font-medium text-sm">
                      <button 
                        className="flex items-center"
                        onClick={() => handleSort('effectiveDate')}
                      >
                        Effective Date
                        {sortField === 'effectiveDate' && (
                          <ArrowUpDown className="h-4 w-4 ml-1" />
                        )}
                      </button>
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-sm">
                      <button 
                        className="flex items-center"
                        onClick={() => handleSort('lastUpdated')}
                      >
                        Last Updated
                        {sortField === 'lastUpdated' && (
                          <ArrowUpDown className="h-4 w-4 ml-1" />
                        )}
                      </button>
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-sm">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPolicies.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-10 text-center text-muted-foreground">
                        <FileText className="h-8 w-8 mx-auto mb-2" />
                        <p>No policies found</p>
                      </td>
                    </tr>
                  ) : (
                    filteredPolicies.map((policy) => (
                      <tr key={policy.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-2 text-primary" />
                            <div>
                              <div className="font-medium">{policy.title}</div>
                              <div className="text-xs text-muted-foreground mt-1">
                                {policy.id} • Version {policy.version}
                              </div>
                            </div>
                            {policy.important && (
                              <AlertCircle className="h-4 w-4 ml-2 text-amber-500" />
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="secondary">{policy.category}</Badge>
                        </td>
                        <td className="py-3 px-4 text-sm">
                          {formatDate(policy.effectiveDate)}
                        </td>
                        <td className="py-3 px-4 text-sm">
                          {formatDate(policy.lastUpdated)}
                        </td>
                        <td className="py-3 px-4">
                          {getStatusBadge(policy.status)}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4" />
                              <span className="sr-only">Download</span>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
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
    </Layout>
  );
};

export default PolicyLibrary;
