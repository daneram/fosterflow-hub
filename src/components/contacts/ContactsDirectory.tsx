import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Contact, 
  Search, 
  Plus, 
  Filter, 
  PhoneCall,
  Mail,
  MapPin,
  Tag,
  Building,
  Users,
  Calendar,
  Clock,
  Star
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';

interface ContactItem {
  id: string;
  name: string;
  role: string;
  organization: string;
  category: string;
  email: string;
  phone: string;
  address?: string;
  notes?: string;
  lastContact?: string;
  avatar?: string;
  initials: string;
  tags: string[];
  isFavorite: boolean;
}

const mockContacts: ContactItem[] = [
  {
    id: 'CONT-001',
    name: 'Dr. Michelle Thompson',
    role: 'Child Psychologist',
    organization: 'Wellbeing Health Services',
    category: 'Professional',
    email: 'michelle.thompson@wellbeing.org',
    phone: '0121-555-7890',
    address: '15 Health Avenue, Birmingham, B1 2WS',
    notes: 'Specialist in trauma-informed therapy for children in care.',
    lastContact: '2023-10-05',
    initials: 'MT',
    tags: ['Health', 'Mental Health', 'Therapy'],
    isFavorite: true
  },
  {
    id: 'CONT-002',
    name: 'Birmingham City School',
    role: '',
    organization: 'Birmingham City School',
    category: 'Education',
    email: 'admin@birminghamcityschool.edu',
    phone: '0121-555-2345',
    address: '42 Learning Lane, Birmingham, B2 4ED',
    notes: 'Main contact is Susan Brown, Head of Inclusion.',
    lastContact: '2023-09-20',
    initials: 'BC',
    tags: ['Education', 'Primary School'],
    isFavorite: false
  },
  {
    id: 'CONT-003',
    name: 'James Wilson',
    role: 'Legal Advisor',
    organization: 'Child Advocacy Legal Services',
    category: 'Legal',
    email: 'james.wilson@childadvocacy.org',
    phone: '0121-555-3456',
    address: '78 Justice Road, Birmingham, B3 6LA',
    notes: 'Specializes in children\'s rights and foster care legal matters.',
    lastContact: '2023-10-12',
    initials: 'JW',
    tags: ['Legal', 'Advocacy'],
    isFavorite: true
  },
  {
    id: 'CONT-004',
    name: 'Manchester Local Authority',
    role: '',
    organization: 'Manchester Local Authority',
    category: 'Government',
    email: 'childrensservices@manchester.gov.uk',
    phone: '0161-555-6789',
    address: 'Town Hall, Manchester, M2 5DB',
    notes: 'Contact for inter-authority placement arrangements.',
    lastContact: '2023-09-15',
    initials: 'MLA',
    tags: ['Local Authority', 'Government'],
    isFavorite: false
  },
  {
    id: 'CONT-005',
    name: 'Sarah Johnson',
    role: 'Community Support Worker',
    organization: 'Family Support Network',
    category: 'Support',
    email: 'sarah.johnson@familysupport.org',
    phone: '0121-555-9012',
    address: '23 Community Street, Birmingham, B4 7CS',
    notes: 'Runs support groups for foster families.',
    lastContact: '2023-10-08',
    initials: 'SJ',
    tags: ['Community', 'Support Group'],
    isFavorite: false
  },
  {
    id: 'CONT-006',
    name: 'Dr. Robert Chen',
    role: 'Pediatrician',
    organization: 'Children\'s Medical Center',
    category: 'Medical',
    email: 'robert.chen@childrensmedical.org',
    phone: '0121-555-3456',
    address: '101 Health Boulevard, Birmingham, B5 8MC',
    notes: 'Specializes in developmental assessments for looked-after children.',
    lastContact: '2023-09-28',
    initials: 'RC',
    tags: ['Health', 'Medical', 'Pediatric'],
    isFavorite: true
  },
  {
    id: 'CONT-007',
    name: 'West Midlands Police',
    role: '',
    organization: 'West Midlands Police',
    category: 'Police',
    email: 'safeguarding@west-midlands.police.uk',
    phone: '0121-555-7890',
    address: 'Central Police Station, Birmingham, B6 9PS',
    notes: 'Child protection unit contact.',
    lastContact: '2023-08-15',
    initials: 'WMP',
    tags: ['Police', 'Safeguarding'],
    isFavorite: false
  },
  {
    id: 'CONT-008',
    name: 'Lisa Martinez',
    role: 'Independent Reviewing Officer',
    organization: 'Quality Assurance Service',
    category: 'Professional',
    email: 'lisa.martinez@qa-service.org',
    phone: '0121-555-2345',
    address: '56 Review Lane, Birmingham, B7 1QA',
    notes: 'Chairs looked-after children reviews.',
    lastContact: '2023-10-01',
    initials: 'LM',
    tags: ['Review', 'Quality Assurance'],
    isFavorite: false
  },
  {
    id: 'CONT-009',
    name: 'Birmingham Children\'s Hospital',
    role: '',
    organization: 'Birmingham Children\'s Hospital',
    category: 'Medical',
    email: 'info@bch.nhs.uk',
    phone: '0121-555-8901',
    address: 'Hospital Way, Birmingham, B4 6NH',
    notes: 'Main reception contact for appointments.',
    lastContact: '2023-09-10',
    initials: 'BCH',
    tags: ['Health', 'Hospital', 'Specialist'],
    isFavorite: true
  }
];

