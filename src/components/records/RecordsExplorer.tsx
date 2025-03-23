
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, FileText, Folder, Users, Calendar, Download, Eye, FileEdit, Filter, Grid, List, Table as TableIcon, Star, Clock, Plus, MoreHorizontal, CheckCircle, AlertCircle, XCircle, ChevronUp, ChevronDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { RecordFilterPanel } from './RecordFilterPanel';
import { RecordListView } from './RecordListView';
import { RecordGridView } from './RecordGridView';
import { RecordTableView } from './RecordTableView';
import { RecordBulkActions } from './RecordBulkActions';
import { SavedFilterPresets } from './SavedFilterPresets';

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

// Enhanced mock records with additional fields
const MOCK_RECORDS: Record[] = [
  {
    id: 'CAS-2023-001',
    title: 'Johnson Family Case',
    type: 'case',
    client: 'Johnson Family',
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-05-10'),
    status: 'active',
    tags: ['urgent', 'court-involved'],
    priority: 'high',
    completeness: 85,
    owner: 'Sarah Wilson',
    lastAccessed: new Date('2023-05-12'),
    relatedRecords: ['ASS-2023-042', 'DOC-2023-156'],
    compliance: 'complete',
    favorite: true
  },
  {
    id: 'ASS-2023-042',
    title: 'Smith Initial Assessment',
    type: 'assessment',
    client: 'Smith, John',
    createdAt: new Date('2023-03-22'),
    updatedAt: new Date('2023-03-25'),
    status: 'pending',
    tags: ['initial', 'behavioral'],
    priority: 'medium',
    completeness: 60,
    owner: 'Michael Brown',
    lastAccessed: new Date('2023-04-10'),
    relatedRecords: ['CAS-2023-001'],
    compliance: 'incomplete'
  },
  {
    id: 'REP-2023-087',
    title: 'Monthly Progress Report - Williams',
    type: 'report',
    client: 'Williams, Sarah',
    createdAt: new Date('2023-04-30'),
    updatedAt: new Date('2023-04-30'),
    status: 'closed',
    tags: ['monthly', 'progress'],
    priority: 'low',
    completeness: 100,
    owner: 'Emily Davis',
    lastAccessed: new Date('2023-05-02'),
    compliance: 'complete'
  },
  {
    id: 'DOC-2023-156',
    title: 'Medical Records - Thompson Children',
    type: 'document',
    client: 'Thompson Family',
    createdAt: new Date('2023-02-18'),
    updatedAt: new Date('2023-02-18'),
    status: 'active',
    tags: ['medical', 'confidential'],
    priority: 'medium',
    completeness: 100,
    owner: 'Sarah Wilson',
    relatedRecords: ['CAS-2023-001'],
    compliance: 'complete'
  },
  {
    id: 'CAS-2023-002',
    title: 'Davis Family Reunification',
    type: 'case',
    client: 'Davis Family',
    createdAt: new Date('2023-01-05'),
    updatedAt: new Date('2023-05-01'),
    status: 'active',
    tags: ['reunification', 'court-involved'],
    priority: 'urgent',
    completeness: 70,
    owner: 'Robert Johnson',
    lastAccessed: new Date('2023-05-11'),
    compliance: 'overdue',
    favorite: true
  },
  {
    id: 'DOC-2023-198',
    title: 'School Records - Jones Children',
    type: 'document',
    client: 'Jones Family',
    createdAt: new Date('2023-03-10'),
    updatedAt: new Date('2023-03-10'),
    status: 'archived',
    tags: ['education', 'school'],
    priority: 'low',
    completeness: 100,
    owner: 'Michael Brown',
    compliance: 'complete'
  }
];

