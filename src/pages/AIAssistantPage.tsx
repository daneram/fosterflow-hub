
import React, { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import AIAssistant from '@/components/ai/AIAssistant';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAIChatState } from '@/components/layout/hooks/useAIChatState';

const AIAssistantPage = () => {
  const isMobile = useIsMobile();
  const { setAiChatOpen } = useAIChatState();
  
  // When on the dedicated AI Assistant page, hide the sidebar chat
  useEffect(() => {
    setAiChatOpen(false);
  }, [setAiChatOpen]);

  return (
    <Layout>
      <div className="h-full">
        <AIAssistant />
      </div>
    </Layout>
  );
};

export default AIAssistantPage;
