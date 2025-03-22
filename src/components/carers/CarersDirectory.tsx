
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
  Baby
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

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
  return (
    <Layout>
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Carers Directory</h1>
          <p className="text-muted-foreground text-sm">Foster carer profiles, availability, specialties, and supervision records</p>
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
          <Button size="sm" variant="outline" className="w-full sm:w-auto">
            <Filter className="h-4 w-4 mr-1" />
            Filter
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <HeartHandshake className="h-5 w-5 mr-2 text-primary" />
              Foster Carers
            </CardTitle>
          </CardHeader>
          
          <Tabs defaultValue="all">
            <div className="px-6">
              <TabsList className="grid w-full max-w-md grid-cols-4 h-9">
                <TabsTrigger value="all">All Carers</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="available">Available</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="p-0">
              <CardContent className="pt-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {mockCarers.map(carer => (
                    <div 
                      key={carer.id} 
                      className="border rounded-lg overflow-hidden hover:border-primary transition-colors"
                    >
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarFallback className="bg-primary/10 text-primary">
                                {carer.name.split(' ')[0][0]}{carer.name.split(' ')[carer.name.split(' ').length - 1][0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium">{carer.name}</h3>
                              <div className="text-xs text-muted-foreground">{carer.id}</div>
                            </div>
                          </div>
                          {getStatusBadge(carer.status)}
                        </div>
                        
                        <div className="mb-3">
                          <div className="flex items-center text-xs text-muted-foreground mb-1">
                            <UserCheck className="h-3.5 w-3.5 mr-1" />
                            <span>Approved: {carer.approvalDate} • Review: {carer.reviewDate}</span>
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <div className="flex mr-1">{getRatingStars(carer.rating || 0)}</div>
                            <span>{carer.experience} {carer.experience === 1 ? 'year' : 'years'} experience</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mb-3">
                          <div className="flex items-start text-muted-foreground">
                            <MapPin className="h-3.5 w-3.5 mr-1.5 mt-0.5 shrink-0" />
                            <span>Address:</span>
                          </div>
                          <div className="text-xs">{carer.address}</div>
                          
                          <div className="flex items-center text-muted-foreground">
                            <Home className="h-3.5 w-3.5 mr-1.5" />
                            <span>Capacity:</span>
                          </div>
                          <div>{carer.capacity.current}/{carer.capacity.total} places</div>
                          
                          <div className="flex items-center text-muted-foreground">
                            <Calendar className="h-3.5 w-3.5 mr-1.5" />
                            <span>Placement:</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {carer.placementType.map((type, index) => (
                              <Badge key={index} variant="outline" className="text-xs px-1 py-0">
                                {type}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex flex-col space-y-1 mb-3">
                          {carer.currentPlacements && carer.currentPlacements.length > 0 && (
                            <div className="text-xs">
                              <span className="text-muted-foreground">Current Placements: </span>
                              {carer.currentPlacements.map((placement, index) => (
                                <span key={index} className="mr-1">
                                  {placement.childName} ({placement.childAge})
                                  {index < carer.currentPlacements!.length - 1 ? ', ' : ''}
                                </span>
                              ))}
                            </div>
                          )}
                          {carer.specialties && (
                            <div className="text-xs">
                              <span className="text-muted-foreground">Specialties: </span>
                              {carer.specialties.join(', ')}
                            </div>
                          )}
                        </div>
                        
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
                            <Baby className="h-3.5 w-3.5 mr-1" />
                            Place Child
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
            
            <TabsContent value="active" className="p-0">
              <CardContent className="pt-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {mockCarers
                    .filter(carer => carer.status === 'active')
                    .map(carer => (
                      <div 
                        key={carer.id} 
                        className="border rounded-lg overflow-hidden hover:border-primary transition-colors"
                      >
                        {/* Similar content as "all" tab but filtered for active carers */}
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <Avatar className="h-10 w-10 mr-3">
                                <AvatarFallback className="bg-primary/10 text-primary">
                                  {carer.name.split(' ')[0][0]}{carer.name.split(' ')[carer.name.split(' ').length - 1][0]}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-medium">{carer.name}</h3>
                                <div className="text-xs text-muted-foreground">{carer.id}</div>
                              </div>
                            </div>
                            {getStatusBadge(carer.status)}
                          </div>
                          
                          <div className="flex items-center text-xs mb-3">
                            <div className="flex mr-1">{getRatingStars(carer.rating || 0)}</div>
                            <span className="text-muted-foreground">{carer.experience} {carer.experience === 1 ? 'year' : 'years'} experience</span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mb-3">
                            <div className="flex items-center text-muted-foreground">
                              <Home className="h-3.5 w-3.5 mr-1.5" />
                              <span>Capacity:</span>
                            </div>
                            <div>{carer.capacity.current}/{carer.capacity.total} places</div>
                            
                            <div className="flex items-center text-muted-foreground">
                              <Calendar className="h-3.5 w-3.5 mr-1.5" />
                              <span>Placement:</span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {carer.placementType.map((type, index) => (
                                <Badge key={index} variant="outline" className="text-xs px-1 py-0">
                                  {type}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <Button size="sm" variant="outline" className="w-full h-8">
                            View Profile
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="available" className="p-0">
              <CardContent className="pt-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {mockCarers
                    .filter(carer => carer.status === 'active' && carer.capacity.current < carer.capacity.total)
                    .map(carer => (
                      <div 
                        key={carer.id} 
                        className="border rounded-lg overflow-hidden hover:border-primary transition-colors"
                      >
                        {/* Similar content as "all" tab but filtered for available carers */}
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <Avatar className="h-10 w-10 mr-3">
                                <AvatarFallback className="bg-primary/10 text-primary">
                                  {carer.name.split(' ')[0][0]}{carer.name.split(' ')[carer.name.split(' ').length - 1][0]}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-medium">{carer.name}</h3>
                                <div className="text-xs text-muted-foreground">{carer.id}</div>
                              </div>
                            </div>
                            <Badge className="bg-green-500">
                              {carer.capacity.total - carer.capacity.current} {carer.capacity.total - carer.capacity.current === 1 ? 'Place' : 'Places'} Available
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mb-3">
                            <div className="flex items-center text-muted-foreground">
                              <Calendar className="h-3.5 w-3.5 mr-1.5" />
                              <span>Placement:</span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {carer.placementType.map((type, index) => (
                                <Badge key={index} variant="outline" className="text-xs px-1 py-0">
                                  {type}
                                </Badge>
                              ))}
                            </div>
                            
                            <div className="flex items-start text-muted-foreground">
                              <MapPin className="h-3.5 w-3.5 mr-1.5 mt-0.5 shrink-0" />
                              <span>Location:</span>
                            </div>
                            <div className="text-xs">{carer.address.split(',').slice(-2).join(',')}</div>
                          </div>
                          
                          <Button size="sm" variant="outline" className="w-full h-8">
                            <Baby className="h-3.5 w-3.5 mr-1" />
                            Place Child
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="pending" className="p-0">
              <CardContent className="pt-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {mockCarers
                    .filter(carer => carer.status === 'pending')
                    .map(carer => (
                      <div 
                        key={carer.id} 
                        className="border rounded-lg overflow-hidden hover:border-primary transition-colors"
                      >
                        {/* Similar content as "all" tab but filtered for pending carers */}
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <Avatar className="h-10 w-10 mr-3">
                                <AvatarFallback className="bg-primary/10 text-primary">
                                  {carer.name.split(' ')[0][0]}{carer.name.split(' ')[carer.name.split(' ').length - 1][0]}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-medium">{carer.name}</h3>
                                <div className="text-xs text-muted-foreground">{carer.id}</div>
                              </div>
                            </div>
                            {getStatusBadge(carer.status)}
                          </div>
                          
                          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mb-3">
                            <div className="flex items-start text-muted-foreground">
                              <MapPin className="h-3.5 w-3.5 mr-1.5 mt-0.5 shrink-0" />
                              <span>Address:</span>
                            </div>
                            <div className="text-xs">{carer.address}</div>
                            
                            <div className="flex items-center text-muted-foreground">
                              <Calendar className="h-3.5 w-3.5 mr-1.5" />
                              <span>Application:</span>
                            </div>
                            <div>{carer.approvalDate}</div>
                            
                            <div className="flex items-center text-muted-foreground">
                              <UserCheck className="h-3.5 w-3.5 mr-1.5" />
                              <span>Social Worker:</span>
                            </div>
                            <div>{carer.socialWorker}</div>
                          </div>
                          
                          <div className="flex space-x-2 mt-4">
                            <Button size="sm" variant="default" className="flex-1 h-8">
                              Continue Assessment
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

export default CarersDirectory;
