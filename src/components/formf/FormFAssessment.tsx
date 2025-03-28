import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FileCheck, 
  Users, 
  FileText, 
  ClipboardCheck, 
  Edit, 
  Plus, 
  Search,
  ChevronRight,
  Download
} from 'lucide-react';
import { Input } from '@/components/ui/input';

interface Assessment {
  id: string;
  family: string;
  stage: string;
  progress: number;
  status: 'in-progress' | 'approved' | 'paused' | 'completed' | 'submitted';
  socialWorker: string;
  startDate: string;
  dueDate?: string;
  sections: {
    name: string;
    status: 'not-started' | 'in-progress' | 'completed';
  }[];
}

const mockAssessments: Assessment[] = [
  {
    id: 'F-2023-042',
    family: 'Johnson Family',
    stage: 'Stage 2',
    progress: 75,
    status: 'in-progress',
    socialWorker: 'Sarah Williams',
    startDate: '2023-08-15',
    dueDate: '2023-11-30',
    sections: [
      { name: 'Family Composition', status: 'completed' },
      { name: 'Accommodation', status: 'completed' },
      { name: 'Local Community', status: 'completed' },
      { name: 'Personal History', status: 'in-progress' },
      { name: 'Relationships', status: 'in-progress' },
      { name: 'References', status: 'not-started' },
      { name: 'Health', status: 'completed' },
    ]
  },
  {
    id: 'F-2023-039',
    family: 'Taylor Family',
    stage: 'Stage 1',
    progress: 40,
    status: 'in-progress',
    socialWorker: 'James Clark',
    startDate: '2023-09-05',
    dueDate: '2023-12-15',
    sections: [
      { name: 'Family Composition', status: 'completed' },
      { name: 'Accommodation', status: 'completed' },
      { name: 'Local Community', status: 'in-progress' },
      { name: 'Personal History', status: 'not-started' },
      { name: 'Relationships', status: 'not-started' },
      { name: 'References', status: 'not-started' },
      { name: 'Health', status: 'in-progress' },
    ]
  },
  {
    id: 'F-2023-035',
    family: 'Smith Family',
    stage: 'Stage 2',
    progress: 100,
    status: 'completed',
    socialWorker: 'Emily Johnson',
    startDate: '2023-06-10',
    dueDate: '2023-10-15',
    sections: [
      { name: 'Family Composition', status: 'completed' },
      { name: 'Accommodation', status: 'completed' },
      { name: 'Local Community', status: 'completed' },
      { name: 'Personal History', status: 'completed' },
      { name: 'Relationships', status: 'completed' },
      { name: 'References', status: 'completed' },
      { name: 'Health', status: 'completed' },
    ]
  },
  {
    id: 'F-2023-030',
    family: 'Martinez Family',
    stage: 'Stage 2',
    progress: 90,
    status: 'submitted',
    socialWorker: 'Daniel Wilson',
    startDate: '2023-05-20',
    dueDate: '2023-09-30',
    sections: [
      { name: 'Family Composition', status: 'completed' },
      { name: 'Accommodation', status: 'completed' },
      { name: 'Local Community', status: 'completed' },
      { name: 'Personal History', status: 'completed' },
      { name: 'Relationships', status: 'completed' },
      { name: 'References', status: 'completed' },
      { name: 'Health', status: 'completed' },
    ]
  },
  {
    id: 'F-2023-025',
    family: 'Chen Family',
    stage: 'Stage 1',
    progress: 10,
    status: 'paused',
    socialWorker: 'Lisa Martinez',
    startDate: '2023-09-01',
    dueDate: '2023-12-20',
    sections: [
      { name: 'Family Composition', status: 'in-progress' },
      { name: 'Accommodation', status: 'not-started' },
      { name: 'Local Community', status: 'not-started' },
      { name: 'Personal History', status: 'not-started' },
      { name: 'Relationships', status: 'not-started' },
      { name: 'References', status: 'not-started' },
      { name: 'Health', status: 'not-started' },
    ]
  }
];

const getStatusBadge = (status: Assessment['status']) => {
  switch(status) {
    case 'in-progress':
      return <Badge className="bg-blue-500">In Progress</Badge>;
    case 'approved':
      return <Badge className="bg-green-500">Approved</Badge>;
    case 'paused':
      return <Badge variant="outline">Paused</Badge>;
    case 'completed':
      return <Badge className="bg-green-500">Completed</Badge>;
    case 'submitted':
      return <Badge className="bg-purple-500">Submitted</Badge>;
    default:
      return null;
  }
};

const getSectionStatusIcon = (status: string) => {
  switch(status) {
    case 'completed':
      return <div className="h-4 w-4 rounded-full bg-green-500"></div>;
    case 'in-progress':
      return <div className="h-4 w-4 rounded-full bg-blue-500"></div>;
    case 'not-started':
      return <div className="h-4 w-4 rounded-full border-2 border-muted-foreground"></div>;
    default:
      return null;
  }
};

