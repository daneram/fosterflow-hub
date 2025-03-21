
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search, BookOpen, PlayCircle, Clock, Award, CheckCircle2, FileText, GraduationCap } from 'lucide-react';

interface Training {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  type: 'video' | 'document' | 'interactive';
  status: 'completed' | 'in-progress' | 'not-started' | 'required';
  dueDate?: Date;
  completedDate?: Date;
}

const MOCK_TRAININGS: Training[] = [
  {
    id: 'TRN-001',
    title: 'Child Safety Assessment Protocol',
    description: 'Learn how to conduct safe and effective child safety assessments.',
    duration: '1.5 hours',
    category: 'Child Safety',
    type: 'video',
    status: 'completed',
    completedDate: new Date('2023-06-15')
  },
  {
    id: 'TRN-002',
    title: 'Case Documentation Best Practices',
    description: 'Standards and best practices for documenting case information.',
    duration: '2 hours',
    category: 'Documentation',
    type: 'document',
    status: 'in-progress'
  },
  {
    id: 'TRN-003',
    title: 'Family Reunification Strategies',
    description: 'Advanced methods for successful family reunification.',
    duration: '3 hours',
    category: 'Family Services',
    type: 'interactive',
    status: 'required',
    dueDate: new Date('2023-10-30')
  },
  {
    id: 'TRN-004',
    title: 'Trauma-Informed Care',
    description: 'Understanding and implementing trauma-informed approaches.',
    duration: '4 hours',
    category: 'Clinical Skills',
    type: 'video',
    status: 'not-started'
  },
  {
    id: 'TRN-005',
    title: 'Annual Ethics Training',
    description: 'Required annual ethics training for all social workers.',
    duration: '1 hour',
    category: 'Ethics',
    type: 'interactive',
    status: 'required',
    dueDate: new Date('2023-09-15')
  },
  {
    id: 'TRN-006',
    title: 'Crisis Intervention',
    description: 'Techniques for effective crisis intervention and de-escalation.',
    duration: '2.5 hours',
    category: 'Crisis Management',
    type: 'video',
    status: 'completed',
    completedDate: new Date('2023-05-10')
  }
];

const TrainingPlatform: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filteredTrainings = MOCK_TRAININGS.filter(training => {
    const matchesSearch = 
      training.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      training.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      training.category.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'required') return matchesSearch && training.status === 'required';
    if (activeTab === 'in-progress') return matchesSearch && training.status === 'in-progress';
    if (activeTab === 'completed') return matchesSearch && training.status === 'completed';
    
    return matchesSearch;
  });

  const formatDate = (date?: Date) => {
    if (!date) return 'N/A';
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'completed':
        return <Badge className="bg-green-500">Completed</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-500">In Progress</Badge>;
      case 'not-started':
        return <Badge variant="outline">Not Started</Badge>;
      case 'required':
        return <Badge className="bg-red-500">Required</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'video':
        return <PlayCircle className="h-4 w-4 text-blue-500" />;
      case 'document':
        return <FileText className="h-4 w-4 text-amber-500" />;
      case 'interactive':
        return <GraduationCap className="h-4 w-4 text-green-500" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <Layout>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Training Platform</h1>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <span className="text-xl font-medium">Learning Resources</span>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search trainings..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Training Modules</CardTitle>
            <CardDescription>Access required and optional training materials</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Trainings</TabsTrigger>
                <TabsTrigger value="required">Required</TabsTrigger>
                <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTrainings.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                          No training courses found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredTrainings.map((training) => (
                        <TableRow key={training.id}>
                          <TableCell className="font-medium">
                            <div className="flex flex-col">
                              <div className="flex items-center">
                                {getTypeIcon(training.type)}
                                <span className="ml-2">{training.title}</span>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                {training.description}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>{training.category}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                              {training.duration}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              {getStatusBadge(training.status)}
                              {training.status === 'required' && (
                                <div className="text-xs text-muted-foreground mt-1">
                                  Due: {formatDate(training.dueDate)}
                                </div>
                              )}
                              {training.status === 'completed' && (
                                <div className="text-xs text-muted-foreground mt-1">
                                  Completed: {formatDate(training.completedDate)}
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm">
                              {training.status === 'completed' ? (
                                <>
                                  <CheckCircle2 className="h-4 w-4 mr-1 text-green-500" />
                                  Certificate
                                </>
                              ) : (
                                <>
                                  <PlayCircle className="h-4 w-4 mr-1" />
                                  {training.status === 'in-progress' ? 'Continue' : 'Start'}
                                </>
                              )}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-4">
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-amber-500" />
              <span className="text-sm">You've completed 2 of 6 trainings</span>
            </div>
            <Button>View My Certificates</Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default TrainingPlatform;
