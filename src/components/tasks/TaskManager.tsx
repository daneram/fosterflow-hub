
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar as CalendarIcon, Plus, Clock, CheckSquare, AlertCircle, Filter, Search, Calendar, MoreVertical } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: Date;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'completed';
  category: string;
  assignee?: string;
  caseId?: string;
  caseName?: string;
  createdAt: Date;
  completedAt?: Date;
}

// Helper function to check if a date is overdue
const isOverdue = (dueDate?: Date): boolean => {
  if (!dueDate) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dueDateCopy = new Date(dueDate);
  dueDateCopy.setHours(0, 0, 0, 0);
  return dueDateCopy < today;
};

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 'task-1',
      title: 'Complete intake assessment for Smith family',
      description: 'Interview family members and document initial findings.',
      dueDate: new Date(2023, 11, 17),
      priority: 'high',
      status: 'in-progress',
      category: 'Assessment',
      assignee: 'Sarah Wilson',
      caseId: 'case-101',
      caseName: 'Smith Family',
      createdAt: new Date(2023, 11, 10)
    },
    {
      id: 'task-2',
      title: 'Schedule follow-up home visit',
      description: 'Coordinate with parents for a convenient time.',
      dueDate: new Date(2023, 11, 18),
      priority: 'medium',
      status: 'todo',
      category: 'Visit',
      assignee: 'Sarah Wilson',
      caseId: 'case-101',
      caseName: 'Smith Family',
      createdAt: new Date(2023, 11, 12)
    },
    {
      id: 'task-3',
      title: 'Submit monthly progress report',
      description: 'Compile data on all active cases and submit to supervisor.',
      dueDate: new Date(2023, 11, 30),
      priority: 'medium',
      status: 'todo',
      category: 'Reporting',
      assignee: 'Sarah Wilson',
      createdAt: new Date(2023, 11, 5)
    },
    {
      id: 'task-4',
      title: 'Review Johnson case therapy notes',
      description: 'Analyze recent therapy session notes and update case plan accordingly.',
      dueDate: new Date(2023, 11, 16),
      priority: 'low',
      status: 'todo',
      category: 'Review',
      assignee: 'Sarah Wilson',
      caseId: 'case-102',
      caseName: 'Johnson Family',
      createdAt: new Date(2023, 11, 13)
    },
    {
      id: 'task-5',
      title: 'Prepare court documents for Williams case',
      description: 'Gather all necessary documentation for upcoming court hearing.',
      dueDate: new Date(2023, 11, 20),
      priority: 'high',
      status: 'todo',
      category: 'Legal',
      assignee: 'Sarah Wilson',
      caseId: 'case-103',
      caseName: 'Williams Children',
      createdAt: new Date(2023, 11, 8)
    },
    {
      id: 'task-6',
      title: 'Update contact information for Thompson family',
      description: 'Verify and update all contact information in the system.',
      dueDate: new Date(2023, 11, 14),
      priority: 'low',
      status: 'completed',
      category: 'Administration',
      assignee: 'Sarah Wilson',
      caseId: 'case-104',
      caseName: 'Thompson Family',
      createdAt: new Date(2023, 11, 7),
      completedAt: new Date(2023, 11, 14)
    },
    {
      id: 'task-7',
      title: 'Schedule mental health assessment for Davis child',
      description: 'Contact approved providers and arrange an assessment.',
      dueDate: new Date(2023, 11, 19),
      priority: 'high',
      status: 'in-progress',
      category: 'Healthcare',
      assignee: 'Sarah Wilson',
      caseId: 'case-105',
      caseName: 'Davis Family',
      createdAt: new Date(2023, 11, 9)
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isNewTaskDialogOpen, setIsNewTaskDialogOpen] = useState(false);

  const handleTaskStatusChange = (taskId: string, checked: boolean) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { 
            ...task, 
            status: checked ? 'completed' : 'todo',
            completedAt: checked ? new Date() : undefined
          } 
        : task
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-amber-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'todo': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTasks = (status: string) => {
    return tasks
      .filter(task => 
        task.status === status && 
        (searchQuery === '' || 
         task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
         task.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
         task.caseName?.toLowerCase().includes(searchQuery.toLowerCase()))
      )
      .sort((a, b) => {
        // Sort by priority first (high > medium > low)
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
        if (priorityDiff !== 0) return priorityDiff;
        
        // Then sort by due date (earliest first)
        if (a.dueDate && b.dueDate) {
          return a.dueDate.getTime() - b.dueDate.getTime();
        }
        return a.dueDate ? -1 : b.dueDate ? 1 : 0;
      });
  };

  const formatDate = (date?: Date) => {
    if (!date) return 'No date';
    
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    }
  };

  const isOverdue = (dueDate?: Date) => {
    if (!dueDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate < today;
  };

  return (
    <Layout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Task Manager</h1>
          <Dialog open={isNewTaskDialogOpen} onOpenChange={setIsNewTaskDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Task
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Create New Task</DialogTitle>
                <DialogDescription>
                  Add a new task to your workspace
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="task-title">Title</Label>
                  <Input id="task-title" placeholder="Enter task title..." />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="task-description">Description</Label>
                  <Input id="task-description" placeholder="Enter task description..." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="due-date">Due Date</Label>
                    <Input id="due-date" type="date" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="priority">Priority</Label>
                    <select className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm" id="priority">
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <select className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm" id="category">
                      <option value="Assessment">Assessment</option>
                      <option value="Visit">Visit</option>
                      <option value="Reporting">Reporting</option>
                      <option value="Review">Review</option>
                      <option value="Legal">Legal</option>
                      <option value="Administration">Administration</option>
                      <option value="Healthcare">Healthcare</option>
                    </select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="assignee">Assignee</Label>
                    <select className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm" id="assignee">
                      <option value="self">Me (Sarah Wilson)</option>
                      <option value="team">Team</option>
                    </select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="related-case">Related Case</Label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm" id="related-case">
                    <option value="">None</option>
                    <option value="case-101">Smith Family</option>
                    <option value="case-102">Johnson Family</option>
                    <option value="case-103">Williams Children</option>
                    <option value="case-104">Thompson Family</option>
                    <option value="case-105">Davis Family</option>
                  </select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create Task</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <Tabs defaultValue="todo" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="todo">To Do</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="todo" className="space-y-4 mt-4">
            {filteredTasks('todo').length > 0 ? (
              filteredTasks('todo').map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onStatusChange={handleTaskStatusChange}
                  onTaskClick={() => setSelectedTask(task)}
                />
              ))
            ) : (
              <div className="p-8 text-center border rounded-lg">
                <CheckSquare className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <h3 className="text-lg font-medium mb-1">No to-do tasks</h3>
                <p className="text-muted-foreground">You've completed all your tasks or need to create new ones.</p>
                <Button className="mt-4" onClick={() => setIsNewTaskDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Task
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="in-progress" className="space-y-4 mt-4">
            {filteredTasks('in-progress').length > 0 ? (
              filteredTasks('in-progress').map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onStatusChange={handleTaskStatusChange}
                  onTaskClick={() => setSelectedTask(task)}
                />
              ))
            ) : (
              <div className="p-8 text-center border rounded-lg">
                <Clock className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <h3 className="text-lg font-medium mb-1">No in-progress tasks</h3>
                <p className="text-muted-foreground">Start working on a task to see it here.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4 mt-4">
            {filteredTasks('completed').length > 0 ? (
              filteredTasks('completed').map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onStatusChange={handleTaskStatusChange}
                  onTaskClick={() => setSelectedTask(task)}
                />
              ))
            ) : (
              <div className="p-8 text-center border rounded-lg">
                <AlertCircle className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <h3 className="text-lg font-medium mb-1">No completed tasks</h3>
                <p className="text-muted-foreground">Complete some tasks to see them here.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <Dialog open={!!selectedTask} onOpenChange={() => setSelectedTask(null)}>
          {selectedTask && (
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <div className="flex items-start justify-between">
                  <DialogTitle>{selectedTask.title}</DialogTitle>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(selectedTask.status)}`}>
                    {selectedTask.status === 'todo' ? 'To Do' : 
                     selectedTask.status === 'in-progress' ? 'In Progress' : 
                     'Completed'}
                  </span>
                </div>
              </DialogHeader>
              <div className="space-y-4 py-4">
                {selectedTask.description && (
                  <div>
                    <Label className="text-xs text-muted-foreground">DESCRIPTION</Label>
                    <p className="mt-1">{selectedTask.description}</p>
                  </div>
                )}
                
                <div className="flex flex-col gap-4 sm:flex-row">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">PRIORITY</Label>
                    <div className={`flex items-center ${getPriorityColor(selectedTask.priority)}`}>
                      <span className="capitalize">{selectedTask.priority}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">CATEGORY</Label>
                    <div>{selectedTask.category}</div>
                  </div>
                  
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">DUE DATE</Label>
                    <div className="flex items-center">
                      <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span className={isOverdue(selectedTask.dueDate) && selectedTask.status !== 'completed' ? 'text-red-500' : ''}>
                        {formatDate(selectedTask.dueDate)}
                      </span>
                    </div>
                  </div>
                </div>
                
                {selectedTask.caseName && (
                  <div>
                    <Label className="text-xs text-muted-foreground">RELATED CASE</Label>
                    <div className="mt-1 p-2 bg-muted rounded-md">
                      {selectedTask.caseName}
                    </div>
                  </div>
                )}
                
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div>Created {selectedTask.createdAt.toLocaleDateString()}</div>
                    {selectedTask.completedAt && (
                      <div>Completed {selectedTask.completedAt.toLocaleDateString()}</div>
                    )}
                  </div>
                </div>
              </div>
              <DialogFooter className="gap-2">
                <Button variant="outline" onClick={() => setSelectedTask(null)}>
                  Close
                </Button>
                {selectedTask.status !== 'completed' ? (
                  <Button onClick={() => {
                    handleTaskStatusChange(selectedTask.id, true);
                    setSelectedTask(null);
                  }}>
                    <CheckSquare className="h-4 w-4 mr-2" />
                    Mark Complete
                  </Button>
                ) : (
                  <Button onClick={() => {
                    handleTaskStatusChange(selectedTask.id, false);
                    setSelectedTask(null);
                  }}>
                    Reopen Task
                  </Button>
                )}
              </DialogFooter>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </Layout>
  );
};

interface TaskItemProps {
  task: Task;
  onStatusChange: (taskId: string, checked: boolean) => void;
  onTaskClick: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onStatusChange, onTaskClick }) => {
  const isTaskOverdue = isOverdue(task.dueDate) && task.status !== 'completed';
  
  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-amber-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };
  
  const formatDate = (date?: Date) => {
    if (!date) return 'No date';
    
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    }
  };
  
  return (
    <Card onClick={onTaskClick} className="cursor-pointer hover:bg-accent/50 transition-colors">
      <CardContent className="p-4">
        <div className="flex gap-2">
          <div className="pt-[2px]">
            <Checkbox 
              checked={task.status === 'completed'} 
              onCheckedChange={(checked) => {
                onStatusChange(task.id, !!checked);
                // Stop propagation to prevent opening the task details
                event?.stopPropagation();
              }}
            />
          </div>
          <div className="flex-1">
            <div className="flex justify-between">
              <h3 className={`font-medium ${task.status === 'completed' ? 'line-through text-muted-foreground' : ''}`}>
                {task.title}
              </h3>
              <DropdownMenu>
                <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit Task</DropdownMenuItem>
                  <DropdownMenuItem>Set as In Progress</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-500">Delete Task</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-2">
              {task.caseName && (
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium">
                  {task.caseName}
                </span>
              )}
              <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-100">
                {task.category}
              </span>
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${isTaskOverdue ? 'bg-red-100 text-red-800' : 'bg-gray-100'}`}>
                {task.dueDate && (
                  <>
                    <Calendar className="mr-1 h-3 w-3" />
                    {formatDate(task.dueDate)}
                  </>
                )}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium">
                <span className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`}></span>
                <span className="capitalize">{task.priority}</span>
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskManager;
