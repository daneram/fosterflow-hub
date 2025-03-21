
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Calendar, AlertCircle, CheckCircle, ShieldCheck, Clock, BarChart, Filter, ArrowUpDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ComplianceItem {
  id: string;
  title: string;
  description: string;
  category: string;
  dueDate: Date;
  status: 'completed' | 'pending' | 'overdue';
  completedDate?: Date;
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignedTo: string;
}

const MOCK_COMPLIANCE_ITEMS: ComplianceItem[] = [
  {
    id: 'CMP-001',
    title: 'Annual Report Submission',
    description: 'Submit annual child welfare statistics report to state regulatory agency.',
    category: 'Reporting',
    dueDate: new Date('2023-06-30'),
    status: 'pending',
    priority: 'high',
    assignedTo: 'Jane Smith'
  },
  {
    id: 'CMP-002',
    title: 'Staff Certification Renewal',
    description: 'Ensure all case workers have updated certifications.',
    category: 'Certification',
    dueDate: new Date('2023-05-15'),
    status: 'overdue',
    priority: 'critical',
    assignedTo: 'Michael Johnson'
  },
  {
    id: 'CMP-003',
    title: 'Privacy Policy Review',
    description: 'Annual review of privacy and data handling policies.',
    category: 'Policy',
    dueDate: new Date('2023-07-15'),
    status: 'pending',
    priority: 'medium',
    assignedTo: 'Sarah Williams'
  },
  {
    id: 'CMP-004',
    title: 'Case Documentation Audit',
    description: 'Quarterly audit of case documentation compliance.',
    category: 'Audit',
    dueDate: new Date('2023-04-30'),
    status: 'completed',
    completedDate: new Date('2023-04-28'),
    priority: 'high',
    assignedTo: 'Robert Davis'
  },
  {
    id: 'CMP-005',
    title: 'Security Training Completion',
    description: 'Ensure all staff complete security and data protection training.',
    category: 'Training',
    dueDate: new Date('2023-06-15'),
    status: 'pending',
    priority: 'high',
    assignedTo: 'Jennifer Lee'
  },
  {
    id: 'CMP-006',
    title: 'Facility Safety Inspection',
    description: 'Quarterly safety inspection of all office facilities.',
    category: 'Safety',
    dueDate: new Date('2023-06-30'),
    status: 'pending',
    priority: 'medium',
    assignedTo: 'Thomas Brown'
  },
  {
    id: 'CMP-007',
    title: 'Client Rights Documentation',
    description: 'Verify all active cases have proper client rights documentation.',
    category: 'Documentation',
    dueDate: new Date('2023-05-20'),
    status: 'overdue',
    priority: 'critical',
    assignedTo: 'Amanda Miller'
  },
  {
    id: 'CMP-008',
    title: 'Budget Compliance Review',
    description: 'Review program budgets for compliance with funding requirements.',
    category: 'Financial',
    dueDate: new Date('2023-07-31'),
    status: 'pending',
    priority: 'high',
    assignedTo: 'David Wilson'
  },
  {
    id: 'CMP-009',
    title: 'Software License Renewal',
    description: 'Renew licenses for case management software.',
    category: 'Administrative',
    dueDate: new Date('2023-03-31'),
    status: 'completed',
    completedDate: new Date('2023-03-25'),
    priority: 'medium',
    assignedTo: 'Lisa Taylor'
  }
];

