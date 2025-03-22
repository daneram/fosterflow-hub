
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
      <div className="space-y-4">
        <WorkflowHeader />
        <WorkflowTabs workflows={workflows} />
        <WorkflowTemplates />
      </div>
    </Layout>
  );
};

export default WorkflowManager;
