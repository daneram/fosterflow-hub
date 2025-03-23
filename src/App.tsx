import React, { Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ContentLoader } from "./components/layout/content/ContentArea";

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
        <RoutePreloader />
        <Routes>
          <Route path="/" element={
            <Suspense fallback={null}>
              <Index />
            </Suspense>
          } />
          <Route path="/ai-assistant" element={
            <Suspense fallback={<ContentLoader />}>
              <AIAssistantPage />
            </Suspense>
          } />
          <Route path="/records" element={
            <Suspense fallback={<ContentLoader />}>
              <RecordsExplorer />
            </Suspense>
          } />
          <Route path="/activity" element={
            <Suspense fallback={<ContentLoader />}>
              <ActivityLog />
            </Suspense>
          } />
          <Route path="/compliance" element={
            <Suspense fallback={<ContentLoader />}>
              <ComplianceTracker />
            </Suspense>
          } />
          <Route path="/insights" element={
            <Suspense fallback={<ContentLoader />}>
              <InsightsDashboard />
            </Suspense>
          } />
          <Route path="/form-f" element={
            <Suspense fallback={<ContentLoader />}>
              <FormFAssessment />
            </Suspense>
          } />
          <Route path="/children" element={
            <Suspense fallback={<ContentLoader />}>
              <ChildrenProfiles />
            </Suspense>
          } />
          <Route path="/carers" element={
            <Suspense fallback={<ContentLoader />}>
              <CarersDirectory />
            </Suspense>
          } />
          <Route path="/team" element={
            <Suspense fallback={<ContentLoader />}>
              <TeamDirectory />
            </Suspense>
          } />
          <Route path="/policies" element={
            <Suspense fallback={<ContentLoader />}>
              <PolicyLibrary />
            </Suspense>
          } />
          <Route path="/training" element={
            <Suspense fallback={<ContentLoader />}>
              <TrainingPlatform />
            </Suspense>
          } />
          <Route path="/recruitment" element={
            <Suspense fallback={<ContentLoader />}>
              <RecruitmentPipeline />
            </Suspense>
          } />
          <Route path="/finance" element={
            <Suspense fallback={<ContentLoader />}>
              <FinanceManager />
            </Suspense>
          } />
          <Route path="/forms" element={
            <Suspense fallback={<ContentLoader />}>
              <FormsLibrary />
            </Suspense>
          } />
          <Route path="/workflow" element={
            <Suspense fallback={<ContentLoader />}>
              <WorkflowManager />
            </Suspense>
          } />
          <Route path="/contacts" element={
            <Suspense fallback={<ContentLoader />}>
              <ContactsDirectory />
            </Suspense>
          } />
          <Route path="/settings" element={
            <Suspense fallback={<ContentLoader />}>
              <SettingsPanel />
            </Suspense>
          } />
          <Route path="/email" element={
            <Suspense fallback={<ContentLoader />}>
              <EmailPage />
            </Suspense>
          } />
          <Route path="/calendar" element={
            <Suspense fallback={<ContentLoader />}>
              <CalendarPage />
            </Suspense>
          } />
          <Route path="/tasks" element={
            <Suspense fallback={<ContentLoader />}>
              <TasksPage />
            </Suspense>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
