import { useEffect, useRef, useState, memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Activity,
  ArrowRight,
  BarChart3,
  Bot,
  Clock,
  FileText,
  Heart,
  HeartPulse,
  Pill,
  Shield,
  Sparkles,
  Star,
  Stethoscope,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Footer } from "@/components/layout/Footer";
import { useAuthContext } from "@/contexts/AuthContext";

/* -------------------------------------------------------------------------- */
/*                                   CONFIG                                   */
/* -------------------------------------------------------------------------- */

const LOGO_URL =
  "https://inxqwecffjulxsvkfwro.supabase.co/storage/v1/object/public/logo//1769952242296.png";

/* -------------------------------------------------------------------------- */
/*                                    DATA                                    */
/* -------------------------------------------------------------------------- */

const FEATURES = [
  {
    icon: Bot,
    title: "DVDS Bot",
    description: "Instant AI-powered answers to health questions",
    gradient: "from-primary to-purple-500",
  },
  {
    icon: Stethoscope,
    title: "Disease Predictor",
    description:
      "Risk assessment for diabetes, heart, kidney & liver diseases",
    gradient: "from-accent to-orange-500",
  },
  {
    icon: FileText,
    title: "Health Records",
    description: "Smart tracking of vitals, labs & reports",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Pill,
    title: "Medication Tracker",
    description: "Dose reminders with adherence tracking",
    gradient: "from-blue-500 to-cyan-500",
  },
];

const STATS = [
  { label: "Community Members", value: "500+", icon: Users },
  { label: "Health Records", value: "10K+", icon: BarChart3 },
  { label: "AI Support", value: "24/7", icon: Bot },
  { label: "Data Privacy", value: "100%", icon: Shield },
];

const HEALTH_FOCUS = [
  {
    title: "Diabetes Prevention",
    icon: "🩸",
    description:
      "Early risk detection with community-aware diet & lifestyle guidance",
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=300&fit=crop",
  },
  {
    title: "Heart Health",
    icon: "❤️",
    description:
      "Cardiovascular monitoring aligned with NHS, CDC & ICMR",
    image:
      "https://images.unsplash.com/photo-1628348070889-cb656235b4eb?w=400&h=300&fit=crop",
  },
  {
    title: "Kidney & Liver Care",
    icon: "🫘",
    description:
      "Biomarker tracking with AI-driven organ health insights",
    image:
      "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=400&h=300&fit=crop",
  },
];

const TESTIMONIALS = [
  {
    name: "Rajesh Darji",
    location: "Mumbai, India",
    avatar: "RD",
    quote:
      "The AI guidance matched our food habits perfectly. Tracking sugar levels is effortless now.",
  },
  {
    name: "Priya Vanja",
    location: "Leicester, UK",
    avatar: "PV",
    quote:
      "Medication reminders changed everything. NHS-aligned advice is a big plus.",
  },
  {
    name: "Amit Samji",
    location: "New Jersey, USA",
    avatar: "AS",
    quote:
      "Managing my entire family's health records in one place is priceless.",
  },
];

/* -------------------------------------------------------------------------- */
/*                               UI COMPONENTS                                */
/* -------------------------------------------------------------------------- */

const AnimatedCounter = memo(({ value }: { value: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);

  const target = Number(value.replace(/\D/g, "")) || 0;

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && start(),
      { threshold: 0.2 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();

    function start() {
      let current = 0;
      const step = Math.max(1, Math.floor(target / 60));
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else setCount(current);
      }, 30);
    }
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {value.replace(/\d/g, "")}
    </span>
  );
});

/* -------------------------------------------------------------------------- */
/*                                  PAGE                                      */
/* -------------------------------------------------------------------------- */

export default function Landing() {
  const { signInWithGoogle, isAuthenticated, loading } = useAuthContext();
  const navigate = useNavigate();

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  useEffect(() => {
    if (isAuthenticated && !loading) navigate("/dashboard");
  }, [isAuthenticated, loading, navigate]);

  return (
    <div className="min-h-screen gradient-hero">
      {/* HERO */}
      <motion.section
        ref={heroRef}
        style={{ opacity, scale }}
        className="relative overflow-hidden"
      >
        <div className="max-w-6xl mx-auto px-4 py-14 text-center">
          {/* HEADER */}
          <header className="flex items-center justify-between mb-16">
            <div className="flex items-center gap-3">
              <img
                src={LOGO_URL}
                alt="DVDS Health"
                className="w-12 h-12 rounded-xl shadow-lg"
              />
              <span className="text-2xl font-bold text-white">
                DVDS-Health
              </span>
            </div>
            <Button onClick={signInWithGoogle} className="gradient-primary">
              <Sparkles className="w-4 h-4 mr-2" />
              Sign In
            </Button>
          </header>

          {/* HERO TEXT */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            AI-Powered
            <span className="block text-gradient">Community Health</span>
          </h1>

          <p className="text-white/70 max-w-2xl mx-auto mb-10">
            A culturally-aware healthcare platform built for the
            Diu Vanja Darji Samaj community.
          </p>

          <div className="flex justify-center gap-4">
            <Button
              size="lg"
              onClick={signInWithGoogle}
              className="gradient-accent"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Link to="/about">
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </Link>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {STATS.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="p-6 bg-white/10 rounded-2xl backdrop-blur-sm"
              >
                <Icon className="mx-auto text-primary mb-2" />
                <p className="text-3xl font-bold text-white">
                  <AnimatedCounter value={value} />
                </p>
                <p className="text-white/60 text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FEATURES */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-10">
            Core Features
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {FEATURES.map(({ icon: Icon, title, description, gradient }) => (
              <div
                key={title}
                className="p-6 bg-white/10 rounded-2xl hover:scale-105 transition"
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4`}
                >
                  <Icon className="text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {title}
                </h3>
                <p className="text-white/60 text-sm">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Community Voices
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="p-6 bg-white/10 rounded-2xl"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-primary fill-primary"
                    />
                  ))}
                </div>
                <p className="text-white/80 mb-4 text-sm">
                  “{t.quote}”
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-white text-sm">{t.name}</p>
                    <p className="text-white/50 text-xs">
                      {t.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
