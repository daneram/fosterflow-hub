import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  Activity, 
  Clock, 
  FileText, 
  MessageSquare, 
  Phone, 
  UserCheck, 
  Calendar, 
  Share2, 
  Filter 
} from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'document' | 'message' | 'visit' | 'call' | 'status' | 'meeting';
  title: string;
  description: string;
  timestamp: Date;
  user: {
    name: string;
    avatar?: string;
    initials: string;
  };
  relatedTo?: string;
  status?: 'completed' | 'pending' | 'cancelled' | 'in-progress';
}

const mockActivities: ActivityItem[] = [
  {
    id: 'act-001',
    type: 'document',
    title: 'Case notes uploaded',
    description: 'Monthly progress report for Brown family',
    timestamp: new Date(2023, 9, 12, 14, 32),
    user: {
      name: 'Sarah Williams',
      initials: 'SW'
    },
    relatedTo: 'Brown Family (F-2023-042)'
  },
  {
    id: 'act-002',
    type: 'status',
    title: 'Assessment status updated',
    description: 'Stage 2 assessment completed for Taylor family',
    timestamp: new Date(2023, 9, 12, 11, 15),
    user: {
      name: 'James Clark',
      initials: 'JC'
    },
    relatedTo: 'Taylor Family (F-2023-039)',
    status: 'completed'
  },
  {
    id: 'act-003',
    type: 'meeting',
    title: 'Team meeting scheduled',
    description: 'Case review for Chen family placement',
    timestamp: new Date(2023, 9, 12, 10, 5),
    user: {
      name: 'Emily Johnson',
      initials: 'EJ'
    },
    relatedTo: 'Chen Family (F-2023-021)'
  },
  {
    id: 'act-004',
    type: 'call',
    title: 'Phone call made',
    description: 'Follow-up with school regarding Jason Smith',
    timestamp: new Date(2023, 9, 11, 16, 45),
    user: {
      name: 'Daniel Wilson',
      initials: 'DW'
    },
    relatedTo: 'Jason Smith (C-2023-112)'
  },
  {
    id: 'act-005',
    type: 'message',
    title: 'Message sent',
    description: 'Reminder about upcoming training to foster carers',
    timestamp: new Date(2023, 9, 11, 14, 30),
    user: {
      name: 'Lisa Martinez',
      initials: 'LM'
    }
  },
  {
    id: 'act-006',
    type: 'visit',
    title: 'Home visit completed',
    description: 'Quarterly home visit for Johnson family',
    timestamp: new Date(2023, 9, 11, 10, 0),
    user: {
      name: 'Sarah Williams',
      initials: 'SW'
    },
    relatedTo: 'Johnson Family (F-2023-015)',
    status: 'completed'
  },
  {
    id: 'act-007',
    type: 'document',
    title: 'Form submitted',
    description: 'Annual review documentation for Parker family',
    timestamp: new Date(2023, 9, 10, 15, 20),
    user: {
      name: 'Michael Rodriguez',
      initials: 'MR'
    },
    relatedTo: 'Parker Family (F-2022-098)'
  }
];

const getActivityIcon = (type: ActivityItem['type']) => {
  switch (type) {
    case 'document':
      return <FileText className="h-4 w-4 text-blue-500" />;
    case 'message':
      return <MessageSquare className="h-4 w-4 text-green-500" />;
    case 'visit':
      return <UserCheck className="h-4 w-4 text-purple-500" />;
    case 'call':
      return <Phone className="h-4 w-4 text-yellow-500" />;
    case 'status':
      return <Activity className="h-4 w-4 text-red-500" />;
    case 'meeting':
      return <Calendar className="h-4 w-4 text-indigo-500" />;
    default:
      return <Activity className="h-4 w-4" />;
  }
};

const getStatusBadge = (status?: ActivityItem['status']) => {
  if (!status) return null;
  
  switch (status) {
    case 'completed':
      return <Badge className="ml-2 bg-green-500">Completed</Badge>;
    case 'pending':
      return <Badge className="ml-2" variant="outline">Pending</Badge>;
    case 'cancelled':
      return <Badge className="ml-2 bg-red-500">Cancelled</Badge>;
    case 'in-progress':
      return <Badge className="ml-2 bg-blue-500">In Progress</Badge>;
    default:
      return null;
  }
};

const formatTime = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }).format(date);
};

const formatDate = (date: Date) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  
  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  } else {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  }
};

const ActivityLog: React.FC = () => {
  // Group activities by date
  const groupedActivities: Record<string, ActivityItem[]> = {};
  
  mockActivities.forEach(activity => {
    const dateKey = formatDate(activity.timestamp);
    if (!groupedActivities[dateKey]) {
      groupedActivities[dateKey] = [];
    }
    groupedActivities[dateKey].push(activity);
  });

  return (
    <Layout>
      <div className="space-y-4 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Activity Log</h1>
          <p className="text-muted-foreground text-sm">Track all actions and updates across the system</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-2">
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="h-8">
              <Filter className="h-4 w-4 mr-1" />
              Filter
            </Button>
            <Button size="sm" variant="outline" className="h-8">
              <Share2 className="h-4 w-4 mr-1" />
              Export
            </Button>
          </div>
        </div>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Activity className="h-5 w-5 mr-2 text-primary" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          
          <Tabs defaultValue="all" className="w-full">
            <div className="px-6">
              <TabsList className="w-full grid grid-cols-4 h-9">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="communications">Communications</TabsTrigger>
                <TabsTrigger value="visits">Visits</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="p-0">
              <CardContent className="pt-4">
                {Object.entries(groupedActivities).map(([date, activities]) => (
                  <div key={date} className="mb-6 w-full">
                    <div className="flex items-center mb-2 w-full">
                      <div className="text-sm font-medium">{date}</div>
                      <div className="ml-2 h-px flex-1 bg-border"></div>
                    </div>
                    
                    <div className="space-y-4 w-full">
                      {activities.map(activity => (
                        <div key={activity.id} className="flex w-full">
                          <div className="mr-4 flex flex-col items-center">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={activity.user.avatar} />
                              <AvatarFallback>{activity.user.initials}</AvatarFallback>
                            </Avatar>
                            <div className="mt-1 h-full w-px bg-border"></div>
                          </div>
                          
                          <div className="flex-1 space-y-1 min-w-0">
                            <div className="flex items-center">
                              <div className="flex items-center text-sm font-medium">
                                {getActivityIcon(activity.type)}
                                <span className="ml-2">{activity.title}</span>
                                {getStatusBadge(activity.status)}
                              </div>
                              <div className="ml-auto flex items-center text-xs text-muted-foreground">
                                <Clock className="mr-1 h-3 w-3" />
                                {formatTime(activity.timestamp)}
                              </div>
                            </div>
                            
                            <p className="text-sm text-muted-foreground">{activity.description}</p>
                            
                            {activity.relatedTo && (
                              <div className="mt-1 text-xs text-muted-foreground">
                                Related to: <span className="font-medium">{activity.relatedTo}</span>
                              </div>
                            )}
                            
                            <div className="mt-1 text-xs text-muted-foreground">
                              By: {activity.user.name}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </TabsContent>
            
            <TabsContent value="documents" className="p-0">
              <CardContent className="pt-4">
                <p className="text-muted-foreground text-sm">Showing document-related activities.</p>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="communications" className="p-0">
              <CardContent className="pt-4">
                <p className="text-muted-foreground text-sm">Showing communication-related activities.</p>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="visits" className="p-0">
              <CardContent className="pt-4">
                <p className="text-muted-foreground text-sm">Showing visit-related activities.</p>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </Layout>
  );
};

export default ActivityLog;
