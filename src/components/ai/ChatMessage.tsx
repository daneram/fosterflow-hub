
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Bot, User } from 'lucide-react';
import { Message } from './types';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isAssistant = message.role === 'assistant';
  
  return (
    <div className={`flex ${isAssistant ? 'justify-start' : 'justify-end'}`}>
      <Card className={`max-w-[80%] ${isAssistant ? 'bg-secondary' : 'bg-primary text-primary-foreground'}`}>
        <CardContent className="p-3">
          <div className="flex items-start gap-2">
            <div className="mt-1">
              {isAssistant ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
            </div>
            <div>
              <p>{message.content}</p>
              <p className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatMessage;
