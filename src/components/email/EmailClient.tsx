
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Mail, Star, File, Trash, Send, Inbox, Archive, AlertCircle } from 'lucide-react';

interface Email {
  id: string;
  from: string;
  subject: string;
  content: string;
  date: Date;
  read: boolean;
  important: boolean;
  folder: 'inbox' | 'sent' | 'drafts' | 'trash' | 'archive';
}

const MOCK_EMAILS: Email[] = [
  {
    id: '1',
    from: 'supervisor@agency.gov',
    subject: 'Case Review - Johnson Family',
    content: 'We need to schedule a review for the Johnson family case before the end of the month.',
    date: new Date('2023-05-15T10:30:00'),
    read: false,
    important: true,
    folder: 'inbox'
  },
  {
    id: '2',
    from: 'training@agency.gov',
    subject: 'Mandatory Training Update',
    content: 'Please complete the new child safety protocols training by next Friday.',
    date: new Date('2023-05-14T14:20:00'),
    read: true,
    important: true,
    folder: 'inbox'
  },
  {
    id: '3',
    from: 'courts@county.gov',
    subject: 'Court Date Change - Smith Case',
    content: 'The hearing for the Smith case has been moved to next Tuesday at 2:00 PM.',
    date: new Date('2023-05-13T09:15:00'),
    read: true,
    important: false,
    folder: 'inbox'
  },
  {
    id: '4',
    from: 'referrals@childservices.org',
    subject: 'New Referral Assigned',
    content: 'A new case has been assigned to you. Please check the case management system for details.',
    date: new Date('2023-05-12T11:45:00'),
    read: true,
    important: false,
    folder: 'inbox'
  },
  {
    id: '5',
    from: 'john.doe@email.com',
    subject: 'Visitation Schedule',
    content: 'Thank you for arranging the visitation schedule for this month.',
    date: new Date('2023-05-11T15:30:00'),
    read: true,
    important: false,
    folder: 'inbox'
  }
];

const EmailClient: React.FC = () => {
  const [selectedFolder, setSelectedFolder] = useState<string>('inbox');
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredEmails = MOCK_EMAILS.filter(email => 
    email.folder === selectedFolder && 
    (searchQuery === '' || 
     email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
     email.from.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSelectEmail = (email: Email) => {
    setSelectedEmail(email);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <Layout>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Email Client</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[75vh]">
          {/* Folders */}
          <div className="col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">Folders</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 p-2">
                <Button 
                  variant={selectedFolder === 'inbox' ? 'default' : 'ghost'} 
                  className="w-full justify-start" 
                  onClick={() => setSelectedFolder('inbox')}
                >
                  <Inbox className="mr-2 h-4 w-4" />
                  Inbox
                  <Badge className="ml-auto" variant="secondary">5</Badge>
                </Button>
                <Button 
                  variant={selectedFolder === 'sent' ? 'default' : 'ghost'} 
                  className="w-full justify-start" 
                  onClick={() => setSelectedFolder('sent')}
                >
                  <Send className="mr-2 h-4 w-4" />
                  Sent
                </Button>
                <Button 
                  variant={selectedFolder === 'drafts' ? 'default' : 'ghost'} 
                  className="w-full justify-start" 
                  onClick={() => setSelectedFolder('drafts')}
                >
                  <File className="mr-2 h-4 w-4" />
                  Drafts
                </Button>
                <Button 
                  variant={selectedFolder === 'archive' ? 'default' : 'ghost'} 
                  className="w-full justify-start" 
                  onClick={() => setSelectedFolder('archive')}
                >
                  <Archive className="mr-2 h-4 w-4" />
                  Archive
                </Button>
                <Button 
                  variant={selectedFolder === 'trash' ? 'default' : 'ghost'} 
                  className="w-full justify-start" 
                  onClick={() => setSelectedFolder('trash')}
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Trash
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Email List */}
          <div className="col-span-1 md:col-span-3">
            <Card className="h-full flex flex-col">
              <CardHeader className="pb-2">
                <div className="flex items-center space-x-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search emails..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button>
                    Compose
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="flex-1 overflow-auto p-0">
                <div className="divide-y">
                  {filteredEmails.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
                      <Mail className="h-8 w-8 mb-2" />
                      <p>No emails found</p>
                    </div>
                  ) : (
                    filteredEmails.map((email) => (
                      <div 
                        key={email.id} 
                        className={`p-3 cursor-pointer hover:bg-accent/50 ${!email.read ? 'bg-accent/20 font-medium' : ''} ${selectedEmail?.id === email.id ? 'bg-accent' : ''}`}
                        onClick={() => handleSelectEmail(email)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            {email.important && <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />}
                            <span className={!email.read ? 'font-medium' : ''}>{email.from}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{formatDate(email.date)}</span>
                        </div>
                        <div className="mt-1">{email.subject}</div>
                        <div className="mt-1 text-sm text-muted-foreground truncate">
                          {email.content}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
              
              {selectedEmail && (
                <div className="border-t p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">{selectedEmail.subject}</h3>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Star className="h-4 w-4 mr-1" />
                        Important
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <div>
                      <span className="font-medium">From: </span>
                      {selectedEmail.from}
                    </div>
                    <div className="text-muted-foreground">
                      {formatDate(selectedEmail.date)}
                    </div>
                  </div>
                  <div className="mt-4 text-sm">
                    {selectedEmail.content}
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmailClient;
