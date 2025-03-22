
import { Policy } from './types';

export const MOCK_POLICIES: Policy[] = [
  {
    id: 'POL-001',
    title: 'Child Placement Guidelines',
    description: 'Standard operating procedures for child placement decisions and documentation.',
    category: 'Child Services',
    lastUpdated: new Date('2023-07-15'),
    status: 'active',
    isNew: true,
    fileSize: '1.2 MB',
    fileType: 'pdf'
  },
  {
    id: 'POL-002',
    title: 'Case Documentation Requirements',
    description: 'Requirements for documenting case information, contacts, and assessments.',
    category: 'Documentation',
    lastUpdated: new Date('2023-05-10'),
    status: 'active',
    isNew: false,
    fileSize: '875 KB',
    fileType: 'pdf'
  },
  {
    id: 'POL-003',
    title: 'Foster Home Licensing Standards',
    description: 'Standards and procedures for licensing and monitoring foster homes.',
    category: 'Foster Care',
    lastUpdated: new Date('2023-06-22'),
    status: 'under-review',
    isNew: false,
    fileSize: '2.1 MB',
    fileType: 'word'
  },
  {
    id: 'POL-004',
    title: 'Mandated Reporting Guidelines',
    description: 'Guidelines for mandated reporters and agency reporting procedures.',
    category: 'Compliance',
    lastUpdated: new Date('2023-02-18'),
    status: 'active',
    isNew: false,
    fileSize: '950 KB',
    fileType: 'pdf'
  },
  {
    id: 'POL-005',
    title: 'Interstate Compact Procedures',
    description: 'Protocols for managing cases across state lines.',
    category: 'Legal',
    lastUpdated: new Date('2023-08-01'),
    status: 'draft',
    isNew: true,
    fileSize: '1.5 MB',
    fileType: 'word'
  },
  {
    id: 'POL-006',
    title: 'Family Preservation Services',
    description: 'Guidelines for delivering family preservation and support services.',
    category: 'Family Services',
    lastUpdated: new Date('2022-11-30'),
    status: 'archived',
    isNew: false,
    fileSize: '1.1 MB',
    fileType: 'pdf'
  }
];
