import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button-variants";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "My Projects", href: "/projects" },
    { label: "Contact", href: "/contact" },
    { label: "About", href: "/about" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[rgba(0,0,0,0.08)] backdrop-blur-md">
      <div className="mx-auto px-5 max-w-[100vw]">
        <nav className="flex items-center justify-between relative" role="navigation" aria-label="Main navigation">
          {/* Desktop Navigation */}
          <div className="hidden md:flex mx-auto py-6">
            <div className="flex space-x-6 lg:space-x-10" role="menubar">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`text-white font-orbitron text-xl lg:text-2xl xl:text-[32px] font-normal hover:text-[#BF6BB3] transition-colors duration-300 px-1 drop-shadow-[0_0_25.2px_rgba(203,37,195,0.77)] focus:outline-none focus:ring-2 focus:ring-[#BF6BB3] focus:ring-offset-2 focus:ring-offset-transparent rounded ${
                    location.pathname === item.href ? "text-[#BF6BB3]" : ""
                  }`}
                  role="menuitem"
                  aria-current={location.pathname === item.href ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden ml-auto mr-1 py-3">
            <button
              className="p-2 focus:outline-none focus:ring-2 focus:ring-[#BF6BB3] focus:ring-offset-2 focus:ring-offset-transparent rounded"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <div className="w-7 flex flex-col space-y-1.5">
                <motion.span
                  className="h-[2px] bg-white block"
                  animate={{
                    rotate: isMenuOpen ? 45 : 0,
                    y: isMenuOpen ? 6 : 0,
                    width: "100%",
                  }}
                />
                <motion.span
                  className="h-[2px] bg-white block"
                  animate={{ opacity: isMenuOpen ? 0 : 1 }}
                />
                <motion.span
                  className="h-[2px] bg-white block"
                  animate={{
                    rotate: isMenuOpen ? -45 : 0,
                    y: isMenuOpen ? -6 : 0,
                    width: "100%",
                  }}
                />
              </div>
            </button>
          </div>
        </nav>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
              id="mobile-menu"
              role="menu"
              aria-label="Mobile navigation menu"
            >
              <div className="flex flex-col items-center space-y-3 py-3">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={`text-white font-orbitron text-xl font-normal hover:text-[#BF6BB3] transition-colors duration-300 py-1.5 px-5 drop-shadow-[0_0_25.2px_rgba(203,37,195,1)] focus:outline-none focus:ring-2 focus:ring-[#BF6BB3] focus:ring-offset-2 focus:ring-offset-transparent rounded ${
                      location.pathname === item.href ? "text-[#BF6BB3]" : ""
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                    role="menuitem"
                    aria-current={location.pathname === item.href ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
