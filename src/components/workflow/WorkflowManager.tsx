import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import WorkflowHeader from './WorkflowHeader';
import WorkflowTabs from './WorkflowTabs';
import WorkflowTemplates from './WorkflowTemplates';
import { mockWorkflows } from './workflowData';
import { Workflow } from './types';

const WorkflowManager: React.FC = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>(mockWorkflows);

  return (
    <Layout>
      <div className="space-y-5 animate-fade-in">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Workflow Manager</h1>
          <p className="text-muted-foreground text-sm">Track and manage case workflows and processes</p>
        </div>

        <div className="grid grid-cols-1 gap-5">
          <div className="bg-card rounded-md border shadow-sm">
            <WorkflowHeader />
          </div>
          
          <div className="bg-card rounded-md border shadow-sm">
            <WorkflowTabs workflows={workflows} />
          </div>
          
          <div className="bg-card rounded-md border shadow-sm">
            <WorkflowTemplates />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WorkflowManager;
