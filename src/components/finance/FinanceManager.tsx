
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  DollarSign, 
  Search, 
  Filter, 
  Download,
  CreditCard,
  TrendingUp,
  Calendar,
  FileSpreadsheet,
  ChevronDown,
  Clock,
  Users,
  CheckCircle2,
  ArrowUpDown
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Payment {
  id: string;
  type: 'allowance' | 'expense' | 'fee' | 'reimbursement';
  recipient: string;
  amount: number;
  status: 'pending' | 'paid' | 'rejected';
  date: string;
  dueDate?: string;
  description: string;
  category?: string;
  reference?: string;
}

const mockPayments: Payment[] = [
  {
    id: 'PAY-2023-001',
    type: 'allowance',
    recipient: 'Robert & Mary Johnson',
    amount: 750.00,
    status: 'paid',
    date: '2023-10-01',
    description: 'Monthly fostering allowance',
    category: 'Regular Allowance',
    reference: 'FC-2023-001'
  },
  {
    id: 'PAY-2023-002',
    type: 'allowance',
    recipient: 'Carlos & Elena Martinez',
    amount: 850.00,
    status: 'paid',
    date: '2023-10-01',
    description: 'Monthly fostering allowance (enhanced rate)',
    category: 'Regular Allowance',
    reference: 'FC-2023-002'
  },
  {
    id: 'PAY-2023-003',
    type: 'expense',
    recipient: 'Grace Taylor',
    amount: 125.50,
    status: 'pending',
    date: '2023-10-08',
    dueDate: '2023-10-22',
    description: 'School uniform expenses',
    category: 'Education',
    reference: 'FC-2023-005'
  },
  {
    id: 'PAY-2023-004',
    type: 'expense',
    recipient: 'Robert & Mary Johnson',
    amount: 215.75,
    status: 'pending',
    date: '2023-10-10',
    dueDate: '2023-10-24',
    description: 'Therapy session fees',
    category: 'Medical',
    reference: 'FC-2023-001'
  },
  {
    id: 'PAY-2023-005',
    type: 'fee',
    recipient: 'Dr. Michelle Thompson',
    amount: 350.00,
    status: 'paid',
    date: '2023-10-05',
    description: 'Psychological assessment fee',
    category: 'Professional Services',
    reference: 'SRV-2023-042'
  },
  {
    id: 'PAY-2023-006',
    type: 'reimbursement',
    recipient: 'Carlos & Elena Martinez',
    amount: 78.25,
    status: 'rejected',
    date: '2023-10-09',
    description: 'Transportation costs - insufficient documentation',
    category: 'Transport',
    reference: 'FC-2023-002'
  },
  {
    id: 'PAY-2023-007',
    type: 'allowance',
    recipient: 'Susan & David Smith',
    amount: 950.00,
    status: 'pending',
    date: '2023-10-12',
    dueDate: '2023-10-15',
    description: 'Special needs fostering allowance',
    category: 'Special Allowance',
    reference: 'FC-2023-004'
  }
];

interface BudgetCategory {
  id: string;
  name: string;
  allocated: number;
  spent: number;
  remaining: number;
  percentSpent: number;
}

const mockBudgetCategories: BudgetCategory[] = [
  {
    id: 'BUD-001',
    name: 'Regular Allowances',
    allocated: 250000,
    spent: 187500,
    remaining: 62500,
    percentSpent: 75
  },
  {
    id: 'BUD-002',
    name: 'Special Allowances',
    allocated: 75000,
    spent: 42500,
    remaining: 32500,
    percentSpent: 57
  },
  {
    id: 'BUD-003',
    name: 'Education Expenses',
    allocated: 35000,
    spent: 22400,
    remaining: 12600,
    percentSpent: 64
  },
  {
    id: 'BUD-004',
    name: 'Medical & Therapy',
    allocated: 60000,
    spent: 48750,
    remaining: 11250,
    percentSpent: 81
  },
  {
    id: 'BUD-005',
    name: 'Professional Services',
    allocated: 40000,
    spent: 33600,
    remaining: 6400,
    percentSpent: 84
  },
  {
    id: 'BUD-006',
    name: 'Training & Development',
    allocated: 25000,
    spent: 12500,
    remaining: 12500,
    percentSpent: 50
  }
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP'
  }).format(amount);
};

