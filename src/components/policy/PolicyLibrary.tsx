
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, AlertTriangle } from 'lucide-react';
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
      <div className="space-y-3">
        <PolicyHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <Card className="overflow-hidden">
          <CardHeader className="py-3">
            <div className="flex flex-col space-y-1">
              <CardTitle className="text-lg">Policy Documents</CardTitle>
              <CardDescription className="text-sm">Access current agency policies and procedures</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-0 pb-2">
            <Tabs defaultValue="all" onValueChange={setActiveTab}>
              <TabsList className="mb-3">
                <TabsTrigger value="all">All Policies</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="drafts">Drafts</TabsTrigger>
                <TabsTrigger value="archived">Archived</TabsTrigger>
              </TabsList>
              
              <PolicyList policies={filteredPolicies} />
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between border-t py-2 text-sm">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Last synchronized: Today at 9:42 AM</span>
            </div>
            <Button size="sm">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Report Issue
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default PolicyLibrary;
