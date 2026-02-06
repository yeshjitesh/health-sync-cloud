import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface PublicHeaderProps {
  showSignIn?: boolean;
  onSignIn?: () => void;
}

const LOGO_URL = "https://sospasvrceakoreeslmd.supabase.co/storage/v1/object/public/logo//logo";

export function PublicHeader({ showSignIn = false, onSignIn }: PublicHeaderProps) {
  return (
    <header className="border-b border-gold-500/20 backdrop-blur-md sticky top-0 z-50" style={{ background: 'hsla(348, 55%, 12%, 0.9)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl overflow-hidden shadow-gold"
          >
            <img
              alt="DVDS-Health"
              className="w-full h-full object-cover"
              src={LOGO_URL}
            />
          </motion.div>
          <span className="text-lg sm:text-xl font-bold text-gold-gradient tracking-tight">
            DVDS-Health
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/about" className="text-cream-300 hover:text-gold-400 transition-colors text-sm font-medium">
            About
          </Link>
          <Link to="/contact" className="text-cream-300 hover:text-gold-400 transition-colors text-sm font-medium">
            Contact
          </Link>
        </nav>
        
        {showSignIn && onSignIn && (
          <Button
            onClick={onSignIn}
            size="sm"
            className="btn-gold text-sm px-4 sm:px-6 font-medium"
          >
            Get Started
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        )}
      </div>
    </header>
  );
}
