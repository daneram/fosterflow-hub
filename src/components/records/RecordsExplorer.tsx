
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { RecordFilterPanel } from './RecordFilterPanel';
import { RecordSearchToolbar } from './RecordSearchToolbar';
import { RecordPagination } from './RecordPagination';
import { MOCK_RECORDS } from './mockData';
import { RecordsHeader } from './RecordsHeader';
import { RecordContent } from './RecordContent';
import { useRecordsFiltering } from './hooks/useRecordsFiltering';
import { useRecordSelection } from './hooks/useRecordSelection';
import { usePresetFilters } from './PresetUtils';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const RecordsExplorer: React.FC = () => {
  const { filteringProps, filteredRecords } = useRecordsFiltering(MOCK_RECORDS);
  const { selectedRecords, handleSelectRecord, handleSelectAll } = useRecordSelection(filteredRecords);
  const { onSelectPreset } = usePresetFilters();

  const {
    searchQuery,
    setSearchQuery,
    selectedType,
    setSelectedType,
    selectedStatus,
    setSelectedStatus,
    showFavoritesOnly,
    setShowFavoritesOnly,
    isAdvancedSearchOpen,
    setIsAdvancedSearchOpen,
    sortField,
    sortDirection,
    toggleSort,
    currentPage,
    setCurrentPage,
    clearFilters
  } = filteringProps;

  const handlePresetSelect = (preset: string) => {
    onSelectPreset(preset, setSelectedType, setSelectedStatus);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    
    if (isAdvancedSearchOpen) {
      if (selectedStatus) {
        setSelectedStatus(null);
      }
      setIsAdvancedSearchOpen(false);
    }
  };

  return (
    <Layout>
      <div className="w-full space-y-4">
        <RecordsHeader />
        
        <div className="relative w-full max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search records..."
            className="pl-8 h-9 pr-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleClearSearch}
              className="absolute right-0 top-0 h-9 px-2 hover:bg-transparent"
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
        
        <div className="w-full">
          <RecordFilterPanel
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            showFavoritesOnly={showFavoritesOnly}
            setShowFavoritesOnly={setShowFavoritesOnly}
            isAdvancedSearchOpen={isAdvancedSearchOpen}
            setIsAdvancedSearchOpen={setIsAdvancedSearchOpen}
            onSelectPreset={handlePresetSelect}
            clearFilters={clearFilters}
          />
        </div>
        
        <div className="w-full">
          <Card className="border-0 shadow-none">
            <CardHeader className="pb-0 pt-4 px-0">
              <RecordSearchToolbar
                selectedRecords={selectedRecords}
                recordCount={filteredRecords.length}
              />
            </CardHeader>
            <CardContent className="p-0 pt-2">
              <RecordContent 
                filteredRecords={filteredRecords}
                selectedRecords={selectedRecords}
                handleSelectRecord={handleSelectRecord}
                handleSelectAll={handleSelectAll}
                sortField={sortField}
                sortDirection={sortDirection}
                toggleSort={toggleSort}
              />
            </CardContent>
            <CardFooter className="border-0 shadow-none p-0 pt-4 bg-transparent">
              <RecordPagination
                currentPage={currentPage}
                totalPages={Math.ceil(filteredRecords.length / 10)}
                onPageChange={setCurrentPage}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default RecordsExplorer;
