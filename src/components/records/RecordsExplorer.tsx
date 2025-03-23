
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardDescription, CardFooter } from '@/components/ui/card';
import { RecordFilterPanel } from './RecordFilterPanel';
import { RecordSearchToolbar } from './RecordSearchToolbar';
import { RecordPagination } from './RecordPagination';
import { MOCK_RECORDS } from './mockData';
import { RecordsHeader } from './RecordsHeader';
import { RecordContent } from './RecordContent';
import { useRecordsFiltering } from './hooks/useRecordsFiltering';
import { useRecordSelection } from './hooks/useRecordSelection';
import { usePresetFilters } from './PresetUtils';

const RecordsExplorer: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'grid' | 'table'>('list');
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

  return (
    <Layout>
      <div className="space-y-6">
        <RecordsHeader viewMode={viewMode} setViewMode={setViewMode} />
        
        {/* Filter Panel - Horizontal across the top */}
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
        
        {/* Records Card - Full width */}
        <div className="w-full">
          <Card className="shadow-md border-muted">
            <CardHeader className="pb-2">
              <RecordSearchToolbar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedRecords={selectedRecords}
                recordCount={filteredRecords.length}
              />
              <CardDescription>
                {filteredRecords.length} {filteredRecords.length === 1 ? 'record' : 'records'} found
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <RecordContent 
                viewMode={viewMode}
                filteredRecords={filteredRecords}
                selectedRecords={selectedRecords}
                handleSelectRecord={handleSelectRecord}
                handleSelectAll={handleSelectAll}
                sortField={sortField}
                sortDirection={sortDirection}
                toggleSort={toggleSort}
              />
            </CardContent>
            <CardFooter className="border-t p-4">
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
