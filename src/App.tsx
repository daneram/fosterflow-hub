
import React, { Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// Import main pages directly (not lazy loaded)
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy load all other components
const AIAssistantPage = React.lazy(() => import("./pages/AIAssistantPage"));
const RecordsExplorer = React.lazy(() => import("./components/records/RecordsExplorer"));
const ActivityLog = React.lazy(() => import("./components/activity/ActivityLog"));
const ComplianceTracker = React.lazy(() => import("./components/compliance/ComplianceTracker"));
const InsightsDashboard = React.lazy(() => import("./components/insights/InsightsDashboard"));
const FormFAssessment = React.lazy(() => import("./components/formf/FormFAssessment"));
const ChildrenProfiles = React.lazy(() => import("./components/children/ChildrenProfiles"));
const CarersDirectory = React.lazy(() => import("./components/carers/CarersDirectory"));
const TeamDirectory = React.lazy(() => import("./components/team/TeamDirectory"));
const PolicyLibrary = React.lazy(() => import("./components/policy/PolicyLibrary"));
const TrainingPlatform = React.lazy(() => import("./components/training/TrainingPlatform"));
const RecruitmentPipeline = React.lazy(() => import("./components/recruitment/RecruitmentPipeline"));
const FinanceManager = React.lazy(() => import("./components/finance/FinanceManager"));
const FormsLibrary = React.lazy(() => import("./components/forms/FormsLibrary"));
const WorkflowManager = React.lazy(() => import("./components/workflow/WorkflowManager"));
const ContactsDirectory = React.lazy(() => import("./components/contacts/ContactsDirectory"));
const SettingsPanel = React.lazy(() => import("./components/settings/SettingsPanel"));
const EmailPage = React.lazy(() => import("./components/email/EmailPage"));
const CalendarPage = React.lazy(() => import("./components/calendar/CalendarPage"));
const TasksPage = React.lazy(() => import("./components/tasks/TasksPage"));

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center w-full min-h-[50vh]">
    <div className="animate-pulse h-8 w-8 rounded-full bg-primary/20"></div>
  </div>
);

// Component to preload routes based on user navigation
const RoutePreloader = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Preload common routes that are likely to be visited next
    const preloadRoutes = () => {
      // Always preload AI assistant as it's commonly used
      import("./pages/AIAssistantPage");
      
      // Preload dashboard related routes when on index
      if (location.pathname === '/') {
        import("./components/insights/InsightsDashboard");
        import("./components/records/RecordsExplorer");
      }
      
      // Add other preloading logic based on current route
    };
    
    preloadRoutes();
  }, [location]);
  
  return null;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <RoutePreloader />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/ai-assistant" element={<AIAssistantPage />} />
            <Route path="/records" element={<RecordsExplorer />} />
            <Route path="/activity" element={<ActivityLog />} />
            <Route path="/compliance" element={<ComplianceTracker />} />
            <Route path="/insights" element={<InsightsDashboard />} />
            <Route path="/form-f" element={<FormFAssessment />} />
            <Route path="/children" element={<ChildrenProfiles />} />
            <Route path="/carers" element={<CarersDirectory />} />
            <Route path="/team" element={<TeamDirectory />} />
            <Route path="/policies" element={<PolicyLibrary />} />
            <Route path="/training" element={<TrainingPlatform />} />
            <Route path="/recruitment" element={<RecruitmentPipeline />} />
            <Route path="/finance" element={<FinanceManager />} />
            <Route path="/forms" element={<FormsLibrary />} />
            <Route path="/workflow" element={<WorkflowManager />} />
            <Route path="/contacts" element={<ContactsDirectory />} />
            <Route path="/settings" element={<SettingsPanel />} />
            <Route path="/email" element={<EmailPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/tasks" element={<TasksPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
