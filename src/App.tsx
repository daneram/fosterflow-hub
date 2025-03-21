
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Import components
import TeamChat from "./components/chat/TeamChat";
import EmailClient from "./components/email/EmailClient";
import CalendarView from "./components/calendar/Calendar";
import TaskManager from "./components/tasks/TaskManager";
import RecordsExplorer from "./components/records/RecordsExplorer";
import TrainingPlatform from "./components/training/TrainingPlatform";
import PolicyLibrary from "./components/policy/PolicyLibrary";
import ComplianceTracker from "./components/compliance/ComplianceTracker";
import AIAssistant from "./components/ai/AIAssistant";
import WorkflowManager from "./components/workflow/WorkflowManager";
import FormCreator from "./components/forms/FormCreator";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/chat" element={<TeamChat />} />
          <Route path="/email" element={<EmailClient />} />
          <Route path="/calendar" element={<CalendarView />} />
          <Route path="/tasks" element={<TaskManager />} />
          <Route path="/records" element={<RecordsExplorer />} />
          <Route path="/training" element={<TrainingPlatform />} />
          <Route path="/policies" element={<PolicyLibrary />} />
          <Route path="/compliance" element={<ComplianceTracker />} />
          <Route path="/assistant" element={<AIAssistant />} />
          <Route path="/workflow" element={<WorkflowManager />} />
          <Route path="/forms" element={<FormCreator />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
