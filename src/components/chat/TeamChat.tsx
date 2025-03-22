import React, { useState, useRef, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { MessageSquare, Send, PaperclipIcon, Phone, Video, Search, UserPlus } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: string;
  senderAvatar?: string;
  content: string;
  timestamp: Date;
  isCurrentUser: boolean;
}

interface ChatContact {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'away';
  avatar?: string;
  lastMessage?: string;
  unread?: number;
  position?: string;
}

const TeamChat: React.FC = () => {
  const [message, setMessage] = useState('');
  const [activeChat, setActiveChat] = useState<string | null>('team-1');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const chatContacts: ChatContact[] = [
    { 
      id: 'team-1', 
      name: 'Case Management Team', 
      status: 'online', 
      lastMessage: 'Let\'s discuss the Johnson case',
      unread: 2,
      position: 'Group'
    },
    { 
      id: 'user-1', 
      name: 'Sarah Johnson', 
      status: 'online', 
      lastMessage: 'I\'ll send the report by tomorrow',
      position: 'Case Manager'
    },
    { 
      id: 'user-2', 
      name: 'Michael Rodriguez', 
      status: 'away', 
      lastMessage: 'Have you reviewed the Smith family assessment?',
      position: 'Supervisor'
    },
    { 
      id: 'user-3', 
      name: 'Emily Chen', 
      status: 'offline', 
      lastMessage: 'I completed the home visit report',
      position: 'Social Worker'
    },
    { 
      id: 'team-2', 
      name: 'Policy Review Group', 
      status: 'online', 
      lastMessage: 'New policies will be effective next month',
      position: 'Group'
    }
  ];

  const chatMessages: Record<string, ChatMessage[]> = {
    'team-1': [
      {
        id: '1',
        sender: 'Michael Rodriguez',
        content: 'Good morning team! We need to discuss the Johnson case today.',
        timestamp: new Date(2023, 11, 15, 9, 0),
        isCurrentUser: false
      },
      {
        id: '2',
        sender: 'Sarah Johnson',
        content: 'I\'ve reviewed their file and have some concerns about the current placement situation.',
        timestamp: new Date(2023, 11, 15, 9, 5),
        isCurrentUser: false
      },
      {
        id: '3',
        sender: 'You',
        content: 'I agree with Sarah. The latest home visit revealed some issues that we should address.',
        timestamp: new Date(2023, 11, 15, 9, 8),
        isCurrentUser: true
      },
      {
        id: '4',
        sender: 'Emily Chen',
        content: 'I can schedule a meeting with the foster parents to discuss these concerns. Would tomorrow at 3pm work?',
        timestamp: new Date(2023, 11, 15, 9, 12),
        isCurrentUser: false
      },
      {
        id: '5',
        sender: 'You',
        content: 'That works for me. I\'ll bring my notes from the last two visits.',
        timestamp: new Date(2023, 11, 15, 9, 15),
        isCurrentUser: true
      }
    ],
    'user-1': [
      {
        id: '1',
        sender: 'Sarah Johnson',
        content: 'Hi there! Do you have a minute to discuss the Williams case?',
        timestamp: new Date(2023, 11, 15, 10, 30),
        isCurrentUser: false
      },
      {
        id: '2',
        sender: 'You',
        content: 'Of course! What aspects are you concerned about?',
        timestamp: new Date(2023, 11, 15, 10, 32),
        isCurrentUser: true
      },
      {
        id: '3',
        sender: 'Sarah Johnson',
        content: 'I\'m noticing some inconsistencies in the parents\' statements compared to what the children are reporting.',
        timestamp: new Date(2023, 11, 15, 10, 35),
        isCurrentUser: false
      },
      {
        id: '4',
        sender: 'You',
        content: 'That\'s concerning. Let\'s schedule a separate interview with the children and document everything carefully.',
        timestamp: new Date(2023, 11, 15, 10, 38),
        isCurrentUser: true
      },
      {
        id: '5',
        sender: 'Sarah Johnson',
        content: 'Good idea. I\'ll set it up for this week. I\'ll send the report by tomorrow.',
        timestamp: new Date(2023, 11, 15, 10, 40),
        isCurrentUser: false
      }
    ]
  };

  const [chats, setChats] = useState(chatMessages);
  
  useEffect(() => {
    scrollToBottom();
  }, [activeChat, chats]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !activeChat) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'You',
      content: message,
      timestamp: new Date(),
      isCurrentUser: true
    };

    const updatedChats = {
      ...chats,
      [activeChat]: [...(chats[activeChat] || []), newMessage]
    };

    setChats(updatedChats);
    setMessage('');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-amber-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  return (
    <Layout>
      <div className="space-y-4 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Team Chat</h1>
          <p className="text-muted-foreground text-sm">Communicate with your team members and clients</p>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 w-8">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8">
              <Video className="h-4 w-4" />
            </Button>
          </div>
          <Button size="sm" className="h-8">
            <UserPlus className="h-4 w-4 mr-1" />
            New Chat
          </Button>
        </div>

        <div className="flex flex-1 gap-3 h-[calc(100vh-220px)]">
          <div className="w-72 shrink-0 border rounded-md bg-card overflow-hidden flex flex-col">
            <div className="p-2 border-b">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  className="w-full pl-8 h-9"
                />
              </div>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <div className="px-2 pt-2">
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="direct">Direct</TabsTrigger>
                  <TabsTrigger value="groups">Groups</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="all" className="m-0 overflow-auto">
                <div className="space-y-0.5 p-2">
                  {chatContacts.map(contact => (
                    <button
                      key={contact.id}
                      className={`w-full flex items-start gap-2 p-2 rounded-md text-left transition-colors ${
                        activeChat === contact.id ? 'bg-accent' : 'hover:bg-accent/50'
                      }`}
                      onClick={() => setActiveChat(contact.id)}
                    >
                      <div className="relative flex-shrink-0">
                        <Avatar className="h-8 w-8">
                          <div className="bg-primary/10 w-full h-full flex items-center justify-center">
                            <span className="text-primary font-medium text-xs">
                              {contact.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        </Avatar>
                        <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-background ${getStatusColor(contact.status)}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <span className="font-medium truncate text-sm">{contact.name}</span>
                          {contact.unread && (
                            <span className="ml-1 inline-flex items-center justify-center w-4 h-4 text-xs bg-primary text-primary-foreground rounded-full">
                              {contact.unread}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{contact.position}</p>
                        {contact.lastMessage && (
                          <p className="text-xs truncate text-muted-foreground">
                            {contact.lastMessage}
                          </p>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="direct" className="m-0 overflow-auto">
                <div className="space-y-0.5 p-2">
                  {chatContacts
                    .filter(contact => !contact.id.startsWith('team-'))
                    .map(contact => (
                      <button
                        key={contact.id}
                        className={`w-full flex items-start gap-2 p-2 rounded-md text-left transition-colors ${
                          activeChat === contact.id ? 'bg-accent' : 'hover:bg-accent/50'
                        }`}
                        onClick={() => setActiveChat(contact.id)}
                      >
                        <div className="relative flex-shrink-0">
                          <Avatar className="h-8 w-8">
                            <div className="bg-primary/10 w-full h-full flex items-center justify-center">
                              <span className="text-primary font-medium text-xs">
                                {contact.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                          </Avatar>
                          <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-background ${getStatusColor(contact.status)}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <span className="font-medium truncate text-sm">{contact.name}</span>
                            {contact.unread && (
                              <span className="ml-1 inline-flex items-center justify-center w-4 h-4 text-xs bg-primary text-primary-foreground rounded-full">
                                {contact.unread}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">{contact.position}</p>
                          {contact.lastMessage && (
                            <p className="text-xs truncate text-muted-foreground">
                              {contact.lastMessage}
                            </p>
                          )}
                        </div>
                      </button>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="groups" className="m-0 overflow-auto">
                <div className="space-y-0.5 p-2">
                  {chatContacts
                    .filter(contact => contact.id.startsWith('team-'))
                    .map(contact => (
                      <button
                        key={contact.id}
                        className={`w-full flex items-start gap-2 p-2 rounded-md text-left transition-colors ${
                          activeChat === contact.id ? 'bg-accent' : 'hover:bg-accent/50'
                        }`}
                        onClick={() => setActiveChat(contact.id)}
                      >
                        <div className="relative flex-shrink-0">
                          <Avatar className="h-8 w-8">
                            <div className="bg-primary/10 w-full h-full flex items-center justify-center">
                              <span className="text-primary font-medium text-xs">
                                {contact.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                          </Avatar>
                          <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-background ${getStatusColor(contact.status)}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <span className="font-medium truncate text-sm">{contact.name}</span>
                            {contact.unread && (
                              <span className="ml-1 inline-flex items-center justify-center w-4 h-4 text-xs bg-primary text-primary-foreground rounded-full">
                                {contact.unread}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">{contact.position}</p>
                          {contact.lastMessage && (
                            <p className="text-xs truncate text-muted-foreground">
                              {contact.lastMessage}
                            </p>
                          )}
                        </div>
                      </button>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="flex-1 border rounded-md overflow-hidden flex flex-col bg-card">
            {activeChat ? (
              <>
                <div className="p-2 border-b flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <div className="bg-primary/10 w-full h-full flex items-center justify-center">
                        <span className="text-primary font-medium text-xs">
                          {chatContacts.find(c => c.id === activeChat)?.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    </Avatar>
                    <div>
                      <h3 className="font-medium text-sm">{chatContacts.find(c => c.id === activeChat)?.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {chatContacts.find(c => c.id === activeChat)?.position} • {chatContacts.find(c => c.id === activeChat)?.status}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="outline" size="icon" className="h-7 w-7">
                      <Phone className="h-3 w-3" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-7 w-7">
                      <Video className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-3 space-y-3">
                  {chats[activeChat]?.map((msg, index) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.isCurrentUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] ${msg.isCurrentUser ? 'order-2' : 'order-1'}`}>
                        {!msg.isCurrentUser && index === 0 && <div className="ml-9 mb-1 text-xs font-medium">{msg.sender}</div>}
                        {!msg.isCurrentUser && index > 0 && chats[activeChat][index - 1].sender !== msg.sender && (
                          <div className="ml-9 mb-1 text-xs font-medium">{msg.sender}</div>
                        )}
                        <div className="flex items-start gap-1">
                          {!msg.isCurrentUser && (
                            <Avatar className="mt-1 w-7 h-7">
                              <div className="bg-primary/10 w-full h-full flex items-center justify-center">
                                <span className="text-primary font-medium text-xs">
                                  {msg.sender.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                            </Avatar>
                          )}
                          <div
                            className={`rounded-lg px-3 py-2 max-w-full ${
                              msg.isCurrentUser
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted'
                            }`}
                          >
                            <p className="break-words text-sm">{msg.content}</p>
                            <p className={`text-xs mt-1 ${msg.isCurrentUser ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                              {formatTime(msg.timestamp)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                <form onSubmit={handleSendMessage} className="border-t p-2 flex gap-2">
                  <Button type="button" variant="outline" size="icon" className="h-8 w-8 flex-shrink-0">
                    <PaperclipIcon className="h-4 w-4" />
                  </Button>
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 h-8"
                  />
                  <Button type="submit" disabled={!message.trim()} size="sm" className="h-8">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <h3 className="text-lg font-medium mb-1">No conversation selected</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose a contact from the sidebar to start chatting
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TeamChat;
