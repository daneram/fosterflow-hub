
import React, { Suspense, useCallback } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Import directly loaded pages
import Index from "../pages/Index";
import NotFound from "../pages/NotFound";

// Import lazy-loaded components
import * as LazyComponents from "./lazyComponents";

// Better error handling fallback component
const LoadingFallback = () => (
  <div className="p-4 flex items-center justify-center min-h-[200px]">
    <div className="animate-pulse text-muted-foreground">Loading...</div>
  </div>
);

// Component to handle lazy loading errors
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("Error loading component:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 border border-red-200 rounded bg-red-50 text-red-800">
          <h2 className="font-semibold mb-2">Something went wrong</h2>
          <p>There was an error loading this component. Please try refreshing the page.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

const AppRoutes: React.FC = () => {
  const location = useLocation();
  
  // Memoize the suspense wrapper to prevent unnecessary rerenders
  const SuspenseWrapper = useCallback(({ children }: { children: React.ReactNode }) => (
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        {children}
      </Suspense>
    </ErrorBoundary>
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
