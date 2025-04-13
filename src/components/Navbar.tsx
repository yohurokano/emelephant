import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronRight, FiMenu, FiX } from "react-icons/fi";
//import ThemeToggle from "./Theme/ThemeToggle";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 1, label: "About", href: "#about" },
    { id: 2, label: "Projects", href: "#projects" },
    { id: 3, label: "Brand", href: "#brand" },
  ];

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    },
    exit: { opacity: 0, y: -20 }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: -20, opacity: 0 }
  };

  return (
    <motion.nav
      className="sticky top-0 z-50 bg-base-200/80 backdrop-blur-lg border-b border-base-content/5 shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-20">
        {/* Logo */}
        <a
          href="#home"
          className="hover:opacity-80 transition-opacity"
        >
          <img 
            src="/assets/logo.png" 
            alt="Emelephant Logo"
            className="h-12 w-auto"
          />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="group relative px-4 py-2.5 rounded-xl font-medium text-base-content/90 hover:text-primary transition-all"
            >
              <span className="relative z-10 flex items-center">
                {item.label}
                <FiChevronRight className="ml-2 -mr-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </span>
              <span className="absolute inset-0 bg-primary/5 rounded-xl scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all" />
            </a>
          ))}

          

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="ml-4 px-6 py-2.5 rounded-xl bg-primary text-white font-semibold shadow-lg hover:shadow-xl hover:bg-primary-focus transition-all"
          >
            Start Project
          </motion.a>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden flex items-center gap-4">
          
          <motion.button
            className="p-2 rounded-lg hover:bg-base-300/20 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? (
              <FiX className="text-2xl text-base-content" />
            ) : (
              <FiMenu className="text-2xl text-base-content" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-nav"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            className="md:hidden absolute w-full bg-base-200/95 backdrop-blur-xl border-b border-base-content/5"
          >
            <div className="px-6 py-4 space-y-2">
              {navItems.map((item) => (
                <motion.a
                  key={item.id}
                  href={item.href}
                  variants={itemVariants}
                  className="flex items-center justify-between p-4 rounded-xl hover:bg-base-300/20 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="font-medium text-base-content/90">
                    {item.label}
                  </span>
                  <FiChevronRight className="text-base-content/60" />
                </motion.a>
              ))}

              

              <motion.div
                variants={itemVariants}
                className="pt-4 border-t border-base-content/10"
              >
                <a
                  href="#contact"
                  className="w-full btn btn-primary rounded-xl bg-primary border-0 hover:bg-primary-focus"
                  onClick={() => setIsOpen(false)}
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