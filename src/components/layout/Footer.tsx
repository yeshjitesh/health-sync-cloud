import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const LOGO_URL = "https://sospasvrceakoreeslmd.supabase.co/storage/v1/object/public/logo//logo";

export function Footer() {
  return (
    <footer className="py-10 mt-auto" style={{ background: 'hsl(348, 55%, 10%)', borderTop: '1px solid hsla(43, 74%, 55%, 0.2)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl overflow-hidden shadow-gold">
                <img
                  alt="DVDS-Health"
                  className="w-full h-full object-cover"
                  src={LOGO_URL}
                />
              </div>
              <span className="font-bold text-gold-gradient text-lg">DVDS-Health</span>
            </div>
            <p className="text-cream-400 text-sm leading-relaxed">
              AI-powered health management for the Diu Vanza Darji Samaj community worldwide.
            </p>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-gold-400 mb-4 text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/privacy"
                  className="text-cream-400 hover:text-gold-400 text-sm transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-cream-400 hover:text-gold-400 text-sm transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-gold-400 mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-cream-400 hover:text-gold-400 text-sm transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-cream-400 hover:text-gold-400 text-sm transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-gold-400 mb-4 text-sm uppercase tracking-wider">Health Resources</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://www.nhs.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream-400 hover:text-gold-400 text-sm transition-colors inline-flex items-center gap-1.5"
                >
                  🇬🇧 NHS (UK)
                </a>
              </li>
              <li>
                <a
                  href="https://www.cdc.gov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream-400 hover:text-gold-400 text-sm transition-colors inline-flex items-center gap-1.5"
                >
                  🇺🇸 CDC (USA)
                </a>
              </li>
              <li>
                <a
                  href="https://www.nhp.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream-400 hover:text-gold-400 text-sm transition-colors inline-flex items-center gap-1.5"
                >
                  🇮🇳 NHP (India)
                </a>
              </li>
              <li>
                <a
                  href="https://www.who.int"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream-400 hover:text-gold-400 text-sm transition-colors inline-flex items-center gap-1.5"
                >
                  🌍 WHO (Global)
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-6 space-y-4" style={{ borderTop: '1px solid hsla(43, 74%, 55%, 0.15)' }}>
          <div className="rounded-lg p-4" style={{ background: 'hsla(43, 74%, 55%, 0.1)', border: '1px solid hsla(43, 74%, 55%, 0.25)' }}>
            <p className="text-gold-300 text-xs text-center">
              ⚠️ <strong>Medical Disclaimer:</strong> DVDS-Health provides AI-powered health information for
              educational purposes only. It does not replace professional medical advice,
              diagnosis, or treatment. Always consult a qualified healthcare provider.
            </p>
          </div>
          <p className="text-cream-500 text-xs text-center flex items-center justify-center gap-1.5">
            © {new Date().getFullYear()} DVDS-Health. Made with 
            <Heart className="w-3 h-3 text-gold-400 fill-gold-400" /> 
            for the Diu Vanza Darji Samaj community.
          </p>
        </div>
      </div>
    </footer>
  );
}
