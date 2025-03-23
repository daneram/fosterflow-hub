
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CalendarClock, 
  CheckCircle2, 
  FileText, 
  MessageSquare, 
  Users,
  BarChart2,
  Heart,
  Home,
  DollarSign,
  Award,
  BookOpen,
  Bell,
  Filter,
  Search,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import DashboardCharts from './DashboardCharts';
import DashboardMetrics from './DashboardMetrics';
import { Badge } from '@/components/ui/badge';

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  variant?: 'default' | 'warning' | 'danger' | 'success';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, description, icon, variant = 'default' }) => {
  const variantStyles = {
    default: '',
    warning: 'border-l-4 border-l-amber-500',
    danger: 'border-l-4 border-l-destructive',
    success: 'border-l-4 border-l-green-500'
  };

  return (
    <Card className={`overflow-hidden ${variantStyles[variant]}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-1.5 space-y-0 pt-4">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="bg-primary/10 p-1.5 rounded-full">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      </CardContent>
    </Card>
  );
};

const Dashboard: React.FC = () => {
  const [filterOption, setFilterOption] = useState<string>('all');

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground text-sm">Welcome back, here's your overview for today.</p>
        </div>
        <div className="flex items-center gap-2 mt-2 md:mt-0">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search..." 
              className="pl-9 h-9 md:w-[200px] lg:w-[300px]"
            />
          </div>
          <Select value={filterOption} onValueChange={setFilterOption}>
            <SelectTrigger className="w-auto h-9 focus:ring-0">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Teams</SelectItem>
              <SelectItem value="north">North Region</SelectItem>
              <SelectItem value="south">South Region</SelectItem>
              <SelectItem value="east">East Region</SelectItem>
              <SelectItem value="west">West Region</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" className="h-9 w-9">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard
          title="Active Cases"
          value="24"
          description="3 new this week"
          icon={<Users className="h-4 w-4 text-primary" />}
        />
        <StatCard
          title="Upcoming Tasks"
          value="12"
          description="4 due today"
          icon={<CheckCircle2 className="h-4 w-4 text-primary" />}
          variant="warning"
        />
        <StatCard
          title="Unread Messages"
          value="8"
          description="2 urgent notifications"
          icon={<MessageSquare className="h-4 w-4 text-primary" />}
        />
        <StatCard
          title="Pending Reviews"
          value="5"
          description="1 overdue"
          icon={<FileText className="h-4 w-4 text-primary" />}
          variant="danger"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center justify-between">
              <span>Compliance Tracker</span>
              <Badge variant="outline" className="ml-2 font-normal">82% Complete</Badge>
            </CardTitle>
            <CardDescription>Status of required compliance items</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Carer Annual Reviews</span>
                <span className="font-medium">92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Safeguarding Checks</span>
                <span className="font-medium">88%</span>
              </div>
              <Progress value={88} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Health Assessments</span>
                <span className="font-medium">76%</span>
              </div>
              <Progress value={76} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Required Documentation</span>
                <span className="font-medium">65%</span>
              </div>
              <Progress value={65} className="h-2" />
            </div>
            <Button variant="outline" size="sm" className="w-full mt-2">View All Compliance Items</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center justify-between">
              <span>Child Welfare Indicators</span>
              <Badge className="ml-2 font-normal bg-amber-500">3 Alerts</Badge>
            </CardTitle>
            <CardDescription>Current status and upcoming needs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start p-2 rounded-md bg-amber-50 border border-amber-200">
                <Heart className="h-4 w-4 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Placement Stability Alert</p>
                  <p className="text-xs text-muted-foreground">2 children require placement support review</p>
                </div>
              </div>
              <div className="flex items-start p-2 rounded-md bg-red-50 border border-red-200">
                <Heart className="h-4 w-4 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Safeguarding Alert</p>
                  <p className="text-xs text-muted-foreground">Urgent review needed for Thompson case</p>
                </div>
              </div>
              <div className="flex items-start p-2 rounded-md bg-green-50 border border-green-200">
                <Heart className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Positive Outcome</p>
                  <p className="text-xs text-muted-foreground">Educational improvement for 5 children this quarter</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-2">View All Child Indicators</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Carer Management</CardTitle>
            <CardDescription>Capacity and compliance status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Placement Capacity</span>
                <span className="font-medium">78% Utilized</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Training Compliance</span>
                <span className="font-medium">92% Complete</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <div className="bg-muted p-2 rounded-md text-center">
                <p className="text-xs text-muted-foreground">Available Places</p>
                <p className="text-lg font-bold">12</p>
              </div>
              <div className="bg-muted p-2 rounded-md text-center">
                <p className="text-xs text-muted-foreground">New Carers</p>
                <p className="text-lg font-bold">5</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full mt-2">View Carer Directory</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Financial Overview</CardTitle>
            <CardDescription>Current financial status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-muted p-2 rounded-md">
                <p className="text-xs text-muted-foreground">Monthly Income</p>
                <p className="text-lg font-bold">£187,450</p>
              </div>
              <div className="bg-muted p-2 rounded-md">
                <p className="text-xs text-muted-foreground">Payments Due</p>
                <p className="text-lg font-bold">£63,280</p>
              </div>
            </div>
            <div className="space-y-2 mt-2">
              <div className="flex justify-between text-sm">
                <span>Budget Utilization</span>
                <span className="font-medium">68%</span>
              </div>
              <Progress value={68} className="h-2" />
            </div>
            <Button variant="outline" size="sm" className="w-full mt-2">View Financial Reports</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quality Assurance</CardTitle>
            <CardDescription>Performance metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Overall Quality Rating</span>
                <span className="font-medium">Good</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <div className="bg-muted p-2 rounded-md text-center">
                <p className="text-xs text-muted-foreground">Satisfaction</p>
                <p className="text-lg font-bold">4.7/5</p>
              </div>
              <div className="bg-muted p-2 rounded-md text-center">
                <p className="text-xs text-muted-foreground">Feedback</p>
                <p className="text-lg font-bold">92%+</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full mt-2">View QA Reports</Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Key Performance Indicators</CardTitle>
            <CardDescription>Visualizing important metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <DashboardCharts />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Personalized Action Center</CardTitle>
            <CardDescription>Items requiring your attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Bell className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium">Review Johnson family placement</p>
                    <p className="text-xs text-muted-foreground">Due in 2 days</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" className="w-full mt-2">View All Actions</Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Resource Center</CardTitle>
            <CardDescription>Latest resources and materials</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 pb-3 border-b">
                <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <BookOpen className="h-3.5 w-3.5 text-primary" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Updated Safeguarding Policy</p>
                  <p className="text-xs text-muted-foreground">Updated 2 days ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 pb-3 border-b">
                <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <BookOpen className="h-3.5 w-3.5 text-primary" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Foster Carer Training Manual</p>
                  <p className="text-xs text-muted-foreground">Updated 1 week ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <BookOpen className="h-3.5 w-3.5 text-primary" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Trauma-Informed Care Guide</p>
                  <p className="text-xs text-muted-foreground">Updated 3 weeks ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Strategic Metrics</CardTitle>
            <CardDescription>Long-term performance indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <DashboardMetrics />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="recent" className="space-y-3">
        <TabsList className="w-full max-w-md">
          <TabsTrigger value="recent">Recent Activity</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recent" className="space-y-0 mt-3">
          <Card>
            <CardHeader className="pb-2 pt-4">
              <CardTitle className="text-base">Recent Activity</CardTitle>
              <CardDescription>Your latest actions and updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <CalendarClock className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium">Case review completed for Smith family</p>
                    <p className="text-xs text-muted-foreground">Yesterday at 2:30 PM</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-0 mt-3">
          <Card>
            <CardHeader className="pb-2 pt-4">
              <CardTitle className="text-base">Upcoming Events</CardTitle>
              <CardDescription>Schedule for the next 7 days</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <CalendarClock className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium">Home visit with Johnson family</p>
                    <p className="text-xs text-muted-foreground">Tomorrow at 10:00 AM</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-0 mt-3">
          <Card>
            <CardHeader className="pb-2 pt-4">
              <CardTitle className="text-base">Notifications</CardTitle>
              <CardDescription>Your latest alerts and messages</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <MessageSquare className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium">New message from Dr. Williams</p>
                    <p className="text-xs text-muted-foreground">30 minutes ago</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
