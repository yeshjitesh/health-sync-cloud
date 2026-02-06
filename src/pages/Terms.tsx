import { PublicHeader } from "@/components/layout/PublicHeader";
import { Footer } from "@/components/layout/Footer";
import { FileText, CheckCircle, AlertTriangle, Scale, Users, Gavel } from "lucide-react";

export default function Terms() {
  const sections = [
    {
      icon: CheckCircle,
      title: "Acceptance of Terms",
      content: `By accessing or using DVDS-Health, you agree to be bound by these Terms of Service 
      and all applicable laws and regulations. If you do not agree with any of these terms, 
      you are prohibited from using or accessing this service. These terms apply to all users, 
      visitors, and others who access or use the service.`
    },
    {
      icon: Users,
      title: "User Accounts",
      content: `When you create an account with us, you must provide accurate, complete, and current 
      information. You are responsible for:
      • Safeguarding the password used to access the service
      • Any activities or actions under your account
      • Notifying us immediately of any unauthorized access
      We reserve the right to suspend accounts that violate these terms.`
    },
    {
      icon: AlertTriangle,
      title: "Medical Disclaimer",
      content: `IMPORTANT: DVDS-Health is NOT a substitute for professional medical advice, diagnosis, 
      or treatment. The AI-powered health information, disease predictions, and wellness 
      recommendations are for educational and informational purposes only.

      Always seek the advice of your physician or other qualified health provider with any 
      questions you may have regarding a medical condition. Never disregard professional 
      medical advice or delay in seeking it because of something you have read on DVDS-Health.

      If you think you may have a medical emergency, call your doctor, go to the emergency 
      department, or call emergency services immediately.`
    },
    {
      icon: Scale,
      title: "Limitation of Liability",
      content: `To the maximum extent permitted by law, DVDS-Health and its affiliates shall not be 
      liable for any indirect, incidental, special, consequential, or punitive damages, or 
      any loss of profits or revenues, whether incurred directly or indirectly, or any loss 
      of data, use, goodwill, or other intangible losses resulting from:
      • Your use or inability to use the service
      • Any health decisions made based on information from the service
      • Unauthorized access to or use of our servers and/or personal information`
    },
    {
      icon: FileText,
      title: "Intellectual Property",
      content: `The service and its original content (excluding user-provided content), features, and 
      functionality are and will remain the exclusive property of DVDS-Health. The service 
      is protected by copyright, trademark, and other laws. Our trademarks may not be used 
      in connection with any product or service without prior written consent.`
    },
    {
      icon: Gavel,
      title: "Governing Law",
      content: `These Terms shall be governed by and construed in accordance with the laws of the 
      United Kingdom, without regard to its conflict of law provisions. Any disputes arising 
      from these terms will be resolved through binding arbitration or in the courts of the 
      United Kingdom.`
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
              <FileText className="w-8 h-8 text-gold-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-cream-100 mb-4">
              Terms of Service
            </h1>
            <p className="text-cream-400 max-w-2xl mx-auto">
              Please read these terms carefully before using DVDS-Health services.
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
              Questions About Terms?
            </h3>
            <p className="text-cream-400 text-sm">
              Contact us at{" "}
              <a href="mailto:legal@dvdshealth.com" className="text-gold-400 hover:text-gold-300 transition-colors">
                legal@dvdshealth.com
              </a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
