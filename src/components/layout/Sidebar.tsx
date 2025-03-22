
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
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
  ChevronRight,
  Bot
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  isOpen: boolean;
  onClick?: () => void;
}

interface BotItemProps {
  icon: React.ElementType;
  label: string;
  isOpen: boolean;
  onClick: () => void;
}

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onNavItemClick?: () => void;
  toggleAiChat?: () => void;
  isMobile?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, label, isOpen, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

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
      onClick={onClick} // Call the function directly
      title={!isOpen ? label : undefined}
    >
      <Icon className="h-4 w-4" />
      {isOpen && <span>{label}</span>}
    </Link>
  );
};

const BotItem: React.FC<BotItemProps> = ({ icon: Icon, label, isOpen, onClick }) => {
  return (
    <button
      className={cn(
        "flex items-center gap-2 px-2 py-1.5 rounded-md text-sm font-medium transition-all duration-200",
        "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground",
        !isOpen && "justify-center px-0"
      )}
      onClick={onClick}
      title={!isOpen ? label : undefined}
    >
      <Icon className="h-4 w-4" />
      {isOpen && <span>{label}</span>}
    </button>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle, onNavItemClick, toggleAiChat, isMobile }) => {
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
        "mt-4 px-2 flex-1 overflow-y-auto",
        !isOpen && "px-0"
      )}>
        {/* AI Assistant button for mobile only */}
        {isMobile && (
          <>
            {isOpen && <div className="text-xs font-medium text-muted-foreground mb-1.5">AI ASSISTANT</div>}
            <nav className="space-y-0.5 mb-4">
              <BotItem icon={Bot} label="AI Assistant" isOpen={isOpen} onClick={toggleAiChat || (() => {})} />
            </nav>
          </>
        )}
        
        {isOpen && <div className="text-xs font-medium text-muted-foreground mb-1.5">DASHBOARD</div>}
        <nav className="space-y-0.5">
          <NavItem to="/" icon={LayoutDashboard} label="Dashboard" isOpen={isOpen} onClick={onNavItemClick} />
        </nav>
        
        {isOpen && <div className="text-xs font-medium text-muted-foreground mt-4 mb-1.5">CORE</div>}
        <nav className="space-y-0.5">
          <NavItem to="/records" icon={FolderOpen} label="Records" isOpen={isOpen} onClick={onNavItemClick} />
          <NavItem to="/activity" icon={Activity} label="Activity" isOpen={isOpen} onClick={onNavItemClick} />
          <NavItem to="/compliance" icon={ShieldCheck} label="Compliance" isOpen={isOpen} onClick={onNavItemClick} />
          <NavItem to="/insights" icon={BarChart2} label="Insights" isOpen={isOpen} onClick={onNavItemClick} />
        </nav>
        
        {isOpen && <div className="text-xs font-medium text-muted-foreground mt-4 mb-1.5">FOSTERING</div>}
        <nav className="space-y-0.5">
          <NavItem to="/form-f" icon={FileCheck} label="Form F" isOpen={isOpen} onClick={onNavItemClick} />
          <NavItem to="/children" icon={Baby} label="Children" isOpen={isOpen} onClick={onNavItemClick} />
          <NavItem to="/carers" icon={Users} label="Carers" isOpen={isOpen} onClick={onNavItemClick} />
        </nav>
        
        {isOpen && <div className="text-xs font-medium text-muted-foreground mt-4 mb-1.5">ORGANIZATION</div>}
        <nav className="space-y-0.5">
          <NavItem to="/team" icon={UsersRound} label="Team" isOpen={isOpen} onClick={onNavItemClick} />
          <NavItem to="/policies" icon={FileText} label="Policies" isOpen={isOpen} onClick={onNavItemClick} />
          <NavItem to="/training" icon={GraduationCap} label="Training" isOpen={isOpen} onClick={onNavItemClick} />
          <NavItem to="/recruitment" icon={UserPlus} label="Recruitment" isOpen={isOpen} onClick={onNavItemClick} />
          <NavItem to="/finance" icon={DollarSign} label="Finance" isOpen={isOpen} onClick={onNavItemClick} />
        </nav>
        
        {isOpen && <div className="text-xs font-medium text-muted-foreground mt-4 mb-1.5">TOOLS</div>}
        <nav className="space-y-0.5">
          <NavItem to="/forms" icon={FileSpreadsheet} label="Forms" isOpen={isOpen} onClick={onNavItemClick} />
          <NavItem to="/workflow" icon={GitBranch} label="Workflows" isOpen={isOpen} onClick={onNavItemClick} />
          <NavItem to="/contacts" icon={Contact} label="Contacts" isOpen={isOpen} onClick={onNavItemClick} />
          <NavItem to="/settings" icon={Settings} label="Settings" isOpen={isOpen} onClick={onNavItemClick} />
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
