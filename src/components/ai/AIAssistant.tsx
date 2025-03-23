
import React, { useState, useRef, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Bot, Send, User, Mic, MicOff } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AIAssistant: React.FC = () => {
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

    setTimeout(() => {
      let response = '';
      const lowercaseInput = input.toLowerCase();
      
      if (lowercaseInput.includes('case') || lowercaseInput.includes('file')) {
        response = "I can help you with case management. Would you like me to help you search for a specific case, create a new case record, or provide guidance on case documentation requirements?";
      } else if (lowercaseInput.includes('policy') || lowercaseInput.includes('regulation')) {
        response = "I can provide information about our agency policies and regulations. Which specific policy or regulation would you like to learn more about?";
      } else if (lowercaseInput.includes('form') || lowercaseInput.includes('document')) {
        response = "I can help you find and complete necessary forms. Please let me know which type of form you're looking for, or I can guide you through our documentation process.";
      } else if (lowercaseInput.includes('hello') || lowercaseInput.includes('hi')) {
        response = "Hello! How can I assist you today with your case management needs?";
      } else {
        response = "I'm here to help with case management, policy questions, and documentation. Could you provide more details about what you need assistance with?";
      }

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
    <Layout>
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
            <Card>
              <div className="flex flex-col h-[calc(100vh-280px)]">
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message, index) => (
                    <div 
                      key={index} 
                      className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
                    >
                      <Card className={`max-w-[80%] ${message.role === 'assistant' ? 'bg-secondary' : 'bg-primary text-primary-foreground'}`}>
                        <CardContent className="p-3">
                          <div className="flex items-start gap-2">
                            <div className="mt-1">
                              {message.role === 'assistant' ? 
                                <Bot className="h-5 w-5" /> : 
                                <User className="h-5 w-5" />
                              }
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
          </TabsContent>

          <TabsContent value="help" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="hover:bg-accent transition-colors cursor-pointer">
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-2">Case Management</h3>
                  <p className="text-sm text-muted-foreground">Get assistance with creating, updating, and managing case files.</p>
                </CardContent>
              </Card>
              <Card className="hover:bg-accent transition-colors cursor-pointer">
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-2">Policy Questions</h3>
                  <p className="text-sm text-muted-foreground">Learn about agency policies, procedures, and compliance requirements.</p>
                </CardContent>
              </Card>
              <Card className="hover:bg-accent transition-colors cursor-pointer">
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-2">Form Assistance</h3>
                  <p className="text-sm text-muted-foreground">Find and complete required documentation and forms.</p>
                </CardContent>
              </Card>
              <Card className="hover:bg-accent transition-colors cursor-pointer">
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-2">Resource Finder</h3>
                  <p className="text-sm text-muted-foreground">Discover available resources for clients and families.</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AIAssistant;
