import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  UsersRound, 
  Search, 
  Plus, 
  Filter, 
  PhoneCall,
  Mail,
  Award,
  Briefcase,
  User,
  Calendar,
  Clock,
  BarChart2
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  status: 'active' | 'on-leave' | 'training';
  avatar?: string;
  initials: string;
  caseload: {
    current: number;
    capacity: number;
  };
  experience: number;
  startDate: string;
  specialization?: string[];
  workload: number;
  recentActivity?: {
    date: string;
    type: string;
    description: string;
  }[];
}

const mockTeamMembers: TeamMember[] = [
  {
    id: 'SW-001',
    name: 'Sarah Williams',
    role: 'Senior Social Worker',
    department: 'Assessment',
    email: 'sarah.williams@fosteragency.org',
    phone: '0121-555-7890',
    status: 'active',
    initials: 'SW',
    caseload: {
      current: 12,
      capacity: 15
    },
    experience: 7,
    startDate: '2016-05-10',
    specialization: ['Form F Assessments', 'Child Protection'],
    workload: 80,
    recentActivity: [
      {
        date: '2023-10-12',
        type: 'Assessment',
        description: 'Completed Stage 2 assessment for Johnson family'
      },
      {
        date: '2023-10-10',
        type: 'Visit',
        description: 'Conducted home visit for Martinez family'
      }
    ]
  },
  {
    id: 'JC-002',
    name: 'James Clark',
    role: 'Social Worker',
    department: 'Placement Support',
    email: 'james.clark@fosteragency.org',
    phone: '0121-555-1234',
    status: 'active',
    initials: 'JC',
    caseload: {
      current: 10,
      capacity: 12
    },
    experience: 4,
    startDate: '2019-09-15',
    specialization: ['Therapeutic Support', 'Adolescents'],
    workload: 83,
    recentActivity: [
      {
        date: '2023-10-11',
        type: 'Review',
        description: 'Supervised contact for Jason Smith'
      }
    ]
  },
  {
    id: 'EJ-003',
    name: 'Emily Johnson',
    role: 'Supervising Social Worker',
    department: 'Fostering Support',
    email: 'emily.johnson@fosteragency.org',
    phone: '0121-555-4567',
    status: 'on-leave',
    initials: 'EJ',
    caseload: {
      current: 8,
      capacity: 12
    },
    experience: 5,
    startDate: '2018-04-20',
    specialization: ['Carer Support', 'Training Development'],
    workload: 65,
    recentActivity: [
      {
        date: '2023-10-05',
        type: 'Training',
        description: 'Delivered trauma-informed care workshop'
      }
    ]
  },
  {
    id: 'DW-004',
    name: 'Daniel Wilson',
    role: 'Social Worker',
    department: 'Referrals',
    email: 'daniel.wilson@fosteragency.org',
    phone: '0121-555-8901',
    status: 'active',
    initials: 'DW',
    caseload: {
      current: 11,
      capacity: 12
    },
    experience: 3,
    startDate: '2020-06-18',
    specialization: ['Emergency Placements', 'Sibling Groups'],
    workload: 92,
    recentActivity: [
      {
        date: '2023-10-09',
        type: 'Referral',
        description: 'Processed emergency placement for Tyler Johnson'
      }
    ]
  },
  {
    id: 'LM-005',
    name: 'Lisa Martinez',
    role: 'Team Manager',
    department: 'Management',
    email: 'lisa.martinez@fosteragency.org',
    phone: '0121-555-2345',
    status: 'active',
    initials: 'LM',
    caseload: {
      current: 5,
      capacity: 8
    },
    experience: 9,
    startDate: '2014-02-10',
    specialization: ['Team Leadership', 'Quality Assurance'],
    workload: 75,
    recentActivity: [
      {
        date: '2023-10-10',
        type: 'Review',
        description: 'Chaired placement review meeting'
      }
    ]
  },
  {
    id: 'MR-006',
    name: 'Michael Rodriguez',
    role: 'Social Worker',
    department: 'Assessment',
    email: 'michael.rodriguez@fosteragency.org',
    phone: '0121-555-6789',
    status: 'training',
    initials: 'MR',
    caseload: {
      current: 6,
      capacity: 12
    },
    experience: 2,
    startDate: '2021-09-05',
    specialization: ['Form F Assessments', 'Parent and Child'],
    workload: 50,
    recentActivity: [
      {
        date: '2023-10-08',
        type: 'Training',
        description: 'Attending advanced assessment techniques course'
      }
    ]
  }
];

const getStatusBadge = (status: TeamMember['status']) => {
  switch(status) {
    case 'active':
      return <Badge className="bg-green-500">Active</Badge>;
    case 'on-leave':
      return <Badge className="bg-amber-500">On Leave</Badge>;
    case 'training':
      return <Badge className="bg-blue-500">Training</Badge>;
    default:
      return null;
  }
};

