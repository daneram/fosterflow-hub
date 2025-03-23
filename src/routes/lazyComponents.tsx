
import React from "react";

// Lazy load all components
export const AIAssistantPage = React.lazy(() => import("../pages/AIAssistantPage"));
export const RecordsExplorer = React.lazy(() => import("../components/records/RecordsExplorer"));
export const ActivityLog = React.lazy(() => import("../components/activity/ActivityLog"));
export const ComplianceTracker = React.lazy(() => import("../components/compliance/ComplianceTracker"));
export const InsightsDashboard = React.lazy(() => import("../components/insights/InsightsDashboard"));
export const FormFAssessment = React.lazy(() => import("../components/formf/FormFAssessment"));
export const ChildrenProfiles = React.lazy(() => import("../components/children/ChildrenProfiles"));
export const CarersDirectory = React.lazy(() => import("../components/carers/CarersDirectory"));
export const TeamDirectory = React.lazy(() => import("../components/team/TeamDirectory"));
export const PolicyLibrary = React.lazy(() => import("../components/policy/PolicyLibrary"));
export const TrainingPlatform = React.lazy(() => import("../components/training/TrainingPlatform"));
export const RecruitmentPipeline = React.lazy(() => import("../components/recruitment/RecruitmentPipeline"));
export const FinanceManager = React.lazy(() => import("../components/finance/FinanceManager"));
export const FormsLibrary = React.lazy(() => import("../components/forms/FormsLibrary"));
export const WorkflowManager = React.lazy(() => import("../components/workflow/WorkflowManager"));
export const ContactsDirectory = React.lazy(() => import("../components/contacts/ContactsDirectory"));
export const SettingsPanel = React.lazy(() => import("../components/settings/SettingsPanel"));
export const EmailPage = React.lazy(() => import("../components/email/EmailPage"));
export const CalendarPage = React.lazy(() => import("../components/calendar/CalendarPage"));
export const TasksPage = React.lazy(() => import("../components/tasks/TasksPage"));
