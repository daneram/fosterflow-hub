
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Send, Mic, MicOff } from 'lucide-react';
import { Message } from './types';
import ChatMessageList from './ChatMessageList';
import { generateAIResponse } from './aiUtils';

const AIAssistantChat: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m your AI assistant. How can I help you today with case management or policy questions?',
      timestamp: new Date()
    }
  ]);
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Get AI response
    setTimeout(() => {
      const response = generateAIResponse(input);
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      console.log('Speech recording started');
    } else {
      console.log('Speech recording stopped, processing...');
      setTimeout(() => {
        setInput('How do I document a home visit?');
      }, 1000);
    }
  };

  return (
    <Card>
      <div className="flex flex-col h-[calc(100vh-280px)]">
        <ChatMessageList 
          messages={messages}
          isLoading={isLoading}
          messagesEndRef={messagesEndRef}
        />

        <form 
          onSubmit={handleSubmit} 
          className="border-t p-3 flex items-center gap-2"
        >
          <Button 
            type="button" 
            variant="outline" 
            size="icon" 
            onClick={toggleRecording}
            className={isRecording ? "text-red-500 animate-pulse h-8 w-8" : "h-8 w-8"}
          >
            {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question here..."
            className="flex-1 h-9"
          />
          <Button type="submit" disabled={!input.trim() || isLoading} className="h-9">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </Card>
  );
};

export default AIAssistantChat;
