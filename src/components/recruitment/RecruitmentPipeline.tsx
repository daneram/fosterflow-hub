
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  UserPlus, 
  Search, 
  Plus, 
  Filter, 
  Users,
  Calendar,
  ArrowRight,
  Clock,
  MapPin,
  Phone,
  Mail,
  FileText,
  BarChart2
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Applicant {
  id: string;
  name: string;
  status: 'inquiry' | 'application' | 'screening' | 'assessment' | 'panel' | 'approval' | 'withdrawn' | 'rejected';
  stage: number;
  address: string;
  phone: string;
  email: string;
  inquiryDate: string;
  lastActivity: string;
  nextAction?: string;
  nextActionDate?: string;
  source: string;
  socialWorker?: string;
  notes?: string;
  placementPreferences?: string[];
}

const mockApplicants: Applicant[] = [
  {
    id: 'APP-2023-001',
    name: 'Robert & Mary Johnson',
    status: 'assessment',
    stage: 3,
    address: '15 Oak Street, Birmingham, B1 2NP',
    phone: '0121-555-1234',
    email: 'johnson.family@email.com',
    inquiryDate: '2023-06-10',
    lastActivity: '2023-10-05',
    nextAction: 'Home safety check',
    nextActionDate: '2023-10-20',
    source: 'Website inquiry',
    socialWorker: 'Sarah Williams',
    notes: 'Potential for sibling groups. Second home assessment scheduled.',
    placementPreferences: ['Long-term', 'Sibling Groups', 'Ages 5-12']
  },
  {
    id: 'APP-2023-002',
    name: 'Carlos & Elena Martinez',
    status: 'panel',
    stage: 4,
    address: '42 Willow Avenue, Manchester, M1 7DH',
    phone: '0161-555-6789',
    email: 'martinez.family@email.com',
    inquiryDate: '2023-05-15',
    lastActivity: '2023-10-08',
    nextAction: 'Panel interview',
    nextActionDate: '2023-10-25',
    source: 'Referral from existing carer',
    socialWorker: 'James Clark',
    notes: 'Strong application. Panel preparation meeting completed successfully.',
    placementPreferences: ['Short-term', 'Emergency', 'Teenagers']
  },
  {
    id: 'APP-2023-003',
    name: 'Grace Taylor',
    status: 'application',
    stage: 2,
    address: '11 Maple Street, Liverpool, L1 9SB',
    phone: '0151-555-2345',
    email: 'grace.taylor@email.com',
    inquiryDate: '2023-07-20',
    lastActivity: '2023-10-02',
    nextAction: 'Initial interview',
    nextActionDate: '2023-10-18',
    source: 'Social media campaign',
    notes: 'Single applicant with strong childcare background. Interested in short-term placements.',
    placementPreferences: ['Short-term', 'Respite', 'Young children']
  },
  {
    id: 'APP-2023-004',
    name: 'Ahmed & Fatima Khan',
    status: 'inquiry',
    stage: 1,
    address: '8 Cedar Road, London, E1 6BT',
    phone: '020-555-3456',
    email: 'khan.family@email.com',
    inquiryDate: '2023-09-28',
    lastActivity: '2023-10-01',
    nextAction: 'Information session',
    nextActionDate: '2023-10-15',
    source: 'Community outreach event',
    notes: 'Multilingual family interested in fostering. Initial phone screening positive.'
  },
  {
    id: 'APP-2023-005',
    name: 'Susan & David Smith',
    status: 'approval',
    stage: 5,
    address: '23 Pine Lane, Bristol, BS1 5AT',
    phone: '0117-555-8901',
    email: 'smith.family@email.com',
    inquiryDate: '2023-02-15',
    lastActivity: '2023-10-10',
    nextAction: 'Approval letter',
    nextActionDate: '2023-10-17',
    source: 'Local newspaper ad',
    socialWorker: 'Emily Johnson',
    notes: 'Successful panel recommendation. Awaiting final approval letter.',
    placementPreferences: ['Long-term', 'Sibling Groups', 'Teenagers', 'Special needs']
  },
  {
    id: 'APP-2023-006',
    name: 'John & Patricia White',
    status: 'screening',
    stage: 2,
    address: '5 Birch Close, Leeds, LS1 4PQ',
    phone: '0113-555-6789',
    email: 'white.family@email.com',
    inquiryDate: '2023-08-05',
    lastActivity: '2023-09-25',
    nextAction: 'Background checks',
    nextActionDate: '2023-10-20',
    source: 'Information evening',
    notes: 'First-time applicants. Initial interview completed with positive outcome.',
    placementPreferences: ['Short-term', 'Emergency']
  },
  {
    id: 'APP-2023-007',
    name: 'Michael & Jennifer Brown',
    status: 'withdrawn',
    stage: 2,
    address: '17 Elm Road, Nottingham, NG1 5BT',
    phone: '0115-555-4321',
    email: 'brown.family@email.com',
    inquiryDate: '2023-07-10',
    lastActivity: '2023-09-15',
    source: 'Website inquiry',
    notes: 'Withdrew due to change in family circumstances.'
  }
];

