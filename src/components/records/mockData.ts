
import { Record } from './types';

// Enhanced mock records with additional fields and proper IDs
export const MOCK_RECORDS: Record[] = [
  {
    id: 'CAS-150123-001',
    title: 'Johnson Family Case',
    type: 'case',
    client: 'Johnson Family',
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-05-10'),
    status: 'active',
    tags: ['urgent', 'court-involved'],
    priority: 'high',
    completeness: 85,
    owner: 'Sarah Wilson',
    lastAccessed: new Date('2023-05-12'),
    relatedRecords: ['ASS-2023-042', 'DOC-2023-156'],
    compliance: 'complete',
    favorite: true
  },
  {
    id: 'ASS-2023-042',
    title: 'Smith Initial Assessment',
    type: 'assessment',
    client: 'Smith, John',
    createdAt: new Date('2023-03-22'),
    updatedAt: new Date('2023-03-25'),
    status: 'pending',
    tags: ['initial', 'behavioral'],
    priority: 'medium',
    completeness: 60,
    owner: 'Michael Brown',
    lastAccessed: new Date('2023-04-10'),
    relatedRecords: ['CAS-2023-001'],
    compliance: 'incomplete'
  },
  {
    id: 'REP-2023-087',
    title: 'Monthly Progress Report - Williams',
    type: 'report',
    client: 'Williams, Sarah',
    createdAt: new Date('2023-04-30'),
    updatedAt: new Date('2023-04-30'),
    status: 'closed',
    tags: ['monthly', 'progress'],
    priority: 'low',
    completeness: 100,
    owner: 'Emily Davis',
    lastAccessed: new Date('2023-05-02'),
    compliance: 'complete'
  },
  {
    id: 'DOC-180223-156',
    title: 'Medical Records - Thompson Children',
    type: 'document',
    client: 'Thompson Family',
    createdAt: new Date('2023-02-18'),
    updatedAt: new Date('2023-02-18'),
    status: 'active',
    tags: ['medical', 'confidential'],
    priority: 'medium',
    completeness: 100,
    owner: 'Sarah Wilson',
    relatedRecords: ['CAS-2023-001'],
    compliance: 'complete'
  },
  {
    id: 'CAS-050123-002',
    title: 'Davis Family Reunification',
    type: 'case',
    client: 'Davis Family',
    createdAt: new Date('2023-01-05'),
    updatedAt: new Date('2023-05-01'),
    status: 'active',
    tags: ['reunification', 'court-involved'],
    priority: 'urgent',
    completeness: 70,
    owner: 'Robert Johnson',
    lastAccessed: new Date('2023-05-11'),
    compliance: 'overdue',
    favorite: true
  },
  {
    id: 'DOC-100323-198',
    title: 'School Records - Jones Children',
    type: 'document',
    client: 'Jones Family',
    createdAt: new Date('2023-03-10'),
    updatedAt: new Date('2023-03-10'),
    status: 'archived',
    tags: ['education', 'school'],
    priority: 'low',
    completeness: 100,
    owner: 'Michael Brown',
    compliance: 'complete'
  }
];
