import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Baby, 
  Search, 
  Plus, 
  Filter, 
  Calendar,
  MapPin,
  Heart,
  BookOpen,
  User,
  Clock,
  FileText,
  CalendarClock,
  Plus as PlusIcon
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Child {
  id: string;
  name: string;
  age: number;
  gender: string;
  status: 'placed' | 'pending' | 'referral' | 'assessment';
  placementType?: string;
  carerFamily?: string;
  location?: string;
  socialWorker: string;
  dateOfBirth: string;
  placementDate?: string;
  reviewDate?: string;
  notes?: string;
}

const mockChildren: Child[] = [
  {
    id: 'C-2023-001',
    name: 'Jason Smith',
    age: 8,
    gender: 'Male',
    status: 'placed',
    placementType: 'Long-term',
    carerFamily: 'Johnson Family',
    location: 'Birmingham',
    socialWorker: 'Sarah Williams',
    dateOfBirth: '2015-05-20',
    placementDate: '2022-06-15',
    reviewDate: '2023-12-10',
    notes: 'Thriving in current placement. Engaging well at school.'
  },
  {
    id: 'C-2023-002',
    name: 'Emma Taylor',
    age: 5,
    gender: 'Female',
    status: 'placed',
    placementType: 'Short-term',
    carerFamily: 'Martinez Family',
    location: 'Manchester',
    socialWorker: 'Daniel Wilson',
    dateOfBirth: '2018-01-10',
    placementDate: '2023-02-08',
    reviewDate: '2023-11-20',
    notes: 'Initially struggling but now settling well. Requires ongoing therapeutic support.'
  },
  {
    id: 'C-2023-003',
    name: 'Ryan Chen',
    age: 12,
    gender: 'Male',
    status: 'pending',
    location: 'London',
    socialWorker: 'Lisa Martinez',
    dateOfBirth: '2011-08-15',
    notes: 'Waiting for suitable placement match. Special educational needs.'
  },
  {
    id: 'C-2023-004',
    name: 'Olivia Garcia',
    age: 3,
    gender: 'Female',
    status: 'assessment',
    location: 'Liverpool',
    socialWorker: 'James Clark',
    dateOfBirth: '2020-02-28',
    notes: 'Currently undergoing comprehensive assessment. Potential developmental delays identified.'
  },
  {
    id: 'C-2023-005',
    name: 'Tyler Johnson',
    age: 15,
    gender: 'Male',
    status: 'referral',
    location: 'Leeds',
    socialWorker: 'Emily Johnson',
    dateOfBirth: '2008-11-05',
    notes: 'Urgent placement needed. Previous placement breakdown due to challenging behavior.'
  },
  {
    id: 'C-2023-006',
    name: 'Sophia Lee',
    age: 6,
    gender: 'Female',
    status: 'placed',
    placementType: 'Long-term',
    carerFamily: 'Smith Family',
    location: 'Bristol',
    socialWorker: 'Sarah Williams',
    dateOfBirth: '2017-03-18',
    placementDate: '2021-09-30',
    reviewDate: '2023-12-05',
    notes: 'Well-settled in placement. Making excellent progress at school.'
  }
];

const getStatusBadge = (status: Child['status']) => {
  switch(status) {
    case 'placed':
      return <Badge className="bg-green-500">Placed</Badge>;
    case 'pending':
      return <Badge className="bg-blue-500">Pending Placement</Badge>;
    case 'referral':
      return <Badge className="bg-red-500">Referral</Badge>;
    case 'assessment':
      return <Badge className="bg-amber-500">In Assessment</Badge>;
    default:
      return null;
  }
};

