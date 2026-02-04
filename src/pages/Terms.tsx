import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Footer } from "@/components/layout/Footer";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { FileText, AlertTriangle, Scale, Ban, RefreshCw } from "lucide-react";
import { useAuthContext } from "@/contexts/AuthContext";

export default function Terms() {
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
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Terms of Service</h1>
          <p className="text-white/60 text-sm">Last updated: February 1, 2026</p>
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
                <Scale className="w-5 h-5 text-primary" />
                Acceptance of Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-white/80 text-sm leading-relaxed">
              <p>
                By accessing and using DVDS-Health, you agree to be bound by these Terms of Service.
                If you do not agree to these terms, please do not use our services.
              </p>
              <p>
                DVDS-Health is a platform designed for the Diu Vanja Darji Samaj community to track
                health metrics, receive AI-powered health insights, and manage medications.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card text-white border-amber-500/30">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2.5 text-lg text-amber-400">
                <AlertTriangle className="w-5 h-5" />
                Medical Disclaimer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-white/80 text-sm leading-relaxed">
              <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <p className="font-semibold text-amber-200">
                  DVDS-Health is NOT a substitute for professional medical advice, diagnosis, or treatment.
                </p>
              </div>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>The AI health assistant provides general health information only</li>
                <li>Disease risk assessments are educational tools, not medical diagnoses</li>
                <li>Always consult qualified healthcare providers for medical decisions</li>
                <li>In emergencies, call your local emergency services immediately</li>
                <li>Never disregard professional medical advice based on app information</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glass-card text-white">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2.5 text-lg">
                <Ban className="w-5 h-5 text-primary" />
                Prohibited Uses
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-white/80 text-sm leading-relaxed">
              <p>You agree not to:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Use the service for any unlawful purpose</li>
                <li>Share your account credentials with others</li>
                <li>Attempt to access other users' health data</li>
                <li>Use automated systems to access the service</li>
                <li>Provide false information in your health records</li>
                <li>Use the service to replace professional medical care</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glass-card text-white">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2.5 text-lg">
                <RefreshCw className="w-5 h-5 text-primary" />
                Service Availability
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-white/80 text-sm leading-relaxed">
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>We strive to maintain 99.9% uptime but cannot guarantee uninterrupted service</li>
                <li>We may modify or discontinue features with reasonable notice</li>
                <li>We reserve the right to terminate accounts that violate these terms</li>
                <li>Your health data remains accessible for export even after account termination</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glass-card text-white">
            <CardContent className="pt-6 text-white/80 text-sm">
              <p>
                For questions about these terms, contact us at <span className="text-primary">legal@dvds-health.com</span>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
