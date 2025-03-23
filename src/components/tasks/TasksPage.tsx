
import React from 'react';
import Layout from '@/components/layout/Layout';
import TaskManager from '@/components/tasks/TaskManager';

const TasksPage = () => {
  return (
    <Layout>
      <div className="h-full">
        <TaskManager />
      </div>
    </Layout>
  );
};

export default TasksPage;
