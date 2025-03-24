
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Send, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AIChat: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([{
    role: 'assistant',
    content: 'Hello! I\'m your AI assistant. How can I help you today?',
    timestamp: new Date()
  }]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const response = "I'm your AI assistant. I can help you with questions about this application, your work, or any other questions you might have.";
      const assistantMessage: Message = {
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full w-full border-l bg-card">
      <CardHeader className="pb-2 border-b px-3 py-[12px]">
        <div className="flex items-center py-0">
          <Bot className="mr-2 h-5 w-5 text-primary" />
          <CardTitle className="text-sm">FosterNotes AI</CardTitle>
        </div>
      </CardHeader>

      <ScrollArea className="flex-1 p-3">
        <div className="space-y-3">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={cn("flex", message.role === 'assistant' ? "justify-start" : "justify-end")}
            >
              <div 
                className={cn(
                  "flex items-start gap-1.5 max-w-[85%] rounded-lg p-2", 
                  message.role === 'assistant' ? "bg-secondary text-secondary-foreground" : "bg-primary text-primary-foreground"
                )}
              >
                <div className="mt-0.5 flex-shrink-0">
                  {message.role === 'assistant' ? 
                    <Bot className="h-3.5 w-3.5" /> : 
                    <User className="h-3.5 w-3.5" />
                  }
                </div>
                <div>
                  <p className="text-xs">{message.content}</p>
                  <p className="text-[10px] opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-secondary rounded-lg p-2">
                <div className="flex items-center gap-1.5">
                  <Bot className="h-3.5 w-3.5" />
                  <div className="flex space-x-1">
                    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary"></div>
                    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary" style={{
                      animationDelay: '0.2s'
                    }}></div>
                    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary" style={{
                      animationDelay: '0.4s'
                    }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="border-t p-2 flex items-center gap-2">
        <Input 
          value={input} 
          onChange={e => setInput(e.target.value)} 
          placeholder="Ask a question..." 
          className="flex-1 h-8 text-xs" 
        />
        <Button 
          type="submit" 
          size="sm" 
          className="h-8 w-8 p-0" 
          disabled={!input.trim() || isLoading}
        >
          <Send className="h-3.5 w-3.5" />
        </Button>
      </form>
    </div>
  );
};

export default AIChat;
