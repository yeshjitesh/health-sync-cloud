import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Footer } from "@/components/layout/Footer";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { Users, Target, Lightbulb, Globe, Sparkles, Heart } from "lucide-react";
import { useAuthContext } from "@/contexts/AuthContext";

export default function About() {
  const { signInWithGoogle } = useAuthContext();

  return (
    <div className="min-h-screen gradient-hero">
      <PublicHeader showSignIn onSignIn={signInWithGoogle} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-primary mb-5 shadow-lg">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">About DVDS-Health</h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto">
            Empowering the Diu Vanja Darji Samaj community with AI-powered health management
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-5"
        >
          <Card className="glass-card text-white">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2.5 text-lg">
                <Target className="w-5 h-5 text-primary" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-white/80 text-sm leading-relaxed">
              <p>
                DVDS-Health is dedicated to providing accessible, intelligent health management tools
                specifically designed for the Diu Vanja Darji Samaj community. We believe that everyone
                deserves access to modern health tracking and AI-powered wellness insights.
              </p>
              <p>
                Our platform bridges the gap between traditional health awareness and cutting-edge
                technology, making preventive healthcare accessible to all community members, regardless
                of their technical expertise.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card text-white">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2.5 text-lg">
                <Globe className="w-5 h-5 text-primary" />
                Serving Our Community
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-white/80 text-sm leading-relaxed">
              <p>
                The Diu Vanja Darji Samaj community spans across India, the UK, the US, and beyond.
                DVDS-Health recognizes this global presence and provides:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li><strong className="text-white">Region-specific guidance:</strong> Health recommendations aligned with local healthcare systems (NHS, CDC, ICMR)</li>
                <li><strong className="text-white">Cultural sensitivity:</strong> Understanding of community health priorities and concerns</li>
                <li><strong className="text-white">Accessibility:</strong> Simple, intuitive design for users of all ages</li>
                <li><strong className="text-white">Privacy-first:</strong> Your health data belongs to you and you alone</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glass-card text-white">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2.5 text-lg">
                <Lightbulb className="w-5 h-5 text-primary" />
                What We Offer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-white/80 text-sm leading-relaxed">
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li><strong className="text-white">DVDS Bot:</strong> AI health assistant for instant health guidance</li>
                <li><strong className="text-white">Disease Predictor:</strong> Risk assessments for diabetes, heart disease, kidney, and liver conditions</li>
                <li><strong className="text-white">Health Records:</strong> Comprehensive tracking of vitals, lab results, and health metrics</li>
                <li><strong className="text-white">Medication Manager:</strong> Never miss a dose with smart reminders</li>
                <li><strong className="text-white">Secure Documents:</strong> Store and organize medical documents safely</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glass-card text-white">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2.5 text-lg">
                <Sparkles className="w-5 h-5 text-primary" />
                Our Commitment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-white/80 text-sm leading-relaxed">
              <p>
                We are committed to continuously improving DVDS-Health based on community feedback.
                Our roadmap includes:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Multi-language support (Gujarati, English, Portuguese)</li>
                <li>Family health management features</li>
                <li>Integration with wearable devices</li>
                <li>Telemedicine connections with healthcare providers</li>
                <li>Community health initiatives and awareness programs</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
