import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Footer } from "@/components/layout/Footer";
import { Heart, Users, Target, Lightbulb, Globe, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
export default function About() {
  return <div className="min-h-screen gradient-hero">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            
            <span className="text-xl font-bold text-white tracking-tight">DVDL-Health</span>
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-primary mb-4">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">About DVDL-Health</h1>
          <p className="text-white/70 text-lg">
            Empowering the Diu Vanja Darji Samaj community with AI-powered health management
          </p>
        </motion.div>

        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.1
      }}>
          <Card className="bg-white/10 backdrop-blur-sm border-white/10 text-white mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-white/80">
              <p>
                DVDL-Health is dedicated to providing accessible, intelligent health management tools
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

          <Card className="bg-white/10 backdrop-blur-sm border-white/10 text-white mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                Serving Our Community
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-white/80">
              <p>
                The Diu Vanja Darji Samaj community spans across India, the UK, the US, and beyond.
                DVDL-Health recognizes this global presence and provides:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Region-specific guidance:</strong> Health recommendations aligned with local healthcare systems (NHS, CDC, ICMR)</li>
                <li><strong>Cultural sensitivity:</strong> Understanding of community health priorities and concerns</li>
                <li><strong>Accessibility:</strong> Simple, intuitive design for users of all ages</li>
                <li><strong>Privacy-first:</strong> Your health data belongs to you and you alone</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/10 text-white mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-primary" />
                What We Offer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-white/80">
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>DVDL Bot:</strong> AI health assistant for instant health guidance</li>
                <li><strong>Disease Predictor:</strong> Risk assessments for diabetes, heart disease, kidney, and liver conditions</li>
                <li><strong>Health Records:</strong> Comprehensive tracking of vitals, lab results, and health metrics</li>
                <li><strong>Medication Manager:</strong> Never miss a dose with smart reminders</li>
                <li><strong>Secure Documents:</strong> Store and organize medical documents safely</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/10 text-white mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Our Commitment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-white/80">
              <p>
                We are committed to continuously improving DVDL-Health based on community feedback.
                Our roadmap includes:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Multi-language support (Gujarati, Hindi, English)</li>
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
    </div>;
}