const getStatusBadge = (status: Applicant['status']) => {
  switch(status) {
    case 'inquiry':
      return <Badge variant="outline">Inquiry</Badge>;
    case 'application':
      return <Badge className="bg-blue-500">Application</Badge>;
    case 'screening':
      return <Badge className="bg-purple-500">Screening</Badge>;
    case 'assessment':
      return <Badge className="bg-indigo-500">Assessment</Badge>;
    case 'panel':
      return <Badge className="bg-amber-500">Panel</Badge>;
    case 'approval':
      return <Badge className="bg-green-500">Approval</Badge>;
    case 'withdrawn':
      return <Badge variant="outline" className="text-muted-foreground">Withdrawn</Badge>;
    case 'rejected':
      return <Badge className="bg-red-500">Rejected</Badge>;
    default:
      return null;
  }
};

const getStageProgress = (stage: number) => {
  return (stage / 5) * 100;
};

const RecruitmentPipeline: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Recruitment Pipeline</h1>
          <p className="text-muted-foreground text-sm">Prospective carer pipeline, marketing campaigns, and application tracking</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center w-full max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search applicants..." className="pl-8 pr-4 py-2 h-9" />
            </div>
            <Button className="ml-2" size="sm">
              <Plus className="h-4 w-4 mr-1" />
              New Applicant
            </Button>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button size="sm" variant="outline" className="w-full sm:w-auto">
              <Filter className="h-4 w-4 mr-1" />
              Filter
            </Button>
            <Button size="sm" variant="outline" className="w-full sm:w-auto">
              <BarChart2 className="h-4 w-4 mr-1" />
              Analytics
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">New Inquiries (30d)</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-500">+15%</span> from previous period
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">32%</div>
              <p className="text-xs text-muted-foreground mt-1">
                Inquiry to application
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Applications</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground mt-1">
                5 in advanced stages
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Time to Approval</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8.4 mo</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-500">-0.8 mo</span> from target
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <UserPlus className="h-5 w-5 mr-2 text-primary" />
              Recruitment Pipeline
            </CardTitle>
          </CardHeader>
          
          <Tabs defaultValue="all">
            <div className="px-6">
              <TabsList className="grid w-full max-w-md grid-cols-4 h-9">
                <TabsTrigger value="all">All Applicants</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="early-stage">Early Stage</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="p-0">
              <CardContent className="pt-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {mockApplicants.map(applicant => (
                    <div 
                      key={applicant.id} 
                      className="border rounded-lg overflow-hidden hover:border-primary transition-colors"
                    >
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarFallback className="bg-primary/10 text-primary">
                                {applicant.name.split(' ')[0][0]}{applicant.name.includes('&') ? applicant.name.split('&')[1].trim()[0] : applicant.name.split(' ')[applicant.name.split(' ').length - 1][0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium">{applicant.name}</h3>
                              <div className="text-xs text-muted-foreground">{applicant.id}</div>
                            </div>
                          </div>
                          {getStatusBadge(applicant.status)}
                        </div>

                        {applicant.status !== 'withdrawn' && applicant.status !== 'rejected' && (
                          <div className="mb-3">
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-muted-foreground">Application Progress</span>
                              <span>Stage {applicant.stage}/5</span>
                            </div>
                            <Progress value={getStageProgress(applicant.stage)} className="h-2" />
                          </div>
                        )}
                        
                        <div className="text-xs space-y-1 mb-3">
                          <div className="flex items-start">
                            <MapPin className="h-3.5 w-3.5 mr-1.5 mt-0.5 shrink-0 text-muted-foreground" />
                            <span>{applicant.address}</span>
                          </div>
                          <div className="flex items-center">
                            <Phone className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                            <span>{applicant.phone}</span>
                          </div>
                          <div className="flex items-center">
                            <Mail className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                            <span>{applicant.email}</span>
                          </div>
                        </div>
                        
                        <div className="text-xs space-y-2 mb-3">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Inquiry Date:</span>
                            <span>{applicant.inquiryDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Last Activity:</span>
                            <span>{applicant.lastActivity}</span>
                          </div>
                          {applicant.nextAction && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Next Action:</span>
                              <span>{applicant.nextAction} ({applicant.nextActionDate})</span>
                            </div>
                          )}
                        </div>
                        
                        {applicant.placementPreferences && (
                          <div className="text-xs mb-3">
                            <div className="text-muted-foreground mb-1">Placement Preferences:</div>
                            <div className="flex flex-wrap gap-1">
                              {applicant.placementPreferences.map((pref, index) => (
                                <Badge key={index} variant="outline" className="text-xs px-1 py-0">
                                  {pref}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <div className="flex justify-between items-center">
                          <Button size="sm" variant="ghost" className="h-8 text-xs">
                            <Phone className="h-3.5 w-3.5 mr-1" />
                            Contact
                          </Button>
                          <Button size="sm" variant="outline" className="h-8">
                            Update Status
                          </Button>
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
                  {mockApplicants
                    .filter(applicant => !['withdrawn', 'rejected'].includes(applicant.status))
                    .map(applicant => (
                      <div 
                        key={applicant.id} 
                        className="border rounded-lg overflow-hidden hover:border-primary transition-colors"
                      >
                        {/* Similar content as "all" tab but filtered for active applications */}
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <Avatar className="h-10 w-10 mr-3">
                                <AvatarFallback className="bg-primary/10 text-primary">
                                  {applicant.name.split(' ')[0][0]}{applicant.name.includes('&') ? applicant.name.split('&')[1].trim()[0] : applicant.name.split(' ')[applicant.name.split(' ').length - 1][0]}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-medium">{applicant.name}</h3>
                                <div className="text-xs text-muted-foreground">{applicant.id}</div>
                              </div>
                            </div>
                            {getStatusBadge(applicant.status)}
                          </div>

                          <div className="mb-3">
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-muted-foreground">Application Progress</span>
                              <span>Stage {applicant.stage}/5</span>
                            </div>
                            <Progress value={getStageProgress(applicant.stage)} className="h-2" />
                          </div>
                          
                          {applicant.nextAction && (
                            <div className="text-sm mb-3">
                              <div className="text-muted-foreground mb-1 text-xs">Next Action:</div>
                              <div className="flex items-center">
                                <Calendar className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                                <span>{applicant.nextAction}</span>
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">
                                Due: {applicant.nextActionDate}
                              </div>
                            </div>
                          )}
                          
                          <Button size="sm" variant="outline" className="w-full h-8">
                            Process Application
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="early-stage" className="p-0">
              <CardContent className="pt-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {mockApplicants
                    .filter(applicant => ['inquiry', 'application', 'screening'].includes(applicant.status))
                    .map(applicant => (
                      <div 
                        key={applicant.id} 
                        className="border rounded-lg overflow-hidden hover:border-primary transition-colors"
                      >
                        {/* Similar content as "all" tab but filtered for early stage applications */}
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <Avatar className="h-10 w-10 mr-3">
                                <AvatarFallback className="bg-primary/10 text-primary">
                                  {applicant.name.split(' ')[0][0]}{applicant.name.includes('&') ? applicant.name.split('&')[1].trim()[0] : applicant.name.split(' ')[applicant.name.split(' ').length - 1][0]}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-medium">{applicant.name}</h3>
                                <div className="text-xs text-muted-foreground">{applicant.id}</div>
                              </div>
                            </div>
                            {getStatusBadge(applicant.status)}
                          </div>

                          <div className="text-xs space-y-2 mb-3">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Inquiry Date:</span>
                              <span>{applicant.inquiryDate}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Last Activity:</span>
                              <span>{applicant.lastActivity}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Source:</span>
                              <span>{applicant.source}</span>
                            </div>
                          </div>
                          
                          <div className="text-xs mb-3">
                            <div className="text-muted-foreground mb-1">Notes:</div>
                            <div>{applicant.notes}</div>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button size="sm" variant="ghost" className="flex-1 h-8 text-xs">
                              <Phone className="h-3.5 w-3.5 mr-1" />
                              Contact
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1 h-8 text-xs">
                              Move to Next Stage
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="advanced" className="p-0">
              <CardContent className="pt-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {mockApplicants
                    .filter(applicant => ['assessment', 'panel', 'approval'].includes(applicant.status))
                    .map(applicant => (
                      <div 
                        key={applicant.id} 
                        className="border rounded-lg overflow-hidden hover:border-primary transition-colors"
                      >
                        {/* Similar content as "all" tab but filtered for advanced applications */}
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <Avatar className="h-10 w-10 mr-3">
                                <AvatarFallback className="bg-primary/10 text-primary">
                                  {applicant.name.split(' ')[0][0]}{applicant.name.includes('&') ? applicant.name.split('&')[1].trim()[0] : applicant.name.split(' ')[applicant.name.split(' ').length - 1][0]}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-medium">{applicant.name}</h3>
                                <div className="text-xs text-muted-foreground">{applicant.id}</div>
                              </div>
                            </div>
                            {getStatusBadge(applicant.status)}
                          </div>

                          <div className="mb-3">
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-muted-foreground">Application Progress</span>
                              <span>Stage {applicant.stage}/5</span>
                            </div>
                            <Progress value={getStageProgress(applicant.stage)} className="h-2" />
                          </div>
                          
                          <div className="text-xs mb-3">
                            <div className="text-muted-foreground">Social Worker:</div>
                            <div className="font-medium">{applicant.socialWorker}</div>
                          </div>
                          
                          {applicant.placementPreferences && (
                            <div className="text-xs mb-3">
                              <div className="text-muted-foreground mb-1">Placement Preferences:</div>
                              <div className="flex flex-wrap gap-1">
                                {applicant.placementPreferences.map((pref, index) => (
                                  <Badge key={index} variant="outline" className="text-xs px-1 py-0">
                                    {pref}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" className="flex-1 h-8 text-xs">
                              <FileText className="h-3.5 w-3.5 mr-1" />
                              View Assessment
                            </Button>
                            <Button size="sm" variant="default" className="flex-1 h-8 text-xs">
                              {applicant.status === 'approval' ? 'Approve' : 'Update Status'}
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

export default RecruitmentPipeline;
