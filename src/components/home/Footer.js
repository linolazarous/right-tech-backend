import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Instagram, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Facebook />, href: "https://facebook.com/righttechcentre", label: "Facebook" },
    { icon: <Twitter />, href: "https://twitter.com/righttechcentre", label: "Twitter" },
    { icon: <Linkedin />, href: "https://linkedin.com/company/righttechcentre", label: "LinkedIn" },
    { icon: <Instagram />, href: "https://instagram.com/righttechcentre", label: "Instagram" },
    { icon: <Mail />, href: "mailto:info@righttechcentre.com", label: "Email" },
  ];

  const navLinks = [
    { label: "Courses", to: "/courses" },
    { label: "Forum", to: "/forum" },
    { label: "Privacy Policy", to: "/privacy-policy" },
    { label: "Terms of Service", to: "/terms-of-service" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-3 gap-12 text-center md:text-left">
          {/* Brand Info */}
          <div>
            <h3 className="text-2xl font-bold text-white">Right Tech Centre</h3>
            <p className="mt-4 text-gray-400 text-sm leading-relaxed">
              Empowering innovators through world-class, AI-driven education.  
              Learn. Build. Impact the future.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xl font-semibold text-white mb-4">
              Explore
            </h4>
            <ul className="space-y-2">
              {navLinks.map(({ label, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="hover:text-indigo-400 transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-xl font-semibold text-white mb-4">Connect</h4>
            <div className="flex justify-center md:justify-start gap-4">
              {socialLinks.map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 rounded-full bg-gray-800 hover:bg-indigo-600 transition-colors duration-300"
                >
                  {React.cloneElement(icon, {
                    className: "w-5 h-5 text-gray-300 hover:text-white",
                  })}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
          <p>
            © {currentYear} Right Tech Centre. All rights reserved.  
            | <span className="text-indigo-400">Innovation • Excellence • Empowerment • Integrity • Collaboration</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
