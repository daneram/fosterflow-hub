import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Filter, 
  Plus,
  FileText,
  Users,
  CalendarClock,
  MessageSquare,
  CheckCircle2
} from 'lucide-react';
import { MOCK_RECORDS } from '@/components/records/mockData';
import { Record } from '@/components/records/types';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';

const RecordsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [records] = useState<Record[]>(MOCK_RECORDS);

  const types = [
    { id: null, label: 'All' },
    { id: 'case', label: 'Cases' },
    { id: 'assessment', label: 'Assessments' },
    { id: 'report', label: 'Reports' },
    { id: 'document', label: 'Documents' }
  ];

  const filteredRecords = records.filter(record => {
    const matchesSearch = searchQuery === '' || 
      record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.client.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedType === null || record.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Records</h1>
          <p className="text-muted-foreground text-sm">Manage and access all your records in one place.</p>
        </div>
        <div className="flex items-center gap-2 mt-2 md:mt-0">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search records..." 
              className="pl-9 h-9 md:w-[200px] lg:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="h-9 w-9">
            <Filter className="h-4 w-4" />
          </Button>
          <Button className="h-9 bg-[#0A0C10] hover:bg-[#0A0C10]/90">
            <Plus className="h-4 w-4 mr-2" />
            New Record
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-1.5 space-y-0 pt-4">
            <CardTitle className="text-sm font-medium">Total Records</CardTitle>
            <div className="bg-primary/10 p-1.5 rounded-full">
              <FileText className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{records.length}</div>
            <p className="text-xs text-muted-foreground mt-0.5">Active records</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-1.5 space-y-0 pt-4">
            <CardTitle className="text-sm font-medium">Active Cases</CardTitle>
            <div className="bg-primary/10 p-1.5 rounded-full">
              <Users className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {records.filter(r => r.type === 'case' && r.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">Open cases</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-1.5 space-y-0 pt-4">
            <CardTitle className="text-sm font-medium">Pending Assessments</CardTitle>
            <div className="bg-primary/10 p-1.5 rounded-full">
              <CheckCircle2 className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {records.filter(r => r.type === 'assessment' && r.status === 'pending').length}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">To be completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-1.5 space-y-0 pt-4">
            <CardTitle className="text-sm font-medium">Recent Updates</CardTitle>
            <div className="bg-primary/10 p-1.5 rounded-full">
              <CalendarClock className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {records.filter(r => {
                const date = new Date(r.updatedAt);
                const now = new Date();
                return (now.getTime() - date.getTime()) < 7 * 24 * 60 * 60 * 1000;
              }).length}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">Last 7 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Record Types</CardTitle>
            <CardDescription>Filter records by type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              {types.map((type) => (
                <Button
                  key={type.id || 'all'}
                  variant={selectedType === type.id ? 'default' : 'outline'}
                  className={`flex-1 h-9 ${
                    selectedType === type.id ? 'bg-[#0A0C10] hover:bg-[#0A0C10]/90' : ''
                  }`}
                  onClick={() => setSelectedType(type.id)}
                >
                  {type.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Date Range</CardTitle>
            <CardDescription>Filter records by date</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 justify-start h-9">
                <span className="text-muted-foreground">From</span>
              </Button>
              <Button variant="outline" className="flex-1 justify-start h-9">
                <span className="text-muted-foreground">To</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Records List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">All Records</CardTitle>
          <CardDescription>View and manage your records</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {filteredRecords.map((record) => (
            <div
              key={record.id}
              className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0 cursor-pointer hover:bg-muted/50 transition-colors p-2 rounded-md"
            >
              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <FileText className="h-3.5 w-3.5 text-primary" />
              </div>
              <div className="flex-1 space-y-0.5">
                <div className="flex justify-between items-start">
                  <p className="text-sm font-medium">{record.title}</p>
                  <span className="text-xs text-muted-foreground">
                    {format(record.updatedAt, 'dd/MM/yy')}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span>{record.client}</span>
                  <span>{record.owner || 'Unassigned'}</span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default RecordsPage; 