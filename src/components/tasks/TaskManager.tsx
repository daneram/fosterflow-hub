
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Task, TaskFilter } from './types';
import { filterTasks } from './utils/taskUtils';
import { mockTasks } from './mock/mockTasks';
import TaskList from './components/TaskList';
import TaskSearch from './components/TaskSearch';

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [filter, setFilter] = useState<TaskFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleTaskStatus = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const filteredTasks = filterTasks(tasks, filter, searchQuery);

  return (
    <div className="w-full space-y-4 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Tasks</h1>
        <p className="text-muted-foreground text-sm">Manage your tasks and to-dos</p>
      </div>

      <TaskSearch 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery} 
      />

      <Tabs defaultValue="all" onValueChange={(value) => setFilter(value as TaskFilter)}>
        <TabsList>
          <TabsTrigger value="all">All Tasks</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          <Card>
            <CardContent className="p-0">
              <TaskList 
                tasks={filteredTasks} 
                searchQuery={searchQuery} 
                onToggleStatus={toggleTaskStatus} 
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="active" className="mt-0">
          <Card>
            <CardContent className="p-0">
              <TaskList 
                tasks={filteredTasks} 
                searchQuery={searchQuery} 
                onToggleStatus={toggleTaskStatus} 
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="completed" className="mt-0">
          <Card>
            <CardContent className="p-0">
              <TaskList 
                tasks={filteredTasks} 
                searchQuery={searchQuery} 
                onToggleStatus={toggleTaskStatus} 
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaskManager;
