
import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { ContentLoader } from "../components/layout/content/ContentArea";

// Import directly loaded pages
import Index from "../pages/Index";
import NotFound from "../pages/NotFound";

// Import lazy-loaded components
import * as LazyComponents from "./lazyComponents";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={
        <Suspense fallback={null}>
          <Index />
        </Suspense>
      } />
      <Route path="/ai-assistant" element={
        <Suspense fallback={<ContentLoader />}>
          <LazyComponents.AIAssistantPage />
        </Suspense>
      } />
      <Route path="/records" element={
        <Suspense fallback={<ContentLoader />}>
          <LazyComponents.RecordsExplorer />
        </Suspense>
      } />
      <Route path="/activity" element={
        <Suspense fallback={<ContentLoader />}>
          <LazyComponents.ActivityLog />
        </Suspense>
      } />
      <Route path="/compliance" element={
        <Suspense fallback={<ContentLoader />}>
          <LazyComponents.ComplianceTracker />
        </Suspense>
      } />
      <Route path="/insights" element={
        <Suspense fallback={<ContentLoader />}>
          <LazyComponents.InsightsDashboard />
        </Suspense>
      } />
      <Route path="/form-f" element={
        <Suspense fallback={<ContentLoader />}>
          <LazyComponents.FormFAssessment />
        </Suspense>
      } />
      <Route path="/children" element={
        <Suspense fallback={<ContentLoader />}>
          <LazyComponents.ChildrenProfiles />
        </Suspense>
      } />
      <Route path="/carers" element={
        <Suspense fallback={<ContentLoader />}>
          <LazyComponents.CarersDirectory />
        </Suspense>
      } />
      <Route path="/team" element={
        <Suspense fallback={<ContentLoader />}>
          <LazyComponents.TeamDirectory />
        </Suspense>
      } />
      <Route path="/policies" element={
        <Suspense fallback={<ContentLoader />}>
          <LazyComponents.PolicyLibrary />
        </Suspense>
      } />
      <Route path="/training" element={
        <Suspense fallback={<ContentLoader />}>
          <LazyComponents.TrainingPlatform />
        </Suspense>
      } />
      <Route path="/recruitment" element={
        <Suspense fallback={<ContentLoader />}>
          <LazyComponents.RecruitmentPipeline />
        </Suspense>
      } />
      <Route path="/finance" element={
        <Suspense fallback={<ContentLoader />}>
          <LazyComponents.FinanceManager />
        </Suspense>
      } />
      <Route path="/forms" element={
        <Suspense fallback={<ContentLoader />}>
          <LazyComponents.FormsLibrary />
        </Suspense>
      } />
      <Route path="/workflow" element={
        <Suspense fallback={<ContentLoader />}>
          <LazyComponents.WorkflowManager />
        </Suspense>
      } />
      <Route path="/contacts" element={
        <Suspense fallback={<ContentLoader />}>
          <LazyComponents.ContactsDirectory />
        </Suspense>
      } />
      <Route path="/settings" element={
        <Suspense fallback={<ContentLoader />}>
          <LazyComponents.SettingsPanel />
        </Suspense>
      } />
      <Route path="/email" element={
        <Suspense fallback={<ContentLoader />}>
          <LazyComponents.EmailPage />
        </Suspense>
      } />
      <Route path="/calendar" element={
        <Suspense fallback={<ContentLoader />}>
          <LazyComponents.CalendarPage />
        </Suspense>
      } />
      <Route path="/tasks" element={
        <Suspense fallback={<ContentLoader />}>
          <LazyComponents.TasksPage />
        </Suspense>
      } />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
