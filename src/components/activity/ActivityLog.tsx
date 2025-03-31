import React, { useState, useMemo, useEffect } from 'react';
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
  Filter,
  Search,
  ChevronDown,
  X
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { AdvancedFilters } from './AdvancedFilters';

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

const formatTimeWithDate = (date: Date) => {
  const formattedDate = format(date, "dd MMM yy");
  const formattedTime = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }).format(date);
  return { date: formattedDate, time: formattedTime };
};

const formatDateForPicker = (date: Date, isMobile: boolean) => {
  if (isMobile) {
    return format(date, "dd-MM-yy");
  }
  return format(date, "d MMMM yyyy");
};

const ActivityLog: React.FC = () => {
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'children' | 'carers'>('all');
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
  const [toDate, setToDate] = useState<Date | undefined>(undefined);
  const [isManagementFiltersOpen, setIsManagementFiltersOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [selectedActivityType, setSelectedActivityType] = useState<string | null>(null);
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [fromDateOpen, setFromDateOpen] = useState(false);
  const [toDateOpen, setToDateOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Clear all management filters
  const clearManagementFilters = () => {
    setSelectedUser(null);
    setSelectedActivityType(null);
  };

  // Handle management filters toggle
  const handleManagementFiltersToggle = () => {
    if (isManagementFiltersOpen) {
      clearManagementFilters();
    }
    setIsManagementFiltersOpen(!isManagementFiltersOpen);
  };

  // Filter activities based on all criteria
  const filteredActivities = useMemo(() => {
    return mockActivities.filter(activity => {
      // Search filter
      const matchesSearch = searchQuery === '' || 
        activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (activity.relatedTo?.toLowerCase() || '').includes(searchQuery.toLowerCase());

      // Type filter (children/carers)
      const matchesType = selectedType === 'all' || 
        (selectedType === 'children' && activity.relatedTo?.includes('(C-')) ||
        (selectedType === 'carers' && activity.relatedTo?.includes('(F-'));

      // Date range filter
      const activityDate = activity.timestamp;
      const isAfterFromDate = !fromDate || activityDate >= fromDate;
      const isBeforeToDate = !toDate || activityDate <= toDate;

      // Advanced filters
      const matchesUser = !selectedUser || activity.user.name === selectedUser;
      const matchesActivityType = !selectedActivityType || activity.type === selectedActivityType;

      return matchesSearch && matchesType && isAfterFromDate && isBeforeToDate && 
             matchesUser && matchesActivityType;
    });
  }, [searchQuery, selectedType, fromDate, toDate, selectedUser, selectedActivityType]);

  // Group filtered activities by date
  const groupedActivities: Record<string, ActivityItem[]> = {};
  filteredActivities.forEach(activity => {
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
          <h1 className="text-xl font-bold tracking-tight">Activity Log</h1>
        </div>

        <div className="space-y-2">
          {/* Search input */}
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search activities..."
              className="pl-8 h-9 pr-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSearchQuery('')}
                className="absolute right-0 top-0 h-9 px-2 hover:bg-transparent"
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>

          {/* Filters section with border */}
          <div className="border rounded-lg pt-1 pb-2 px-2 sm:pt-2 sm:pb-3 sm:px-3 space-y-3">
            {/* Filter tabs and advanced filters - desktop */}
            <div className="hidden sm:flex sm:items-center sm:justify-between sm:pt-2">
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start w-full sm:w-auto py-1 sm:py-0">
                <Button
                  variant={selectedType === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedType('all')}
                >
                  All
                </Button>
                <Button 
                  variant={selectedType === 'children' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedType('children')}
                >
                  Children
                </Button>
                <Button 
                  variant={selectedType === 'carers' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedType('carers')}
                >
                  Carers
                </Button>
              </div>

              {/* Advanced filters button - desktop only */}
              <Button 
                variant={isManagementFiltersOpen ? 'default' : 'outline'}
                size="sm" 
                className="h-8 justify-between py-1"
                onClick={handleManagementFiltersToggle}
              >
                <div className="flex items-center">
                  <Filter className="h-3.5 w-3.5 mr-1" />
                  Advanced Filters
                </div>
                {isManagementFiltersOpen && (
                  <X className="h-3.5 w-3.5 ml-1.5 mt-[1px]" />
                )}
                {!isManagementFiltersOpen && (
                  <ChevronDown className="h-3.5 w-3.5 ml-1.5" />
                )}
              </Button>
            </div>

            {/* Filter tabs - mobile only */}
            <div className="flex sm:hidden flex-wrap gap-2 justify-center w-full py-1">
              <Button
                variant={selectedType === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedType('all')}
              >
                All
              </Button>
              <Button 
                variant={selectedType === 'children' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedType('children')}
              >
                Children
              </Button>
              <Button 
                variant={selectedType === 'carers' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedType('carers')}
              >
                Carers
              </Button>
            </div>

            {/* Date range pickers */}
            <div className="flex gap-2">
              <div className="w-full flex-1">
                <Popover open={fromDateOpen} onOpenChange={setFromDateOpen}>
                  <PopoverTrigger asChild>
                    <div className="relative">
                      <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal h-9 pl-8",
                          !fromDate && "text-muted-foreground",
                          fromDate && "bg-primary text-primary-foreground hover:bg-primary/90"
                        )}
                      >
                        {fromDate ? formatDateForPicker(fromDate, isMobile) : "From"}
                      </Button>
                      {fromDate && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-9 px-3 hover:bg-transparent text-primary-foreground"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setFromDate(undefined);
                          }}
                        >
                          <X className="h-3.5 w-3.5 mt-[1px]" />
                        </Button>
                      )}
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={fromDate}
                      onSelect={(date) => {
                        setFromDate(date);
                        setFromDateOpen(false);
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="w-full flex-1">
                <Popover open={toDateOpen} onOpenChange={setToDateOpen}>
                  <PopoverTrigger asChild>
                    <div className="relative">
                      <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal h-9 pl-8",
                          !toDate && "text-muted-foreground",
                          toDate && "bg-primary text-primary-foreground hover:bg-primary/90"
                        )}
                      >
                        {toDate ? formatDateForPicker(toDate, isMobile) : "To"}
                      </Button>
                      {toDate && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-9 px-3 hover:bg-transparent text-primary-foreground"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setToDate(undefined);
                          }}
                        >
                          <X className="h-3.5 w-3.5 mt-[1px]" />
                        </Button>
                      )}
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={toDate}
                      onSelect={(date) => {
                        setToDate(date);
                        setToDateOpen(false);
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Advanced filters button - mobile only */}
            <div className="sm:hidden">
              <Button 
                variant={isManagementFiltersOpen ? 'default' : 'outline'}
                size="sm" 
                className="w-full h-8 justify-between py-1 pl-8 relative"
                onClick={handleManagementFiltersToggle}
              >
                <div className="flex items-center">
                  <Filter className="h-3.5 w-3.5 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <span className="pl-0 mt-[1px]">Advanced Filters</span>
                </div>
                {isManagementFiltersOpen && (
                  <X className="h-3.5 w-3.5 ml-1.5 mt-[1px]" />
                )}
                {!isManagementFiltersOpen && (
                  <ChevronDown className="h-3.5 w-3.5 ml-1.5" />
                )}
              </Button>
            </div>

            {/* Advanced Filters Panel */}
            <div className={`${isManagementFiltersOpen ? 'animate-fade-in' : ''}`}>
              <AdvancedFilters 
                isOpen={isManagementFiltersOpen}
                selectedUser={selectedUser}
                setSelectedUser={(user: string | null) => setSelectedUser(user)}
                selectedActivityType={selectedActivityType}
                setSelectedActivityType={(type: string | null) => setSelectedActivityType(type)}
              />
            </div>
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Activity className="h-5 w-5 mr-2 text-primary" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            
            <CardContent className="pt-4 px-3">
              {Object.entries(groupedActivities).map(([date, activities]) => (
                <div key={date} className="mb-6 w-full">
                  <div className="flex items-center mb-2 w-full">
                    <div className="text-sm font-medium">{date}</div>
                    <div className="ml-2 h-px flex-1 bg-border"></div>
                  </div>
                  
                  <div className="sm:space-y-0 space-y-2 w-full">
                    {activities.map(activity => (
                      <div 
                        key={activity.id} 
                        className={cn(
                          "flex w-full p-2 rounded-lg transition-colors cursor-pointer",
                          selectedActivityId === activity.id ? "bg-muted" : "hover:bg-muted/50"
                        )}
                        onClick={() => setSelectedActivityId(activity.id === selectedActivityId ? null : activity.id)}
                      >
                        <div className="mr-4 flex flex-col items-center">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={activity.user.avatar} />
                            <AvatarFallback>{activity.user.initials}</AvatarFallback>
                          </Avatar>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              {getActivityIcon(activity.type)}
                              <button 
                                className="text-sm font-medium text-primary hover:underline"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // Handle activity link click
                                }}
                              >
                                {activity.title}
                              </button>
                            </div>
                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                              {formatTimeWithDate(activity.timestamp).time}
                            </span>
                          </div>
                          
                          <div className="mt-1">
                            <p className="text-sm text-muted-foreground">{activity.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ActivityLog;