
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
  FileEdit,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  isOpen: boolean;
  onClick?: () => void;
}

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onNavItemClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, label, isOpen, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-2 px-2 py-1.5 rounded-md text-sm font-medium transition-all duration-200",
        isActive 
          ? "bg-primary text-primary-foreground" 
          : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground",
        !isOpen && "justify-center px-0"
      )}
      onClick={handleClick}
      title={!isOpen ? label : undefined}
    >
      <Icon className="h-4 w-4" />
      {isOpen && <span>{label}</span>}
    </Link>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle, onNavItemClick }) => {
  return (
    <div className={cn(
      "h-full flex flex-col bg-sidebar py-3 transition-all duration-300 ease-in-out",
      isOpen ? "w-56" : "w-14"
    )}>
      {/* Logo/Header that toggles sidebar */}
      <div 
        className={cn(
          "px-2 py-1.5 flex items-center cursor-pointer",
          !isOpen && "justify-center"
        )}
        onClick={onToggle}
      >
        {isOpen ? (
          <>
            <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center mr-2">
              <span className="text-primary font-medium text-xs">FF</span>
            </div>
            <div>
              <h2 className="text-base font-semibold mb-0">FosterFlow</h2>
              <p className="text-xs text-muted-foreground">Case Management</p>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-5 w-5 ml-auto"
              onClick={onToggle}
            >
              <ChevronRight className="h-3 w-3" />
            </Button>
          </>
        ) : (
          <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary font-medium text-xs">FF</span>
          </div>
        )}
      </div>

      <div className={cn(
        "mt-4 px-2",
        !isOpen && "px-0"
      )}>
        {isOpen && <div className="text-xs font-medium text-muted-foreground mb-1.5">MAIN</div>}
        <nav className="space-y-0.5">
          <NavItem to="/" icon={Home} label="Dashboard" isOpen={isOpen} onClick={onNavItemClick} />
          <NavItem to="/chat" icon={MessageSquare} label="Team Chat" isOpen={isOpen} onClick={onNavItemClick} />
          <NavItem to="/email" icon={Mail} label="Email" isOpen={isOpen} onClick={onNavItemClick} />
          <NavItem to="/calendar" icon={Calendar} label="Calendar" isOpen={isOpen} onClick={onNavItemClick} />
          <NavItem to="/tasks" icon={CheckSquare} label="Tasks" isOpen={isOpen} onClick={onNavItemClick} />
          <NavItem to="/workflow" icon={GitBranch} label="Workflow Manager" isOpen={isOpen} onClick={onNavItemClick} />
          <NavItem to="/forms" icon={FileEdit} label="Form Creator" isOpen={isOpen} onClick={onNavItemClick} />
        </nav>
      </div>

      <div className={cn(
        "mt-4 px-2",
        !isOpen && "px-0"
      )}>
        {isOpen && <div className="text-xs font-medium text-muted-foreground mb-1.5">RECORDS & RESOURCES</div>}
        <nav className="space-y-0.5">
          <NavItem to="/records" icon={FolderOpen} label="Records Explorer" isOpen={isOpen} onClick={onNavItemClick} />
          <NavItem to="/training" icon={GraduationCap} label="Training" isOpen={isOpen} onClick={onNavItemClick} />
          <NavItem to="/policies" icon={FileText} label="Policy Library" isOpen={isOpen} onClick={onNavItemClick} />
          <NavItem to="/compliance" icon={ShieldCheck} label="Compliance" isOpen={isOpen} onClick={onNavItemClick} />
        </nav>
      </div>

      <div className={cn(
        "mt-4 px-2",
        !isOpen && "px-0"
      )}>
        {isOpen && <div className="text-xs font-medium text-muted-foreground mb-1.5">ASSISTANTS</div>}
        <nav className="space-y-0.5">
          <NavItem to="/assistant" icon={Bot} label="AI Assistant" isOpen={isOpen} onClick={onNavItemClick} />
        </nav>
      </div>

      {isOpen && (
        <div className="mt-auto px-2 py-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-medium text-xs">SW</span>
            </div>
            <div>
              <div className="text-xs font-medium">Social Worker</div>
              <div className="text-xs text-muted-foreground">Online</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
