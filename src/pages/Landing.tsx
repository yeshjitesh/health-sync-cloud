import { useNavigate, Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/contexts/AuthContext";
import { useEffect, useRef, useState } from "react";
import { Footer } from "@/components/layout/Footer";
import { Heart, Activity, FileText, Sparkles, Pill, Bot, Users, BarChart3, Shield, Stethoscope, ArrowRight, Star, HeartPulse, Zap, Clock, TrendingUp, MapPin, Sliders } from "lucide-react";
const features = [{
  icon: Bot,
  title: "DVDS Bot",
  description: "Get instant answers to your health questions with our AI-powered assistant",
  color: "from-primary to-purple-500"
}, {
  icon: Stethoscope,
  title: "Disease Predictor",
  description: "Assess your risk for diabetes, heart disease, kidney and liver conditions",
  color: "from-accent to-orange-500"
}, {
  icon: MapPin,
  title: "Community Health Risk Radar",
  description: "Realtime + geo-aware alerts from anonymised vitals and public data",
  color: "from-fuchsia-500 to-pink-500"
}, {
  icon: Sliders,
  title: "Smart Vitals Engine",
  description: "Schema-driven vitals that adapt inputs, units, ranges, and validation",
  color: "from-amber-500 to-orange-500"
}, {
  icon: FileText,
  title: "Health Records",
  description: "Track vital signs, lab results, and health metrics with smart auto-fill",
  color: "from-green-500 to-emerald-500"
}, {
  icon: Pill,
  title: "Medication Tracker",
  description: "Never miss a dose with real-time medication tracking and reminders",
  color: "from-blue-500 to-cyan-500"
}];
const stats = [{
  value: "500+",
  label: "Community Members",
  icon: Users
}, {
  value: "10K+",
  label: "Health Records Tracked",
  icon: BarChart3
}, {
  value: "24/7",
  label: "AI Health Support",
  icon: Bot
}, {
  value: "100%",
  label: "Data Privacy",
  icon: Shield
}];
const healthFocus = [{
  title: "Diabetes Prevention",
  description: "Early risk assessment and lifestyle recommendations for diabetes prevention in our community.",
  icon: "🩸",
  image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=300&fit=crop"
}, {
  title: "Heart Health",
  description: "Cardiovascular risk monitoring with region-specific guidelines from NHS, CDC, or ICMR.",
  icon: "❤️",
  image: "https://images.unsplash.com/photo-1628348070889-cb656235b4eb?w=400&h=300&fit=crop"
}, {
  title: "Kidney & Liver Care",
  description: "Track key biomarkers and get AI-powered insights for organ health management.",
  icon: "🫘",
  image: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=400&h=300&fit=crop"
}];
const testimonials = [{
  name: "Rajesh Darji",
  location: "Mumbai, India",
  quote: "DVDS-Health helped me track my blood sugar levels and the AI assistant gave me practical diet tips aligned with our community's food habits.",
  avatar: "RD"
}, {
  name: "Priya Vanja",
  location: "Leicester, UK",
  quote: "The medication reminders are a lifesaver! I never miss my blood pressure pills now, and the NHS-aligned guidance is very helpful.",
  avatar: "PV"
}, {
  name: "Amit Samji",
  location: "New Jersey, USA",
  quote: "Being able to track my family's health records in one place has made managing everyone's wellness so much easier.",
  avatar: "AS"
}];

const LOGO_URL = "https://inxqwecffjulxsvkfwro.supabase.co/storage/v1/object/public/logo//1769952242296.png";

// Animated counter component
function AnimatedCounter({
  target,
  suffix = ""
}: {
  target: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const numericTarget = parseInt(target.replace(/[^0-9]/g, "")) || 0;
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, {
      threshold: 0.1
    });
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!isVisible) return;
    const duration = 2000;
    const steps = 60;
    const increment = numericTarget / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericTarget) {
        setCount(numericTarget);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isVisible, numericTarget]);
  return <span ref={ref}>
      {count}
      {target.includes("+") ? "+" : ""}
      {target.includes("K") ? "K" : ""}
      {target.includes("/") ? "/7" : ""}
      {target.includes("%") ? "%" : ""}
      {suffix}
    </span>;
}

