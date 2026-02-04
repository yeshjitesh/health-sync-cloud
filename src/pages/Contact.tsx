import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Footer } from "@/components/layout/Footer";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { Mail, MessageSquare, MapPin, Clock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { useAuthContext } from "@/contexts/AuthContext";

export default function Contact() {
  const { signInWithGoogle } = useAuthContext();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast.success("Message sent! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setSending(false);
  };

  return (
    <div className="min-h-screen gradient-hero">
      <PublicHeader showSignIn onSignIn={signInWithGoogle} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-primary mb-5 shadow-lg">
            <MessageSquare className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Contact Us</h1>
          <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto">
            We're here to help. Reach out with questions, feedback, or support needs.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="glass-card text-white">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Send us a message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label className="text-white/80 text-sm">Your Name</Label>
                    <Input
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40 mt-1.5"
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-white/80 text-sm">Email Address</Label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40 mt-1.5"
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-white/80 text-sm">Subject</Label>
                    <Input
                      placeholder="What's this about?"
                      value={formData.subject}
                      onChange={(e) => setFormData((prev) => ({ ...prev, subject: e.target.value }))}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40 mt-1.5"
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-white/80 text-sm">Message</Label>
                    <Textarea
                      placeholder="How can we help you?"
                      value={formData.message}
                      onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40 min-h-[120px] mt-1.5"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full gradient-primary font-medium"
                    disabled={sending}
                  >
                    {sending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <Card className="glass-card text-white">
              <CardContent className="pt-5 pb-5">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl gradient-primary flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base">Email Support</h3>
                    <p className="text-primary mt-0.5">support@dvds-health.com</p>
                    <p className="text-white/50 text-xs mt-1">For general inquiries and support</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card text-white">
              <CardContent className="pt-5 pb-5">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl gradient-primary flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base">Response Time</h3>
                    <p className="text-white/70 mt-0.5">Within 24-48 hours</p>
                    <p className="text-white/50 text-xs mt-1">We aim to respond to all queries promptly</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card text-white">
              <CardContent className="pt-5 pb-5">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl gradient-primary flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base">Community</h3>
                    <p className="text-white/70 mt-0.5">Serving the Diu Vanja Darji Samaj globally</p>
                    <p className="text-white/50 text-xs mt-1">🇮🇳 India • 🇬🇧 UK • 🇺🇸 USA • 🌍 Worldwide</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-red-500/10 backdrop-blur-sm border border-red-500/20 text-white">
              <CardContent className="pt-5 pb-5">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-red-500/20 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base text-red-300">Medical Emergency?</h3>
                    <p className="text-white/80 text-xs mt-1.5">
                      Contact your local emergency services immediately:
                    </p>
                    <div className="flex flex-wrap gap-3 mt-2 text-sm">
                      <span className="text-white/70">🇮🇳 112</span>
                      <span className="text-white/70">🇬🇧 999</span>
                      <span className="text-white/70">🇺🇸 911</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
