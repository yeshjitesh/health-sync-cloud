import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Footer } from "@/components/layout/Footer";
import { Heart, Mail, MessageSquare, MapPin, Phone, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

export default function Contact() {
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
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl gradient-primary">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">DVDL-Health</span>
          </Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-primary mb-4">
            <MessageSquare className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-white/70 text-lg">
            We're here to help. Reach out with questions, feedback, or support needs.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-white/10 backdrop-blur-sm border-white/10 text-white">
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label className="text-white/80">Your Name</Label>
                    <Input
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-white/80">Email Address</Label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-white/80">Subject</Label>
                    <Input
                      placeholder="What's this about?"
                      value={formData.subject}
                      onChange={(e) => setFormData((prev) => ({ ...prev, subject: e.target.value }))}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-white/80">Message</Label>
                    <Textarea
                      placeholder="How can we help you?"
                      value={formData.message}
                      onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40 min-h-[120px]"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full gradient-primary"
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
            className="space-y-6"
          >
            <Card className="bg-white/10 backdrop-blur-sm border-white/10 text-white">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Email Support</h3>
                    <p className="text-white/70 mt-1">support@dvdl-health.com</p>
                    <p className="text-white/50 text-sm mt-1">For general inquiries and support</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/10 text-white">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Response Time</h3>
                    <p className="text-white/70 mt-1">Within 24-48 hours</p>
                    <p className="text-white/50 text-sm mt-1">We aim to respond to all queries promptly</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/10 text-white">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Community</h3>
                    <p className="text-white/70 mt-1">Serving the Diu Vanja Darji Samaj globally</p>
                    <p className="text-white/50 text-sm mt-1">India • UK • USA • Worldwide</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary/20 backdrop-blur-sm border-primary/30 text-white">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-2">🚨 Medical Emergency?</h3>
                <p className="text-white/80 text-sm">
                  If you're experiencing a medical emergency, please contact your local emergency services immediately:
                </p>
                <ul className="mt-3 space-y-1 text-white/70 text-sm">
                  <li>🇮🇳 India: 112 or 108</li>
                  <li>🇬🇧 UK: 999 or 111</li>
                  <li>🇺🇸 USA: 911</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
