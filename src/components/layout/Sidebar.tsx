
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Home, 
  MessageSquare, 
  Mail, 
  Calendar, 
  CheckSquare, 
  FolderOpen, 
  GraduationCap, 
  FileText, 
  ShieldCheck, 
  Bot,
  GitBranch,
  FileEdit
} from 'lucide-react';

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
        isActive 
          ? "bg-primary text-primary-foreground" 
          : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </Link>
  );
};

const Sidebar: React.FC = () => {
  return (
    <div className="h-full flex flex-col bg-sidebar py-4">
      <div className="px-3 py-2">
        <h2 className="text-lg font-semibold mb-1">FosterFlow</h2>
        <p className="text-xs text-muted-foreground">Case Management System</p>
      </div>

      <div className="mt-6 px-3">
        <div className="text-xs font-medium text-muted-foreground mb-2">MAIN</div>
        <nav className="space-y-1">
          <NavItem to="/" icon={Home} label="Dashboard" />
          <NavItem to="/chat" icon={MessageSquare} label="Team Chat" />
          <NavItem to="/email" icon={Mail} label="Email" />
          <NavItem to="/calendar" icon={Calendar} label="Calendar" />
          <NavItem to="/tasks" icon={CheckSquare} label="Tasks" />
          <NavItem to="/workflow" icon={GitBranch} label="Workflow Manager" />
          <NavItem to="/forms" icon={FileEdit} label="Form Creator" />
        </nav>
      </div>

      <div className="mt-6 px-3">
        <div className="text-xs font-medium text-muted-foreground mb-2">RECORDS & RESOURCES</div>
        <nav className="space-y-1">
          <NavItem to="/records" icon={FolderOpen} label="Records Explorer" />
          <NavItem to="/training" icon={GraduationCap} label="Training" />
          <NavItem to="/policies" icon={FileText} label="Policy Library" />
          <NavItem to="/compliance" icon={ShieldCheck} label="Compliance" />
        </nav>
      </div>

      <div className="mt-6 px-3">
        <div className="text-xs font-medium text-muted-foreground mb-2">ASSISTANTS</div>
        <nav className="space-y-1">
          <NavItem to="/assistant" icon={Bot} label="AI Assistant" />
        </nav>
      </div>

      <div className="mt-auto px-3 py-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary font-medium text-sm">SW</span>
          </div>
          <div>
            <div className="text-sm font-medium">Social Worker</div>
            <div className="text-xs text-muted-foreground">Online</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
