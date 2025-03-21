
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, BookOpen, Clock, Award, PlayCircle, CheckCircle, BarChart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: number; // in minutes
  dueDate?: Date;
  completion: number; // 0-100
  required: boolean;
  image?: string;
}

const MOCK_COURSES: Course[] = [
  {
    id: 'CRS-001',
    title: 'Child Safety Protocols',
    description: 'Learn the latest safety protocols and procedures for ensuring child safety in various situations.',
    category: 'Safety',
    duration: 120,
    dueDate: new Date('2023-06-15'),
    completion: 25,
    required: true,
  },
  {
    id: 'CRS-002',
    title: 'Documentation Best Practices',
    description: 'Best practices for maintaining accurate and thorough documentation for case management.',
    category: 'Administrative',
    duration: 90,
    completion: 100,
    required: true,
  },
  {
    id: 'CRS-003',
    title: 'Crisis Intervention Techniques',
    description: 'Advanced techniques for de-escalation and intervention during crisis situations.',
    category: 'Intervention',
    duration: 180,
    dueDate: new Date('2023-07-01'),
    completion: 0,
    required: true,
  },
  {
    id: 'CRS-004',
    title: 'Cultural Competency in Case Management',
    description: 'Building cultural awareness and sensitivity to better serve diverse client populations.',
    category: 'Cultural',
    duration: 150,
    completion: 75,
    required: false,
  },
  {
    id: 'CRS-005',
    title: 'Trauma-Informed Care',
    description: 'Understanding and addressing the impact of trauma on children and families.',
    category: 'Clinical',
    duration: 210,
    completion: 40,
    required: true,
  },
  {
    id: 'CRS-006',
    title: 'Legal Framework for Child Welfare',
    description: 'Overview of relevant laws, regulations, and legal considerations in child welfare practice.',
    category: 'Legal',
    duration: 180,
    completion: 0,
    required: false,
  }
];

const TrainingPlatform: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showRequired, setShowRequired] = useState(false);

  const filteredCourses = MOCK_COURSES.filter(course => {
    const matchesSearch = searchQuery === '' || 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === null || course.category === selectedCategory;
    const matchesRequired = !showRequired || course.required;
    
    return matchesSearch && matchesCategory && matchesRequired;
  });

  const categories = Array.from(new Set(MOCK_COURSES.map(course => course.category)));

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatDueDate = (date?: Date) => {
    if (!date) return 'No deadline';
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const getCompletionBadge = (completion: number) => {
    if (completion === 0) {
      return <Badge variant="outline">Not Started</Badge>;
    }
    if (completion === 100) {
      return <Badge className="bg-green-500">Completed</Badge>;
    }
    return <Badge className="bg-amber-500">In Progress</Badge>;
  };

  // Calculate required courses that are not completed
  const requiredNotCompleted = MOCK_COURSES.filter(
    course => course.required && course.completion < 100
  ).length;

  // Calculate overall completion percentage
  const overallCompletion = Math.round(
    MOCK_COURSES.reduce((sum, course) => sum + course.completion, 0) / 
    MOCK_COURSES.length
  );

  return (
    <Layout>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Training Platform</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Your Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center">
                <div className="relative h-32 w-32">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">{overallCompletion}%</span>
                  </div>
                  <svg className="h-full w-full" viewBox="0 0 100 100">
                    <circle
                      className="text-muted stroke-current"
                      strokeWidth="10"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                    />
                    <circle
                      className="text-primary stroke-current"
                      strokeWidth="10"
                      strokeLinecap="round"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                      strokeDasharray={`${overallCompletion * 2.51} 251`}
                      strokeDashoffset="0"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Required courses completion</span>
                  <span className="text-sm font-medium">{requiredNotCompleted} remaining</span>
                </div>
                
                {requiredNotCompleted > 0 && (
                  <Alert className="mt-2">
                    <AlertDescription className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-amber-500" />
                      You have {requiredNotCompleted} required {requiredNotCompleted === 1 ? 'course' : 'courses'} to complete
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <BarChart className="h-4 w-4 mr-2" />
                View Detailed Progress
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Recommended Courses</CardTitle>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {MOCK_COURSES.filter(course => course.required && course.completion < 100)
                .slice(0, 3)
                .map(course => (
                  <Card key={course.id} className="bg-accent/50">
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium">{course.title}</h3>
                          <div className="text-sm text-muted-foreground mt-1">
                            Due: {formatDueDate(course.dueDate)}
                          </div>
                        </div>
                        <Button variant="secondary" size="sm">
                          <PlayCircle className="h-4 w-4 mr-1" />
                          Continue
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle className="text-lg">All Courses</CardTitle>
                <CardDescription>
                  {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'} found
                </CardDescription>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search courses..."
                    className="pl-8 w-full md:w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button 
                    variant={showRequired ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setShowRequired(!showRequired)}
                  >
                    {showRequired ? 'Required Only' : 'All Courses'}
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="mb-4 border-b pb-2">
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant={selectedCategory === null ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                >
                  All Categories
                </Button>
                {categories.map(category => (
                  <Button 
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCourses.length === 0 ? (
                <div className="col-span-full flex flex-col items-center justify-center h-40 text-muted-foreground">
                  <BookOpen className="h-8 w-8 mb-2" />
                  <p>No courses found</p>
                </div>
              ) : (
                filteredCourses.map((course) => (
                  <Card key={course.id} className="overflow-hidden">
                    <div className="aspect-video bg-muted flex items-center justify-center">
                      <BookOpen className="h-12 w-12 text-muted-foreground/50" />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <h3 className="font-medium">{course.title}</h3>
                        {course.required && (
                          <Badge className="bg-blue-500">Required</Badge>
                        )}
                      </div>
                      
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                        {course.description}
                      </p>
                      
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 mr-1" />
                          {formatDuration(course.duration)}
                        </div>
                        {getCompletionBadge(course.completion)}
                      </div>
                      
                      {course.completion > 0 && course.completion < 100 && (
                        <div className="mt-3">
                          <div className="bg-muted h-2 rounded-full overflow-hidden">
                            <div 
                              className="bg-primary h-full" 
                              style={{ width: `${course.completion}%` }}
                            ></div>
                          </div>
                          <div className="mt-1 text-xs text-right text-muted-foreground">
                            {course.completion}% completed
                          </div>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="border-t bg-muted/30 p-3">
                      <Button className="w-full" variant={course.completion > 0 ? "default" : "outline"}>
                        {course.completion === 0 && <PlayCircle className="h-4 w-4 mr-1" />}
                        {course.completion > 0 && course.completion < 100 && <PlayCircle className="h-4 w-4 mr-1" />}
                        {course.completion === 100 && <CheckCircle className="h-4 w-4 mr-1" />}
                        
                        {course.completion === 0 && 'Start Course'}
                        {course.completion > 0 && course.completion < 100 && 'Continue'}
                        {course.completion === 100 && 'Review Course'}
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default TrainingPlatform;
