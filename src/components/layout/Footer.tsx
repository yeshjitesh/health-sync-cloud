import { Link } from "react-router-dom";

const LOGO_URL = "https://inxqwecffjulxsvkfwro.supabase.co/storage/v1/object/public/logo//1769952242296.png";

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg overflow-hidden">
                <img
                  alt="DVDS-Health"
                  className="w-full h-full object-cover"
                  src={LOGO_URL}
                />
              </div>
              <span className="font-bold text-white">DVDS-Health</span>
            </div>
            <p className="text-white/50 text-sm">
              AI-powered health management for the Diu Vanja Darji Samaj community.
            </p>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/privacy"
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-white mb-4">Health Resources</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.nhs.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  🇬🇧 NHS (UK)
                </a>
              </li>
              <li>
                <a
                  href="https://www.cdc.gov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  🇺🇸 CDC (USA)
                </a>
              </li>
              <li>
                <a
                  href="https://www.nhp.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  🇮🇳 NHP (India)
                </a>
              </li>
              <li>
                <a
                  href="https://www.who.int"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  🌍 WHO (Global)
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="border-t border-white/10 pt-6">
          <p className="text-white/40 text-xs text-center mb-4">
            ⚠️ Medical Disclaimer: DVDS-Health provides AI-powered health information for
            educational purposes only. It does not replace professional medical advice,
            diagnosis, or treatment. Always consult a qualified healthcare provider for
            medical concerns.
          </p>
          <p className="text-white/30 text-xs text-center">
            © {new Date().getFullYear()} DVDS-Health. Made with ❤️ for the Diu Vanja
            Darji Samaj community.
          </p>
        </div>
      </div>
    </footer>
  );
}
