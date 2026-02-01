import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Bot,
  Stethoscope,
  ClipboardList,
  Pill,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/dashboard", icon: LayoutDashboard, label: "Home" },
  { path: "/chat", icon: Bot, label: "Bot" },
  { path: "/predict", icon: Stethoscope, label: "Predict" },
  { path: "/records", icon: ClipboardList, label: "Records" },
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
                "flex flex-col items-center justify-center gap-1 flex-1 h-full min-h-[44px] min-w-[44px] transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
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
