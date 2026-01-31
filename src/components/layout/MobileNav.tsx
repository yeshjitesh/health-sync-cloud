import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  MessageCircle,
  Activity,
  FileText,
  Pill,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/dashboard", icon: LayoutDashboard, label: "Home" },
  { path: "/chat", icon: MessageCircle, label: "Bot" },
  { path: "/predict", icon: Activity, label: "Predict" },
  { path: "/records", icon: FileText, label: "Records" },
  { path: "/medications", icon: Pill, label: "Meds" },
];

export function MobileNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border md:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
