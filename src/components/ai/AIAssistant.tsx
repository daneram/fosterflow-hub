
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AIAssistantChat from './AIAssistantChat';
import AIAssistantHelpTopics from './AIAssistantHelpTopics';

const AIAssistant: React.FC = () => {
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="pt-1">
        <h1 className="text-2xl font-bold tracking-tight">AI Assistant</h1>
        <p className="text-muted-foreground text-sm">Ask me questions about cases, policies, or get help with forms and workflows.</p>
      </div>

      <Tabs defaultValue="chat" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 h-9">
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="help">Help Topics</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="mt-4">
          <AIAssistantChat />
        </TabsContent>

        <TabsContent value="help" className="mt-4">
          <AIAssistantHelpTopics />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIAssistant;
