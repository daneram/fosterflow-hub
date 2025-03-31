import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Mail, 
  Search, 
  Inbox, 
  Send, 
  Archive, 
  Trash, 
  Star, 
  AlertCircle, 
  User, 
  Filter, 
  Paperclip, 
  FileText, 
  Plus, 
  Clock,
  ChevronDown,
  Download
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

interface Email {
  id: string;
  sender: {
    name: string;
    email: string;
    avatar?: string;
  };
  recipients: string[];
  subject: string;
  preview: string;
  body: string;
  date: Date;
  isRead: boolean;
  isStarred: boolean;
  hasAttachments: boolean;
  labels: string[];
  folder: 'inbox' | 'sent' | 'drafts' | 'archive' | 'trash';
}

const MOCK_EMAILS: Email[] = [
  {
    id: 'e1',
    sender: {
      name: 'Sarah Johnson',
      email: 'sarah.johnson@agency.gov',
      avatar: ''
    },
    recipients: ['social.worker@agency.gov'],
    subject: 'Case Review Meeting for Thompson Family',
    preview: 'Hello, I wanted to schedule a case review meeting for the Thompson family next week. Are you available on Tuesday at 2pm?',
    body: `<p>Hello,</p>
           <p>I wanted to schedule a case review meeting for the Thompson family next week. Are you available on Tuesday at 2pm?</p>
           <p>We need to discuss the progress of the family's service plan and prepare for the upcoming court hearing.</p>
           <p>Best regards,<br>Sarah Johnson<br>Supervisor</p>`,
    date: new Date('2023-08-15T14:30:00'),
    isRead: false,
    isStarred: true,
    hasAttachments: false,
    labels: ['meeting', 'important'],
    folder: 'inbox'
  },
  {
    id: 'e2',
    sender: {
      name: 'Legal Department',
      email: 'legal@agency.gov',
      avatar: ''
    },
    recipients: ['social.worker@agency.gov'],
    subject: 'Documentation Required for Davis Case',
    preview: 'Please submit the following documentation for the Davis case by Friday: 1. Updated case notes 2. Visitation logs 3. Service referrals',
    body: `<p>Hello,</p>
           <p>Please submit the following documentation for the Davis case by Friday:</p>
           <ol>
             <li>Updated case notes for the past 30 days</li>
             <li>Visitation logs</li>
             <li>Service referrals and progress reports</li>
           </ol>
           <p>These documents are needed for the upcoming court hearing.</p>
           <p>Thank you,<br>Legal Department</p>`,
    date: new Date('2023-08-14T09:15:00'),
    isRead: true,
    isStarred: false,
    hasAttachments: true,
    labels: ['legal', 'urgent'],
    folder: 'inbox'
  },
  {
    id: 'e3',
    sender: {
      name: 'Michael Williams',
      email: 'michael.williams@hospital.org',
      avatar: ''
    },
    recipients: ['social.worker@agency.gov'],
    subject: 'Medical Update - Smith Children',
    preview: "I'm writing to provide an update on the medical examination conducted for the Smith children yesterday. The results indicate...",
    body: `<p>Hello,</p>
           <p>I'm writing to provide an update on the medical examination conducted for the Smith children yesterday.</p>
           <p>The results indicate that both children are in good health overall, but James will need follow-up dental work. I've attached the full medical report for your records.</p>
           <p>Please let me know if you need any additional information.</p>
           <p>Regards,<br>Dr. Michael Williams<br>Children's Hospital</p>`,
    date: new Date('2023-08-13T16:45:00'),
    isRead: true,
    isStarred: true,
    hasAttachments: true,
    labels: ['medical'],
    folder: 'inbox'
  },
  {
    id: 'e4',
    sender: {
      name: 'Training Department',
      email: 'training@agency.gov',
      avatar: ''
    },
    recipients: ['all-staff@agency.gov'],
    subject: 'Mandatory Training: Cultural Competency',
    preview: 'This is a reminder that all staff are required to complete the Cultural Competency training by the end of this month...',
    body: `<p>This is a reminder that all staff are required to complete the Cultural Competency training by the end of this month.</p>
           <p>The training is available through our online learning platform and takes approximately 2 hours to complete.</p>
           <p>If you have any questions or technical issues, please contact the Training Department.</p>
           <p>Thank you,<br>Training Department</p>`,
    date: new Date('2023-08-12T10:00:00'),
    isRead: false,
    isStarred: false,
    hasAttachments: false,
    labels: ['training'],
    folder: 'inbox'
  },
  {
    id: 'e5',
    sender: {
      name: 'Robert Davis',
      email: 'robert.davis@school.edu',
      avatar: ''
    },
    recipients: ['social.worker@agency.gov'],
    subject: 'Academic Progress Report - Johnson Children',
    preview: 'Attached is the academic progress report for the Johnson children for the current semester. Both students have shown improvement...',
    body: `<p>Hello,</p>
           <p>Attached is the academic progress report for the Johnson children for the current semester.</p>
           <p>Both students have shown improvement in their academic performance, particularly in mathematics and reading comprehension. However, there are still some behavioral concerns that we should discuss.</p>
           <p>Would you be available for a brief meeting next week?</p>
           <p>Best regards,<br>Robert Davis<br>School Counselor</p>`,
    date: new Date('2023-08-11T13:20:00'),
    isRead: true,
    isStarred: false,
    hasAttachments: true,
    labels: ['education'],
    folder: 'inbox'
  },
  {
    id: 'e6',
    sender: {
      name: 'Social Worker',
      email: 'social.worker@agency.gov',
      avatar: ''
    },
    recipients: ['sarah.johnson@agency.gov'],
    subject: 'Re: Case Review Meeting for Thompson Family',
    preview: 'Hi Sarah, I am available on Tuesday at 2pm for the Thompson family case review. I will prepare the necessary documentation...',
    body: `<p>Hi Sarah,</p>
           <p>I am available on Tuesday at 2pm for the Thompson family case review. I will prepare the necessary documentation and update the case notes before our meeting.</p>
           <p>Should we invite any other team members to join us?</p>
           <p>Regards,<br>Social Worker</p>`,
    date: new Date('2023-08-15T15:10:00'),
    isRead: true,
    isStarred: false,
    hasAttachments: false,
    labels: ['meeting'],
    folder: 'sent'
  }
];

