import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { Footer } from "@/components/layout/Footer";
import {
  Heart,
  Activity,
  FileText,
  Sparkles,
  Pill,
  Bot,
  Users,
  BarChart3,
  Shield,
  Stethoscope,
  ArrowRight,
  Star,
} from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "DVDL Bot",
    description: "Get instant answers to your health questions with our AI-powered assistant",
    color: "from-primary to-purple-500",
  },
  {
    icon: Stethoscope,
    title: "Disease Predictor",
    description: "Assess your risk for diabetes, heart disease, kidney and liver conditions",
    color: "from-accent to-orange-500",
  },
  {
    icon: FileText,
    title: "Health Records",
    description: "Track vital signs, lab results, and health metrics with smart auto-fill",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Pill,
    title: "Medication Tracker",
    description: "Never miss a dose with real-time medication tracking and reminders",
    color: "from-blue-500 to-cyan-500",
  },
];

const stats = [
  { value: "500+", label: "Community Members", icon: Users },
  { value: "10K+", label: "Health Records Tracked", icon: BarChart3 },
  { value: "24/7", label: "AI Health Support", icon: Bot },
  { value: "100%", label: "Data Privacy", icon: Shield },
];

const healthFocus = [
  {
    title: "Diabetes Prevention",
    description: "Early risk assessment and lifestyle recommendations for diabetes prevention in our community.",
    icon: "🩸",
  },
  {
    title: "Heart Health",
    description: "Cardiovascular risk monitoring with region-specific guidelines from NHS, CDC, or ICMR.",
    icon: "❤️",
  },
  {
    title: "Kidney & Liver Care",
    description: "Track key biomarkers and get AI-powered insights for organ health management.",
    icon: "🫘",
  },
];

const testimonials = [
  {
    name: "Rajesh Darji",
    location: "Mumbai, India",
    quote: "DVDL-Health helped me track my blood sugar levels and the AI assistant gave me practical diet tips aligned with our community's food habits.",
    avatar: "RD",
  },
  {
    name: "Priya Vanja",
    location: "Leicester, UK",
    quote: "The medication reminders are a lifesaver! I never miss my blood pressure pills now, and the NHS-aligned guidance is very helpful.",
    avatar: "PV",
  },
  {
    name: "Amit Samji",
    location: "New Jersey, USA",
    quote: "Being able to track my family's health records in one place has made managing everyone's wellness so much easier.",
    avatar: "AS",
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
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-30" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-8 md:py-16">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-12 md:mb-16"
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
            className="text-center mb-12 md:mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-white/80 text-sm">For the Diu Vanja Darji Samaj Community</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
              Your AI-Powered
              <br />
              <span className="text-gradient">Health Companion</span>
            </h1>
            <p className="text-base md:text-xl text-white/70 max-w-2xl mx-auto mb-8 md:mb-10 px-4">
              Manage your health with intelligent disease prediction, symptom
              analysis, and comprehensive medical record tracking — designed with our community's wellness in mind.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleSignIn}
                size="lg"
                className="gradient-accent border-0 text-white hover:opacity-90 text-base md:text-lg px-6 md:px-8 py-5 md:py-6"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Link to="/about">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 text-base md:text-lg px-6 md:px-8 py-5 md:py-6 w-full sm:w-auto"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="text-center p-4 md:p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
                >
                  <Icon className="w-6 h-6 md:w-8 md:h-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs md:text-sm text-white/60">{stat.label}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-16"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
              Everything You Need for Better Health
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="p-5 md:p-6 rounded-xl md:rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-all duration-300 group"
                  >
                    <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                    </div>
                    <h3 className="text-base md:text-lg font-semibold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-white/60 text-sm">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Community Health Focus Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-transparent to-black/20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Focused on Community Health Priorities
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              We address the health concerns most relevant to the Diu Vanja Darji Samaj community with culturally-aware AI guidance.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {healthFocus.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 text-center"
              >
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-white/60 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Trusted by Our Community
            </h2>
            <p className="text-white/60">
              See what community members are saying about DVDL-Health
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-8 md:p-12 rounded-3xl gradient-primary text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Start Your Health Journey Today
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Join hundreds of community members already using DVDL-Health to take control of their wellness.
            </p>
            <Button
              onClick={handleSignIn}
              size="lg"
              className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
