import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Bot, Stethoscope, ClipboardList, Pill, UserCircle, LogOut, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useAuthContext } from "@/contexts/AuthContext";
const navItems = [{
  path: "/dashboard",
  icon: LayoutDashboard,
  label: "Dashboard"
}, {
  path: "/chat",
  icon: Bot,
  label: "DVDS Bot"
}, {
  path: "/predict",
  icon: Stethoscope,
  label: "Predictor"
}, {
  path: "/records",
  icon: ClipboardList,
  label: "Records"
}, {
  path: "/medications",
  icon: Pill,
  label: "Medications"
}, {
  path: "/profile",
  icon: UserCircle,
  label: "Profile"
}];
interface SidebarProps {
  onNavigate?: () => void;
}
export function Sidebar({
  onNavigate
}: SidebarProps) {
  const {
    user,
    signOut
  } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };
  const handleNavClick = () => {
    onNavigate?.();
  };
  return <aside className={cn("relative flex flex-col h-full bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300", collapsed ? "w-16" : "w-64")}>
      {/* Logo */}
      <div className="flex items-center gap-3 p-4 border-b border-sidebar-border">
        <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 shadow-md">
          <img alt="DVDS-Care" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/pw/AP1GczNvSevVNr581y9WAc8wDfLQM4HvCxDWrnQLZ39z9n2I-GLkbaedNW78tWgPhPBEulvcG8GuNmn4HWAGh0iOpxUflgql67ItZ2D14YPXT6LJZXtFtLlV4Ed33BFESDhz0B2Pm0Lss5-riJpuL_3PB18Ldg=w500-h500-s-no?authuser=0" />
        </div>
        {!collapsed && <span className="text-lg font-bold tracking-tight">DVDS-Care</span>}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map(item => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        return <NavLink key={item.path} to={item.path} onClick={handleNavClick} className={cn("flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 min-h-[44px]", isActive ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground")}>
              <Icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span className="font-medium">{item.label}</span>}
            </NavLink>;
      })}
      </nav>

      {/* User Section */}
      <div className="p-3 border-t border-sidebar-border">
        <div className={cn("flex items-center gap-3 p-2 rounded-lg", collapsed ? "justify-center" : "")}>
          <Avatar className="w-9 h-9 shrink-0">
            <AvatarImage src={user?.user_metadata?.avatar_url} />
            <AvatarFallback className="bg-sidebar-accent text-sidebar-foreground">
              {user?.email?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          {!collapsed && <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {user?.user_metadata?.full_name || user?.email?.split("@")[0]}
              </p>
              <p className="text-xs text-sidebar-foreground/50 truncate">
                {user?.email}
              </p>
            </div>}
        </div>
        <Button variant="ghost" size="sm" onClick={handleSignOut} className={cn("w-full mt-2 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent min-h-[44px]", collapsed ? "px-2" : "")}>
          <LogOut className="w-4 h-4" />
          {!collapsed && <span className="ml-2">Sign Out</span>}
        </Button>
      </div>

      {/* Collapse Toggle - Desktop only */}
      <button onClick={() => setCollapsed(!collapsed)} className="hidden md:flex absolute top-1/2 -right-3 transform -translate-y-1/2 w-6 h-6 bg-sidebar-accent border border-sidebar-border rounded-full items-center justify-center text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors">
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>
    </aside>;
}