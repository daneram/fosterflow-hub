import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Search, 
  Plus, 
  Filter, 
  MapPin,
  Calendar,
  PhoneCall,
  Mail,
  UserCheck,
  Home,
  Star,
  HeartHandshake,
  Baby,
  PieChart,
  BarChart,
  TrendingUp
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { FeatureFlag } from '@/lib/feature-flags';
import { useFeatureFlag, FeatureGated } from '@/hooks/useFeatureFlag';

interface Carer {
  id: string;
  name: string;
  status: 'active' | 'pending' | 'inactive' | 'on-hold';
  address: string;
  phone: string;
  email: string;
  approvalDate: string;
  reviewDate: string;
  placementType: string[];
  capacity: {
    total: number;
    current: number;
  };
  socialWorker: string;
  currentPlacements?: {
    childName: string;
    childAge: number;
    since: string;
  }[];
  specialties?: string[];
  experience: number;
  rating?: number;
}

const mockCarers: Carer[] = [
  {
    id: 'FC-2023-001',
    name: 'Robert & Mary Johnson',
    status: 'active',
    address: '15 Oak Street, Birmingham, B1 2NP',
    phone: '0121-555-1234',
    email: 'johnson.family@email.com',
    approvalDate: '2019-05-10',
    reviewDate: '2023-12-15',
    placementType: ['Long-term', 'Sibling Groups'],
    capacity: {
      total: 3,
      current: 2
    },
    socialWorker: 'Sarah Williams',
    currentPlacements: [
      {
        childName: 'Jason Smith',
        childAge: 8,
        since: '2022-06-15'
      },
      {
        childName: 'Emma Taylor',
        childAge: 6,
        since: '2022-06-15'
      }
    ],
    specialties: ['Trauma-informed care', 'Educational support'],
    experience: 4,
    rating: 5
  },
  {
    id: 'FC-2023-002',
    name: 'Carlos & Elena Martinez',
    status: 'active',
    address: '42 Willow Avenue, Manchester, M1 7DH',
    phone: '0161-555-6789',
    email: 'martinez.family@email.com',
    approvalDate: '2020-09-22',
    reviewDate: '2023-11-10',
    placementType: ['Short-term', 'Emergency'],
    capacity: {
      total: 2,
      current: 1
    },
    socialWorker: 'Daniel Wilson',
    currentPlacements: [
      {
        childName: 'Sophia Lee',
        childAge: 4,
        since: '2023-02-08'
      }
    ],
    specialties: ['Bilingual (Spanish)', 'Therapeutic care'],
    experience: 3,
    rating: 4
  },
  {
    id: 'FC-2023-003',
    name: 'Ahmed & Fatima Khan',
    status: 'active',
    address: '8 Cedar Road, London, E1 6BT',
    phone: '020-555-3456',
    email: 'khan.family@email.com',
    approvalDate: '2021-03-15',
    reviewDate: '2023-10-20',
    placementType: ['Long-term', 'Parent and child'],
    capacity: {
      total: 2,
      current: 0
    },
    socialWorker: 'James Clark',
    specialties: ['Cultural diversity', 'Religious education', 'Infant care'],
    experience: 2,
    rating: 4
  },
  {
    id: 'FC-2023-004',
    name: 'Susan & David Smith',
    status: 'on-hold',
    address: '23 Pine Lane, Bristol, BS1 5AT',
    phone: '0117-555-8901',
    email: 'smith.family@email.com',
    approvalDate: '2018-11-08',
    reviewDate: '2023-12-01',
    placementType: ['Long-term', 'Sibling Groups', 'Teenagers'],
    capacity: {
      total: 3,
      current: 0
    },
    socialWorker: 'Lisa Martinez',
    specialties: ['Special educational needs', 'Behavioral challenges'],
    experience: 5,
    rating: 5
  },
  {
    id: 'FC-2023-005',
    name: 'Grace Taylor',
    status: 'active',
    address: '11 Maple Street, Liverpool, L1 9SB',
    phone: '0151-555-2345',
    email: 'grace.taylor@email.com',
    approvalDate: '2022-01-25',
    reviewDate: '2023-11-05',
    placementType: ['Short-term', 'Respite'],
    capacity: {
      total: 1,
      current: 1
    },
    socialWorker: 'Emily Johnson',
    currentPlacements: [
      {
        childName: 'Tyler Johnson',
        childAge: 10,
        since: '2023-05-20'
      }
    ],
    specialties: ['Single parent fostering', 'Early years development'],
    experience: 1,
    rating: 4
  },
  {
    id: 'FC-2023-006',
    name: 'John & Patricia White',
    status: 'pending',
    address: '5 Birch Close, Leeds, LS1 4PQ',
    phone: '0113-555-6789',
    email: 'white.family@email.com',
    approvalDate: '2023-08-15',
    reviewDate: '2024-02-15',
    placementType: ['Emergency', 'Short-term'],
    capacity: {
      total: 2,
      current: 0
    },
    socialWorker: 'Michael Rodriguez',
    specialties: ['First-time carers', 'Healthcare background'],
    experience: 0,
    rating: 0
  }
];