const getWorkloadColor = (workload: number) => {
  if (workload < 70) return 'bg-green-500';
  if (workload < 90) return 'bg-amber-500';
  return 'bg-red-500';
};

const TeamDirectory: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-4 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Team Directory</h1>
          <p className="text-muted-foreground text-sm">Staff directory, roles, caseloads, and performance management</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center w-full max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search team members..." className="pl-8 pr-4 py-2 h-9" />
            </div>
            <Button className="ml-2" size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Member
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
              <UsersRound className="h-5 w-5 mr-2 text-primary" />
              Team Members
            </CardTitle>
          </CardHeader>
          
          <Tabs defaultValue="all">
            <div className="px-6">
              <TabsList className="grid w-full max-w-md grid-cols-4 h-9">
                <TabsTrigger value="all">All Staff</TabsTrigger>
                <TabsTrigger value="social-workers">Social Workers</TabsTrigger>
                <TabsTrigger value="management">Management</TabsTrigger>
                <TabsTrigger value="workload">Workload</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="p-0">
              <CardContent className="pt-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {mockTeamMembers.map(member => (
                    <div 
                      key={member.id} 
                      className="border rounded-lg overflow-hidden hover:border-primary transition-colors"
                    >
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarImage src={member.avatar} />
                              <AvatarFallback className="bg-primary/10 text-primary">
                                {member.initials}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium">{member.name}</h3>
                              <div className="text-xs text-muted-foreground">{member.role}</div>
                            </div>
                          </div>
                          {getStatusBadge(member.status)}
                        </div>
                        
                        <div className="mb-3">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-muted-foreground">Workload</span>
                            <span className={member.workload >= 90 ? 'text-red-500 font-medium' : ''}>{member.workload}%</span>
                          </div>
                          <Progress value={member.workload} className={`h-2 ${getWorkloadColor(member.workload)}`} />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mb-3">
                          <div className="flex items-center text-muted-foreground">
                            <Briefcase className="h-3.5 w-3.5 mr-1.5" />
                            <span>Department:</span>
                          </div>
                          <div>{member.department}</div>
                          
                          <div className="flex items-center text-muted-foreground">
                            <User className="h-3.5 w-3.5 mr-1.5" />
                            <span>Caseload:</span>
                          </div>
                          <div>{member.caseload.current}/{member.caseload.capacity} cases</div>
                          
                          <div className="flex items-center text-muted-foreground">
                            <Award className="h-3.5 w-3.5 mr-1.5" />
                            <span>Experience:</span>
                          </div>
                          <div>{member.experience} years</div>
                          
                          <div className="flex items-center text-muted-foreground">
                            <Calendar className="h-3.5 w-3.5 mr-1.5" />
                            <span>Start Date:</span>
                          </div>
                          <div>{member.startDate}</div>
                        </div>
                        
                        {member.specialization && member.specialization.length > 0 && (
                          <div className="text-xs mb-3">
                            <div className="text-muted-foreground mb-1">Specialization:</div>
                            <div className="flex flex-wrap gap-1">
                              {member.specialization.map((spec, index) => (
                                <Badge key={index} variant="outline" className="text-xs px-1 py-0">
                                  {spec}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <div className="flex justify-between items-center mt-3 pt-3 border-t border-border">
                          <Button size="sm" variant="ghost" className="h-8 px-2 text-xs text-muted-foreground">
                            <PhoneCall className="h-3.5 w-3.5 mr-1" />
                            Call
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 px-2 text-xs text-muted-foreground">
                            <Mail className="h-3.5 w-3.5 mr-1" />
                            Email
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 px-2 text-xs text-muted-foreground">
                            <BarChart2 className="h-3.5 w-3.5 mr-1" />
                            Performance
                          </Button>
                          <Button size="sm" variant="outline" className="h-8 px-3">
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="social-workers" className="p-0">
              <CardContent className="pt-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {mockTeamMembers
                    .filter(member => member.role.includes('Social Worker'))
                    .map(member => (
                      <div 
                        key={member.id} 
                        className="border rounded-lg overflow-hidden hover:border-primary transition-colors"
                      >
                        {/* Similar content as "all" tab but filtered for social workers */}
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <Avatar className="h-10 w-10 mr-3">
                                <AvatarImage src={member.avatar} />
                                <AvatarFallback className="bg-primary/10 text-primary">
                                  {member.initials}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-medium">{member.name}</h3>
                                <div className="text-xs text-muted-foreground">{member.role}</div>
                              </div>
                            </div>
                            {getStatusBadge(member.status)}
                          </div>
                          
                          <div className="mb-3">
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-muted-foreground">Caseload</span>
                              <span>{member.caseload.current}/{member.caseload.capacity} cases</span>
                            </div>
                            <Progress 
                              value={(member.caseload.current / member.caseload.capacity) * 100} 
                              className={`h-2 ${member.caseload.current / member.caseload.capacity > 0.9 ? 'bg-red-500' : 'bg-blue-500'}`} 
                            />
                          </div>
                          
                          {member.recentActivity && member.recentActivity.length > 0 && (
                            <div className="text-xs mb-3">
                              <div className="text-muted-foreground mb-1">Recent Activity:</div>
                              {member.recentActivity.slice(0, 1).map((activity, index) => (
                                <div key={index} className="flex items-start mt-1">
                                  <Clock className="h-3 w-3 mt-0.5 mr-1 text-muted-foreground" />
                                  <div>
                                    <div className="font-medium">{activity.type}</div>
                                    <div>{activity.description}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          <Button size="sm" variant="outline" className="w-full h-8">
                            View Caseload
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="management" className="p-0">
              <CardContent className="pt-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {mockTeamMembers
                    .filter(member => member.department === 'Management' || member.role.includes('Manager'))
                    .map(member => (
                      <div 
                        key={member.id} 
                        className="border rounded-lg overflow-hidden hover:border-primary transition-colors"
                      >
                        {/* Similar content as "all" tab but filtered for management */}
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <Avatar className="h-10 w-10 mr-3">
                                <AvatarImage src={member.avatar} />
                                <AvatarFallback className="bg-primary/10 text-primary">
                                  {member.initials}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-medium">{member.name}</h3>
                                <div className="text-xs text-muted-foreground">{member.role}</div>
                              </div>
                            </div>
                            {getStatusBadge(member.status)}
                          </div>
                          
                          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mb-3">
                            <div className="flex items-center text-muted-foreground">
                              <Award className="h-3.5 w-3.5 mr-1.5" />
                              <span>Experience:</span>
                            </div>
                            <div>{member.experience} years</div>
                            
                            <div className="flex items-center text-muted-foreground">
                              <Calendar className="h-3.5 w-3.5 mr-1.5" />
                              <span>Start Date:</span>
                            </div>
                            <div>{member.startDate}</div>
                          </div>
                          
                          <div className="text-xs mb-3">
                            <div className="text-muted-foreground mb-1">Team Size:</div>
                            <div className="font-medium text-base">{Math.floor(Math.random() * 8) + 3} team members</div>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <Button size="sm" variant="ghost" className="h-8 text-xs">
                              <Mail className="h-3.5 w-3.5 mr-1" />
                              Email
                            </Button>
                            <Button size="sm" variant="outline" className="h-8">
                              View Team
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="workload" className="p-0">
              <CardContent className="pt-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {[...mockTeamMembers]
                    .sort((a, b) => b.workload - a.workload)
                    .map(member => (
                      <div 
                        key={member.id} 
                        className="border rounded-lg overflow-hidden hover:border-primary transition-colors"
                      >
                        {/* Similar content as "all" tab but focused on workload and sorted by workload */}
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <Avatar className="h-10 w-10 mr-3">
                                <AvatarImage src={member.avatar} />
                                <AvatarFallback className="bg-primary/10 text-primary">
                                  {member.initials}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-medium">{member.name}</h3>
                                <div className="text-xs text-muted-foreground">{member.role}</div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mb-3">
                            <div className="flex justify-between text-sm font-medium mb-1">
                              <span>Workload: {member.workload}%</span>
                              <span className={
                                member.workload >= 90 ? 'text-red-500' : 
                                member.workload >= 70 ? 'text-amber-500' : 
                                'text-green-500'
                              }>
                                {member.workload >= 90 ? 'Overloaded' : 
                                 member.workload >= 70 ? 'Heavy' : 
                                 'Balanced'}
                              </span>
                            </div>
                            <Progress value={member.workload} className={`h-3 ${getWorkloadColor(member.workload)}`} />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mb-3">
                            <div className="flex items-center text-muted-foreground">
                              <User className="h-3.5 w-3.5 mr-1.5" />
                              <span>Caseload:</span>
                            </div>
                            <div>{member.caseload.current}/{member.caseload.capacity} cases</div>
                            
                            <div className="flex items-center text-muted-foreground">
                              <Clock className="h-3.5 w-3.5 mr-1.5" />
                              <span>Status:</span>
                            </div>
                            <div>{member.status}</div>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <Button size="sm" variant="ghost" className="h-8 text-xs">
                              <BarChart2 className="h-3.5 w-3.5 mr-1" />
                              Performance
                            </Button>
                            <Button size="sm" variant="outline" className="h-8">
                              Manage Workload
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

export default TeamDirectory;
