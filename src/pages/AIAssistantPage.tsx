
import React from 'react';
import Layout from '@/components/layout/Layout';
import AIChat from '@/components/ai/AIChat';

const AIAssistantPage = () => {
  return (
    <Layout>
      <div className="h-full">
        <AIChat />
      </div>
    </Layout>
  );
};

export default AIAssistantPage;