const getStatusBadge = (status: Carer['status']) => {
  switch(status) {
    case 'active':
      return <Badge className="bg-green-500">Active</Badge>;
    case 'pending':
      return <Badge className="bg-blue-500">Pending Approval</Badge>;
    case 'inactive':
      return <Badge variant="outline">Inactive</Badge>;
    case 'on-hold':
      return <Badge className="bg-amber-500">On Hold</Badge>;
    default:
      return null;
  }
};

const getRatingStars = (rating: number) => {
  return Array(5).fill(0).map((_, index) => (
    <Star 
      key={index} 
      className={`h-3.5 w-3.5 ${index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`} 
    />
  ));
};

const CarersDirectory: React.FC = () => {
  // Check if the new Carers Dashboard feature is enabled
  const isCarersDashboardEnabled = useFeatureFlag(FeatureFlag.CARERS_DASHBOARD);
  const isAdvancedSearchEnabled = useFeatureFlag(FeatureFlag.ADVANCED_SEARCH);

  return (
    <Layout>
      <div className="space-y-4 animate-fade-in">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Carers Directory</h1>
          <p className="text-muted-foreground text-sm">Manage carer profiles, approvals, and support arrangements</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center w-full max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search carers..." className="pl-8 pr-4 py-2 h-9" />
            </div>
            <Button className="ml-2" size="sm">
              <Plus className="h-4 w-4 mr-1" />
              New Carer
            </Button>
          </div>
          
          {/* Advanced search feature */}
          <FeatureGated
            flag={FeatureFlag.ADVANCED_SEARCH}
            enabled={
              <div className="flex gap-2 w-full sm:w-auto">
                <Button size="sm" variant="outline" className="w-full sm:w-auto">
                  <Filter className="h-4 w-4 mr-1" />
                  Advanced Filter
                </Button>
                <Button size="sm" variant="secondary" className="w-full sm:w-auto">
                  <Star className="h-4 w-4 mr-1" />
                  Saved Searches
                </Button>
              </div>
            }
            disabled={
              <Button size="sm" variant="outline" className="w-full sm:w-auto">
                <Filter className="h-4 w-4 mr-1" />
                Filter
              </Button>
            }
          />
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <HeartHandshake className="h-5 w-5 mr-2 text-primary" />
              Foster Carers
            </CardTitle>
          </CardHeader>
          
          {/* Feature flag-controlled Tabs Component */}
          <FeatureGated
            flag={FeatureFlag.CARERS_DASHBOARD}
            enabled={
              <Tabs defaultValue="list">
                <TabsList className="ml-6 mb-2">
                  <TabsTrigger value="list">List View</TabsTrigger>
                  <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>
                
                <TabsContent value="list">
                  {/* Original list content */}
                  <CardContent className="p-0">
                    <div className="border rounded-md">
                      <div className="bg-muted px-4 py-2 flex items-center font-medium text-sm">
                        <div className="w-1/3">Carer</div>
                        <div className="w-1/6 text-center">Status</div>
                        <div className="w-1/6 text-center">Capacity</div>
                        <div className="w-1/6 text-center">Review Date</div>
                        <div className="w-1/6 text-center">Actions</div>
                      </div>
                      
                      {mockCarers.map((carer) => (
                        <div key={carer.id} className="border-t px-4 py-3 flex items-center text-sm">
                          <div className="w-1/3">
                            <div className="flex items-center">
                              <Avatar className="h-8 w-8 mr-2">
                                <AvatarFallback className="bg-primary/10 text-primary">
                                  {carer.name.split(' ')[0][0]}{carer.name.split(' ')[1]?.[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{carer.name}</div>
                                <div className="text-xs text-muted-foreground flex items-center mt-0.5">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {carer.address.split(',')[1].trim()}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="w-1/6 text-center">
                            {getStatusBadge(carer.status)}
                          </div>
                          
                          <div className="w-1/6 text-center">
                            <div>{carer.capacity.current}/{carer.capacity.total}</div>
                            <div className="text-xs text-muted-foreground mt-0.5">
                              {carer.capacity.current === carer.capacity.total ? 'Full' : 
                               carer.capacity.current === 0 ? 'Available' : 'Partial'}
                            </div>
                          </div>
                          
                          <div className="w-1/6 text-center">
                            <div>{new Date(carer.reviewDate).toLocaleDateString('en-GB')}</div>
                            <div className="text-xs text-muted-foreground mt-0.5 flex items-center justify-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {Math.round((new Date(carer.reviewDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                            </div>
                          </div>
                          
                          <div className="w-1/6 text-center">
                            <div className="flex justify-center gap-1">
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                <PhoneCall className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                <Mail className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                <UserCheck className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </TabsContent>
                
                <TabsContent value="dashboard">
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium flex items-center">
                            <Users className="h-4 w-4 mr-1 text-blue-500" />
                            Carer Capacity Overview
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-center py-4">
                            <PieChart className="h-32 w-32 text-blue-500" />
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Total Capacity:</span>
                              <span className="font-medium">15 placements</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Currently Placed:</span>
                              <span className="font-medium">10 children</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Available:</span>
                              <span className="font-medium text-green-500">5 placements</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium flex items-center">
                            <Home className="h-4 w-4 mr-1 text-indigo-500" />
                            Placement Types
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-center py-4">
                            <BarChart className="h-32 w-32 text-indigo-500" />
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Long-term:</span>
                              <span className="font-medium">4 carers</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Short-term:</span>
                              <span className="font-medium">3 carers</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Emergency:</span>
                              <span className="font-medium">2 carers</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium flex items-center">
                            <Calendar className="h-4 w-4 mr-1 text-purple-500" />
                            Upcoming Reviews
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3 py-2">
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="font-medium">Johnson Family</div>
                                <div className="text-xs text-muted-foreground">Dec 15, 2023</div>
                              </div>
                              <Badge className="bg-amber-500">30 days</Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="font-medium">Khan Family</div>
                                <div className="text-xs text-muted-foreground">Oct 20, 2023</div>
                              </div>
                              <Badge className="bg-red-500">5 days</Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="font-medium">Grace Taylor</div>
                                <div className="text-xs text-muted-foreground">Nov 5, 2023</div>
                              </div>
                              <Badge className="bg-yellow-500">15 days</Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </TabsContent>
                
                <TabsContent value="analytics">
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">Carer Performance Metrics</h3>
                        <Button size="sm" variant="outline">
                          <TrendingUp className="h-4 w-4 mr-1" />
                          Export Report
                        </Button>
                      </div>
                      
                      <div className="border rounded-md p-4">
                        <div className="flex justify-center items-center py-8">
                          <TrendingUp className="h-32 w-32 text-primary" />
                        </div>
                        <p className="text-center text-muted-foreground">
                          Enhanced analytics data will appear here, showing carer performance metrics,
                          satisfaction scores, and outcome measurements.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </TabsContent>
              </Tabs>
            }
            disabled={
              <CardContent className="p-0">
                <div className="border rounded-md">
                  <div className="bg-muted px-4 py-2 flex items-center font-medium text-sm">
                    <div className="w-1/3">Carer</div>
                    <div className="w-1/6 text-center">Status</div>
                    <div className="w-1/6 text-center">Capacity</div>
                    <div className="w-1/6 text-center">Review Date</div>
                    <div className="w-1/6 text-center">Actions</div>
                  </div>
                  
                  {mockCarers.map((carer) => (
                    <div key={carer.id} className="border-t px-4 py-3 flex items-center text-sm">
                      <div className="w-1/3">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {carer.name.split(' ')[0][0]}{carer.name.split(' ')[1]?.[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{carer.name}</div>
                            <div className="text-xs text-muted-foreground flex items-center mt-0.5">
                              <MapPin className="h-3 w-3 mr-1" />
                              {carer.address.split(',')[1].trim()}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="w-1/6 text-center">
                        {getStatusBadge(carer.status)}
                      </div>
                      
                      <div className="w-1/6 text-center">
                        <div>{carer.capacity.current}/{carer.capacity.total}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {carer.capacity.current === carer.capacity.total ? 'Full' : 
                           carer.capacity.current === 0 ? 'Available' : 'Partial'}
                        </div>
                      </div>
                      
                      <div className="w-1/6 text-center">
                        <div>{new Date(carer.reviewDate).toLocaleDateString('en-GB')}</div>
                        <div className="text-xs text-muted-foreground mt-0.5 flex items-center justify-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {Math.round((new Date(carer.reviewDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                        </div>
                      </div>
                      
                      <div className="w-1/6 text-center">
                        <div className="flex justify-center gap-1">
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <PhoneCall className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Mail className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <UserCheck className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            }
          />
        </Card>
      </div>
    </Layout>
  );
};

export default CarersDirectory;
