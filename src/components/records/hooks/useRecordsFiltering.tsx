
import { useState } from 'react';
import { Record } from '../types';
import { filterRecords, sortRecords } from '../RecordUtils';

export const useRecordsFiltering = (records: Record[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [sortField, setSortField] = useState<keyof Record>('updatedAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);

  // Filter records based on multiple criteria
  const filteredRecords = filterRecords(
    records,
    searchQuery,
    selectedType,
    selectedStatus,
    showFavoritesOnly
  );

  // Sort filtered records
  const sortedRecords = sortRecords(filteredRecords, sortField, sortDirection);

  const toggleSort = (field: keyof Record) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const clearFilters = () => {
    setSelectedType(null);
    setSelectedStatus(null);
    setShowFavoritesOnly(false);
  };

  const filteringProps = {
    searchQuery,
    setSearchQuery,
    selectedType,
    setSelectedType,
    selectedStatus,
    setSelectedStatus,
    showFavoritesOnly,
    setShowFavoritesOnly,
    sortField,
    sortDirection,
    toggleSort,
    currentPage,
    setCurrentPage,
    isAdvancedSearchOpen,
    setIsAdvancedSearchOpen,
    clearFilters
  };

  return {
    filteringProps,
    filteredRecords: sortedRecords
  };
};