const FormFAssessment: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-4 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Form F Assessment</h1>
          <p className="text-muted-foreground text-sm">Assessment documentation for prospective foster carers</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center w-full max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search assessments..." className="pl-8 pr-4 py-2 h-9" />
            </div>
            <Button className="ml-2" size="sm">
              <Plus className="h-4 w-4 mr-1" />
              New Assessment
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <FileCheck className="h-5 w-5 mr-2 text-primary" />
              Form F Assessments
            </CardTitle>
          </CardHeader>
          
          <Tabs defaultValue="active">
            <div className="px-6">
              <TabsList className="grid w-full max-w-md grid-cols-4 h-9">
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="submitted">Submitted</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="all">All</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="active" className="p-0">
              <CardContent className="pt-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {mockAssessments
                    .filter(assessment => ['in-progress', 'paused'].includes(assessment.status))
                    .map(assessment => (
                      <div 
                        key={assessment.id} 
                        className="border rounded-lg overflow-hidden hover:border-primary transition-colors"
                      >
                        <div className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-medium">{assessment.family}</h3>
                              <div className="text-xs text-muted-foreground">{assessment.id} • {assessment.stage}</div>
                            </div>
                            {getStatusBadge(assessment.status)}
                          </div>
                          
                          <div className="mb-2">
                            <div className="flex justify-between text-xs mb-1">
                              <span>Progress</span>
                              <span>{assessment.progress}%</span>
                            </div>
                            <Progress value={assessment.progress} className="h-2" />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm mb-4">
                            <div className="flex items-center text-muted-foreground">
                              <Users className="h-3.5 w-3.5 mr-2" />
                              <span>Social Worker:</span>
                            </div>
                            <div>{assessment.socialWorker}</div>
                            
                            <div className="flex items-center text-muted-foreground">
                              <FileText className="h-3.5 w-3.5 mr-2" />
                              <span>Start Date:</span>
                            </div>
                            <div>{assessment.startDate}</div>
                            
                            <div className="flex items-center text-muted-foreground">
                              <ClipboardCheck className="h-3.5 w-3.5 mr-2" />
                              <span>Due Date:</span>
                            </div>
                            <div>{assessment.dueDate}</div>
                          </div>
                          
                          <div className="flex justify-between items-center mt-2">
                            <div className="flex space-x-1.5">
                              {assessment.sections.map((section, index) => (
                                <div key={index} title={`${section.name}: ${section.status}`}>
                                  {getSectionStatusIcon(section.status)}
                                </div>
                              ))}
                            </div>
                            <Button size="sm" variant="outline" className="h-8">
                              <Edit className="h-3.5 w-3.5 mr-1" />
                              Continue
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="submitted" className="p-0">
              <CardContent className="pt-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {mockAssessments
                    .filter(assessment => assessment.status === 'submitted')
                    .map(assessment => (
                      <div 
                        key={assessment.id} 
                        className="border rounded-lg overflow-hidden hover:border-primary transition-colors"
                      >
                        {/* Similar content structure as active tab but with submitted assessments */}
                        <div className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-medium">{assessment.family}</h3>
                              <div className="text-xs text-muted-foreground">{assessment.id} • {assessment.stage}</div>
                            </div>
                            {getStatusBadge(assessment.status)}
                          </div>
                          
                          <div className="mb-2">
                            <div className="flex justify-between text-xs mb-1">
                              <span>Progress</span>
                              <span>{assessment.progress}%</span>
                            </div>
                            <Progress value={assessment.progress} className="h-2" />
                          </div>
                          
                          <div className="flex justify-between items-center mt-4">
                            <div className="text-xs text-muted-foreground">
                              Submitted on: 2023-09-28
                            </div>
                            <Button size="sm" variant="outline" className="h-8">
                              <Download className="h-3.5 w-3.5 mr-1" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="completed" className="p-0">
              <CardContent className="pt-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {mockAssessments
                    .filter(assessment => assessment.status === 'completed')
                    .map(assessment => (
                      <div 
                        key={assessment.id} 
                        className="border rounded-lg overflow-hidden hover:border-primary transition-colors"
                      >
                        {/* Similar content structure as active tab but with completed assessments */}
                        <div className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-medium">{assessment.family}</h3>
                              <div className="text-xs text-muted-foreground">{assessment.id} • {assessment.stage}</div>
                            </div>
                            {getStatusBadge(assessment.status)}
                          </div>
                          
                          <div className="mb-2">
                            <div className="flex justify-between text-xs mb-1">
                              <span>Progress</span>
                              <span>{assessment.progress}%</span>
                            </div>
                            <Progress value={assessment.progress} className="h-2" />
                          </div>
                          
                          <div className="flex justify-between items-center mt-4">
                            <div className="text-xs text-muted-foreground">
                              Completed on: 2023-10-15
                            </div>
                            <Button size="sm" variant="outline" className="h-8">
                              <Download className="h-3.5 w-3.5 mr-1" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="all" className="p-0">
              <CardContent className="pt-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {mockAssessments.map(assessment => (
                    <div 
                      key={assessment.id} 
                      className="border rounded-lg overflow-hidden hover:border-primary transition-colors"
                    >
                      {/* Similar content structure as active tab but with all assessments */}
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-medium">{assessment.family}</h3>
                            <div className="text-xs text-muted-foreground">{assessment.id} • {assessment.stage}</div>
                          </div>
                          {getStatusBadge(assessment.status)}
                        </div>
                        
                        <div className="mb-2">
                          <div className="flex justify-between text-xs mb-1">
                            <span>Progress</span>
                            <span>{assessment.progress}%</span>
                          </div>
                          <Progress value={assessment.progress} className="h-2" />
                        </div>
                        
                        <div className="flex justify-between items-center mt-4">
                          <Button size="sm" variant="ghost" className="h-8 text-xs text-muted-foreground">
                            View Details
                            <ChevronRight className="h-3 w-3 ml-1" />
                          </Button>
                          <Button size="sm" variant="outline" className="h-8">
                            {assessment.status === 'in-progress' || assessment.status === 'paused' ? (
                              <>
                                <Edit className="h-3.5 w-3.5 mr-1" />
                                Edit
                              </>
                            ) : (
                              <>
                                <Download className="h-3.5 w-3.5 mr-1" />
                                Download
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </Layout>
  );
};

export default FormFAssessment;
