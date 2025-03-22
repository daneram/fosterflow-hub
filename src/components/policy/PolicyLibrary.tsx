
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Clock, AlertTriangle } from 'lucide-react';
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
      <div className="space-y-4">
        <PolicyHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <Card>
          <CardHeader>
            <CardTitle>Policy Documents</CardTitle>
            <CardDescription>Access current agency policies and procedures</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Policies</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="drafts">Drafts</TabsTrigger>
                <TabsTrigger value="archived">Archived</TabsTrigger>
              </TabsList>
              
              <PolicyList policies={filteredPolicies} />
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Last synchronized: Today at 9:42 AM</span>
            </div>
            <Button>
              <AlertTriangle className="h-4 w-4 mr-2" />
              Report Policy Issue
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default PolicyLibrary;
