import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/contexts/AuthContext";
import { useEffect } from "react";
import {
  Heart,
  MessageCircle,
  Activity,
  FileText,
  Shield,
  Sparkles,
  Pill,
  Bot,
} from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "DVDL Bot",
    description: "Get instant answers to your health questions with our AI-powered assistant",
  },
  {
    icon: Activity,
    title: "Disease Predictor",
    description: "Assess your risk for diabetes, heart disease, kidney and liver conditions",
  },
  {
    icon: FileText,
    title: "Health Records",
    description: "Track vital signs, lab results, and health metrics with smart auto-fill",
  },
  {
    icon: Pill,
    title: "Medication Tracker",
    description: "Never miss a dose with real-time medication tracking and reminders",
  },
];

export default function Landing() {
  const { signInWithGoogle, isAuthenticated, loading } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, loading, navigate]);

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <div className="min-h-screen gradient-hero">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 md:left-20 w-48 md:w-72 h-48 md:h-72 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 md:right-20 w-64 md:w-96 h-64 md:h-96 bg-accent rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-8 md:py-20">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-12 md:mb-20"
          >
            <div className="flex items-center gap-2 md:gap-3">
              <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl gradient-primary">
                <Heart className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <span className="text-xl md:text-2xl font-bold text-white tracking-tight">
                DVDL-Health
              </span>
            </div>
            <Button
              onClick={handleSignIn}
              size="sm"
              className="gradient-primary border-0 text-white hover:opacity-90 text-sm md:text-base md:px-6"
            >
              <Sparkles className="w-4 h-4 mr-2 hidden md:inline" />
              Sign In
            </Button>
          </motion.header>

          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-12 md:mb-20"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight">
              Your AI-Powered
              <br />
              <span className="text-gradient">Health Companion</span>
            </h1>
            <p className="text-base md:text-xl text-white/70 max-w-2xl mx-auto mb-6 md:mb-10 px-4">
              Manage your health with intelligent disease prediction, symptom
              analysis, and comprehensive medical record tracking — all in one
              secure platform.
            </p>
            <Button
              onClick={handleSignIn}
              size="lg"
              className="gradient-accent border-0 text-white hover:opacity-90 text-base md:text-lg px-6 md:px-8 py-5 md:py-6"
            >
              Get Started Free
            </Button>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-all duration-300"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl gradient-primary flex items-center justify-center mb-3 md:mb-4">
                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <h3 className="text-sm md:text-lg font-semibold text-white mb-1 md:mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-white/60 text-xs md:text-sm line-clamp-3">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 md:py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-white/40 text-xs md:text-sm">
            ⚠️ Medical Disclaimer: This app provides AI-powered health
            information for educational purposes only. It does not replace
            professional medical advice, diagnosis, or treatment.
          </p>
        </div>
      </footer>
    </div>
  );
}
