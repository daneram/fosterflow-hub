
import React from "react";

// Define a type for our enhanced lazy component that includes the _init method
type LazyComponentWithInit = React.LazyExoticComponent<React.ComponentType<any>> & {
  _init: () => void;
};

// Helper to create a lazy component with preloading capability
const createLazyComponent = (importFn: () => Promise<any>): LazyComponentWithInit => {
  // Create the lazy component with a properly structured import function
  const LazyComponent = React.lazy(() => 
    importFn().then(module => {
      // Handle both ESM default exports and CommonJS modules
      const Component = module.default || module;
      if (!Component) {
        console.error('Module does not have a default export:', module);
        // Provide a fallback component to prevent rendering errors
        return { default: () => <div>Failed to load component</div> };
      }
      return { default: Component };
    })
  );
  
  // Add an _init method that triggers the import but doesn't render
  (LazyComponent as LazyComponentWithInit)._init = () => {
    importFn().catch((error) => {
      console.error('Error preloading component:', error);
    });
  };
  
  return LazyComponent as LazyComponentWithInit;
};

// Import components with proper error handling
export const AIAssistantPage = createLazyComponent(() => 
  import("../pages/AIAssistantPage")
);

export const RecordsExplorer = createLazyComponent(() => 
  import("../components/records/RecordsExplorer")
);

export const ActivityLog = createLazyComponent(() => 
  import("../components/activity/ActivityLog")
);

export const ComplianceTracker = createLazyComponent(() => 
  import("../components/compliance/ComplianceTracker")
);

export const InsightsDashboard = createLazyComponent(() => 
  import("../components/insights/InsightsDashboard")
);

export const FormFAssessment = createLazyComponent(() => 
  import("../components/formf/FormFAssessment")
);

export const ChildrenProfiles = createLazyComponent(() => 
  import("../components/children/ChildrenProfiles")
);

export const CarersDirectory = createLazyComponent(() => 
  import("../components/carers/CarersDirectory")
);

export const TeamDirectory = createLazyComponent(() => 
  import("../components/team/TeamDirectory")
);

export const PolicyLibrary = createLazyComponent(() => 
  import("../components/policy/PolicyLibrary")
);

export const TrainingPlatform = createLazyComponent(() => 
  import("../components/training/TrainingPlatform")
);

export const RecruitmentPipeline = createLazyComponent(() => 
  import("../components/recruitment/RecruitmentPipeline")
);

export const FinanceManager = createLazyComponent(() => 
  import("../components/finance/FinanceManager")
);

export const FormsLibrary = createLazyComponent(() => 
  import("../components/forms/FormsLibrary")
);

export const WorkflowManager = createLazyComponent(() => 
  import("../components/workflow/WorkflowManager")
);

export const ContactsDirectory = createLazyComponent(() => 
  import("../components/contacts/ContactsDirectory")
);

export const SettingsPanel = createLazyComponent(() => 
  import("../components/settings/SettingsPanel")
);

export const EmailPage = createLazyComponent(() => 
  import("../components/email/EmailPage")
);

export const CalendarPage = createLazyComponent(() => 
  import("../components/calendar/CalendarPage")
);

export const TasksPage = createLazyComponent(() => 
  import("../components/tasks/TasksPage")
);
