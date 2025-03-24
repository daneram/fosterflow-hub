import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Calendar, Clock, Filter } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: Date;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category?: string;
  assignedTo?: string;
}

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Complete case notes for Johnson family',
      description: 'Review and finalize all case notes from last home visit',
      dueDate: new Date(2023, 11, 18),
      completed: false,
      priority: 'high',
      category: 'Documentation',
      assignedTo: 'Me'
    },
    {
      id: '2',
      title: 'Schedule team meeting',
      description: 'Coordinate with all case managers for quarterly review',
      dueDate: new Date(2023, 11, 20),
      completed: false,
      priority: 'medium',
      category: 'Meetings',
      assignedTo: 'Me'
    },
    {
      id: '3',
      title: 'File court report',
      description: 'Complete and submit report for Smith case hearing',
      dueDate: new Date(2023, 11, 15),
      completed: true,
      priority: 'high',
      category: 'Legal',
      assignedTo: 'Sarah'
    },
    {
      id: '4',
      title: 'Follow up with school counselor',
      description: 'Check on academic progress for Williams children',
      dueDate: new Date(2023, 11, 22),
      completed: false,
      priority: 'medium',
      category: 'Education',
      assignedTo: 'John'
    },
    {
      id: '5',
      title: 'Review budget allocation',
      description: 'Analyze Q4 spending and prepare for next quarter',
      dueDate: new Date(2023, 12, 5),
      completed: false,
      priority: 'low',
      category: 'Finance',
      assignedTo: 'Me'
    },
  ]);

  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleTaskStatus = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    // Apply active/completed filter
    if (filter === 'active' && task.completed) return false;
    if (filter === 'completed' && !task.completed) return false;
    
    // Apply search query filter
    if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    
    return true;
  });

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-amber-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const formatDueDate = (date?: Date) => {
    if (!date) return 'No due date';
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const taskDate = new Date(date);
    taskDate.setHours(0, 0, 0, 0);
    
    if (taskDate.getTime() === today.getTime()) return 'Today';
    if (taskDate.getTime() === tomorrow.getTime()) return 'Tomorrow';
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="w-full space-y-4 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Tasks</h1>
        <p className="text-muted-foreground text-sm">Manage your tasks and to-dos</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:items-center justify-between">
        <div className="relative w-full max-w-md">
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
          <Filter className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        </div>
        
        <Button size="sm" className="sm:self-end">
          <Plus className="h-4 w-4 mr-1" />
          New Task
        </Button>
      </div>

      <Tabs defaultValue="all" onValueChange={(value) => setFilter(value as any)}>
        <TabsList>
          <TabsTrigger value="all">All Tasks</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          <Card>
            <CardContent className="p-0">
              <ScrollArea className="h-[60vh]">
                <div className="divide-y">
                  {filteredTasks.length > 0 ? (
                    filteredTasks.map(task => (
                      <div key={task.id} className="p-4 flex items-start gap-3">
                        <Checkbox 
                          checked={task.completed}
                          onCheckedChange={() => toggleTaskStatus(task.id)}
                          className="mt-1"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                              {task.title}
                            </p>
                            <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`} />
                          </div>
                          {task.description && (
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                              {task.description}
                            </p>
                          )}
                          <div className="flex flex-wrap gap-3 mt-2 text-xs text-muted-foreground">
                            {task.dueDate && (
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{formatDueDate(task.dueDate)}</span>
                              </div>
                            )}
                            {task.category && (
                              <div className="bg-secondary px-2 py-0.5 rounded-full">
                                {task.category}
                              </div>
                            )}
                            {task.assignedTo && (
                              <div className="flex items-center gap-1 ml-auto">
                                <span>Assigned to: {task.assignedTo}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-muted-foreground">
                      <p>No tasks found</p>
                      {searchQuery && (
                        <p className="text-sm mt-1">Try a different search term</p>
                      )}
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="active" className="mt-0">
          <Card>
            <CardContent className="p-0">
              <ScrollArea className="h-[60vh]">
                <div className="divide-y">
                  {filteredTasks.length > 0 ? (
                    filteredTasks.map(task => (
                      <div key={task.id} className="p-4 flex items-start gap-3">
                        <Checkbox 
                          checked={task.completed}
                          onCheckedChange={() => toggleTaskStatus(task.id)}
                          className="mt-1"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                              {task.title}
                            </p>
                            <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`} />
                          </div>
                          {task.description && (
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                              {task.description}
                            </p>
                          )}
                          <div className="flex flex-wrap gap-3 mt-2 text-xs text-muted-foreground">
                            {task.dueDate && (
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{formatDueDate(task.dueDate)}</span>
                              </div>
                            )}
                            {task.category && (
                              <div className="bg-secondary px-2 py-0.5 rounded-full">
                                {task.category}
                              </div>
                            )}
                            {task.assignedTo && (
                              <div className="flex items-center gap-1 ml-auto">
                                <span>Assigned to: {task.assignedTo}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-muted-foreground">
                      <p>No tasks found</p>
                      {searchQuery && (
                        <p className="text-sm mt-1">Try a different search term</p>
                      )}
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="completed" className="mt-0">
          <Card>
            <CardContent className="p-0">
              <ScrollArea className="h-[60vh]">
                <div className="divide-y">
                  {filteredTasks.length > 0 ? (
                    filteredTasks.map(task => (
                      <div key={task.id} className="p-4 flex items-start gap-3">
                        <Checkbox 
                          checked={task.completed}
                          onCheckedChange={() => toggleTaskStatus(task.id)}
                          className="mt-1"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                              {task.title}
                            </p>
                            <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`} />
                          </div>
                          {task.description && (
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                              {task.description}
                            </p>
                          )}
                          <div className="flex flex-wrap gap-3 mt-2 text-xs text-muted-foreground">
                            {task.dueDate && (
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{formatDueDate(task.dueDate)}</span>
                              </div>
                            )}
                            {task.category && (
                              <div className="bg-secondary px-2 py-0.5 rounded-full">
                                {task.category}
                              </div>
                            )}
                            {task.assignedTo && (
                              <div className="flex items-center gap-1 ml-auto">
                                <span>Assigned to: {task.assignedTo}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-muted-foreground">
                      <p>No tasks found</p>
                      {searchQuery && (
                        <p className="text-sm mt-1">Try a different search term</p>
                      )}
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaskManager;
