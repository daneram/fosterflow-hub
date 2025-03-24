
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { HELP_TOPICS } from './helpTopicsData';

const AIAssistantHelpTopics: React.FC = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {HELP_TOPICS.map((topic, index) => (
        <Card key={index} className="hover:bg-accent transition-colors cursor-pointer">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-2">{topic.title}</h3>
            <p className="text-sm text-muted-foreground">{topic.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AIAssistantHelpTopics;
