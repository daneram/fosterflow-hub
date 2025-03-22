
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart2, 
  TrendingUp, 
  Users, 
  UserCheck, 
  Calendar, 
  Clock, 
  Download,
  Filter,
  RefreshCw
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
 } from 'recharts';

const placementsData = [
  { name: 'Jan', placements: 4, referrals: 8 },
  { name: 'Feb', placements: 6, referrals: 10 },
  { name: 'Mar', placements: 5, referrals: 11 },
  { name: 'Apr', placements: 7, referrals: 9 },
  { name: 'May', placements: 8, referrals: 12 },
  { name: 'Jun', placements: 10, referrals: 15 },
  { name: 'Jul', placements: 9, referrals: 14 },
  { name: 'Aug', placements: 11, referrals: 16 },
  { name: 'Sep', placements: 10, referrals: 13 },
  { name: 'Oct', placements: 12, referrals: 18 },
  { name: 'Nov', placements: 11, referrals: 16 },
  { name: 'Dec', placements: 13, referrals: 20 }
];

const carerStatusData = [
  { name: 'Active', value: 48 },
  { name: 'In Assessment', value: 15 },
  { name: 'On Hold', value: 7 },
  { name: 'Inactive', value: 10 }
];

const COLORS = ['#4f46e5', '#6366f1', '#818cf8', '#93c5fd'];

const placementTypeData = [
  { name: 'Long-term', count: 32 },
  { name: 'Short-term', count: 18 },
  { name: 'Emergency', count: 12 },
  { name: 'Respite', count: 15 },
  { name: 'Specialized', count: 8 }
];

const InsightsDashboard: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Insights Dashboard</h1>
          <p className="text-muted-foreground text-sm">Data analytics and performance indicators for agency operations</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" className="h-8">
              <Filter className="h-4 w-4 mr-1" />
              Filter
            </Button>
            <Button size="sm" variant="outline" className="h-8">
              <RefreshCw className="h-4 w-4 mr-1" />
              Refresh
            </Button>
            <Button size="sm" variant="outline" className="h-8">
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
          </div>
          <div className="text-sm text-muted-foreground flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            Last updated: Today at 9:42 AM
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Placements</CardTitle>
              <div className="bg-primary/10 p-1.5 rounded-full">
                <UserCheck className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">75</div>
              <p className="text-xs text-muted-foreground mt-1">
                <TrendingUp className="inline h-3 w-3 text-green-500 mr-1" />
                <span className="text-green-500 font-medium">+12%</span> from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Carers</CardTitle>
              <div className="bg-primary/10 p-1.5 rounded-full">
                <Users className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">48</div>
              <p className="text-xs text-muted-foreground mt-1">
                <TrendingUp className="inline h-3 w-3 text-green-500 mr-1" />
                <span className="text-green-500 font-medium">+5%</span> from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Referrals (MTD)</CardTitle>
              <div className="bg-primary/10 p-1.5 rounded-full">
                <BarChart2 className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">18</div>
              <p className="text-xs text-muted-foreground mt-1">
                <TrendingUp className="inline h-3 w-3 text-green-500 mr-1" />
                <span className="text-green-500 font-medium">+23%</span> from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Reviews</CardTitle>
              <div className="bg-primary/10 p-1.5 rounded-full">
                <Calendar className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">14</div>
              <p className="text-xs text-muted-foreground mt-1">
                Next in <span className="font-medium">3 days</span>
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Placements & Referrals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={placementsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="placements" stroke="#4f46e5" activeDot={{ r: 8 }} strokeWidth={2} />
                    <Line type="monotone" dataKey="referrals" stroke="#93c5fd" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Carer Status Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={carerStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={120}
                      fill="#8884d8"
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {carerStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Placement Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={placementTypeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#4f46e5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Key Performance Indicators</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="placement">
              <TabsList className="mb-4">
                <TabsTrigger value="placement">Placement Stability</TabsTrigger>
                <TabsTrigger value="recruitment">Recruitment</TabsTrigger>
                <TabsTrigger value="compliance">Compliance</TabsTrigger>
              </TabsList>
              
              <TabsContent value="placement">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-muted rounded-lg p-4">
                      <div className="text-sm font-medium mb-2">Placement Stability Rate</div>
                      <div className="text-3xl font-bold">87%</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        <Badge className="bg-green-500">Above Target</Badge>
                      </div>
                    </div>
                    <div className="bg-muted rounded-lg p-4">
                      <div className="text-sm font-medium mb-2">Avg. Placement Length</div>
                      <div className="text-3xl font-bold">2.4 yrs</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        <Badge className="bg-green-500">Above Target</Badge>
                      </div>
                    </div>
                    <div className="bg-muted rounded-lg p-4">
                      <div className="text-sm font-medium mb-2">Placement Breakdown Rate</div>
                      <div className="text-3xl font-bold">6.2%</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        <Badge variant="outline">At Target</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="recruitment">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-muted rounded-lg p-4">
                      <div className="text-sm font-medium mb-2">Application to Approval</div>
                      <div className="text-3xl font-bold">8.2 mo</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        <Badge variant="outline">At Target</Badge>
                      </div>
                    </div>
                    <div className="bg-muted rounded-lg p-4">
                      <div className="text-sm font-medium mb-2">Conversion Rate</div>
                      <div className="text-3xl font-bold">37%</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        <Badge className="bg-green-500">Above Target</Badge>
                      </div>
                    </div>
                    <div className="bg-muted rounded-lg p-4">
                      <div className="text-sm font-medium mb-2">New Carers (YTD)</div>
                      <div className="text-3xl font-bold">22</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        <Badge className="bg-green-500">Above Target</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="compliance">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-muted rounded-lg p-4">
                      <div className="text-sm font-medium mb-2">Review Compliance</div>
                      <div className="text-3xl font-bold">94%</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        <Badge className="bg-green-500">Above Target</Badge>
                      </div>
                    </div>
                    <div className="bg-muted rounded-lg p-4">
                      <div className="text-sm font-medium mb-2">Visit Compliance</div>
                      <div className="text-3xl font-bold">89%</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        <Badge variant="outline">At Target</Badge>
                      </div>
                    </div>
                    <div className="bg-muted rounded-lg p-4">
                      <div className="text-sm font-medium mb-2">Training Completion</div>
                      <div className="text-3xl font-bold">91%</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        <Badge className="bg-green-500">Above Target</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default InsightsDashboard;