const ComplianceTracker: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedPriority, setSelectedPriority] = useState<string | null>(null);
  const [sortField, setSortField] = useState<string>('dueDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const categories = Array.from(new Set(MOCK_COMPLIANCE_ITEMS.map(item => item.category)));
  const statuses = ['completed', 'pending', 'overdue'];
  const priorities = ['low', 'medium', 'high', 'critical'];

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredItems = MOCK_COMPLIANCE_ITEMS.filter(item => {
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.assignedTo.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === null || item.category === selectedCategory;
    const matchesStatus = selectedStatus === null || item.status === selectedStatus;
    const matchesPriority = selectedPriority === null || item.priority === selectedPriority;
    
    return matchesSearch && matchesCategory && matchesStatus && matchesPriority;
  }).sort((a, b) => {
    if (sortField === 'title') {
      return sortDirection === 'asc' 
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    }
    if (sortField === 'dueDate') {
      return sortDirection === 'asc' 
        ? a.dueDate.getTime() - b.dueDate.getTime()
        : b.dueDate.getTime() - a.dueDate.getTime();
    }
    if (sortField === 'priority') {
      const priorityOrder = { low: 0, medium: 1, high: 2, critical: 3 };
      return sortDirection === 'asc' 
        ? priorityOrder[a.priority] - priorityOrder[b.priority]
        : priorityOrder[b.priority] - priorityOrder[a.priority];
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
      case 'completed':
        return <Badge className="bg-green-500">Completed</Badge>;
      case 'pending':
        return <Badge className="bg-amber-500">Pending</Badge>;
      case 'overdue':
        return <Badge className="bg-destructive">Overdue</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch(priority) {
      case 'low':
        return <Badge variant="outline" className="text-blue-500 border-blue-200 bg-blue-50">Low</Badge>;
      case 'medium':
        return <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">Medium</Badge>;
      case 'high':
        return <Badge variant="outline" className="text-orange-500 border-orange-200 bg-orange-50">High</Badge>;
      case 'critical':
        return <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50">Critical</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  // Calculate compliance metrics
  const overdueCount = MOCK_COMPLIANCE_ITEMS.filter(item => item.status === 'overdue').length;
  const pendingCount = MOCK_COMPLIANCE_ITEMS.filter(item => item.status === 'pending').length;
  const completedCount = MOCK_COMPLIANCE_ITEMS.filter(item => item.status === 'completed').length;
  const totalCount = MOCK_COMPLIANCE_ITEMS.length;
  
  const complianceRate = Math.round((completedCount / totalCount) * 100);

  // Find upcoming deadlines (due in next 7 days)
  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);
  
  const upcomingDeadlines = MOCK_COMPLIANCE_ITEMS.filter(item => 
    item.status !== 'completed' && 
    item.dueDate >= today && 
    item.dueDate <= nextWeek
  );

  return (
    <Layout>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Compliance Tracker</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Compliance Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center">
                <div className="relative h-28 w-28">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">{complianceRate}%</span>
                  </div>
                  <svg className="h-full w-full" viewBox="0 0 100 100">
                    <circle
                      className="text-muted stroke-current"
                      strokeWidth="10"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                    />
                    <circle
                      className={`${complianceRate >= 70 ? 'text-green-500' : complianceRate >= 50 ? 'text-amber-500' : 'text-red-500'} stroke-current`}
                      strokeWidth="10"
                      strokeLinecap="round"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                      strokeDasharray={`${complianceRate * 2.51} 251`}
                      strokeDashoffset="0"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                </div>
              </div>
              
              <div className="mt-2 text-center text-sm text-muted-foreground">
                {completedCount} of {totalCount} requirements completed
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm">Completed</span>
                  </div>
                  <span className="font-medium">{completedCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-amber-500 mr-2"></div>
                    <span className="text-sm">Pending</span>
                  </div>
                  <span className="font-medium">{pendingCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                    <span className="text-sm">Overdue</span>
                  </div>
                  <span className="font-medium">{overdueCount}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Upcoming Deadlines</CardTitle>
              <CardDescription>
                Items due in the next 7 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              {upcomingDeadlines.length === 0 ? (
                <div className="flex items-center justify-center p-4 text-muted-foreground">
                  <div className="text-center">
                    <Calendar className="mx-auto h-8 w-8 mb-2" />
                    <p>No upcoming deadlines this week</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  {upcomingDeadlines.map(item => (
                    <div key={item.id} className="flex items-start justify-between border-b pb-2">
                      <div>
                        <div className="font-medium">{item.title}</div>
                        <div className="text-sm text-muted-foreground">
                          Due: {formatDate(item.dueDate)}
                        </div>
                      </div>
                      {getPriorityBadge(item.priority)}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Calendar className="h-4 w-4 mr-2" />
                View All Deadlines
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle className="text-lg">Compliance Requirements</CardTitle>
                <CardDescription>
                  {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'} found
                </CardDescription>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="pl-8 w-full md:w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                
                <Button variant="outline" size="sm">
                  <BarChart className="h-4 w-4 mr-2" />
                  Reports
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="mb-4 flex flex-col md:flex-row gap-4 pb-2 border-b">
              <div className="space-y-1">
                <div className="text-xs font-medium">Category</div>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant={selectedCategory === null ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setSelectedCategory(null)}
                  >
                    All
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
              
              <div className="space-y-1">
                <div className="text-xs font-medium">Status</div>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant={selectedStatus === null ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setSelectedStatus(null)}
                  >
                    All
                  </Button>
                  {statuses.map(status => (
                    <Button 
                      key={status}
                      variant={selectedStatus === status ? 'default' : 'outline'} 
                      size="sm"
                      onClick={() => setSelectedStatus(status)}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="text-xs font-medium">Priority</div>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant={selectedPriority === null ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setSelectedPriority(null)}
                  >
                    All
                  </Button>
                  {priorities.map(priority => (
                    <Button 
                      key={priority}
                      variant={selectedPriority === priority ? 'default' : 'outline'} 
                      size="sm"
                      onClick={() => setSelectedPriority(priority)}
                    >
                      {priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            
            {overdueCount > 0 && selectedStatus !== 'completed' && selectedStatus !== 'pending' && (
              <Alert className="mb-4 border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <AlertDescription className="ml-2 text-red-700">
                  There {overdueCount === 1 ? 'is' : 'are'} {overdueCount} overdue compliance {overdueCount === 1 ? 'item' : 'items'} that require immediate attention.
                </AlertDescription>
              </Alert>
            )}
            
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
                        onClick={() => handleSort('priority')}
                      >
                        Priority
                        {sortField === 'priority' && (
                          <ArrowUpDown className="h-4 w-4 ml-1" />
                        )}
                      </button>
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-sm">
                      <button 
                        className="flex items-center"
                        onClick={() => handleSort('dueDate')}
                      >
                        Due Date
                        {sortField === 'dueDate' && (
                          <ArrowUpDown className="h-4 w-4 ml-1" />
                        )}
                      </button>
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-sm">Assigned To</th>
                    <th className="text-left py-3 px-4 font-medium text-sm">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-10 text-center text-muted-foreground">
                        <ShieldCheck className="h-8 w-8 mx-auto mb-2" />
                        <p>No compliance items found</p>
                      </td>
                    </tr>
                  ) : (
                    filteredItems.map((item) => (
                      <tr key={item.id} className={`border-b hover:bg-muted/50 ${item.status === 'overdue' ? 'bg-red-50/50' : ''}`}>
                        <td className="py-3 px-4">
                          <div>
                            <div className="font-medium">{item.title}</div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {item.id}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="secondary">{item.category}</Badge>
                        </td>
                        <td className="py-3 px-4">
                          {getPriorityBadge(item.priority)}
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                            {formatDate(item.dueDate)}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm">
                          {item.assignedTo}
                        </td>
                        <td className="py-3 px-4">
                          {getStatusBadge(item.status)}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            {item.status !== 'completed' ? (
                              <Button variant="outline" size="sm">
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Mark Complete
                              </Button>
                            ) : (
                              <Button variant="outline" size="sm" disabled>
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Completed
                              </Button>
                            )}
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

export default ComplianceTracker;
