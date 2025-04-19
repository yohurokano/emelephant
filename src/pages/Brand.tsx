import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  Variants,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { FaDownload, FaPalette, FaBrush } from "react-icons/fa";

// Animation Variants
const contentContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const contentItemVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

const colorItems = [
  { name: "Primary", bgClass: "bg-primary" },
  { name: "Accent", bgClass: "bg-accent" },
  { name: "Secondary", bgClass: "bg-secondary" },
  { name: "Content", bgClass: "bg-base-content" },
];

const typographyItems = [
  { text: "Poppins Bold", className: "font-poppins text-3xl font-bold" },
  { text: "Nunito Semibold", className: "font-nunito text-xl font-semibold" },
  { text: "Nunito Regular", className: "font-nunito text-lg" },
  { text: "Manrope Regular (Body)", className: "font-manrope text-base opacity-80" },
];

const Brand: React.FC = () => {
  // Refs for scroll tracking
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const colorCardRef = useRef<HTMLDivElement>(null);
  const typoCardRef = useRef<HTMLDivElement>(null);

  // State to control animations
  const [isContentVisible, setIsContentVisible] = useState(false);
  
  // Intersection Observer for better performance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsContentVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    
    if (contentRef.current) {
      observer.observe(contentRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  // Scroll tracking with optimized offset values
  const { scrollYProgress: sectionScrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: contentScrollYProgress } = useScroll({
    target: contentRef,
    offset: ["start 0.85", "start 0.4"],
  });

  const { scrollYProgress: colorCardScrollYProgress } = useScroll({
    target: colorCardRef,
    offset: ["start end", "start 0.75"],
  });

  const { scrollYProgress: typoCardScrollYProgress } = useScroll({
    target: typoCardRef,
    offset: ["start end", "start 0.75"],
  });

  // Backup to ensure animation triggers
  useMotionValueEvent(contentScrollYProgress, "change", (latest) => {
    if (latest > 0.1) setIsContentVisible(true);
  });

  // Optimized transforms with more subtle parallax
  const bg1Y = useTransform(sectionScrollYProgress, [0, 1], ["-50px", "50px"]);
  const bg2Y = useTransform(sectionScrollYProgress, [0, 1], ["50px", "-50px"]);
  const gridOpacity = useTransform(sectionScrollYProgress, [0, 0.5, 1], [0.01, 0.04, 0.01]);

  // Card animations
  const colorCardOpacity = useTransform(colorCardScrollYProgress, [0, 0.5], [0, 1]);
  const colorCardY = useTransform(colorCardScrollYProgress, [0, 1], ["30px", "0px"]);

  const typoCardOpacity = useTransform(typoCardScrollYProgress, [0, 0.5], [0, 1]);
  const typoCardY = useTransform(typoCardScrollYProgress, [0, 1], ["30px", "0px"]);

  return (
    <section
      id="brand"
      ref={sectionRef}
      className="py-32 px-6 md:px-20 bg-base-100 text-base-content relative overflow-hidden"
    >
      {/* Background elements with improved parallax */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
      >
        <motion.div
          className="absolute w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full -top-48 -left-48"
          style={{ y: bg1Y }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] bg-accent/5 blur-[100px] rounded-full -bottom-32 -right-32"
          style={{ y: bg2Y }}
        />
        <motion.div
          className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat bg-center"
          style={{ opacity: gridOpacity }}
        />
      </motion.div>

      {/* Main Content Block */}
      <motion.div
        ref={contentRef}
        initial="hidden"
        animate={isContentVisible ? "visible" : "hidden"}
        variants={contentContainerVariants}
        className="max-w-7xl mx-auto text-center relative z-10"
      >
        {/* Icon with improved animation */}
        <motion.div
          variants={contentItemVariants}
          className="mb-12 inline-block"
        >
          <motion.div
            className="p-6 bg-primary/10 rounded-2xl border border-primary/20 inline-block"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <FaPalette className="text-6xl text-primary" />
          </motion.div>
        </motion.div>

        {/* Heading with improved typography */}
        <motion.h2
          variants={contentItemVariants}
          className="text-5xl md:text-6xl font-bold mb-8 font-poppins tracking-tight"
        >
          Visual <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/80">Identity</span> System
        </motion.h2>

        {/* Description with better readability */}
        <motion.p
          variants={contentItemVariants}
          className="text-xl md:text-2xl max-w-3xl mx-auto mb-14 text-base-content/90 leading-relaxed"
        >
          Our design system harmonizes{" "}
          <span className="text-primary font-semibold">strategic clarity</span> with{" "}
          <span className="text-accent font-semibold">creative strength</span>,
          forming a cohesive visual language across all touchpoints.
        </motion.p>

        {/* Enhanced CTA Button */}
        <motion.div
          variants={contentItemVariants}
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.98 }}
          className="inline-block"
        >
          <a
            href="/Emelephant_Brand_Pack.zip"
            className="btn btn-lg rounded-2xl px-8 bg-base-200/50 backdrop-blur-lg border-2 border-base-300/20 hover:border-base-300/40 hover:bg-base-200/70 transition-all shadow-lg hover:shadow-xl flex items-center gap-3 group"
            download
          >
            <FaDownload className="text-xl text-primary group-hover:scale-110 transition-transform" />
            <span className="text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-semibold">
              Download Assets
            </span>
            <FaBrush className="text-xl text-accent group-hover:rotate-12 transition-transform" />
          </a>
        </motion.div>

        {/* Brand Elements Preview Grid - Improved layout */}
        <div className="mt-20 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Color Palette Card */}
          <motion.div
            ref={colorCardRef}
            style={{
              opacity: colorCardOpacity,
              y: colorCardY,
              willChange: 'transform, opacity'
            }}
            whileHover={{ scale: 1.03, y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="card bg-base-200/50 backdrop-blur-lg border border-base-300/20 p-8 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="text-left">
              <h3 className="text-2xl font-semibold text-primary mb-6">Color System</h3>
              <div className="flex flex-wrap gap-4">
                {colorItems.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex flex-col items-center gap-2 hover:-translate-y-1 transition-transform"
                  >
                    <div className={`w-16 h-16 rounded-2xl ${item.bgClass} shadow-md`} />
                    <span className="text-sm opacity-80">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Typography Card */}
          <motion.div
            ref={typoCardRef}
            style={{
              opacity: typoCardOpacity,
              y: typoCardY,
              willChange: 'transform, opacity'
            }}
            whileHover={{ scale: 1.03, y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="card bg-base-200/50 backdrop-blur-lg border border-base-300/20 p-8 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="text-left">
              <h3 className="text-2xl font-semibold text-primary mb-6">Type System</h3>
              <div className="space-y-4">
                {typographyItems.map((item, index) => (
                  <div 
                    key={index} 
                    className={item.className + " hover:text-primary/90 transition-colors"}
                  >
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Brand;