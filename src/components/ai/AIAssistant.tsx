
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Bot, 
  BotMessageSquare, 
  ChevronRight, 
  Clock, 
  Info, 
  MessageSquare, 
  RotateCcw, 
  Send, 
  Settings, 
  User,
  Lightbulb
} from 'lucide-react';

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: string;
}

interface Suggestion {
  id: number;
  content: string;
}

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hello, I'm your AI assistant. How can I help you with case management today?",
      sender: 'assistant',
      timestamp: formatTime(new Date()),
    },
  ]);
  const [input, setInput] = useState('');

  // Sample suggestions
  const suggestions: Suggestion[] = [
    {
      id: 1,
      content: "Draft a case note for my visit with the Johnson family today",
    },
    {
      id: 2,
      content: "Summarize placement options for sibling groups in our region",
    },
    {
      id: 3,
      content: "Help me find relevant policies for emergency placements",
    },
    {
      id: 4,
      content: "Generate a report template for court submissions",
    },
  ];

  function formatTime(date: Date): string {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    const newUserMessage: Message = {
      id: messages.length + 1,
      content: input,
      sender: 'user',
      timestamp: formatTime(new Date()),
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInput('');

    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        content: getAIResponse(input),
        sender: 'assistant',
        timestamp: formatTime(new Date()),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setInput(suggestion.content);
  };

  // Simple AI response simulation
  const getAIResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();
    
    if (lowerInput.includes('johnson family') || lowerInput.includes('case note') || lowerInput.includes('visit')) {
      return "Here's a draft case note template for your visit with the Johnson family:\n\n**Date:** " + new Date().toLocaleDateString() + "\n**Participants:** [List family members present]\n**Purpose of Visit:** [Monthly check-in/specific assessment]\n\n**Observations:**\n- Home environment was clean and organized\n- Children appeared well-cared for and engaged\n- Parents reported [specific updates]\n\n**Discussion Points:**\n- Reviewed progress on service plan goals\n- Discussed upcoming school transition for Emma\n- Addressed concerns about Liam's behavioral issues\n\n**Action Items:**\n- Schedule follow-up appointment with family therapist\n- Connect parents with local support group\n- Provide information on summer programs for the children\n\n**Assessment:**\n[Your professional assessment of the family's progress and any concerns]";
    } 
    
    if (lowerInput.includes('placement') || lowerInput.includes('sibling')) {
      return "Based on our current database, here are the placement options for sibling groups in our region:\n\n1. **Foster Homes with Sibling Capacity:**\n   - 12 homes currently certified for 3+ children\n   - 5 homes with immediate availability\n   - 3 homes specifically trained for trauma-informed sibling care\n\n2. **Group Homes:**\n   - 2 facilities that can accommodate siblings while maintaining connection\n   - Average wait time: 2-3 weeks\n\n3. **Kinship Options:**\n   - Consider assessment of extended family members as priority\n   - Support services available for kinship placements\n\nWould you like me to provide more detailed information on any of these options?";
    }
    
    if (lowerInput.includes('policy') || lowerInput.includes('emergency')) {
      return "I've located these relevant policies for emergency placements:\n\n1. **Policy #EP-103:** Emergency Placement Protocol\n   - 24-hour assessment requirements\n   - Expedited background check procedures\n   - Temporary certification guidelines\n\n2. **Policy #SC-217:** Safety Considerations in Emergency Placements\n   - Minimum physical environment standards\n   - Supervision requirements\n   - Risk assessment guidelines\n\n3. **Policy #DC-405:** Documentation Requirements for Emergency Placements\n   - Required forms and signatures\n   - Timeline for completion\n   - Follow-up assessment schedule\n\nThese policies can be found in the Policy Library under the 'Placement' and 'Safety' categories.";
    }
    
    if (lowerInput.includes('report') || lowerInput.includes('court') || lowerInput.includes('template')) {
      return "I've generated a basic court report template for you:\n\n**IN THE FAMILY COURT OF [COUNTY] COUNTY**\n\n**CASE NUMBER:** [Case Number]\n\n**IN THE MATTER OF:** [Child's Name], a minor\n\n**SOCIAL WORKER'S REPORT TO THE COURT**\n\n**I. INTRODUCTION**\n- Child's information (name, DOB, current placement)\n- Reason for court involvement\n- Date of last hearing and court orders\n\n**II. CURRENT SITUATION**\n- Placement information and stability\n- Visitation compliance and quality\n- Services being provided and participation\n\n**III. PROGRESS TOWARDS CASE PLAN GOALS**\n- Parent/Guardian progress\n- Child's adjustment and wellbeing\n- Remaining concerns\n\n**IV. RECOMMENDATIONS**\n- Continued services\n- Placement recommendations\n- Visitation plan\n- Additional court orders requested\n\n**Respectfully submitted,**\n[Your Name], Social Worker\n[Date]\n\nWould you like me to customize this template further?";
    }
    
    return "I understand you're asking about \"" + userInput + "\". I can assist with case documentation, policy references, placement resources, assessment tools, and other tasks related to your foster care cases. Could you provide more details about what you need help with?";
  };

  return (
    <div className="h-full animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">AI Assistant</h1>
        <p className="text-muted-foreground mt-1">Get help with documentation, research, and case management</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-14rem)]">
        <Card className="glass-card col-span-1 lg:col-span-9 h-full flex flex-col overflow-hidden">
          <CardHeader className="px-6 py-4 border-b">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <BotMessageSquare className="h-4 w-4 text-primary" />
                </div>
                <CardTitle>Foster Care Assistant</CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <RotateCcw className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.sender === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] rounded-lg px-4 py-2 ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <div className="whitespace-pre-line text-sm">
                      {message.content}
                    </div>
                    <div className="mt-1 text-right">
                      <span className="text-xs opacity-70">{message.timestamp}</span>
                    </div>
                  </div>
                  {message.sender === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center ml-2">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        <div className="col-span-1 lg:col-span-3 space-y-6">
          <Card className="glass-card">
            <CardHeader className="px-4 py-3">
              <CardTitle className="text-base">How Can I Help?</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-2">
                {suggestions.map((suggestion) => (
                  <Button
                    key={suggestion.id}
                    variant="outline"
                    className="w-full justify-start text-sm h-auto py-2"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <Lightbulb className="h-4 w-4 mr-2 text-primary" />
                    <span className="truncate text-left">{suggestion.content}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader className="px-4 py-3">
              <CardTitle className="text-base">Assistant Capabilities</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <FileDocIcon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Documentation Assistance</p>
                    <p className="text-xs text-muted-foreground">Help with case notes, reports, and assessments</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <SearchIcon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Knowledge Search</p>
                    <p className="text-xs text-muted-foreground">Find relevant policies, resources, and research</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <BrainIcon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Case Analysis</p>
                    <p className="text-xs text-muted-foreground">Help identify patterns and considerations</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <ClipboardCheckIcon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Task Management</p>
                    <p className="text-xs text-muted-foreground">Reminders and workflow assistance</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs text-muted-foreground bg-muted/50 p-2 rounded-md">
                <Info className="h-3 w-3" />
                <span>All recommendations should be reviewed by a professional.</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

function FileDocIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M8 13h8" />
      <path d="M8 17h8" />
      <path d="M8 9h2" />
    </svg>
  );
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function BrainIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
    </svg>
  );
}

function ClipboardCheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="m9 14 2 2 4-4" />
    </svg>
  );
}

export default AIAssistant;
