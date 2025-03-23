
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AIAssistantPage from "./pages/AIAssistantPage";

// Import components
import RecordsExplorer from "./components/records/RecordsExplorer";
import ActivityLog from "./components/activity/ActivityLog";
import ComplianceTracker from "./components/compliance/ComplianceTracker";
import InsightsDashboard from "./components/insights/InsightsDashboard";
import FormFAssessment from "./components/formf/FormFAssessment";
import ChildrenProfiles from "./components/children/ChildrenProfiles";
import CarersDirectory from "./components/carers/CarersDirectory";
import TeamDirectory from "./components/team/TeamDirectory";
import PolicyLibrary from "./components/policy/PolicyLibrary";
import TrainingPlatform from "./components/training/TrainingPlatform";
import RecruitmentPipeline from "./components/recruitment/RecruitmentPipeline";
import FinanceManager from "./components/finance/FinanceManager";
import FormsLibrary from "./components/forms/FormsLibrary";
import WorkflowManager from "./components/workflow/WorkflowManager";
import ContactsDirectory from "./components/contacts/ContactsDirectory";
import SettingsPanel from "./components/settings/SettingsPanel";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
