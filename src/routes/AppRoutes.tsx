
import React, { Suspense, useCallback } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Import directly loaded pages
import Index from "../pages/Index";
import NotFound from "../pages/NotFound";

// Import lazy-loaded components
import * as LazyComponents from "./lazyComponents";

// Simple loading fallback that doesn't cover the entire screen
const LoadingFallback = () => <div className="p-4 opacity-0">Loading...</div>;

const AppRoutes: React.FC = () => {
  const location = useLocation();
  
  // Memoize the suspense wrapper to prevent unnecessary rerenders
  const SuspenseWrapper = useCallback(({ children }: { children: React.ReactNode }) => (
    <Suspense fallback={<LoadingFallback />}>
      {children}
    </Suspense>
  ), []);
  
  return (
    <Routes location={location}>
      <Route path="/" element={<Index />} />
      <Route path="/ai-assistant" element={
        <SuspenseWrapper>
          <LazyComponents.AIAssistantPage />
        </SuspenseWrapper>
      } />
      <Route path="/records" element={
        <SuspenseWrapper>
          <LazyComponents.RecordsExplorer />
        </SuspenseWrapper>
      } />
      <Route path="/activity" element={
        <SuspenseWrapper>
          <LazyComponents.ActivityLog />
        </SuspenseWrapper>
      } />
      <Route path="/compliance" element={
        <SuspenseWrapper>
          <LazyComponents.ComplianceTracker />
        </SuspenseWrapper>
      } />
      <Route path="/insights" element={
        <SuspenseWrapper>
          <LazyComponents.InsightsDashboard />
        </SuspenseWrapper>
      } />
      <Route path="/form-f" element={
        <SuspenseWrapper>
          <LazyComponents.FormFAssessment />
        </SuspenseWrapper>
      } />
      <Route path="/children" element={
        <SuspenseWrapper>
          <LazyComponents.ChildrenProfiles />
        </SuspenseWrapper>
      } />
      <Route path="/carers" element={
        <SuspenseWrapper>
          <LazyComponents.CarersDirectory />
        </SuspenseWrapper>
      } />
      <Route path="/team" element={
        <SuspenseWrapper>
          <LazyComponents.TeamDirectory />
        </SuspenseWrapper>
      } />
      <Route path="/policies" element={
        <SuspenseWrapper>
          <LazyComponents.PolicyLibrary />
        </SuspenseWrapper>
      } />
      <Route path="/training" element={
        <SuspenseWrapper>
          <LazyComponents.TrainingPlatform />
        </SuspenseWrapper>
      } />
      <Route path="/recruitment" element={
        <SuspenseWrapper>
          <LazyComponents.RecruitmentPipeline />
        </SuspenseWrapper>
      } />
      <Route path="/finance" element={
        <SuspenseWrapper>
          <LazyComponents.FinanceManager />
        </SuspenseWrapper>
      } />
      <Route path="/forms" element={
        <SuspenseWrapper>
          <LazyComponents.FormsLibrary />
        </SuspenseWrapper>
      } />
      <Route path="/workflow" element={
        <SuspenseWrapper>
          <LazyComponents.WorkflowManager />
        </SuspenseWrapper>
      } />
      <Route path="/contacts" element={
        <SuspenseWrapper>
          <LazyComponents.ContactsDirectory />
        </SuspenseWrapper>
      } />
      <Route path="/settings" element={
        <SuspenseWrapper>
          <LazyComponents.SettingsPanel />
        </SuspenseWrapper>
      } />
      <Route path="/email" element={
        <SuspenseWrapper>
          <LazyComponents.EmailPage />
        </SuspenseWrapper>
      } />
      <Route path="/calendar" element={
        <SuspenseWrapper>
          <LazyComponents.CalendarPage />
        </SuspenseWrapper>
      } />
      <Route path="/tasks" element={
        <SuspenseWrapper>
          <LazyComponents.TasksPage />
        </SuspenseWrapper>
      } />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default React.memo(AppRoutes);