const EmailClient: React.FC = () => {
  const [selectedFolder, setSelectedFolder] = useState('inbox');
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredEmails = MOCK_EMAILS.filter(email => {
    // Filter by folder
    if (email.folder !== selectedFolder) return false;
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return email.subject.toLowerCase().includes(query) || 
             email.sender.name.toLowerCase().includes(query) ||
             email.sender.email.toLowerCase().includes(query) ||
             email.preview.toLowerCase().includes(query);
    }
    
    return true;
  });

  const formatDate = (date: Date) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const emailDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    
    if (emailDate.getTime() === today.getTime()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (date.getFullYear() === now.getFullYear()) {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    } else {
      return date.toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' });
    }
  };

  const handleFolderSelect = (folder: string) => {
    setSelectedFolder(folder);
    setSelectedEmail(null);
  };

  const handleEmailSelect = (email: Email) => {
    setSelectedEmail(email);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Layout>
      <div className="h-[calc(100vh-100px)] flex flex-col animate-fade-in">
        <h1 className="text-xl font-bold tracking-tight mb-4">Email</h1>
        
        <div className="flex flex-col md:flex-row h-full gap-4">
          {/* Email sidebar */}
          <div className="w-full md:w-64 flex flex-col">
            <Button className="w-full mb-4">
              <Plus className="mr-2 h-4 w-4" />
              Compose
            </Button>
            
            <div className="space-y-1">
              <Button 
                variant={selectedFolder === 'inbox' ? 'default' : 'ghost'} 
                className="w-full justify-start"
                onClick={() => handleFolderSelect('inbox')}
              >
                <Inbox className="mr-2 h-4 w-4" />
                Inbox
                <Badge className="ml-auto">{MOCK_EMAILS.filter(e => e.folder === 'inbox' && !e.isRead).length}</Badge>
              </Button>
              <Button 
                variant={selectedFolder === 'sent' ? 'default' : 'ghost'} 
                className="w-full justify-start"
                onClick={() => handleFolderSelect('sent')}
              >
                <Send className="mr-2 h-4 w-4" />
                Sent
              </Button>
              <Button 
                variant={selectedFolder === 'drafts' ? 'default' : 'ghost'} 
                className="w-full justify-start"
                onClick={() => handleFolderSelect('drafts')}
              >
                <FileText className="mr-2 h-4 w-4" />
                Drafts
              </Button>
              <Button 
                variant={selectedFolder === 'archive' ? 'default' : 'ghost'} 
                className="w-full justify-start"
                onClick={() => handleFolderSelect('archive')}
              >
                <Archive className="mr-2 h-4 w-4" />
                Archive
              </Button>
              <Button 
                variant={selectedFolder === 'trash' ? 'default' : 'ghost'} 
                className="w-full justify-start"
                onClick={() => handleFolderSelect('trash')}
              >
                <Trash className="mr-2 h-4 w-4" />
                Trash
              </Button>
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-1">
              <h3 className="text-sm font-medium px-4 mb-2">Labels</h3>
              <Button 
                variant="ghost" 
                className="w-full justify-start"
              >
                <Badge className="bg-red-500 h-2 w-2 rounded-full mr-2 p-0" />
                Important
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start"
              >
                <Badge className="bg-blue-500 h-2 w-2 rounded-full mr-2 p-0" />
                Work
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start"
              >
                <Badge className="bg-green-500 h-2 w-2 rounded-full mr-2 p-0" />
                Personal
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start"
              >
                <Badge className="bg-amber-500 h-2 w-2 rounded-full mr-2 p-0" />
                Urgent
              </Button>
            </div>
            
            <div className="mt-auto pt-4">
              <div className="text-xs text-muted-foreground px-4">
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  Last synced: Just now
                </div>
                <div className="mt-1">
                  Storage: 15% used
                </div>
              </div>
            </div>
          </div>
          
          {/* Email list and content */}
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {!selectedEmail ? (
              <Card className="flex-1 flex flex-col overflow-hidden">
                <CardHeader className="pb-2 pt-4">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">
                      {selectedFolder.charAt(0).toUpperCase() + selectedFolder.slice(1)}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Search emails..."
                          className="pl-8 w-60"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="select-all" />
                      <Button variant="ghost" size="icon">
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Archive className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {filteredEmails.length} {filteredEmails.length === 1 ? 'email' : 'emails'}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-auto p-0">
                  {filteredEmails.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                      <Mail className="h-8 w-8 mb-2" />
                      <p>No emails found</p>
                    </div>
                  ) : (
                    <div className="divide-y">
                      {filteredEmails.map((email) => (
                        <div 
                          key={email.id}
                          className={`p-4 hover:bg-muted/50 cursor-pointer flex items-start ${!email.isRead ? 'bg-muted/30 font-medium' : ''}`}
                          onClick={() => handleEmailSelect(email)}
                        >
                          <div className="flex items-center mr-4">
                            <Checkbox className="mr-2" checked={false} />
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                              <Star className={email.isStarred ? "h-4 w-4 text-amber-400 fill-amber-400" : "h-4 w-4"} />
                            </Button>
                          </div>
                          
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center">
                                <Avatar className="h-8 w-8 mr-2">
                                  <AvatarFallback>{getInitials(email.sender.name)}</AvatarFallback>
                                </Avatar>
                                <span className="truncate">{email.sender.name}</span>
                              </div>
                              <span className="text-xs text-muted-foreground whitespace-nowrap">
                                {formatDate(email.date)}
                              </span>
                            </div>
                            
                            <div className="truncate font-medium mb-1">{email.subject}</div>
                            
                            <div className="flex items-center">
                              <p className="truncate text-sm text-muted-foreground mr-2">{email.preview}</p>
                              <div className="flex items-center space-x-1 flex-shrink-0">
                                {email.hasAttachments && (
                                  <Paperclip className="h-3 w-3 text-muted-foreground" />
                                )}
                                {email.labels.map(label => (
                                  <Badge key={label} variant="outline" className="text-xs">{label}</Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Email list column (narrower on desktop when email is selected) */}
                <Card className="hidden md:flex md:w-1/3 flex-col overflow-hidden">
                  <CardHeader className="pb-2 pt-4">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">
                        {selectedFolder.charAt(0).toUpperCase() + selectedFolder.slice(1)}
                      </CardTitle>
                      <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 overflow-auto p-0">
                    <div className="divide-y">
                      {filteredEmails.map((email) => (
                        <div 
                          key={email.id}
                          className={`p-4 hover:bg-muted/50 cursor-pointer ${email.id === selectedEmail.id ? 'bg-muted' : ''} ${!email.isRead ? 'font-medium' : ''}`}
                          onClick={() => handleEmailSelect(email)}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="truncate">{email.sender.name}</span>
                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                              {formatDate(email.date)}
                            </span>
                          </div>
                          
                          <div className="truncate font-medium mb-1">{email.subject}</div>
                          
                          <p className="truncate text-sm text-muted-foreground">{email.preview}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Email content */}
                <Card className="flex-1 flex flex-col overflow-hidden md:ml-4">
                  <CardHeader className="pb-2 pt-4 border-b">
                    <div className="flex justify-between items-center">
                      <Button variant="ghost" className="md:hidden" onClick={() => setSelectedEmail(null)}>
                        <ChevronDown className="h-4 w-4 mr-2" />
                        Back
                      </Button>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon">
                          <Archive className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Star className={selectedEmail.isStarred ? "h-4 w-4 text-amber-400 fill-amber-400" : "h-4 w-4"} />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 overflow-auto p-4">
                    <div className="mb-6">
                      <h2 className="text-xl font-bold mb-4">{selectedEmail.subject}</h2>
                      
                      <div className="flex items-start mb-4">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarFallback>{getInitials(selectedEmail.sender.name)}</AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">{selectedEmail.sender.name}</div>
                              <div className="text-sm text-muted-foreground">{selectedEmail.sender.email}</div>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {formatDate(selectedEmail.date)}
                            </div>
                          </div>
                          
                          <div className="text-sm text-muted-foreground mt-1">
                            To: {selectedEmail.recipients.join(', ')}
                          </div>
                        </div>
                      </div>
                      
                      <Separator className="my-4" />
                      
                      <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: selectedEmail.body }} />
                      
                      {selectedEmail.hasAttachments && (
                        <div className="mt-6">
                          <h3 className="text-sm font-medium mb-2">Attachments</h3>
                          <div className="flex items-center p-3 border rounded-md bg-muted/50">
                            <FileText className="h-8 w-8 mr-3 text-primary" />
                            <div className="flex-1">
                              <div className="text-sm font-medium">Document.pdf</div>
                              <div className="text-xs text-muted-foreground">248 KB</div>
                            </div>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="border-t py-3">
                    <div className="w-full">
                      <Button className="mr-2">
                        <Mail className="h-4 w-4 mr-2" />
                        Reply
                      </Button>
                      <Button variant="outline">
                        Forward
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmailClient;
