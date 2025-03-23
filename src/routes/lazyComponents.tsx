
import React from "react";

// Helper to add _init() method to lazy components for preloading
const createLazyComponent = (importFn: () => Promise<any>) => {
  const LazyComponent = React.lazy(importFn);
  // Add an _init method that triggers the import but doesn't render
  (LazyComponent as any)._init = () => {
    importFn().catch(() => {
      // Silent catch - just for preloading
    });
  };
  return LazyComponent;
};

// Lazy load all components with preloading capability
export const AIAssistantPage = createLazyComponent(() => import("../pages/AIAssistantPage"));
export const RecordsExplorer = createLazyComponent(() => import("../components/records/RecordsExplorer"));
export const ActivityLog = createLazyComponent(() => import("../components/activity/ActivityLog"));
export const ComplianceTracker = createLazyComponent(() => import("../components/compliance/ComplianceTracker"));
export const InsightsDashboard = createLazyComponent(() => import("../components/insights/InsightsDashboard"));
export const FormFAssessment = createLazyComponent(() => import("../components/formf/FormFAssessment"));
export const ChildrenProfiles = createLazyComponent(() => import("../components/children/ChildrenProfiles"));
export const CarersDirectory = createLazyComponent(() => import("../components/carers/CarersDirectory"));
export const TeamDirectory = createLazyComponent(() => import("../components/team/TeamDirectory"));
export const PolicyLibrary = createLazyComponent(() => import("../components/policy/PolicyLibrary"));
export const TrainingPlatform = createLazyComponent(() => import("../components/training/TrainingPlatform"));
export const RecruitmentPipeline = createLazyComponent(() => import("../components/recruitment/RecruitmentPipeline"));
export const FinanceManager = createLazyComponent(() => import("../components/finance/FinanceManager"));
export const FormsLibrary = createLazyComponent(() => import("../components/forms/FormsLibrary"));
export const WorkflowManager = createLazyComponent(() => import("../components/workflow/WorkflowManager"));
export const ContactsDirectory = createLazyComponent(() => import("../components/contacts/ContactsDirectory"));
export const SettingsPanel = createLazyComponent(() => import("../components/settings/SettingsPanel"));
export const EmailPage = createLazyComponent(() => import("../components/email/EmailPage"));
export const CalendarPage = createLazyComponent(() => import("../components/calendar/CalendarPage"));
export const TasksPage = createLazyComponent(() => import("../components/tasks/TasksPage"));