const ContactsDirectory: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-4 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Contacts Directory</h1>
          <p className="text-muted-foreground text-sm">Directory of external stakeholders, professionals, and service providers</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center w-full max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search contacts..." className="pl-8 pr-4 py-2 h-9" />
            </div>
            <Button className="ml-2" size="sm">
              <Plus className="h-4 w-4 mr-1" />
              New Contact
            </Button>
          </div>
          <Button size="sm" variant="outline" className="w-full sm:w-auto">
            <Filter className="h-4 w-4 mr-1" />
            Filter
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Contact className="h-5 w-5 mr-2 text-primary" />
              Contacts
            </CardTitle>
          </CardHeader>
          
          <Tabs defaultValue="all">
            <div className="px-6">
              <TabsList className="grid w-full max-w-md grid-cols-4 h-9">
                <TabsTrigger value="all">All Contacts</TabsTrigger>
                <TabsTrigger value="favorites">Favorites</TabsTrigger>
                <TabsTrigger value="categories">Categories</TabsTrigger>
                <TabsTrigger value="recent">Recent</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="p-0">
              <CardContent className="pt-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {mockContacts.map(contact => (
                    <div 
                      key={contact.id} 
                      className="border rounded-lg overflow-hidden hover:border-primary transition-colors"
                    >
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarImage src={contact.avatar} />
                              <AvatarFallback className="bg-primary/10 text-primary">
                                {contact.initials}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center">
                                <h3 className="font-medium">{contact.name}</h3>
                                {contact.isFavorite && (
                                  <Star className="h-3.5 w-3.5 ml-1 text-yellow-400 fill-yellow-400" />
                                )}
                              </div>
                              <div className="text-xs text-muted-foreground">{contact.id}</div>
                            </div>
                          </div>
                          <Badge variant="outline" className="capitalize">{contact.category}</Badge>
                        </div>
                        
                        <div className="text-xs space-y-1 mb-3">
                          {contact.role && (
                            <div className="flex items-center">
                              <Users className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                              <span>{contact.role}</span>
                            </div>
                          )}
                          <div className="flex items-center">
                            <Building className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                            <span>{contact.organization}</span>
                          </div>
                          <div className="flex items-center">
                            <Mail className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                            <span>{contact.email}</span>
                          </div>
                          <div className="flex items-center">
                            <PhoneCall className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                            <span>{contact.phone}</span>
                          </div>
                          {contact.address && (
                            <div className="flex items-start">
                              <MapPin className="h-3.5 w-3.5 mr-1.5 mt-0.5 shrink-0 text-muted-foreground" />
                              <span>{contact.address}</span>
                            </div>
                          )}
                        </div>
                        
                        {contact.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {contact.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs px-1.5 py-0">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                        
                        {contact.lastContact && (
                          <div className="text-xs text-muted-foreground mb-3 flex items-center">
                            <Clock className="h-3.5 w-3.5 mr-1" />
                            <span>Last contacted: {contact.lastContact}</span>
                          </div>
                        )}
                        
                        <div className="flex justify-between items-center">
                          <Button size="sm" variant="ghost" className="h-8 text-xs">
                            <PhoneCall className="h-3.5 w-3.5 mr-1" />
                            Call
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 text-xs">
                            <Mail className="h-3.5 w-3.5 mr-1" />
                            Email
                          </Button>
                          <Button size="sm" variant="outline" className="h-8">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="favorites" className="p-0">
              <CardContent className="pt-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {mockContacts
                    .filter(contact => contact.isFavorite)
                    .map(contact => (
                      <div 
                        key={contact.id} 
                        className="border rounded-lg overflow-hidden hover:border-primary transition-colors"
                      >
                        {/* Similar content as "all" tab but filtered for favorites */}
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <Avatar className="h-10 w-10 mr-3">
                                <AvatarImage src={contact.avatar} />
                                <AvatarFallback className="bg-primary/10 text-primary">
                                  {contact.initials}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="flex items-center">
                                  <h3 className="font-medium">{contact.name}</h3>
                                  <Star className="h-3.5 w-3.5 ml-1 text-yellow-400 fill-yellow-400" />
                                </div>
                                <div className="text-xs text-muted-foreground">{contact.organization}</div>
                              </div>
                            </div>
                            <Badge variant="outline" className="capitalize">{contact.category}</Badge>
                          </div>
                          
                          <div className="text-xs space-y-1 mb-3">
                            <div className="flex items-center">
                              <Mail className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                              <span>{contact.email}</span>
                            </div>
                            <div className="flex items-center">
                              <PhoneCall className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                              <span>{contact.phone}</span>
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <Button size="sm" variant="ghost" className="h-8 text-xs">
                              <PhoneCall className="h-3.5 w-3.5 mr-1" />
                              Call
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 text-xs">
                              <Mail className="h-3.5 w-3.5 mr-1" />
                              Email
                            </Button>
                            <Button size="sm" variant="outline" className="h-8">
                              View
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="categories" className="p-0">
              <CardContent className="pt-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {[...new Set(mockContacts.map(contact => contact.category))].sort().map(category => {
                    const categoryContacts = mockContacts.filter(contact => contact.category === category);
                    
                    return (
                      <div 
                        key={category} 
                        className="border rounded-lg overflow-hidden hover:border-primary transition-colors"
                      >
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <div className="bg-primary/10 p-2 rounded-full mr-3">
                                <Tag className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-medium capitalize">{category}</h3>
                                <div className="text-xs text-muted-foreground">{categoryContacts.length} contacts</div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-2 mb-3">
                            {categoryContacts.slice(0, 3).map(contact => (
                              <div key={contact.id} className="flex items-center">
                                <Checkbox id={contact.id} className="mr-2" />
                                <label htmlFor={contact.id} className="text-sm">{contact.name}</label>
                              </div>
                            ))}
                            {categoryContacts.length > 3 && (
                              <div className="text-xs text-muted-foreground">
                                + {categoryContacts.length - 3} more contacts
                              </div>
                            )}
                          </div>
                          
                          <Button size="sm" variant="outline" className="w-full">
                            View Category
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="recent" className="p-0">
              <CardContent className="pt-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {mockContacts
                    .filter(contact => contact.lastContact)
                    .sort((a, b) => new Date(b.lastContact!).getTime() - new Date(a.lastContact!).getTime())
                    .slice(0, 6)
                    .map(contact => (
                      <div 
                        key={contact.id} 
                        className="border rounded-lg overflow-hidden hover:border-primary transition-colors"
                      >
                        {/* Similar content as "all" tab but sorted by recent contacts */}
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <Avatar className="h-10 w-10 mr-3">
                                <AvatarImage src={contact.avatar} />
                                <AvatarFallback className="bg-primary/10 text-primary">
                                  {contact.initials}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-medium">{contact.name}</h3>
                                <div className="text-xs text-muted-foreground">{contact.organization}</div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center text-xs mb-3">
                            <Calendar className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                            <span>Last contact: {contact.lastContact}</span>
                          </div>
                          
                          <div className="text-xs space-y-1 mb-3">
                            <div className="flex items-center">
                              <Mail className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                              <span>{contact.email}</span>
                            </div>
                            <div className="flex items-center">
                              <PhoneCall className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                              <span>{contact.phone}</span>
                            </div>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" className="flex-1">
                              <PhoneCall className="h-3.5 w-3.5 mr-1" />
                              Call
                            </Button>
                            <Button size="sm" className="flex-1">
                              <Calendar className="h-3.5 w-3.5 mr-1" />
                              Schedule
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </Layout>
  );
};

export default ContactsDirectory;