const ChildrenProfiles: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-4 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Children Profiles</h1>
          <p className="text-muted-foreground text-sm">Profiles, placements, and care plans for children in fostering arrangements</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center w-full max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search children profiles..." className="pl-8 pr-4 py-2 h-9" />
            </div>
            <Button className="ml-2" size="sm">
              <Plus className="h-4 w-4 mr-1" />
              New Profile
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
              <Baby className="h-5 w-5 mr-2 text-primary" />
              Children Profiles
            </CardTitle>
          </CardHeader>
          
          <Tabs defaultValue="all">
            <div className="px-6">
              <TabsList className="grid w-full max-w-md grid-cols-4 h-9">
                <TabsTrigger value="all">All Children</TabsTrigger>
                <TabsTrigger value="placed">Placed</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="referrals">Referrals</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="p-0">
              <CardContent className="pt-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {mockChildren.map(child => (
                    <div 
                      key={child.id} 
                      className="border rounded-lg overflow-hidden hover:border-primary transition-colors"
                    >
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarFallback className="bg-primary/10 text-primary">
                                {child.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium">{child.name}</h3>
                              <div className="text-xs text-muted-foreground">{child.id}</div>
                            </div>
                          </div>
                          {getStatusBadge(child.status)}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mb-3">
                          <div className="flex items-center text-muted-foreground">
                            <Calendar className="h-3.5 w-3.5 mr-1.5" />
                            <span>Age:</span>
                          </div>
                          <div>{child.age} years</div>
                          
                          <div className="flex items-center text-muted-foreground">
                            <User className="h-3.5 w-3.5 mr-1.5" />
                            <span>Gender:</span>
                          </div>
                          <div>{child.gender}</div>
                          
                          <div className="flex items-center text-muted-foreground">
                            <MapPin className="h-3.5 w-3.5 mr-1.5" />
                            <span>Location:</span>
                          </div>
                          <div>{child.location}</div>
                          
                          {child.status === 'placed' && (
                            <>
                              <div className="flex items-center text-muted-foreground">
                                <Heart className="h-3.5 w-3.5 mr-1.5" />
                                <span>Carer:</span>
                              </div>
                              <div>{child.carerFamily}</div>
                              
                              <div className="flex items-center text-muted-foreground">
                                <Clock className="h-3.5 w-3.5 mr-1.5" />
                                <span>Placement:</span>
                              </div>
                              <div>{child.placementType}</div>
                            </>
                          )}
                        </div>
                        
                        <div className="flex justify-between items-center mt-3 pt-3 border-t border-border">
                          <Button size="sm" variant="ghost" className="h-8 px-2 text-xs text-muted-foreground">
                            <FileText className="h-3.5 w-3.5 mr-1" />
                            Care Plan
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 px-2 text-xs text-muted-foreground">
                            <CalendarClock className="h-3.5 w-3.5 mr-1" />
                            Timeline
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 px-2 text-xs text-muted-foreground">
                            <BookOpen className="h-3.5 w-3.5 mr-1" />
                            Notes
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
            
            <TabsContent value="placed" className="p-0">
              <CardContent className="pt-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {mockChildren
                    .filter(child => child.status === 'placed')
                    .map(child => (
                      <div 
                        key={child.id} 
                        className="border rounded-lg overflow-hidden hover:border-primary transition-colors"
                      >
                        {/* Similar content as "all" tab but filtered for placed children */}
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <Avatar className="h-10 w-10 mr-3">
                                <AvatarFallback className="bg-primary/10 text-primary">
                                  {child.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-medium">{child.name}</h3>
                                <div className="text-xs text-muted-foreground">{child.id}</div>
                              </div>
                            </div>
                            {getStatusBadge(child.status)}
                          </div>
                          
                          {/* Placement-specific information */}
                          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mb-3">
                            <div className="flex items-center text-muted-foreground">
                              <Calendar className="h-3.5 w-3.5 mr-1.5" />
                              <span>Age:</span>
                            </div>
                            <div>{child.age} years</div>
                            
                            <div className="flex items-center text-muted-foreground">
                              <Heart className="h-3.5 w-3.5 mr-1.5" />
                              <span>Carer:</span>
                            </div>
                            <div>{child.carerFamily}</div>
                            
                            <div className="flex items-center text-muted-foreground">
                              <Clock className="h-3.5 w-3.5 mr-1.5" />
                              <span>Placement:</span>
                            </div>
                            <div>{child.placementType}</div>
                            
                            <div className="flex items-center text-muted-foreground">
                              <MapPin className="h-3.5 w-3.5 mr-1.5" />
                              <span>Location:</span>
                            </div>
                            <div>{child.location}</div>
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
            
            <TabsContent value="pending" className="p-0">
              <CardContent className="pt-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {mockChildren
                    .filter(child => child.status === 'pending' || child.status === 'assessment')
                    .map(child => (
                      <div 
                        key={child.id} 
                        className="border rounded-lg overflow-hidden hover:border-primary transition-colors"
                      >
                        {/* Similar content as "all" tab but filtered for pending children */}
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <Avatar className="h-10 w-10 mr-3">
                                <AvatarFallback className="bg-primary/10 text-primary">
                                  {child.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-medium">{child.name}</h3>
                                <div className="text-xs text-muted-foreground">{child.id}</div>
                              </div>
                            </div>
                            {getStatusBadge(child.status)}
                          </div>
                          
                          <div className="text-sm mb-3">
                            <p className="text-muted-foreground mb-2">Notes:</p>
                            <p>{child.notes}</p>
                          </div>
                          
                          <Button size="sm" variant="outline" className="w-full h-8">
                            <PlusIcon className="h-3.5 w-3.5 mr-1" />
                            Find Placement
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="referrals" className="p-0">
              <CardContent className="pt-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {mockChildren
                    .filter(child => child.status === 'referral')
                    .map(child => (
                      <div 
                        key={child.id} 
                        className="border rounded-lg overflow-hidden hover:border-primary transition-colors"
                      >
                        {/* Similar content as "all" tab but filtered for referral children */}
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <Avatar className="h-10 w-10 mr-3">
                                <AvatarFallback className="bg-primary/10 text-primary">
                                  {child.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-medium">{child.name}</h3>
                                <div className="text-xs text-muted-foreground">{child.id}</div>
                              </div>
                            </div>
                            {getStatusBadge(child.status)}
                          </div>
                          
                          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mb-3">
                            <div className="flex items-center text-muted-foreground">
                              <Calendar className="h-3.5 w-3.5 mr-1.5" />
                              <span>Age:</span>
                            </div>
                            <div>{child.age} years</div>
                            
                            <div className="flex items-center text-muted-foreground">
                              <User className="h-3.5 w-3.5 mr-1.5" />
                              <span>Gender:</span>
                            </div>
                            <div>{child.gender}</div>
                            
                            <div className="flex items-center text-muted-foreground">
                              <MapPin className="h-3.5 w-3.5 mr-1.5" />
                              <span>Location:</span>
                            </div>
                            <div>{child.location}</div>
                          </div>
                          
                          <div className="text-sm mb-3">
                            <p className="text-muted-foreground mb-1">Notes:</p>
                            <p>{child.notes}</p>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button size="sm" variant="default" className="flex-1 h-8">
                              Accept
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1 h-8">
                              Decline
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

export default ChildrenProfiles;