// Floating animated particles
function FloatingParticles() {
  return <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => <motion.div key={i} className="absolute w-2 h-2 rounded-full bg-primary/20" initial={{
      x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
      y: Math.random() * 600
    }} animate={{
      y: [null, -100, 600],
      x: [null, Math.random() * 100 - 50 + Math.random() * 1000]
    }} transition={{
      duration: 10 + Math.random() * 10,
      repeat: Infinity,
      ease: "linear",
      delay: Math.random() * 5
    }} />)}
    </div>;
}
export default function Landing() {
  const {
    signInWithGoogle,
    isAuthenticated,
    loading
  } = useAuthContext();
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const {
    scrollYProgress
  } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
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
  return <div className="min-h-screen gradient-hero">
      {/* Hero Section */}
      <motion.div ref={heroRef} style={{
      opacity: heroOpacity,
      scale: heroScale
    }} className="relative overflow-hidden">
        {/* Animated Background */}
        <FloatingParticles />
        
        <div className="absolute inset-0 opacity-20">
          <motion.div animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0]
        }} transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }} className="absolute top-20 left-10 md:left-20 w-48 md:w-72 h-48 md:h-72 bg-primary rounded-full blur-3xl" />
          <motion.div animate={{
          scale: [1.2, 1, 1.2],
          rotate: [90, 0, 90]
        }} transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }} className="absolute bottom-20 right-10 md:right-20 w-64 md:w-96 h-64 md:h-96 bg-accent rounded-full blur-3xl" />
          <motion.div animate={{
          scale: [1, 1.3, 1]
        }} transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-30" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-8 md:py-16">
          {/* Header */}
          <motion.header initial={{
          opacity: 0,
          y: -20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="flex items-center justify-between mb-12 md:mb-16">
            <div className="flex items-center gap-2 md:gap-3">
              <motion.div whileHover={{
              scale: 1.05,
              rotate: 5
            }} className="w-10 h-10 md:w-12 md:h-12 rounded-xl overflow-hidden shadow-lg">
                <img alt="DVDS-Health" className="w-full h-full object-cover" src={LOGO_URL} />
              </motion.div>
              <span className="text-xl md:text-2xl font-bold text-white tracking-tight">DVDS-Health</span>
            </div>
            <Button onClick={handleSignIn} size="sm" className="gradient-primary border-0 text-white hover:opacity-90 text-sm md:text-base md:px-6 shadow-lg">
              <Sparkles className="w-4 h-4 mr-2 hidden md:inline" />
              Sign In
            </Button>
          </motion.header>

          {/* Hero Content */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.2
        }} className="text-center mb-12 md:mb-16">
            <motion.div initial={{
            scale: 0.9
          }} animate={{
            scale: 1
          }} transition={{
            delay: 0.1
          }} className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-white/80 text-sm">For the Diu Vanja Darji Samaj Community</span>
            </motion.div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
              Your AI-Powered
              <br />
              <motion.span className="text-gradient inline-block" animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }} transition={{
              duration: 5,
              repeat: Infinity
            }}>
                Health Companion
              </motion.span>
            </h1>
            <p className="text-base md:text-xl text-white/70 max-w-2xl mx-auto mb-8 md:mb-10 px-4">
              Manage your health with intelligent disease prediction, symptom
              analysis, and comprehensive medical record tracking — designed with our community's wellness in mind.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.98
            }}>
                <Button onClick={handleSignIn} size="lg" className="gradient-accent border-0 text-white hover:opacity-90 text-base md:text-lg px-6 md:px-8 py-5 md:py-6 shadow-xl shadow-accent/30">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
              <Link to="/about">
                <motion.div whileHover={{
                scale: 1.05
              }} whileTap={{
                scale: 0.98
              }}>
                  <Button variant="outline" size="lg" className="border-2 border-white/40 bg-white/10 text-white hover:bg-white/20 hover:border-white/60 text-base md:text-lg px-6 md:px-8 py-5 md:py-6 w-full sm:w-auto backdrop-blur-sm">
                    Learn More
                  </Button>
                </motion.div>
              </Link>
            </div>
          </motion.div>

          {/* Animated Health Icons */}
          <div className="hidden lg:block absolute top-1/3 left-8">
            <motion.div animate={{
            y: [0, -10, 0],
            rotate: [0, 5, 0]
          }} transition={{
            duration: 4,
            repeat: Infinity
          }}>
              <HeartPulse className="w-12 h-12 text-primary/40" />
            </motion.div>
          </div>
          <div className="hidden lg:block absolute top-1/2 right-8">
            <motion.div animate={{
            y: [0, 10, 0],
            rotate: [0, -5, 0]
          }} transition={{
            duration: 5,
            repeat: Infinity
          }}>
              <Activity className="w-10 h-10 text-accent/40" />
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.3
        }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {stats.map((stat, index) => {
            const Icon = stat.icon;
            return <motion.div key={stat.label} initial={{
              opacity: 0,
              scale: 0.9
            }} animate={{
              opacity: 1,
              scale: 1
            }} transition={{
              delay: 0.4 + index * 0.1
            }} whileHover={{
              scale: 1.05,
              y: -5
            }} className="text-center p-4 md:p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all cursor-default">
                  <Icon className="w-6 h-6 md:w-8 md:h-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl md:text-3xl font-bold text-white">
                    <AnimatedCounter target={stat.value} />
                  </p>
                  <p className="text-xs md:text-sm text-white/60">{stat.label}</p>
                </motion.div>;
          })}
          </motion.div>

          {/* Features Grid */}
          <motion.div initial={{
          opacity: 0,
          y: 40
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.5
        }} className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
              Everything You Need for Better Health
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {features.map((feature, index) => {
              const Icon = feature.icon;
              return <motion.div key={feature.title} initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.6 + index * 0.1
              }} whileHover={{
                y: -10,
                scale: 1.02
              }} className="p-5 md:p-6 rounded-xl md:rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/15 hover:border-white/20 transition-all duration-300 group cursor-pointer">
                    <motion.div whileHover={{
                  rotate: [0, -10, 10, 0]
                }} transition={{
                  duration: 0.5
                }} className={`w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg`}>
                      <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                    </motion.div>
                    <h3 className="text-base md:text-lg font-semibold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-white/60 text-sm">
                      {feature.description}
                    </p>
                  </motion.div>;
            })}
            </div>
          </motion.div>
        </div>
      </motion.div>

      <section className="py-16 md:py-20 bg-gradient-to-b from-black/5 to-black/10">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm mb-4">
                <MapPin className="w-4 h-4 text-primary" />
                Community Health Risk Radar
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Realtime + Geo-Aware
              </h2>
              <p className="text-white/70 text-base md:text-lg mb-6">
                Aggregates anonymised vitals + public data to detect local health risks in realtime.
              </p>
              <div className="space-y-4 text-white/70 text-sm md:text-base">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <p className="font-semibold text-white mb-1">What makes it unique</p>
                  <p>Aggregates anonymised vitals + public data to detect local health risks in realtime.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <p className="font-semibold text-white mb-1">Example</p>
                  <p>“Rising BP &amp; dehydration trends detected in your area this week.”</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <p className="font-semibold text-white mb-1">Why it matters</p>
                  <p>Preventive, population-level health insight (rare in consumer apps).</p>
                </div>
              </div>
            </div>
            <motion.div whileHover={{
            y: -6
          }} className="p-6 md:p-8 rounded-3xl bg-white/10 border border-white/15 backdrop-blur-sm shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-pink-500 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs uppercase tracking-[0.2em] text-white/50">Realtime signal</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Community Health Risk Radar</h3>
              <p className="text-white/70 text-sm mb-5">
                See localized alerts for heat stress, BP spikes, or dehydration risks based on anonymised trends.
              </p>
              <div className="space-y-3">
                {["Geo-aware alerts", "Anonymised vitals aggregation", "Public health signal fusion"].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-white/70 text-sm">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gradient-to-b from-black/10 to-black/20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="grid lg:grid-cols-[0.95fr_1.05fr] gap-8 items-center">
            <motion.div whileHover={{
            y: -6
          }} className="p-6 md:p-8 rounded-3xl bg-white/10 border border-white/15 backdrop-blur-sm shadow-xl order-2 lg:order-1">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                  <Sliders className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs uppercase tracking-[0.2em] text-white/50">Schema-driven</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Smart Vitals Engine</h3>
              <p className="text-white/70 text-sm mb-5">
                Vitals dynamically change inputs, units, ranges, and validation.
              </p>
              <div className="space-y-3">
                {["Locks unit to mmHg", "Shows only systolic & diastolic", "Flags abnormal values live"].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-white/70 text-sm">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm mb-4">
                <Sliders className="w-4 h-4 text-primary" />
                Smart Vitals Engine
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Schema-Driven Health Records
              </h2>
              <p className="text-white/70 text-base md:text-lg mb-6">
                Selecting Blood Pressure instantly adapts the form so every reading stays accurate and consistent.
              </p>
              <div className="space-y-4 text-white/70 text-sm md:text-base">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <p className="font-semibold text-white mb-1">What makes it unique</p>
                  <p>Vitals dynamically change inputs, units, ranges, and validation.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <p className="font-semibold text-white mb-1">Example</p>
                  <p className="text-white/70 mb-2">Selecting Blood Pressure instantly:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Locks unit to mmHg</li>
                    <li>Shows only systolic &amp; diastolic</li>
                    <li>Flags abnormal values live</li>
                  </ul>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <p className="font-semibold text-white mb-1">Why it matters</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Eliminates user error</li>
                    <li>Clinically clean data</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-transparent to-black/10">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Why Choose DVDS-Health?
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Built specifically for our community with features that matter most.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[{
            icon: Zap,
            title: "Real-Time Sync",
            desc: "Your health data syncs instantly across all devices"
          }, {
            icon: Clock,
            title: "24/7 AI Support",
            desc: "Get health guidance anytime with our AI bot"
          }, {
            icon: TrendingUp,
            title: "Track Progress",
            desc: "Visual insights into your health journey"
          }].map((item, index) => <motion.div key={item.title} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: index * 0.1
          }} whileHover={{
            y: -5
          }} className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 text-center">
                <item.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-white/60 text-sm">{item.desc}</p>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Community Health Focus Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-black/10 to-black/20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Focused on Community Health Priorities
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              We address the health concerns most relevant to the Diu Vanja Darji Samaj community with culturally-aware AI guidance.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {healthFocus.map((item, index) => <motion.div key={item.title} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: index * 0.1
          }} whileHover={{
            y: -5
          }} className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden group">
                <div className="h-40 overflow-hidden">
                  <motion.img src={item.image} alt={item.title} className="w-full h-full object-cover" whileHover={{
                scale: 1.1
              }} transition={{
                duration: 0.3
              }} />
                </div>
                <div className="p-6 text-center">
                  <span className="text-3xl mb-3 block">{item.icon}</span>
                  <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-white/60 text-sm">{item.description}</p>
                </div>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Trusted by Our Community
            </h2>
            <p className="text-white/60">
              See what community members are saying about DVDS-Health
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => <motion.div key={testimonial.name} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: index * 0.1
          }} whileHover={{
            y: -5
          }} className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}
                </div>
                <p className="text-white/80 mb-4 text-sm leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-semibold text-sm">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{testimonial.name}</p>
                    <p className="text-white/50 text-xs">{testimonial.location}</p>
                  </div>
                </div>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div initial={{
          opacity: 0,
          scale: 0.95
        }} whileInView={{
          opacity: 1,
          scale: 1
        }} viewport={{
          once: true
        }} className="p-8 md:p-12 rounded-3xl gradient-primary text-center relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <motion.div animate={{
              scale: [1, 1.1, 1]
            }} transition={{
              duration: 2,
              repeat: Infinity
            }} className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-white/20 flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </motion.div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Start Your Health Journey Today
              </h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">
                Join hundreds of community members already using DVDS-Health to take control of their wellness.
              </p>
              <motion.div whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.98
            }}>
                <Button onClick={handleSignIn} size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 shadow-xl">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>;
}
