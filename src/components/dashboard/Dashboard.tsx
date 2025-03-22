
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarClock, CheckCircle2, FileText, MessageSquare, Users } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, description, icon }) => (
  <Card className="overflow-hidden">
    <CardHeader className="flex flex-row items-center justify-between pb-1.5 space-y-0 pt-4">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
    </CardContent>
  </Card>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground text-sm">Welcome back, here's your overview for today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard
          title="Active Cases"
          value="24"
          description="3 new this week"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
        />
        <StatCard
          title="Upcoming Tasks"
          value="12"
          description="4 due today"
          icon={<CheckCircle2 className="h-4 w-4 text-muted-foreground" />}
        />
        <StatCard
          title="Unread Messages"
          value="8"
          description="2 urgent notifications"
          icon={<MessageSquare className="h-4 w-4 text-muted-foreground" />}
        />
        <StatCard
          title="Pending Reviews"
          value="5"
          description="1 overdue"
          icon={<FileText className="h-4 w-4 text-muted-foreground" />}
        />
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
