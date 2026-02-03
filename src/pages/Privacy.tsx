import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Footer } from "@/components/layout/Footer";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { Shield, Lock, Eye, Database, UserCheck } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen gradient-hero">
      <PublicHeader />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-primary mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-white/70">Last updated: February 1, 2026</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-white/10 backdrop-blur-sm border-white/10 text-white mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-primary" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-white/80">
              <p>We collect the following types of information:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Account Information:</strong> Email address and authentication details via Google Sign-In</li>
                <li><strong>Profile Data:</strong> Name, date of birth, gender, height, weight, blood type, and emergency contact</li>
                <li><strong>Health Records:</strong> Vital signs, lab results, and health metrics you choose to track</li>
                <li><strong>Medication Data:</strong> Medications, dosages, and schedules you enter</li>
                <li><strong>Location Data:</strong> Only with your explicit consent, for region-specific health guidance</li>
                <li><strong>Chat History:</strong> Conversations with DVDS Bot for continuity of care discussions</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/10 text-white mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5 text-primary" />
                How We Use Your Data
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-white/80">
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide personalized health tracking and insights</li>
                <li>Power AI-driven disease risk assessments</li>
                <li>Deliver region-specific health recommendations</li>
                <li>Send medication reminders and health notifications</li>
                <li>Improve our AI health assistant's responses</li>
              </ul>
              <p className="mt-4">
                <strong>We never sell your health data.</strong> Your information is used solely to provide and improve our services.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/10 text-white mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-primary" />
                Data Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-white/80">
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>All data is encrypted in transit and at rest</li>
                <li>Row-level security ensures only you can access your data</li>
                <li>We use secure, industry-standard authentication</li>
                <li>Regular security audits and updates</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/10 text-white mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-primary" />
                Your Rights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-white/80">
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Update inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your account and data</li>
                <li><strong>Export:</strong> Download your health records</li>
                <li><strong>Withdraw Consent:</strong> Revoke location permissions at any time</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, contact us at privacy@dvds-health.com
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
