import {
  dashboardSection,
  coreSection,
  fosteringSection,
  organizationSection,
  toolsSection
} from './sidebarSections';

// Create a list of sections to prevent re-creation on each render
export const sidebarSections = [
  { key: 'dashboard', section: dashboardSection },
  { key: 'core', section: coreSection },
  { key: 'fostering', section: fosteringSection },
  { key: 'organization', section: organizationSection },
  { key: 'tools', section: toolsSection }
]; 