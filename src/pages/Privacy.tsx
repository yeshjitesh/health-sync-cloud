import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Footer } from "@/components/layout/Footer";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { Shield, Lock, Eye, Database, UserCheck } from "lucide-react";
import { useAuthContext } from "@/contexts/AuthContext";

export default function Privacy() {
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
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Privacy Policy</h1>
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
                <Lock className="w-5 h-5 text-primary" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-white/80 text-sm leading-relaxed">
              <p>We collect the following types of information:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li><strong className="text-white">Account Information:</strong> Email address and authentication details via Google Sign-In</li>
                <li><strong className="text-white">Profile Data:</strong> Name, date of birth, gender, height, weight, blood type, and emergency contact</li>
                <li><strong className="text-white">Health Records:</strong> Vital signs, lab results, and health metrics you choose to track</li>
                <li><strong className="text-white">Medication Data:</strong> Medications, dosages, and schedules you enter</li>
                <li><strong className="text-white">Location Data:</strong> Only with your explicit consent, for region-specific health guidance</li>
                <li><strong className="text-white">Chat History:</strong> Conversations with DVDS Bot for continuity of care discussions</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glass-card text-white">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2.5 text-lg">
                <Database className="w-5 h-5 text-primary" />
                How We Use Your Data
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-white/80 text-sm leading-relaxed">
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Provide personalized health tracking and insights</li>
                <li>Power AI-driven disease risk assessments</li>
                <li>Deliver region-specific health recommendations</li>
                <li>Send medication reminders and health notifications</li>
                <li>Improve our AI health assistant's responses</li>
              </ul>
              <div className="mt-4 p-4 rounded-lg bg-primary/10 border border-primary/20">
                <p className="text-primary font-medium">
                  We never sell your health data. Your information is used solely to provide and improve our services.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card text-white">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2.5 text-lg">
                <Eye className="w-5 h-5 text-primary" />
                Data Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-white/80 text-sm leading-relaxed">
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>All data is encrypted in transit and at rest</li>
                <li>Row-level security ensures only you can access your data</li>
                <li>We use secure, industry-standard authentication</li>
                <li>Regular security audits and updates</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glass-card text-white">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2.5 text-lg">
                <UserCheck className="w-5 h-5 text-primary" />
                Your Rights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-white/80 text-sm leading-relaxed">
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li><strong className="text-white">Access:</strong> Request a copy of your personal data</li>
                <li><strong className="text-white">Correction:</strong> Update inaccurate information</li>
                <li><strong className="text-white">Deletion:</strong> Request deletion of your account and data</li>
                <li><strong className="text-white">Export:</strong> Download your health records</li>
                <li><strong className="text-white">Withdraw Consent:</strong> Revoke location permissions at any time</li>
              </ul>
              <p className="mt-4 text-white/60">
                To exercise these rights, contact us at <span className="text-primary">privacy@dvds-health.com</span>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
