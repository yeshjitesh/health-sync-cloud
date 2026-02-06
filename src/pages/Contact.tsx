import { PublicHeader } from "@/components/layout/PublicHeader";
import { Footer } from "@/components/layout/Footer";
import { Mail, MapPin, Clock, MessageCircle, Phone, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("Message sent! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      content: "support@dvdshealth.com",
      link: "mailto:support@dvdshealth.com"
    },
    {
      icon: Clock,
      title: "Response Time",
      content: "Within 24-48 hours",
      link: null
    },
    {
      icon: Globe,
      title: "Languages",
      content: "English, Gujarati, Portuguese",
      link: null
    }
  ];

  const regions = [
    { flag: "🇬🇧", name: "United Kingdom", email: "uk@dvdshealth.com" },
    { flag: "🇺🇸", name: "United States", email: "us@dvdshealth.com" },
    { flag: "🇮🇳", name: "India", email: "india@dvdshealth.com" }
  ];

  return (
    <div className="min-h-screen gradient-hero flex flex-col">
      <PublicHeader />
      
      <main className="flex-1 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="icon-gold w-16 h-16 mx-auto mb-6">
              <MessageCircle className="w-8 h-8 text-gold-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-cream-100 mb-4">
              Contact Us
            </h1>
            <p className="text-cream-400 max-w-2xl mx-auto">
              Have questions or feedback? We'd love to hear from you. 
              Our team is here to help the DVDS community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="feature-card">
              <h2 className="text-xl font-semibold text-cream-100 mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-cream-200 block mb-1.5">Name</label>
                  <Input
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                    className="bg-maroon-800/50 border-gold-500/20 text-cream-100 placeholder:text-cream-500 focus:border-gold-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-cream-200 block mb-1.5">Email</label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    required
                    className="bg-maroon-800/50 border-gold-500/20 text-cream-100 placeholder:text-cream-500 focus:border-gold-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-cream-200 block mb-1.5">Subject</label>
                  <Input
                    placeholder="How can we help?"
                    value={formData.subject}
                    onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                    required
                    className="bg-maroon-800/50 border-gold-500/20 text-cream-100 placeholder:text-cream-500 focus:border-gold-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-cream-200 block mb-1.5">Message</label>
                  <Textarea
                    placeholder="Your message..."
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    required
                    rows={4}
                    className="bg-maroon-800/50 border-gold-500/20 text-cream-100 placeholder:text-cream-500 focus:border-gold-500"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full btn-gold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              {/* Quick Contact */}
              <div className="feature-card">
                <h2 className="text-xl font-semibold text-cream-100 mb-4">Quick Contact</h2>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon;
                    return (
                      <div key={index} className="flex items-center gap-3">
                        <div className="icon-gold w-10 h-10">
                          <Icon className="w-4 h-4 text-gold-400" />
                        </div>
                        <div>
                          <p className="text-sm text-cream-400">{info.title}</p>
                          {info.link ? (
                            <a href={info.link} className="font-medium text-gold-400 hover:text-gold-300 transition-colors">
                              {info.content}
                            </a>
                          ) : (
                            <p className="font-medium text-cream-100">{info.content}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Regional Contacts */}
              <div className="feature-card">
                <h2 className="text-xl font-semibold text-cream-100 mb-4">Regional Support</h2>
                <div className="space-y-3">
                  {regions.map((region, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg" style={{ background: 'hsla(43, 74%, 55%, 0.1)', border: '1px solid hsla(43, 74%, 55%, 0.2)' }}>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{region.flag}</span>
                        <span className="text-cream-200 text-sm">{region.name}</span>
                      </div>
                      <a 
                        href={`mailto:${region.email}`}
                        className="text-gold-400 hover:text-gold-300 text-sm transition-colors"
                      >
                        {region.email}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Community Note */}
              <div className="feature-card text-center">
                <p className="text-cream-400 text-sm">
                  🙏 We're proud to serve the Diu Vanza Darji Samaj community. 
                  Your feedback helps us improve!
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