const getStatusBadge = (status: Payment['status']) => {
  switch(status) {
    case 'paid':
      return <Badge className="bg-green-500">Paid</Badge>;
    case 'pending':
      return <Badge className="bg-amber-500">Pending</Badge>;
    case 'rejected':
      return <Badge className="bg-red-500">Rejected</Badge>;
    default:
      return null;
  }
};

const getPaymentTypeBadge = (type: Payment['type']) => {
  switch(type) {
    case 'allowance':
      return <Badge variant="outline" className="bg-muted">Allowance</Badge>;
    case 'expense':
      return <Badge variant="outline" className="bg-muted">Expense</Badge>;
    case 'fee':
      return <Badge variant="outline" className="bg-muted">Fee</Badge>;
    case 'reimbursement':
      return <Badge variant="outline" className="bg-muted">Reimbursement</Badge>;
    default:
      return null;
  }
};

const FinanceManager: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Finance Manager</h1>
          <p className="text-muted-foreground text-sm">Budgeting, allowance management, expense tracking, and financial reporting</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center w-full max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search payments..." className="pl-8 pr-4 py-2 h-9" />
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button size="sm" variant="outline" className="w-full sm:w-auto">
              <Filter className="h-4 w-4 mr-1" />
              Filter
            </Button>
            <Button size="sm" variant="outline" className="w-full sm:w-auto">
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Budget (YTD)</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">£485,000</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-500">£28,750</span> remaining this quarter
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Allowances (Monthly)</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">£18,250</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-500">+£2,500</span> from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Expenses (Monthly)</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">£7,850</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-red-500">+12%</span> from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Next Payment Run</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Oct 15</div>
              <p className="text-xs text-muted-foreground mt-1">
                8 payments scheduled
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <FileSpreadsheet className="h-5 w-5 mr-2 text-primary" />
              Financial Management
            </CardTitle>
          </CardHeader>
          
          <Tabs defaultValue="payments">
            <div className="px-6">
              <TabsList className="grid w-full max-w-md grid-cols-3 h-9">
                <TabsTrigger value="payments">Payments</TabsTrigger>
                <TabsTrigger value="budget">Budget</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="payments" className="p-0">
              <CardContent className="pt-4">
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader className="bg-muted/50">
                      <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead className="w-[100px]">Type</TableHead>
                        <TableHead>Recipient</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead className="w-[120px]">Status</TableHead>
                        <TableHead className="w-[120px]">Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockPayments.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-medium">{payment.id}</TableCell>
                          <TableCell>{getPaymentTypeBadge(payment.type)}</TableCell>
                          <TableCell>{payment.recipient}</TableCell>
                          <TableCell className="text-right">{formatCurrency(payment.amount)}</TableCell>
                          <TableCell>{getStatusBadge(payment.status)}</TableCell>
                          <TableCell>
                            {payment.date}
                            {payment.dueDate && payment.status === 'pending' && (
                              <div className="text-xs text-muted-foreground">
                                Due: {payment.dueDate}
                              </div>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" className="h-8 px-2">
                              <ChevronDown className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex justify-between items-center mt-4 px-1">
                  <div className="text-xs text-muted-foreground flex items-center">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    <span>Last updated: Today at 10:24 AM</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Users className="h-4 w-4 mr-1" />
                      Bulk Payment
                    </Button>
                    <Button size="sm">
                      <CheckCircle2 className="h-4 w-4 mr-1" />
                      Process Payments
                    </Button>
                  </div>
                </div>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="budget" className="p-0">
              <CardContent className="pt-4">
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader className="bg-muted/50">
                      <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead className="text-right">Allocated</TableHead>
                        <TableHead className="text-right">Spent</TableHead>
                        <TableHead className="text-right">Remaining</TableHead>
                        <TableHead className="text-right">% Spent</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockBudgetCategories.map((category) => (
                        <TableRow key={category.id}>
                          <TableCell className="font-medium">{category.id}</TableCell>
                          <TableCell>{category.name}</TableCell>
                          <TableCell className="text-right">{formatCurrency(category.allocated)}</TableCell>
                          <TableCell className="text-right">{formatCurrency(category.spent)}</TableCell>
                          <TableCell className={`text-right ${category.remaining < category.allocated * 0.1 ? 'text-red-500 font-medium' : ''}`}>
                            {formatCurrency(category.remaining)}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className={`inline-block px-2 py-0.5 rounded-full text-xs ${
                              category.percentSpent > 90 ? 'bg-red-100 text-red-800' :
                              category.percentSpent > 75 ? 'bg-amber-100 text-amber-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {category.percentSpent}%
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" className="h-8 px-2">
                              <ChevronDown className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex justify-between items-center mt-4 px-1">
                  <div className="text-xs text-muted-foreground flex items-center">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    <span>Financial Year: 2023-2024 (Q3)</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <ArrowUpDown className="h-4 w-4 mr-1" />
                      Reallocate Budget
                    </Button>
                    <Button size="sm">
                      <FileSpreadsheet className="h-4 w-4 mr-1" />
                      Budget Report
                    </Button>
                  </div>
                </div>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="reports" className="p-0">
              <CardContent className="pt-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="border rounded-lg p-4 hover:border-primary transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className="bg-primary/10 p-2 rounded-full mr-3">
                          <FileSpreadsheet className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Monthly Financial Summary</h3>
                          <div className="text-xs text-muted-foreground">October 2023</div>
                        </div>
                      </div>
                      <Badge variant="outline">Generated</Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mb-3">
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5 mr-1.5" />
                        <span>Generated:</span>
                      </div>
                      <div>Today at 8:45 AM</div>
                      
                      <div className="flex items-center text-muted-foreground">
                        <Users className="h-3.5 w-3.5 mr-1.5" />
                        <span>Generated By:</span>
                      </div>
                      <div>Lisa Martinez</div>
                    </div>
                    
                    <Button size="sm" className="w-full">
                      <Download className="h-4 w-4 mr-1" />
                      Download Report
                    </Button>
                  </div>
                  
                  <div className="border rounded-lg p-4 hover:border-primary transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className="bg-primary/10 p-2 rounded-full mr-3">
                          <FileSpreadsheet className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Allowance Payment Report</h3>
                          <div className="text-xs text-muted-foreground">Q3 2023</div>
                        </div>
                      </div>
                      <Badge variant="outline">Generated</Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mb-3">
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5 mr-1.5" />
                        <span>Generated:</span>
                      </div>
                      <div>October 10, 2023</div>
                      
                      <div className="flex items-center text-muted-foreground">
                        <Users className="h-3.5 w-3.5 mr-1.5" />
                        <span>Generated By:</span>
                      </div>
                      <div>System</div>
                    </div>
                    
                    <Button size="sm" className="w-full">
                      <Download className="h-4 w-4 mr-1" />
                      Download Report
                    </Button>
                  </div>
                  
                  <div className="border rounded-lg p-4 hover:border-primary transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className="bg-primary/10 p-2 rounded-full mr-3">
                          <FileSpreadsheet className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Budget Analysis Report</h3>
                          <div className="text-xs text-muted-foreground">Year-to-Date</div>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-blue-100 text-blue-800">Scheduled</Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mb-3">
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5 mr-1.5" />
                        <span>Scheduled:</span>
                      </div>
                      <div>October 31, 2023</div>
                      
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="h-3.5 w-3.5 mr-1.5" />
                        <span>Frequency:</span>
                      </div>
                      <div>Monthly</div>
                    </div>
                    
                    <Button size="sm" variant="outline" className="w-full">
                      <Calendar className="h-4 w-4 mr-1" />
                      Generate Now
                    </Button>
                  </div>
                  
                  <div className="border rounded-lg p-4 hover:border-primary transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className="bg-primary/10 p-2 rounded-full mr-3">
                          <FileSpreadsheet className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Custom Financial Report</h3>
                          <div className="text-xs text-muted-foreground">Create a new report</div>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-muted">New</Badge>
                    </div>
                    
                    <div className="text-sm text-muted-foreground mb-3">
                      Generate custom financial reports with specific date ranges, categories, and recipients.
                    </div>
                    
                    <Button size="sm" variant="default" className="w-full">
                      <Plus className="h-4 w-4 mr-1" />
                      Create Custom Report
                    </Button>
                  </div>
                </div>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </Layout>
  );
};

export default FinanceManager;
