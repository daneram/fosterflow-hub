
import React from "react";

// Define a type for our enhanced lazy component that includes the _init method
type LazyComponentWithInit = React.LazyExoticComponent<React.ComponentType<any>> & {
  _init: () => void;
};

// Helper to create a lazy component with preloading capability
const createLazyComponent = (importFn: () => Promise<{ default: React.ComponentType<any> }>): LazyComponentWithInit => {
  const LazyComponent = React.lazy(importFn);
  
  // Add an _init method that triggers the import but doesn't render
  (LazyComponent as LazyComponentWithInit)._init = () => {
    importFn().catch(() => {
      // Silent catch - just for preloading
    });
  };
  
  return LazyComponent as LazyComponentWithInit;
};

// Ensure proper default handling with explicit return type
export const AIAssistantPage = createLazyComponent(() => 
  import("../pages/AIAssistantPage").then(module => ({ default: module.default }))
);

export const RecordsExplorer = createLazyComponent(() => 
  import("../components/records/RecordsExplorer").then(module => ({ default: module.default }))
);

export const ActivityLog = createLazyComponent(() => 
  import("../components/activity/ActivityLog").then(module => ({ default: module.default }))
);

export const ComplianceTracker = createLazyComponent(() => 
  import("../components/compliance/ComplianceTracker").then(module => ({ default: module.default }))
);

export const InsightsDashboard = createLazyComponent(() => 
  import("../components/insights/InsightsDashboard").then(module => ({ default: module.default }))
);

export const FormFAssessment = createLazyComponent(() => 
  import("../components/formf/FormFAssessment").then(module => ({ default: module.default }))
);

export const ChildrenProfiles = createLazyComponent(() => 
  import("../components/children/ChildrenProfiles").then(module => ({ default: module.default }))
);

export const CarersDirectory = createLazyComponent(() => 
  import("../components/carers/CarersDirectory").then(module => ({ default: module.default }))
);

export const TeamDirectory = createLazyComponent(() => 
  import("../components/team/TeamDirectory").then(module => ({ default: module.default }))
);

export const PolicyLibrary = createLazyComponent(() => 
  import("../components/policy/PolicyLibrary").then(module => ({ default: module.default }))
);

export const TrainingPlatform = createLazyComponent(() => 
  import("../components/training/TrainingPlatform").then(module => ({ default: module.default }))
);

export const RecruitmentPipeline = createLazyComponent(() => 
  import("../components/recruitment/RecruitmentPipeline").then(module => ({ default: module.default }))
);

export const FinanceManager = createLazyComponent(() => 
  import("../components/finance/FinanceManager").then(module => ({ default: module.default }))
);

export const FormsLibrary = createLazyComponent(() => 
  import("../components/forms/FormsLibrary").then(module => ({ default: module.default }))
);

export const WorkflowManager = createLazyComponent(() => 
  import("../components/workflow/WorkflowManager").then(module => ({ default: module.default }))
);

export const ContactsDirectory = createLazyComponent(() => 
  import("../components/contacts/ContactsDirectory").then(module => ({ default: module.default }))
);

export const SettingsPanel = createLazyComponent(() => 
  import("../components/settings/SettingsPanel").then(module => ({ default: module.default }))
);

export const EmailPage = createLazyComponent(() => 
  import("../components/email/EmailPage").then(module => ({ default: module.default }))
);

export const CalendarPage = createLazyComponent(() => 
  import("../components/calendar/CalendarPage").then(module => ({ default: module.default }))
);

export const TasksPage = createLazyComponent(() => 
  import("../components/tasks/TasksPage").then(module => ({ default: module.default }))
);
