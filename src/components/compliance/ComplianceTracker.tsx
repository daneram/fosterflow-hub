import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ShieldCheck, Calendar, AlertCircle, CheckCircle2, Clock, FileText, BarChart } from 'lucide-react';

interface ComplianceItem {
  id: string;
  title: string;
  category: string;
  dueDate: Date;
  status: 'completed' | 'overdue' | 'pending' | 'in-progress';
  priority: 'high' | 'medium' | 'low';
  completedDate?: Date;
  description: string;
}

const MOCK_COMPLIANCE_ITEMS: ComplianceItem[] = [
  {
    id: 'COMP-001',
    title: 'Annual Background Check Renewal',
    category: 'Personnel',
    dueDate: new Date('2023-09-30'),
    status: 'pending',
    priority: 'high',
    description: 'Complete annual background check for all staff members.'
  },
  {
    id: 'COMP-002',
    title: 'Quarterly Case Review Audit',
    category: 'Case Management',
    dueDate: new Date('2023-08-15'),
    status: 'overdue',
    priority: 'high',
    description: 'Conduct quarterly audit of randomly selected case files.'
  },
  {
    id: 'COMP-003',
    title: 'HIPAA Training Certification',
    category: 'Training',
    dueDate: new Date('2023-11-01'),
    status: 'in-progress',
    priority: 'medium',
    description: 'Complete annual HIPAA compliance training for all staff.'
  },
  {
    id: 'COMP-004',
    title: 'Fire Safety Inspection',
    category: 'Facility',
    dueDate: new Date('2023-07-15'),
    status: 'completed',
    completedDate: new Date('2023-07-12'),
    priority: 'medium',
    description: 'Schedule and complete annual fire safety inspection.'
  },
  {
    id: 'COMP-005',
    title: 'State Licensing Renewal',
    category: 'Licensing',
    dueDate: new Date('2023-12-31'),
    status: 'pending',
    priority: 'high',
    description: 'Submit documentation for annual state licensing renewal.'
  },
  {
    id: 'COMP-006',
    title: 'Data Security Assessment',
    category: 'IT',
    dueDate: new Date('2023-10-15'),
    status: 'in-progress',
    priority: 'medium',
    description: 'Complete annual data security assessment and vulnerability testing.'
  }
];

const ComplianceTracker: React.FC = () => {
  const today = new Date();
  
  const completedItems = MOCK_COMPLIANCE_ITEMS.filter(item => item.status === 'completed');
  const overdueItems = MOCK_COMPLIANCE_ITEMS.filter(item => item.status === 'overdue');
  const pendingItems = MOCK_COMPLIANCE_ITEMS.filter(item => 
    item.status === 'pending' || item.status === 'in-progress'
  );
  
  const compliancePercentage = Math.round((completedItems.length / MOCK_COMPLIANCE_ITEMS.length) * 100);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const getDaysUntilDue = (dueDate: Date) => {
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'completed':
        return <Badge className="bg-green-500">Completed</Badge>;
      case 'overdue':
        return <Badge className="bg-red-500">Overdue</Badge>;
      case 'pending':
        return <Badge variant="outline">Pending</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-500">In Progress</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  const getPriorityBadge = (priority: string) => {
    switch(priority) {
      case 'high':
        return <Badge className="bg-red-500">High</Badge>;
      case 'medium':
        return <Badge className="bg-amber-500">Medium</Badge>;
      case 'low':
        return <Badge className="bg-green-500">Low</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };

  return (
    <Layout>
      <div className="space-y-3 animate-fade-in">
        <h1 className="text-2xl font-bold tracking-tight">Compliance Tracker</h1>

        <div className="flex flex-col md:flex-row gap-3">
          <Card className="md:w-1/3">
            <CardHeader className="py-3">
              <CardTitle className="text-base">Overall Compliance</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-center">
                <div className="text-3xl font-bold">{compliancePercentage}%</div>
                <Progress value={compliancePercentage} className="h-2 mt-1" />
                <div className="flex justify-center mt-3 space-x-4 text-xs">
                  <div className="flex flex-col items-center">
                    <div className="text-green-500 font-bold">{completedItems.length}</div>
                    <div className="text-muted-foreground">Completed</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="text-red-500 font-bold">{overdueItems.length}</div>
                    <div className="text-muted-foreground">Overdue</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="text-blue-500 font-bold">{pendingItems.length}</div>
                    <div className="text-muted-foreground">Pending</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="md:w-2/3">
            <CardHeader className="py-3">
              <CardTitle className="text-base">Key Metrics</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-muted/50 p-3 rounded-lg flex flex-col items-center">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 mb-1">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                  </div>
                  <div className="text-xl font-bold">{overdueItems.length}</div>
                  <div className="text-xs text-muted-foreground">Overdue Items</div>
                </div>
                
                <div className="bg-muted/50 p-3 rounded-lg flex flex-col items-center">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 mb-1">
                    <Calendar className="h-4 w-4 text-amber-500" />
                  </div>
                  <div className="text-xl font-bold">
                    {pendingItems.length > 0 
                      ? `${getDaysUntilDue(pendingItems.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())[0].dueDate)} days`
                      : 'N/A'
                    }
                  </div>
                  <div className="text-xs text-muted-foreground">Until Next Due</div>
                </div>
                
                <div className="bg-muted/50 p-3 rounded-lg flex flex-col items-center">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 mb-1">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="text-xl font-bold">{completedItems.length}</div>
                  <div className="text-xs text-muted-foreground">Completed This Month</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="py-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Compliance Requirements</CardTitle>
                <CardDescription className="text-xs">Track and manage agency compliance requirements</CardDescription>
              </div>
              <Button size="sm">
                <FileText className="h-3 w-3 mr-1" />
                Export Report
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="all">
              <div className="px-4 pt-2">
                <TabsList className="mb-3">
                  <TabsTrigger value="all">All Requirements</TabsTrigger>
                  <TabsTrigger value="overdue">Overdue</TabsTrigger>
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Compliance Item</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {MOCK_COMPLIANCE_ITEMS.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">
                          <div className="flex flex-col">
                            <div>{item.title}</div>
                            <div className="text-xs text-muted-foreground">{item.id}</div>
                          </div>
                        </TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>{getPriorityBadge(item.priority)}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                              {formatDate(item.dueDate)}
                            </div>
                            {item.status === 'overdue' && (
                              <div className="text-xs text-red-500 mt-1">
                                {Math.abs(getDaysUntilDue(item.dueDate))} days overdue
                              </div>
                            )}
                            {item.status === 'pending' && getDaysUntilDue(item.dueDate) <= 7 && (
                              <div className="text-xs text-amber-500 mt-1">
                                Due soon
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(item.status)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">
                            {item.status === 'completed' ? (
                              <>
                                <FileText className="h-4 w-4 mr-1" />
                                View
                              </>
                            ) : (
                              <>
                                <CheckCircle2 className="h-4 w-4 mr-1" />
                                {item.status === 'in-progress' ? 'Update' : 'Mark Complete'}
                              </>
                            )}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between border-t py-2 text-xs">
            <div className="flex items-center space-x-1">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span>Next compliance audit: {formatDate(new Date('2023-12-15'))}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <BarChart className="h-3 w-3 mr-1" />
                Analytics
              </Button>
              <Button size="sm">
                <Clock className="h-3 w-3 mr-1" />
                Schedule Review
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default ComplianceTracker;
