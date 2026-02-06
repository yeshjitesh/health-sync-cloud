import { PublicHeader } from "@/components/layout/PublicHeader";
import { Footer } from "@/components/layout/Footer";
import { Shield, Lock, Eye, Database, UserCheck, FileText } from "lucide-react";

export default function Privacy() {
  const sections = [
    {
      icon: Database,
      title: "Information We Collect",
      content: `We collect information you provide directly to us, such as when you create an account, 
      use our health tracking features, or contact us for support. This may include:
      • Account information (email, name, profile details)
      • Health data you choose to log (vital signs, medications, health records)
      • Location data (only with your explicit consent)
      • Usage data and analytics to improve our services`
    },
    {
      icon: Lock,
      title: "How We Protect Your Data",
      content: `Your health data is encrypted both in transit and at rest using industry-standard 
      encryption protocols. We implement:
      • AES-256 encryption for stored data
      • TLS 1.3 for data in transit
      • Regular security audits and penetration testing
      • Strict access controls and authentication`
    },
    {
      icon: Eye,
      title: "How We Use Your Information",
      content: `We use your information to:
      • Provide and improve our health tracking services
      • Generate personalized health insights using AI
      • Send medication reminders and health notifications
      • Comply with legal obligations
      We never sell your personal health data to third parties.`
    },
    {
      icon: UserCheck,
      title: "Your Rights and Choices",
      content: `You have the right to:
      • Access, update, or delete your personal data
      • Export your health records at any time
      • Opt out of non-essential communications
      • Revoke location permissions
      • Request a copy of all data we hold about you`
    },
    {
      icon: Shield,
      title: "Data Retention",
      content: `We retain your health data for as long as your account is active or as needed to 
      provide services. You can request deletion of your data at any time through your 
      account settings or by contacting us.`
    },
    {
      icon: FileText,
      title: "Updates to This Policy",
      content: `We may update this privacy policy from time to time. We will notify you of any 
      significant changes by email or through the app. Your continued use of DVDS-Health 
      after such modifications constitutes your acceptance of the updated policy.`
    }
  ];

  return (
    <div className="min-h-screen gradient-hero flex flex-col">
      <PublicHeader />
      
      <main className="flex-1 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="icon-gold w-16 h-16 mx-auto mb-6">
              <Shield className="w-8 h-8 text-gold-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-cream-100 mb-4">
              Privacy Policy
            </h1>
            <p className="text-cream-400 max-w-2xl mx-auto">
              Your privacy and the security of your health data are our top priorities. 
              This policy explains how we collect, use, and protect your information.
            </p>
            <p className="text-cream-500 text-sm mt-4">
              Last updated: February 2025
            </p>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <div key={index} className="feature-card">
                  <div className="flex items-start gap-4">
                    <div className="icon-gold shrink-0">
                      <Icon className="w-5 h-5 text-gold-400" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-cream-100 mb-3">
                        {section.title}
                      </h2>
                      <p className="text-cream-400 text-sm whitespace-pre-line leading-relaxed">
                        {section.content}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Contact */}
          <div className="mt-12 text-center feature-card">
            <h3 className="text-lg font-semibold text-cream-100 mb-2">
              Questions About Privacy?
            </h3>
            <p className="text-cream-400 text-sm">
              Contact us at{" "}
              <a href="mailto:privacy@dvdshealth.com" className="text-gold-400 hover:text-gold-300 transition-colors">
                privacy@dvdshealth.com
              </a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
