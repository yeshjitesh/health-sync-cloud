import { PublicHeader } from "@/components/layout/PublicHeader";
import { Footer } from "@/components/layout/Footer";
import { Heart, Users, Globe, Shield, Target, Sparkles } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: Heart,
      title: "Community First",
      description: "Built by and for the Diu Vanza Darji Samaj community, with deep understanding of our cultural values and health needs."
    },
    {
      icon: Shield,
      title: "Privacy & Trust",
      description: "Your health data is sacred. We employ bank-level encryption and never sell your personal information."
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Whether you're in India, UK, USA, or anywhere else, get health guidance aligned with your local healthcare system."
    },
    {
      icon: Target,
      title: "Preventive Focus",
      description: "Early detection and prevention are key. Our AI helps identify health risks before they become serious."
    }
  ];

  const team = [
    { name: "DVDS Community", role: "Founders", emoji: "👥" },
    { name: "Health Professionals", role: "Medical Advisors", emoji: "👨‍⚕️" },
    { name: "Tech Team", role: "Development", emoji: "💻" },
    { name: "Community Elders", role: "Guidance", emoji: "🙏" }
  ];

  return (
    <div className="min-h-screen gradient-hero flex flex-col">
      <PublicHeader />
      
      <main className="flex-1 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="icon-gold w-16 h-16 mx-auto mb-6">
              <Users className="w-8 h-8 text-gold-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-cream-100 mb-4">
              About DVDS-Health
            </h1>
            <p className="text-cream-400 max-w-2xl mx-auto text-lg">
              Empowering the Diu Vanza Darji Samaj community with AI-powered health management tools.
            </p>
          </div>

          {/* Mission */}
          <div className="feature-card mb-8">
            <div className="text-center">
              <Sparkles className="w-10 h-10 text-gold-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-cream-100 mb-4">Our Mission</h2>
              <p className="text-cream-400 leading-relaxed max-w-2xl mx-auto">
                DVDS-Health was created to bridge the gap between traditional community values and 
                modern healthcare technology. We believe that every member of our community deserves 
                access to intelligent health tools that understand their unique cultural context, 
                dietary habits, and health priorities.
              </p>
            </div>
          </div>

          {/* Story */}
          <div className="feature-card mb-8">
            <h2 className="text-xl font-bold text-cream-100 mb-4">Our Story</h2>
            <div className="space-y-4 text-cream-400 text-sm leading-relaxed">
              <p>
                The Diu Vanza Darji Samaj community spans across continents—from our ancestral 
                roots in Diu, India, to thriving communities in the UK, USA, and beyond. Despite 
                geographical distances, we share common health concerns: diabetes, heart disease, 
                and lifestyle-related conditions that disproportionately affect our community.
              </p>
              <p>
                DVDS-Health was born from a simple observation: while healthcare apps abound, 
                none truly understood our community's needs. Our traditional foods, family 
                structures, and cultural practices all influence our health in unique ways.
              </p>
              <p>
                Today, we're proud to offer an AI-powered platform that provides region-specific 
                health guidance (NHS for UK, CDC for USA, ICMR for India), supports multiple 
                languages including Gujarati, and helps our community take proactive control 
                of their health journey.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-cream-100 mb-6 text-center">Our Values</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div key={index} className="feature-card">
                    <div className="flex items-start gap-4">
                      <div className="icon-gold shrink-0">
                        <Icon className="w-5 h-5 text-gold-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-cream-100 mb-1">{value.title}</h3>
                        <p className="text-cream-400 text-sm">{value.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Team */}
          <div className="feature-card mb-8">
            <h2 className="text-xl font-bold text-cream-100 mb-6 text-center">Built With Love</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {team.map((member, index) => (
                <div key={index} className="text-center p-4 rounded-xl" style={{ background: 'hsla(43, 74%, 55%, 0.1)', border: '1px solid hsla(43, 74%, 55%, 0.2)' }}>
                  <span className="text-3xl mb-2 block">{member.emoji}</span>
                  <p className="font-medium text-cream-100 text-sm">{member.name}</p>
                  <p className="text-cream-500 text-xs">{member.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center feature-card">
            <h3 className="text-lg font-semibold text-cream-100 mb-2">
              Join Our Community
            </h3>
            <p className="text-cream-400 text-sm mb-4">
              Be part of a healthier future for our community.
            </p>
            <a 
              href="/"
              className="btn-gold inline-flex items-center gap-2"
            >
              Get Started <Heart className="w-4 h-4" />
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
