import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronRight, FiMenu, FiX } from "react-icons/fi";

// --- Placeholder Theme Toggle ---
// Replace with your actual ThemeToggle component implementation
const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(false); // Example state
  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="p-2 rounded-lg hover:bg-base-300/20 transition-colors"
      aria-label="Toggle theme"
    >
      {/* Example Icon - Replace with actual theme icons */}
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        {isDark ? (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        )}
      </svg>
    </button>
  );
};


// --- Static Data & Variants ---
const navItems = [
  { id: "home", label: "Home", href: "#home" }, // Added Home
  { id: "about", label: "About", href: "#about" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "brand", label: "Brand", href: "#brand" },
];

const menuVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: 'auto', // Animate height for smoother open/close
    transition: { staggerChildren: 0.08, delayChildren: 0.1, when: "beforeChildren" } // Adjusted timing
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { staggerChildren: 0.05, staggerDirection: -1, when: "afterChildren" } // Stagger out
   }
};

const itemVariants = {
  hidden: { x: -15, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 150, damping: 20 } },
  exit: { x: -15, opacity: 0, transition: { duration: 0.1 } }
};

// --- Component Definition ---
const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>("home"); // Track active section ID
  const observer = useRef<IntersectionObserver | null>(null);

  // --- Smooth Scrolling ---
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1); // Remove '#'
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    // Close mobile menu if open
    setIsOpen(false);
  };

  // --- Active Section Highlighting ---
  useEffect(() => {
    // Disconnect previous observer if it exists
    if (observer.current) {
      observer.current.disconnect();
    }

    // Create a new Intersection Observer
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Set active section when a section comes into view
            // Use a threshold slightly below the top to catch it earlier
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -80% 0px", // Adjust rootMargin to define when a section is considered "active"
                                         // This means active when section is between 20% from top and 20% from bottom
        threshold: 0, // Trigger as soon as any part enters/leaves the margin
      }
    );

    // Observe all sections targeted by nav items
    const sections = navItems.map(item => document.getElementById(item.id.toString())).filter(Boolean); // Get section elements
    sections.forEach((section) => {
      if (section) observer.current?.observe(section);
    });

    // Cleanup function to disconnect observer on component unmount
    return () => observer.current?.disconnect();
  }, []); // Empty dependency array ensures this runs only once on mount


  return (
    <motion.nav
      className="sticky top-0 z-50 bg-base-200/80 backdrop-blur-lg border-b border-base-content/5 shadow-sm"
      initial={{ y: -80 }} // Start slightly higher
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 18, delay: 0.1 }} // Adjusted animation
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-20">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")} // Add smooth scroll
          className="hover:opacity-80 transition-opacity"
          aria-label="Scroll to homepage section"
        >
          {/* Ensure logo.svg is in your public folder */}
          <img
            src="/emlogo.svg" // Changed back to emlogo.svg as per Home component
            alt="Emelephant Logo"
            className="h-10 w-auto" // Adjusted size slightly
          />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1"> {/* Reduced gap */}
          {navItems.map((item) => {
             const isActive = activeSection === item.id;
             return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)} // Add smooth scroll
                  className={`group relative px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-primary"
                      : "text-base-content/80 hover:text-primary"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span className="relative z-10 flex items-center">
                    {item.label}
                    {/* Subtle active indicator */}
                    {isActive && (
                       <motion.span
                         layoutId="activeIndicator" // Shared layout animation
                         className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-4 bg-primary rounded-full"
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         exit={{ opacity: 0 }}
                       />
                    )}
                  </span>
                   {/* Enhanced hover background with motion */}
                   <motion.span
                     className="absolute inset-0 bg-primary/10 rounded-lg -z-0" // Use z-0 instead of z-10
                     initial={{ scale: 0.9, opacity: 0 }}
                     whileHover={{ scale: 1, opacity: 1 }}
                     transition={{ type: 'tween', duration: 0.2 }} // Faster tween
                   />
                </a>
             );
          })}

          {/* Theme Toggle */}
          <div className="ml-4"> {/* Add margin */}
             <ThemeToggle />
          </div>

          {/* Desktop CTA */}
          <motion.a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")} // Add smooth scroll
            whileHover={{ scale: 1.05, y: -1 }} // Add slight lift
            whileTap={{ scale: 0.95 }}
            className="ml-4 px-5 py-2 rounded-lg bg-primary text-primary-content font-semibold shadow-md hover:shadow-lg hover:bg-primary-focus transition-all" // Adjusted padding/shadow
          >
            Start Project
          </motion.a>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden flex items-center gap-2"> {/* Reduced gap */}
           {/* Theme Toggle (Mobile) */}
           <ThemeToggle />
          <motion.button
            className="p-2 rounded-lg hover:bg-base-300/20 transition-colors z-50" // Ensure button is clickable above menu
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle navigation menu"
            aria-controls="mobile-nav-menu" // Controls the mobile menu
            aria-expanded={isOpen} // Indicates if menu is open
          >
             {/* Animated Icon */}
             <motion.div
                key={isOpen ? "close" : "open"}
                initial={{ rotate: -45, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 45, opacity: 0 }}
                transition={{ duration: 0.2 }}
             >
               {isOpen ? (
                 <FiX className="text-2xl text-base-content" />
               ) : (
                 <FiMenu className="text-2xl text-base-content" />
               )}
             </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence mode="wait"> {/* Use mode="wait" for cleaner transitions */}
        {isOpen && (
          <motion.div
            key="mobile-nav-menu"
            id="mobile-nav-menu" // ID for aria-controls
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            className="md:hidden absolute w-full bg-base-200/95 backdrop-blur-xl border-b border-base-content/10 shadow-lg" // Added shadow
          >
            <div className="px-4 pt-2 pb-4 space-y-1"> {/* Adjusted padding/spacing */}
              {navItems.map((item) => {
                 const isActive = activeSection === item.id;
                 return (
                    <motion.a
                      key={item.id}
                      href={item.href}
                      variants={itemVariants}
                      className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                         isActive
                           ? "bg-primary/10 text-primary font-semibold"
                           : "text-base-content/90 hover:bg-base-300/20"
                      }`}
                      onClick={(e) => handleNavClick(e, item.href)} // Close menu on click
                      aria-current={isActive ? "page" : undefined}
                    >
                      <span>{item.label}</span>
                      <FiChevronRight className={`transition-opacity ${isActive ? 'opacity-100' : 'opacity-50'}`} />
                    </motion.a>
                 );
              })}

              {/* Mobile CTA */}
              <motion.div
                variants={itemVariants}
                className="pt-3 border-t border-base-content/10" // Adjusted padding
              >
                <a
                  href="#contact"
                  className="w-full btn btn-primary rounded-lg bg-primary border-0 hover:bg-primary-focus" // Adjusted styles
                  onClick={(e) => handleNavClick(e, "#contact")} // Close menu on click
                >
                  Start Project
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
