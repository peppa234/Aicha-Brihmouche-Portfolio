import { Link } from "react-router-dom";
import linkedinIcon from "../assets/icons/linkedin.png";
import githubIcon from "../assets/icons/github.png";
import emailIcon from "../assets/icons/email.png";
import locIcon from "../assets/icons/loc.png";
import cvIcon from "../assets/icons/cv.png";

const Footer = () => {
  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "My Projects", href: "/projects" },
    { label: "Contact", href: "/contact" }
  ];

  return (
    <footer className="py-16 px-6 border-t border-border">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          
          {/* Get In Touch */}
          <div>
            <h3 
              className="text-2xl font-orbitron font-bold text-foreground mb-6"
              style={{ textShadow: "0 4px 13.1px rgba(203, 37, 195, 0.77)" }}
            >
              Get In Touch
            </h3>
            
            {/* Social Icons */}
            <div className="flex items-center gap-4 mb-4">
              <a
                href="https://www.linkedin.com/in/aicha-brihmouche-a51730300/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full border border-pink-500 transition-all duration-200 hover:scale-110 hover:border-pink-400 hover:shadow-[0_0_10px_rgba(255,105,180,0.8)] cursor-pointer"
              >
                <img src={linkedinIcon} alt="LinkedIn" className="w-6 h-6" />
              </a>

              <a
                href="https://github.com/peppa234"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full border border-pink-500 transition-all duration-200 hover:scale-110 hover:border-pink-400 hover:shadow-[0_0_10px_rgba(255,105,180,0.8)] cursor-pointer"
              >
                <img src={githubIcon} alt="GitHub" className="w-6 h-6" />
              </a>

              <a
                href="mailto:aichabrihmouche@gmail.com"
                className="w-12 h-12 flex items-center justify-center rounded-full border border-pink-500 transition-all duration-200 hover:scale-110 hover:border-pink-400 hover:shadow-[0_0_10px_rgba(255,105,180,0.8)] cursor-pointer"
              >
                <img src={emailIcon} alt="Email" className="w-6 h-6" />
              </a>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-white mb-6">
              <img src={locIcon} alt="Location" className="w-5 h-5" />
              <span className="font-outfit">Algiers, Algeria</span>
            </div>

            {/* CV Button */}
            <a
              href="./CV_Aicha_Brihmouche.pdf"
              download="CV_Aicha_Brihmouche.pdf"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#b26cd6] to-[#de8dd4] text-white font-outfit font-semibold shadow-[0_4px_20px_rgba(203,37,195,0.7)] hover:scale-105 transition-transform"
            >
              <img src={cvIcon} alt="CV" className="w-5 h-5" />
              Download CV
            </a>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 
              className="text-2xl font-orbitron font-bold text-foreground mb-6"
              style={{ textShadow: "0 4px 13.1px rgba(203, 37, 195, 0.77)" }}
            >
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link 
                    to={link.href}
                    className="text-muted-foreground hover:text-accent transition-colors font-outfit"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground font-outfit">
            © 2025 Aicha. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
