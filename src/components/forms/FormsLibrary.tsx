
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  FileSpreadsheet, 
  Search, 
  Plus, 
  Filter, 
  FileText,
  Clock,
  Download,
  Edit,
  Copy,
  ArrowRight
} from 'lucide-react';
import { Input } from '@/components/ui/input';

interface FormTemplate {
  id: string;
  name: string;
  category: string;
  lastUpdated: string;
  status: 'active' | 'draft' | 'archived';
  usageCount: number;
  description: string;
  fields?: number;
  createdBy?: string;
}

const mockForms: FormTemplate[] = [
  {
    id: 'FORM-001',
    name: 'Initial Inquiry Form',
    category: 'Recruitment',
    lastUpdated: '2023-09-15',
    status: 'active',
    usageCount: 156,
    description: 'Form for capturing initial inquiries from potential foster carers',
    fields: 12,
    createdBy: 'System Administrator'
  },
  {
    id: 'FORM-002',
    name: 'Home Safety Checklist',
    category: 'Assessment',
    lastUpdated: '2023-08-22',
    status: 'active',
    usageCount: 89,
    description: 'Comprehensive checklist for evaluating home safety during assessments',
    fields: 28,
    createdBy: 'Lisa Martinez'
  },
  {
    id: 'FORM-003',
    name: 'Child Placement Agreement',
    category: 'Placement',
    lastUpdated: '2023-10-05',
    status: 'active',
    usageCount: 75,
    description: 'Standard agreement to be completed when placing a child with foster carers',
    fields: 34,
    createdBy: 'System Administrator'
  },
  {
    id: 'FORM-004',
    name: 'Supervision Visit Record',
    category: 'Supervision',
    lastUpdated: '2023-09-18',
    status: 'active',
    usageCount: 211,
    description: 'Form for documenting regular supervision visits to foster placements',
    fields: 22,
    createdBy: 'Sarah Williams'
  },
  {
    id: 'FORM-005',
    name: 'Expense Claim Form',
    category: 'Finance',
    lastUpdated: '2023-09-30',
    status: 'active',
    usageCount: 192,
    description: 'Form for foster carers to submit expenses for reimbursement',
    fields: 15,
    createdBy: 'System Administrator'
  },
  {
    id: 'FORM-006',
    name: 'Foster Carer Annual Review',
    category: 'Review',
    lastUpdated: '2023-07-12',
    status: 'active',
    usageCount: 48,
    description: 'Comprehensive annual review form for foster carers',
    fields: 42,
    createdBy: 'Emily Johnson'
  },
  {
    id: 'FORM-007',
    name: 'Child Education Plan',
    category: 'Education',
    lastUpdated: '2023-10-02',
    status: 'draft',
    usageCount: 0,
    description: 'Form for creating and monitoring educational plans for children in care',
    fields: 26,
    createdBy: 'James Clark'
  },
  {
    id: 'FORM-008',
    name: 'Placement Breakdown Report',
    category: 'Placement',
    lastUpdated: '2023-08-05',
    status: 'active',
    usageCount: 23,
    description: 'Form for documenting and analyzing placement breakdowns',
    fields: 32,
    createdBy: 'Daniel Wilson'
  },
  {
    id: 'FORM-009',
    name: 'Foster Carer Training Record',
    category: 'Training',
    lastUpdated: '2023-06-20',
    status: 'archived',
    usageCount: 154,
    description: 'Old version of training record form - replaced by new version',
    fields: 18,
    createdBy: 'System Administrator'
  }
];

const getStatusBadge = (status: FormTemplate['status']) => {
  switch(status) {
    case 'active':
      return <Badge className="bg-green-500">Active</Badge>;
    case 'draft':
      return <Badge variant="outline">Draft</Badge>;
    case 'archived':
      return <Badge className="bg-muted-foreground">Archived</Badge>;
    default:
      return null;
  }
};

