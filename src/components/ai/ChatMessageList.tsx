
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Bot, User } from 'lucide-react';
import { Message } from './types';
import ChatMessage from './ChatMessage';

interface ChatMessageListProps {
  messages: Message[];
  isLoading: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const ChatMessageList: React.FC<ChatMessageListProps> = ({ 
  messages, 
  isLoading, 
  messagesEndRef 
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message, index) => (
        <ChatMessage key={index} message={message} />
      ))}
      
      {isLoading && (
        <div className="flex justify-start">
          <Card className="max-w-[80%] bg-secondary">
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                <div className="flex space-x-1">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-primary"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-primary" style={{ animationDelay: '0.2s' }}></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-primary" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessageList;
