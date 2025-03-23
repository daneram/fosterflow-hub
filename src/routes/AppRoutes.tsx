
import React, { Suspense, useTransition } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Import directly loaded pages
import Index from "../pages/Index";
import NotFound from "../pages/NotFound";

// Import lazy-loaded components
import * as LazyComponents from "./lazyComponents";

// Custom transition component that doesn't show loader immediately
const RouteTransition: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [isPending, startTransition] = useTransition();
  const location = useLocation();
  
  // Start transition when location changes
  React.useEffect(() => {
    startTransition(() => {});
  }, [location, startTransition]);
  
  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  return (
    <RouteTransition>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/ai-assistant" element={
          <Suspense fallback={null}>
            <LazyComponents.AIAssistantPage />
          </Suspense>
        } />
        <Route path="/records" element={
          <Suspense fallback={null}>
            <LazyComponents.RecordsExplorer />
          </Suspense>
        } />
        <Route path="/activity" element={
          <Suspense fallback={null}>
            <LazyComponents.ActivityLog />
          </Suspense>
        } />
        <Route path="/compliance" element={
          <Suspense fallback={null}>
            <LazyComponents.ComplianceTracker />
          </Suspense>
        } />
        <Route path="/insights" element={
          <Suspense fallback={null}>
            <LazyComponents.InsightsDashboard />
          </Suspense>
        } />
        <Route path="/form-f" element={
          <Suspense fallback={null}>
            <LazyComponents.FormFAssessment />
          </Suspense>
        } />
        <Route path="/children" element={
          <Suspense fallback={null}>
            <LazyComponents.ChildrenProfiles />
          </Suspense>
        } />
        <Route path="/carers" element={
          <Suspense fallback={null}>
            <LazyComponents.CarersDirectory />
          </Suspense>
        } />
        <Route path="/team" element={
          <Suspense fallback={null}>
            <LazyComponents.TeamDirectory />
          </Suspense>
        } />
        <Route path="/policies" element={
          <Suspense fallback={null}>
            <LazyComponents.PolicyLibrary />
          </Suspense>
        } />
        <Route path="/training" element={
          <Suspense fallback={null}>
            <LazyComponents.TrainingPlatform />
          </Suspense>
        } />
        <Route path="/recruitment" element={
          <Suspense fallback={null}>
            <LazyComponents.RecruitmentPipeline />
          </Suspense>
        } />
        <Route path="/finance" element={
          <Suspense fallback={null}>
            <LazyComponents.FinanceManager />
          </Suspense>
        } />
        <Route path="/forms" element={
          <Suspense fallback={null}>
            <LazyComponents.FormsLibrary />
          </Suspense>
        } />
        <Route path="/workflow" element={
          <Suspense fallback={null}>
            <LazyComponents.WorkflowManager />
          </Suspense>
        } />
        <Route path="/contacts" element={
          <Suspense fallback={null}>
            <LazyComponents.ContactsDirectory />
          </Suspense>
        } />
        <Route path="/settings" element={
          <Suspense fallback={null}>
            <LazyComponents.SettingsPanel />
          </Suspense>
        } />
        <Route path="/email" element={
          <Suspense fallback={null}>
            <LazyComponents.EmailPage />
          </Suspense>
        } />
        <Route path="/calendar" element={
          <Suspense fallback={null}>
            <LazyComponents.CalendarPage />
          </Suspense>
        } />
        <Route path="/tasks" element={
          <Suspense fallback={null}>
            <LazyComponents.TasksPage />
          </Suspense>
        } />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </RouteTransition>
  );
};

export default AppRoutes;
