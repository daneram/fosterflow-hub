
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { FileText } from 'lucide-react';
import { RecordFilterPanel } from './RecordFilterPanel';
import { RecordListView } from './RecordListView';
import { RecordGridView } from './RecordGridView';
import { RecordTableView } from './RecordTableView';
import { RecordSearchToolbar } from './RecordSearchToolbar';
import { RecordViewSelector } from './RecordViewSelector';
import { RecordPagination } from './RecordPagination';
import { MOCK_RECORDS } from './mockData';
import { Record } from './types';
import { 
  formatDate, 
  getTypeIcon, 
  getStatusBadge, 
  getPriorityBadge, 
  getComplianceIcon,
  filterRecords,
  sortRecords
} from './RecordUtils';

const RecordsExplorer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'grid' | 'table'>('list');
  const [selectedRecords, setSelectedRecords] = useState<string[]>([]);
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [sortField, setSortField] = useState<keyof Record>('updatedAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter records based on multiple criteria
  const filteredRecords = filterRecords(
    MOCK_RECORDS,
    searchQuery,
    selectedType,
    selectedStatus,
    showFavoritesOnly
  );

  // Sort records
  const sortedRecords = sortRecords(filteredRecords, sortField, sortDirection);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRecords(sortedRecords.map(record => record.id));
    } else {
      setSelectedRecords([]);
    }
  };

  const handleSelectRecord = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedRecords(prev => [...prev, id]);
    } else {
      setSelectedRecords(prev => prev.filter(recordId => recordId !== id));
    }
  };

  const toggleSort = (field: keyof Record) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const onSelectPreset = (preset: string) => {
    console.log(`Selected preset: ${preset}`);
    // Here you would implement loading a preset configuration
    switch (preset) {
      case 'recent-active-cases':
        setSelectedType('case');
        setSelectedStatus('active');
        break;
      case 'incomplete-assessments':
        setSelectedType('assessment');
        setSelectedStatus('pending');
        break;
      case 'my-documents':
        setSelectedType('document');
        break;
      default:
        break;
    }
  };

  return (
    <Layout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Records Explorer</h1>
          <RecordViewSelector viewMode={viewMode} setViewMode={setViewMode} />
        </div>
        
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="w-full md:w-1/3 lg:w-1/4">
            <RecordFilterPanel
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              showFavoritesOnly={showFavoritesOnly}
              setShowFavoritesOnly={setShowFavoritesOnly}
              isAdvancedSearchOpen={isAdvancedSearchOpen}
              setIsAdvancedSearchOpen={setIsAdvancedSearchOpen}
              onSelectPreset={onSelectPreset}
            />
          </div>
          
          <div className="w-full md:w-2/3 lg:w-3/4">
            <Card>
              <CardHeader className="pb-2">
                <RecordSearchToolbar
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  selectedRecords={selectedRecords}
                  recordCount={sortedRecords.length}
                />
                <CardDescription>
                  {sortedRecords.length} {sortedRecords.length === 1 ? 'record' : 'records'} found
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={viewMode} className="w-full">
                  <TabsContent value="list" className="mt-0">
                    <div className="space-y-4">
                      {sortedRecords.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
                          <FileText className="h-8 w-8 mb-2" />
                          <p>No records found</p>
                        </div>
                      ) : (
                        <>
                          {/* Select All Checkbox */}
                          <div className="flex items-center pb-2">
                            <Checkbox 
                              id="select-all" 
                              checked={selectedRecords.length === sortedRecords.length && sortedRecords.length > 0}
                              onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
                            />
                            <label htmlFor="select-all" className="ml-2 text-sm font-medium">
                              Select All
                            </label>
                          </div>
                          
                          <RecordListView
                            records={sortedRecords}
                            selectedRecords={selectedRecords}
                            handleSelectRecord={handleSelectRecord}
                            handleSelectAll={handleSelectAll}
                            formatDate={formatDate}
                            getTypeIcon={getTypeIcon}
                            getStatusBadge={getStatusBadge}
                            getPriorityBadge={getPriorityBadge}
                            getComplianceIcon={getComplianceIcon}
                          />
                        </>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="grid" className="mt-0">
                    <RecordGridView
                      records={sortedRecords}
                      selectedRecords={selectedRecords}
                      handleSelectRecord={handleSelectRecord}
                      formatDate={formatDate}
                      getTypeIcon={getTypeIcon}
                      getStatusBadge={getStatusBadge}
                      getPriorityBadge={getPriorityBadge}
                      getComplianceIcon={getComplianceIcon}
                    />
                  </TabsContent>
                  
                  <TabsContent value="table" className="mt-0">
                    <RecordTableView
                      records={sortedRecords}
                      selectedRecords={selectedRecords}
                      handleSelectRecord={handleSelectRecord}
                      handleSelectAll={handleSelectAll}
                      formatDate={formatDate}
                      getTypeIcon={getTypeIcon}
                      getStatusBadge={getStatusBadge}
                      getComplianceIcon={getComplianceIcon}
                      sortField={sortField}
                      sortDirection={sortDirection}
                      toggleSort={toggleSort}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="border-t">
                <RecordPagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(sortedRecords.length / 10)}
                  onPageChange={setCurrentPage}
                />
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RecordsExplorer;
