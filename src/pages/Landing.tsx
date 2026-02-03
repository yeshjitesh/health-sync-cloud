import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Heart,
  Users,
  Bot,
  Shield,
  FileText,
  Pill,
  Stethoscope,
  Sparkles,
  ArrowRight,
  Star,
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
/*                                   DATA                                     */
/* -------------------------------------------------------------------------- */

const FEATURES = [
  {
    icon: Bot,
    title: "DVDS AI Health Mitra",
    desc: "Community-aware AI guidance aligned with Indian lifestyle & food habits",
    gradient: "from-orange-500 to-rose-600",
  },
  {
    icon: Stethoscope,
    title: "Disease Risk Checker",
    desc: "Early screening for diabetes, BP, heart, kidney & liver conditions",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    icon: FileText,
    title: "Family Health Records",
    desc: "Store reports, lab values & vitals for your entire parivaar",
    gradient: "from-indigo-500 to-purple-600",
  },
  {
    icon: Pill,
    title: "Medicine & Care Reminders",
    desc: "Never miss medicines for elders, parents or yourself",
    gradient: "from-pink-500 to-fuchsia-600",
  },
];

const STATS = [
  { label: "Community Members", value: "500+" },
  { label: "Families Onboarded", value: "200+" },
  { label: "AI Support", value: "24/7" },
  { label: "Privacy & Trust", value: "100%" },
];

const TESTIMONIALS = [
  {
    name: "Rajesh Darji",
    place: "Mumbai",
    quote:
      "DVDS-Health understands our food, our habits, and our lifestyle. It feels made for us.",
    avatar: "RD",
  },
  {
    name: "Priya Vanja",
    place: "Leicester, UK",
    quote:
      "I manage my parents’ medicines from abroad. This app gives me peace of mind.",
    avatar: "PV",
  },
  {
    name: "Amit Samji",
    place: "New Jersey, USA",
    quote:
      "All family reports in one place. Simple, respectful, and very useful.",
    avatar: "AS",
  },
];

/* -------------------------------------------------------------------------- */
/*                              HELPER COMPONENTS                             */
/* -------------------------------------------------------------------------- */

function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const target = Number(value.replace(/\D/g, "")) || 0;

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && start(),
      { threshold: 0.3 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();

    function start() {
      let current = 0;
      const step = Math.max(1, Math.floor(target / 50));
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(current);
        }
      }, 35);
    }
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {value.replace(/\d/g, "")}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   PAGE                                     */
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
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);

  useEffect(() => {
    if (isAuthenticated && !loading) navigate("/dashboard");
  }, [isAuthenticated, loading, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2b0f0f] via-[#3a1414] to-black text-white">
      {/* HERO */}
      <motion.section
        ref={heroRef}
        style={{ opacity, scale }}
        className="relative overflow-hidden"
      >
        {/* Soft Diya Glow */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ opacity: [0.2, 0.35, 0.2] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-orange-500/20 blur-[120px] rounded-full"
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-16 text-center">
          {/* HEADER */}
          <header className="flex justify-between items-center mb-14">
            <div className="flex items-center gap-3">
              <img
                src={LOGO_URL}
                className="w-12 h-12 rounded-xl shadow-lg"
                alt="DVDS Health"
              />
              <span className="text-2xl font-bold tracking-wide">
                DVDS-Health
              </span>
            </div>
            <Button onClick={signInWithGoogle} className="bg-white text-black">
              Sign In
            </Button>
          </header>

          {/* HERO TEXT */}
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Community First.
            <br />
            <span className="text-orange-400">Health Always.</span>
          </h1>

          <p className="text-white/80 max-w-2xl mx-auto mb-10 text-lg">
            A digital health companion built specially for the
            <span className="text-orange-300 font-medium">
              {" "}
              Diu Vanja Darji Samaj
            </span>
            , focusing on family care, prevention, and togetherness.
          </p>

          <Button
            size="lg"
            onClick={signInWithGoogle}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg"
          >
            Join the Community
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="p-6 rounded-2xl bg-white/10 backdrop-blur"
              >
                <p className="text-3xl font-bold">
                  <AnimatedCounter value={s.value} />
                </p>
                <p className="text-white/60 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FEATURES */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Built for Our Samaj
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {FEATURES.map((f) => (
              <motion.div
                key={f.title}
                whileHover={{ y: -6 }}
                className="p-6 rounded-2xl bg-white/10"
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mb-4`}
                >
                  <f.icon />
                </div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-white/70 text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Voices From Our Community
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="p-6 rounded-2xl bg-white/10">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-orange-400 fill-orange-400"
                    />
                  ))}
                </div>
                <p className="text-white/80 mb-4 text-sm">
                  “{t.quote}”
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center font-semibold">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm">{t.name}</p>
                    <p className="text-xs text-white/50">{t.place}</p>
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
