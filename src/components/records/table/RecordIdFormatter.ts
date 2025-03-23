
import { Record } from '../types';

export const formatUniqueIdentifier = (record: Record) => {
  let formattedId = '';
  
  // Format based on record type
  switch(record.type) {
    case 'case':
      // Extract 3 uppercase letters for case ID from the record title
      const titleWords = record.title.split(' ');
      const letters = titleWords.map(word => word[0] || '').join('').substring(0, 3).toUpperCase();
      
      // Format date as DDMMYY
      const dateString = record.createdAt.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      }).replace(/\//g, '');
      
      // Get the numeric part from the ID or default to sequential number
      const numericPart = record.id.match(/\d+/) ? record.id.match(/\d+/)[0].padStart(3, '0') : '001';
      
      formattedId = `CAS-${dateString}-${numericPart}`;
      break;
      
    case 'assessment':
      // For assessments, use year-date-sequential format
      const yearPart = record.createdAt.getFullYear();
      const monthDay = record.createdAt.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit'
      }).replace(/\//g, '');
      
      const assessmentNum = record.id.match(/\d+/) ? record.id.match(/\d+/)[0].padStart(3, '0') : '001';
      formattedId = `${yearPart}-${monthDay}-${assessmentNum}`;
      break;
      
    case 'report':
      // Format reports with year-date-ID format with REP prefix
      const reportYear = record.createdAt.getFullYear();
      const reportDate = record.createdAt.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit'
      }).replace(/\//g, '');
      
      const reportNum = record.id.match(/\d+/) ? record.id.match(/\d+/)[0].padStart(3, '0') : '001';
      formattedId = `REP-${reportYear}-${reportDate}-${reportNum}`;
      break;
      
    case 'document':
      // Format documents with date-ID format
      const docDate = record.createdAt.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      }).replace(/\//g, '');
      
      const docNum = record.id.match(/\d+/) ? record.id.match(/\d+/)[0].padStart(3, '0') : '001';
      formattedId = `DOC-${docDate}-${docNum}`;
      break;
      
    default:
      // For any other type, just use the ID as is
      formattedId = record.id;
  }
  
  return formattedId;
};
