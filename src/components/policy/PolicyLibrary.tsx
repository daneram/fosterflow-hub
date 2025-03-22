
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MOCK_POLICIES } from './policyData';
import { filterPolicies } from './policyUtils';
import PolicyHeader from './PolicyHeader';
import PolicyList from './PolicyList';

const PolicyLibrary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filteredPolicies = filterPolicies(MOCK_POLICIES, searchQuery, activeTab);

  return (
    <Layout>
      <div className="space-y-4 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Policy Library</h1>
          <p className="text-muted-foreground text-sm">Access current agency policies and procedures</p>
        </div>

        <PolicyHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <Card>
          <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full">
            <div className="p-4 pb-0">
              <TabsList className="grid w-full max-w-md grid-cols-4 h-9">
                <TabsTrigger value="all">All Policies</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="drafts">Drafts</TabsTrigger>
                <TabsTrigger value="archived">Archived</TabsTrigger>
              </TabsList>
            </div>
            
            <CardContent className="pt-4 pb-3">
              <PolicyList policies={filteredPolicies} />
            </CardContent>
          </Tabs>

          <div className="flex justify-between border-t py-2.5 px-4 text-xs">
            <div className="flex items-center space-x-2">
              <Clock className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-muted-foreground">Last synchronized: Today at 9:42 AM</span>
            </div>
            <Button size="sm" className="h-7 text-xs">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Report Issue
            </Button>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default PolicyLibrary;
