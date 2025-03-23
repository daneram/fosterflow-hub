
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

// Sample data for charts
const placementData = [
  { month: 'Jan', placements: 5, referrals: 8 },
  { month: 'Feb', placements: 7, referrals: 11 },
  { month: 'Mar', placements: 8, referrals: 13 },
  { month: 'Apr', placements: 6, referrals: 9 },
  { month: 'May', placements: 9, referrals: 12 },
  { month: 'Jun', placements: 10, referrals: 15 },
];

const complianceData = [
  { name: 'Reviews', percentage: 92 },
  { name: 'Visits', percentage: 87 },
  { name: 'Training', percentage: 76 },
  { name: 'Documentation', percentage: 65 },
  { name: 'DBS Checks', percentage: 98 },
];

const carerStatusData = [
  { name: 'Active', value: 62 },
  { name: 'In Assessment', value: 15 },
  { name: 'On Hold', value: 8 },
  { name: 'Inactive', value: 12 },
];

const COLORS = ['#4f46e5', '#6366f1', '#818cf8', '#93c5fd'];

const chartConfig = {
  placements: {
    label: 'Placements',
    color: '#4f46e5',
  },
  referrals: {
    label: 'Referrals',
    color: '#93c5fd',
  },
  compliance: {
    label: 'Compliance',
    color: '#4f46e5',
  },
  percentage: {
    label: 'Percentage',
    color: '#4f46e5',
  }
};

const DashboardCharts: React.FC = () => {
  const [activeTab, setActiveTab] = useState('placements');

  return (
    <div className="w-full">
      <Tabs defaultValue="placements" onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="placements">Placements</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="carers">Carers</TabsTrigger>
        </TabsList>
        
        <TabsContent value="placements" className="w-full h-[300px]">
          <ChartContainer 
            config={chartConfig}
            className="w-full h-full"
          >
            <LineChart data={placementData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line 
                type="monotone" 
                dataKey="placements" 
                name="placements"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="referrals" 
                name="referrals"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ChartContainer>
        </TabsContent>
        
        <TabsContent value="compliance" className="w-full h-[300px]">
          <ChartContainer 
            config={chartConfig}
            className="w-full h-full"
          >
            <BarChart data={complianceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar 
                dataKey="percentage" 
                name="percentage"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </TabsContent>
        
        <TabsContent value="carers" className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={carerStatusData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {carerStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <ChartTooltip />
            </PieChart>
          </ResponsiveContainer>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardCharts;
