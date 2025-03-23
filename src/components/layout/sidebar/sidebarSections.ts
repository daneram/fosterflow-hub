
import {
  LayoutDashboard,
  FolderOpen, 
  Activity, 
  ShieldCheck, 
  BarChart2, 
  FileCheck, 
  Baby, 
  Users, 
  UsersRound, 
  FileText, 
  GraduationCap, 
  UserPlus, 
  DollarSign, 
  FileSpreadsheet, 
  GitBranch,
  Settings,
  Contact,
  Mail,
  Calendar,
  ListCheck
} from 'lucide-react';

export const dashboardSection = {
  title: "DASHBOARD",
  items: [
    { to: "/", icon: LayoutDashboard, label: "Dashboard" }
  ]
};

export const coreSection = {
  title: "CORE",
  items: [
    { to: "/records", icon: FolderOpen, label: "Records" },
    { to: "/activity", icon: Activity, label: "Activity" },
    { to: "/compliance", icon: ShieldCheck, label: "Compliance" },
    { to: "/insights", icon: BarChart2, label: "Insights" },
    { to: "/email", icon: Mail, label: "Email" },
    { to: "/calendar", icon: Calendar, label: "Calendar" },
    { to: "/tasks", icon: ListCheck, label: "Tasks" }
  ]
};

export const fosteringSection = {
  title: "FOSTERING",
  items: [
    { to: "/form-f", icon: FileCheck, label: "Form F" },
    { to: "/children", icon: Baby, label: "Children" },
    { to: "/carers", icon: Users, label: "Carers" }
  ]
};

export const organizationSection = {
  title: "ORGANIZATION",
  items: [
    { to: "/team", icon: UsersRound, label: "Team" },
    { to: "/policies", icon: FileText, label: "Policies" },
    { to: "/training", icon: GraduationCap, label: "Training" },
    { to: "/recruitment", icon: UserPlus, label: "Recruitment" },
    { to: "/finance", icon: DollarSign, label: "Finance" }
  ]
};

export const toolsSection = {
  title: "TOOLS",
  items: [
    { to: "/forms", icon: FileSpreadsheet, label: "Forms" },
    { to: "/workflow", icon: GitBranch, label: "Workflows" },
    { to: "/contacts", icon: Contact, label: "Contacts" },
    { to: "/settings", icon: Settings, label: "Settings" }
  ]
};
