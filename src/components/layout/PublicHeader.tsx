import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface PublicHeaderProps {
  showSignIn?: boolean;
  onSignIn?: () => void;
}

const LOGO_URL = "https://inxqwecffjulxsvkfwro.supabase.co/storage/v1/object/public/logo//1769952242296.png";

export function PublicHeader({ showSignIn = false, onSignIn }: PublicHeaderProps) {
  return (
    <header className="border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="w-10 h-10 md:w-12 md:h-12 rounded-xl overflow-hidden shadow-lg"
          >
            <img
              alt="DVDS-Health"
              className="w-full h-full object-cover"
              src={LOGO_URL}
            />
          </motion.div>
          <span className="text-xl font-bold text-white tracking-tight">DVDS-Health</span>
        </Link>
        {showSignIn && onSignIn && (
          <Button
            onClick={onSignIn}
            size="sm"
            className="gradient-primary border-0 text-white hover:opacity-90 text-sm md:text-base md:px-6 shadow-lg"
          >
            <Sparkles className="w-4 h-4 mr-2 hidden md:inline" />
            Sign In
          </Button>
        )}
      </div>
    </header>
  );
}
