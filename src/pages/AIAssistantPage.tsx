import React from 'react';
import Layout from '@/components/layout/Layout';
import AIAssistant from '@/components/ai/AIAssistant';

const AIAssistantPage = () => {
  return (
    <Layout>
      <div className="h-full animate-fade-in">
        <AIAssistant />
      </div>
    </Layout>
  );
};

export default AIAssistantPage;
