import React, { useRef } from "react";
import {
  motion,
  useScroll,
  Variants,
  useTransform,
} from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa"; // Removed FaRegSmileWink as logo is added
import { FiChevronRight } from "react-icons/fi";

// --- Animation Variants ---
const footerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Stagger children (columns, bottom bar)
      delayChildren: 0.1,
    },
  },
};

const footerItemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 80, damping: 15 },
  },
};

// --- Component Definition ---
const Footer: React.FC = () => {
  // Ref for scroll tracking (background parallax)
  const sectionRef = useRef<HTMLElement>(null);

  // --- Scroll Tracking (for background) ---
  const { scrollYProgress: sectionScrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"], // Track while footer is potentially visible
  });

  // --- Scroll-Linked Transformations (Background) ---
  const bg1Y = useTransform(sectionScrollYProgress, [0, 1], ["-50px", "50px"]);
  const bg2Y = useTransform(sectionScrollYProgress, [0, 1], ["50px", "-50px"]);

  // --- Smooth Scrolling ---
  // (Same function as Navbar - consider extracting to a utility if used often)
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // --- Footer Links Data --- (Could import from a shared constant if needed)
  const footerLinks = ["Home", "About", "Projects", "Brand", "Contact"];

  return (
    <motion.footer
      ref={sectionRef} // Attach ref
      className="bg-base-200 text-base-content border-t border-base-content/10 relative overflow-hidden" // Added relative, overflow
      // Use whileInView for the main container trigger
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }} // Trigger when 20% visible
      variants={footerContainerVariants} // Apply container variants for stagger
    >
       {/* Background Parallax Elements */}
       <motion.div
          className="absolute inset-0 pointer-events-none z-0"
          aria-hidden="true"
       >
          <motion.div
            className="absolute w-[500px] h-[500px] bg-primary/5 blur-[100px] rounded-full -bottom-40 -left-40"
            style={{ y: bg1Y }}
          />
          <motion.div
            className="absolute w-[400px] h-[400px] bg-accent/5 blur-[80px] rounded-full -top-32 -right-32"
            style={{ y: bg2Y }}
          />
       </motion.div>

      <div className="container mx-auto px-6 py-12 relative z-10"> {/* Added relative z-10 */}
        <div className="grid md:grid-cols-3 gap-10 items-start">

          {/* Brand Column - Staggered Item */}
          <motion.div
            variants={footerItemVariants} // Apply item variant
            className="flex flex-col items-center md:items-start text-center md:text-left space-y-3" // Added space-y
          >
             {/* Logo */}
             <a
                href="#home"
                onClick={(e) => handleNavClick(e, "#home")}
                className="hover:opacity-80 transition-opacity mb-1" // Added margin
                aria-label="Scroll to homepage section"
             >
                <img
                  src="/emlogo.svg" // Use the same logo as navbar
                  alt="Emelephant Logo"
                  className="h-10 w-auto" // Consistent size
                />
             </a>
             {/* Removed h3 title as logo is present */}
            <p className="text-sm opacity-80 max-w-xs leading-relaxed">
              Big Ideas. Bright Design. Where clarity meets creativity.
            </p>
             {/* Removed smile wink icon */}
          </motion.div>

          {/* Links Column - Staggered Item */}
          <motion.nav
            variants={footerItemVariants} // Apply item variant
            className="flex flex-col items-center space-y-2" // Center links textually
            aria-label="Footer navigation"
          >
             <h4 className="font-semibold text-lg mb-2 text-primary">Explore</h4> {/* Added heading */}
            {footerLinks.map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => handleNavClick(e, `#${item.toLowerCase()}`)} // Add smooth scroll
                className="text-sm hover:text-primary transition-colors font-medium group flex items-center" // Added group, flex, items-center
                whileHover={{ x: 5 }} // Subtle horizontal move
                transition={{ type: 'spring', stiffness: 300 }} // Spring transition
              >
                 {/* Chevron moves with text on hover */}
                <FiChevronRight className="mr-1 opacity-70 group-hover:text-accent transition-colors" />
                {item}
              </motion.a>
            ))}
          </motion.nav>

          {/* Social Column - Staggered Item */}
          <motion.div
            variants={footerItemVariants} // Apply item variant
            className="flex flex-col items-center md:items-end gap-4" // Align end on desktop, add gap
          >
             <h4 className="font-semibold text-lg mb-1 text-primary">Connect</h4> {/* Added heading */}
             <div className="flex items-center gap-5"> {/* Wrapper for icons */}
                <motion.a
                  // Replace with your actual GitHub URL
                  href="https://github.com/your-profile"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit our GitHub profile" // Added aria-label
                  className="text-2xl text-base-content/80 hover:text-primary transition-colors"
                  whileHover={{ scale: 1.15, y: -2 }} // Enhanced hover
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <FaGithub />
                </motion.a>
                <motion.a
                   // Replace with your actual LinkedIn URL
                  href="https://linkedin.com/in/your-profile"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit our LinkedIn profile" // Added aria-label
                  className="text-2xl text-base-content/80 hover:text-accent transition-colors"
                  whileHover={{ scale: 1.15, y: -2 }} // Enhanced hover
                   transition={{ type: 'spring', stiffness: 300 }}
                >
                  <FaLinkedin />
                </motion.a>
                {/* Add more social links as needed */}
             </div>
          </motion.div>
        </div>

        {/* Bottom Bar - Staggered Item */}
        <motion.div
          variants={footerItemVariants} // Apply item variant
          className="border-t border-base-content/10 mt-12 pt-6 text-center text-sm opacity-70" // Increased top margin
        >
          © {new Date().getFullYear()} Emelephant. Built with purpose 🐘
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