const RecordsExplorer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'grid' | 'table'>('list');
  const [selectedRecords, setSelectedRecords] = useState<string[]>([]);
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [sortField, setSortField] = useState<keyof Record>('updatedAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Filter records based on multiple criteria
  const filteredRecords = MOCK_RECORDS.filter(record => {
    const matchesSearch = searchQuery === '' || 
      record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedType === null || record.type === selectedType;
    const matchesStatus = selectedStatus === null || record.status === selectedStatus;
    const matchesFavorites = showFavoritesOnly ? record.favorite === true : true;
    
    return matchesSearch && matchesType && matchesStatus && matchesFavorites;
  });

  // Sort records
  const sortedRecords = [...filteredRecords].sort((a, b) => {
    const fieldA = a[sortField];
    const fieldB = b[sortField];
    
    if (fieldA instanceof Date && fieldB instanceof Date) {
      return sortDirection === 'asc' 
        ? fieldA.getTime() - fieldB.getTime() 
        : fieldB.getTime() - fieldA.getTime();
    }
    
    if (typeof fieldA === 'string' && typeof fieldB === 'string') {
      return sortDirection === 'asc'
        ? fieldA.localeCompare(fieldB)
        : fieldB.localeCompare(fieldA);
    }
    
    return 0;
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRecords(sortedRecords.map(record => record.id));
    } else {
      setSelectedRecords([]);
    }
  };

  const handleSelectRecord = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedRecords(prev => [...prev, id]);
    } else {
      setSelectedRecords(prev => prev.filter(recordId => recordId !== id));
    }
  };

  const toggleSort = (field: keyof Record) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getComplianceIcon = (compliance?: string) => {
    switch(compliance) {
      case 'complete':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'incomplete':
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case 'overdue':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-GB', {
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

  const getPriorityBadge = (priority?: string) => {
    switch(priority) {
      case 'urgent':
        return <Badge className="bg-red-500">Urgent</Badge>;
      case 'high':
        return <Badge className="bg-orange-500">High</Badge>;
      case 'medium':
        return <Badge className="bg-amber-500">Medium</Badge>;
      case 'low':
        return <Badge className="bg-green-500">Low</Badge>;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Records Explorer</h1>
          <div className="flex items-center space-x-2">
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              New Record
            </Button>
            <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'list' | 'grid' | 'table')}>
              <TabsList className="grid grid-cols-3 w-auto">
                <TabsTrigger value="list" title="List View">
                  <List className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="grid" title="Grid View">
                  <Grid className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="table" title="Table View">
                  <TableIcon className="h-4 w-4" />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="w-full md:w-1/3 lg:w-1/4">
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  Filters
                  <Button variant="ghost" size="sm" onClick={() => {
                    setSelectedType(null);
                    setSelectedStatus(null);
                    setShowFavoritesOnly(false);
                  }}>
                    Clear
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Quick Filter Chips */}
                <div className="flex flex-wrap gap-2 pb-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowFavoritesOnly(prev => !prev)}
                    className={showFavoritesOnly ? "bg-primary/10" : ""}
                  >
                    <Star className={`h-4 w-4 mr-1 ${showFavoritesOnly ? "text-yellow-500" : ""}`} />
                    Favorites
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedStatus('active')}
                  >
                    Active
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setSelectedType('case');
                      setSelectedStatus('active');
                    }}
                  >
                    Active Cases
                  </Button>
                </div>
                
                {/* Saved Filters Section */}
                <Collapsible>
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Saved Filters</h3>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                  <CollapsibleContent className="pt-2">
                    <div className="space-y-2 text-sm">
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        <Star className="h-4 w-4 mr-2 text-yellow-500" />
                        Recent Active Cases
                      </Button>
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        <Star className="h-4 w-4 mr-2 text-yellow-500" />
                        Incomplete Assessments
                      </Button>
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        My Assigned Documents
                      </Button>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
                
                {/* Standard Filter Sections */}
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
                
                {/* Advanced Filters Toggle */}
                <div className="pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => setIsAdvancedSearchOpen(prev => !prev)}
                  >
                    <Filter className="h-4 w-4 mr-1" />
                    Advanced Filters
                  </Button>
                </div>
                
                {/* Advanced Filters Panel */}
                {isAdvancedSearchOpen && (
                  <div className="space-y-3 pt-2">
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Date Range</h3>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">From</p>
                          <Input type="date" className="h-8" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">To</p>
                          <Input type="date" className="h-8" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Assigned To</h3>
                      <Select>
                        <SelectTrigger className="h-8">
                          <SelectValue placeholder="Select user" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Anyone</SelectItem>
                          <SelectItem value="sarah">Sarah Wilson</SelectItem>
                          <SelectItem value="michael">Michael Brown</SelectItem>
                          <SelectItem value="emily">Emily Davis</SelectItem>
                          <SelectItem value="robert">Robert Johnson</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Priority</h3>
                      <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm">Urgent</Button>
                        <Button variant="outline" size="sm">High</Button>
                        <Button variant="outline" size="sm">Medium</Button>
                        <Button variant="outline" size="sm">Low</Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Compliance Status</h3>
                      <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm">Complete</Button>
                        <Button variant="outline" size="sm">Incomplete</Button>
                        <Button variant="outline" size="sm">Overdue</Button>
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <Button size="sm" className="w-full">Apply Filters</Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div className="w-full md:w-2/3 lg:w-3/4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search records..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {selectedRecords.length > 0 && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            Bulk Actions ({selectedRecords.length})
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            Download Selected
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Users className="h-4 w-4 mr-2" />
                            Change Owner
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Badge className="mr-2">Status</Badge>
                            Mark as Active
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Badge className="mr-2">Status</Badge>
                            Mark as Closed
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                    
                    <Select defaultValue="updated-desc">
                      <SelectTrigger className="h-8 w-[180px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="updated-desc">Updated (Newest)</SelectItem>
                        <SelectItem value="updated-asc">Updated (Oldest)</SelectItem>
                        <SelectItem value="created-desc">Created (Newest)</SelectItem>
                        <SelectItem value="created-asc">Created (Oldest)</SelectItem>
                        <SelectItem value="title-asc">Title (A-Z)</SelectItem>
                        <SelectItem value="title-desc">Title (Z-A)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <CardDescription>
                  {sortedRecords.length} {sortedRecords.length === 1 ? 'record' : 'records'} found
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TabsContent value="list" className="mt-0">
                  <div className="space-y-4">
                    {sortedRecords.length === 0 ? (
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
                            checked={selectedRecords.length === sortedRecords.length && sortedRecords.length > 0}
                            onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
                          />
                          <label htmlFor="select-all" className="ml-2 text-sm font-medium">
                            Select All
                          </label>
                        </div>
                        
                        {sortedRecords.map((record) => (
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
                </TabsContent>
                
                <TabsContent value="grid" className="mt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sortedRecords.length === 0 ? (
                      <div className="col-span-full flex flex-col items-center justify-center h-40 text-muted-foreground">
                        <FileText className="h-8 w-8 mb-2" />
                        <p>No records found</p>
                      </div>
                    ) : (
                      sortedRecords.map((record) => (
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
                                {getPriorityBadge(record.priority)}
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
                      ))
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="table" className="mt-0">
                  <div className="rounded-md border">
                    <div className="relative w-full overflow-auto">
                      <table className="w-full caption-bottom text-sm">
                        <thead>
                          <tr className="border-b bg-muted/50">
                            <th className="h-10 px-2 text-left">
                              <Checkbox 
                                checked={selectedRecords.length === sortedRecords.length && sortedRecords.length > 0}
                                onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
                              />
                            </th>
                            <th className="h-10 px-2 text-left" onClick={() => toggleSort('type')}>
                              <div className="flex items-center space-x-1">
                                <span>Type</span>
                                {sortField === 'type' && (
                                  sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                                )}
                              </div>
                            </th>
                            <th className="h-10 px-4 text-left" onClick={() => toggleSort('title')}>
                              <div className="flex items-center space-x-1">
                                <span>Title</span>
                                {sortField === 'title' && (
                                  sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                                )}
                              </div>
                            </th>
                            <th className="h-10 px-4 text-left">Client</th>
                            <th className="h-10 px-4 text-left">Status</th>
                            <th className="h-10 px-4 text-left" onClick={() => toggleSort('updatedAt')}>
                              <div className="flex items-center space-x-1">
                                <span>Updated</span>
                                {sortField === 'updatedAt' && (
                                  sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                                )}
                              </div>
                            </th>
                            <th className="h-10 px-4 text-center">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sortedRecords.length === 0 ? (
                            <tr>
                              <td colSpan={7} className="h-24 text-center">
                                <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                                  <FileText className="h-8 w-8 mb-2" />
                                  <p>No records found</p>
                                </div>
                              </td>
                            </tr>
                          ) : (
                            sortedRecords.map((record) => (
                              <tr key={record.id} className="border-b hover:bg-muted/50">
                                <td className="p-2">
                                  <Checkbox 
                                    checked={selectedRecords.includes(record.id)} 
                                    onCheckedChange={(checked) => handleSelectRecord(record.id, checked as boolean)}
                                  />
                                </td>
                                <td className="p-2">
                                  <div className="flex items-center">
                                    {getTypeIcon(record.type)}
                                    {record.favorite && <Star className="h-4 w-4 ml-1 text-yellow-500" />}
                                  </div>
                                </td>
                                <td className="p-4 font-medium">
                                  <div>
                                    {record.title}
                                    <div className="text-xs text-muted-foreground">{record.id}</div>
                                  </div>
                                </td>
                                <td className="p-4">{record.client}</td>
                                <td className="p-4">
                                  <div className="flex flex-col space-y-1">
                                    {getStatusBadge(record.status)}
                                    {record.compliance && (
                                      <div className="flex items-center mt-1">
                                        {getComplianceIcon(record.compliance)}
                                        <span className="ml-1 text-xs">{record.compliance}</span>
                                      </div>
                                    )}
                                  </div>
                                </td>
                                <td className="p-4">{formatDate(record.updatedAt)}</td>
                                <td className="p-4">
                                  <div className="flex items-center justify-center space-x-1">
                                    <Button variant="ghost" size="sm">
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                      <Download className="h-4 w-4" />
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
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </TabsContent>
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