const FormsLibrary: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Forms Library</h1>
          <p className="text-muted-foreground text-sm">Templates and standardized documentation for agency processes</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center w-full max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search form templates..." className="pl-8 pr-4 py-2 h-9" />
            </div>
            <Button className="ml-2" size="sm">
              <Plus className="h-4 w-4 mr-1" />
              New Form
            </Button>
          </div>
          <Button size="sm" variant="outline" className="w-full sm:w-auto">
            <Filter className="h-4 w-4 mr-1" />
            Filter
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <FileSpreadsheet className="h-5 w-5 mr-2 text-primary" />
              Form Templates
            </CardTitle>
          </CardHeader>
          
          <Tabs defaultValue="all">
            <div className="px-6">
              <TabsList className="grid w-full max-w-md grid-cols-4 h-9">
                <TabsTrigger value="all">All Forms</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="draft">Drafts</TabsTrigger>
                <TabsTrigger value="categories">Categories</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="p-0">
              <CardContent className="pt-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {mockForms.map(form => (
                    <div 
                      key={form.id} 
                      className="border rounded-lg overflow-hidden hover:border-primary transition-colors"
                    >
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h3 className="font-medium">{form.name}</h3>
                            <div className="text-xs text-muted-foreground">{form.id}</div>
                          </div>
                          {getStatusBadge(form.status)}
                        </div>
                        
                        <div className="text-sm mb-3">{form.description}</div>
                        
                        <div className="flex justify-between text-xs text-muted-foreground mb-3">
                          <div className="flex items-center">
                            <FileText className="h-3.5 w-3.5 mr-1" />
                            <span>{form.category}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-3.5 w-3.5 mr-1" />
                            <span>Updated: {form.lastUpdated}</span>
                          </div>
                        </div>
                        
                        <div className="flex justify-between text-xs text-muted-foreground mb-4">
                          <div>Fields: {form.fields}</div>
                          <div>Used: {form.usageCount} times</div>
                        </div>
                        
                        <div className="flex space-x-2">
                          {form.status === 'active' ? (
                            <>
                              <Button size="sm" variant="outline" className="flex-1">
                                <Copy className="h-3.5 w-3.5 mr-1" />
                                Duplicate
                              </Button>
                              <Button size="sm" className="flex-1">
                                <ArrowRight className="h-3.5 w-3.5 mr-1" />
                                Use
                              </Button>
                            </>
                          ) : form.status === 'draft' ? (
                            <>
                              <Button size="sm" variant="outline" className="flex-1">
                                <Edit className="h-3.5 w-3.5 mr-1" />
                                Edit
                              </Button>
                              <Button size="sm" className="flex-1">
                                <ArrowRight className="h-3.5 w-3.5 mr-1" />
                                Preview
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button size="sm" variant="outline" className="flex-1">
                                <Copy className="h-3.5 w-3.5 mr-1" />
                                Restore
                              </Button>
                              <Button size="sm" variant="outline" className="flex-1">
                                <Download className="h-3.5 w-3.5 mr-1" />
                                Download
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="active" className="p-0">
              <CardContent className="pt-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {mockForms
                    .filter(form => form.status === 'active')
                    .map(form => (
                      <div 
                        key={form.id} 
                        className="border rounded-lg overflow-hidden hover:border-primary transition-colors"
                      >
                        {/* Similar content as "all" tab but filtered for active forms */}
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h3 className="font-medium">{form.name}</h3>
                              <div className="text-xs text-muted-foreground">{form.id}</div>
                            </div>
                            {getStatusBadge(form.status)}
                          </div>
                          
                          <div className="text-sm mb-3">{form.description}</div>
                          
                          <div className="flex justify-between text-xs text-muted-foreground mb-3">
                            <div className="flex items-center">
                              <FileText className="h-3.5 w-3.5 mr-1" />
                              <span>{form.category}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-3.5 w-3.5 mr-1" />
                              <span>Updated: {form.lastUpdated}</span>
                            </div>
                          </div>
                          
                          <Button size="sm" className="w-full">
                            <ArrowRight className="h-3.5 w-3.5 mr-1" />
                            Use Form
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="draft" className="p-0">
              <CardContent className="pt-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {mockForms
                    .filter(form => form.status === 'draft')
                    .map(form => (
                      <div 
                        key={form.id} 
                        className="border rounded-lg overflow-hidden hover:border-primary transition-colors"
                      >
                        {/* Similar content as "all" tab but filtered for draft forms */}
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h3 className="font-medium">{form.name}</h3>
                              <div className="text-xs text-muted-foreground">{form.id}</div>
                            </div>
                            {getStatusBadge(form.status)}
                          </div>
                          
                          <div className="text-sm mb-3">{form.description}</div>
                          
                          <div className="flex justify-between text-xs text-muted-foreground mb-3">
                            <div className="flex items-center">
                              <FileText className="h-3.5 w-3.5 mr-1" />
                              <span>{form.category}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-3.5 w-3.5 mr-1" />
                              <span>Updated: {form.lastUpdated}</span>
                            </div>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" className="flex-1">
                              <Edit className="h-3.5 w-3.5 mr-1" />
                              Continue Editing
                            </Button>
                            <Button size="sm" className="flex-1">
                              <ArrowRight className="h-3.5 w-3.5 mr-1" />
                              Preview
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="categories" className="p-0">
              <CardContent className="pt-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {[...new Set(mockForms.map(form => form.category))].map(category => {
                    const categoryForms = mockForms.filter(form => form.category === category);
                    const activeForms = categoryForms.filter(form => form.status === 'active').length;
                    
                    return (
                      <div 
                        key={category} 
                        className="border rounded-lg overflow-hidden hover:border-primary transition-colors"
                      >
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <div className="bg-primary/10 p-2 rounded-full mr-3">
                                <FileText className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-medium">{category}</h3>
                                <div className="text-xs text-muted-foreground">{categoryForms.length} forms</div>
                              </div>
                            </div>
                            <Badge variant="outline" className="bg-muted">
                              {activeForms} active
                            </Badge>
                          </div>
                          
                          <div className="text-sm mb-3">
                            <div className="font-medium mb-1">Latest forms:</div>
                            <ul className="list-disc list-inside text-muted-foreground">
                              {categoryForms
                                .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
                                .slice(0, 3)
                                .map(form => (
                                  <li key={form.id} className="text-xs">{form.name}</li>
                                ))}
                            </ul>
                          </div>
                          
                          <Button size="sm" variant="outline" className="w-full">
                            <ArrowRight className="h-3.5 w-3.5 mr-1" />
                            View Category
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </Layout>
  );
};

export default FormsLibrary;
