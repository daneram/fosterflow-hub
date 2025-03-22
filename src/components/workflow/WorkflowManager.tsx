
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
      <div className="space-y-3 max-w-7xl animate-fade-in">
        <WorkflowHeader />
        <div className="bg-card rounded-md border shadow-sm">
          <WorkflowTabs workflows={workflows} />
        </div>
        <div className="bg-card rounded-md border shadow-sm">
          <WorkflowTemplates />
        </div>
      </div>
    </Layout>
  );
};

export default WorkflowManager;
