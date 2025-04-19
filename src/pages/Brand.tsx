import React, { useRef, useState } from "react"; // Import useState
import {
  motion,
  useScroll,
  Variants,
  useTransform,
  useMotionValueEvent, // Import useMotionValueEvent
} from "framer-motion";
import { FaDownload, FaPalette, FaBrush } from "react-icons/fa";

// --- Animation Variants ---
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

// --- Component Definition ---

const Brand: React.FC = () => {
  // Refs for scroll tracking targets
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const colorCardRef = useRef<HTMLDivElement>(null);
  const typoCardRef = useRef<HTMLDivElement>(null);

  // State to control the main content block's animation
  const [isContentVisible, setIsContentVisible] = useState(false);

  // --- Scroll Tracking ---
  const { scrollYProgress: sectionScrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: contentScrollYProgress } = useScroll({
    target: contentRef,
    offset: ["start 0.9", "start 0.4"], // Trigger when content starts entering view
  });

  const { scrollYProgress: colorCardScrollYProgress } = useScroll({
    target: colorCardRef,
    offset: ["start end", "start 0.7"],
  });

  const { scrollYProgress: typoCardScrollYProgress } = useScroll({
    target: typoCardRef,
    offset: ["start end", "start 0.7"],
  });

  // --- Scroll Event Listener for Main Content ---
  // Update the isContentVisible state based on scroll progress
  useMotionValueEvent(contentScrollYProgress, "change", (latest) => {
    // Set to true if scroll progress is > 0.1 (10%)
    setIsContentVisible(latest > 0.1);
  });


  // --- Scroll-Linked Transformations ---
  const bg1Y = useTransform(sectionScrollYProgress, [0, 1], ["-100px", "100px"]);
  const bg2Y = useTransform(sectionScrollYProgress, [0, 1], ["100px", "-100px"]);
  const gridOpacity = useTransform(sectionScrollYProgress, [0, 0.5, 1], [0.01, 0.03, 0.01]);

  // Removed the problematic transform:
  // const contentVisibility = useTransform(contentScrollYProgress, [0, 1], ["hidden", "visible"]);

  const colorCardOpacity = useTransform(colorCardScrollYProgress, [0, 0.6], [0, 1]);
  const colorCardY = useTransform(colorCardScrollYProgress, [0, 1], ["40px", "0px"]);

  const typoCardOpacity = useTransform(typoCardScrollYProgress, [0, 0.6], [0, 1]);
  const typoCardY = useTransform(typoCardScrollYProgress, [0, 1], ["40px", "0px"]);


  return (
    <section
      id="brand"
      ref={sectionRef}
      className="py-28 px-6 md:px-20 bg-base-100 text-base-content relative overflow-hidden"
    >
      {/* Background elements with Scroll Parallax */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
      >
        <motion.div
          className="absolute w-[600px] h-[600px] bg-primary/5 blur-[100px] rounded-full -top-48 -left-48"
          style={{ y: bg1Y }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] bg-accent/5 blur-[80px] rounded-full -bottom-32 -right-32"
          style={{ y: bg2Y }}
        />
        <motion.div
          className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat"
          style={{ opacity: gridOpacity }}
        />
      </motion.div>

      {/* Main Content Block - Triggered by State */}
      <motion.div
        ref={contentRef}
        initial="hidden"
        // Animate based on the state variable now
        animate={isContentVisible ? "visible" : "hidden"}
        variants={contentContainerVariants}
        className="max-w-7xl mx-auto text-center relative z-10"
      >
        {/* Icon */}
        <motion.div
          variants={contentItemVariants}
          className="mb-12 inline-block"
        >
          <motion.div
            className="p-6 bg-primary/10 rounded-2xl border border-primary/20 inline-block"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <FaPalette className="text-6xl text-primary" />
          </motion.div>
        </motion.div>

        {/* Heading */}
        <motion.h2
          variants={contentItemVariants}
          className="text-5xl md:text-6xl font-bold mb-8 font-poppins tracking-tight"
        >
          Visual <span className="text-primary">Identity</span> System
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={contentItemVariants}
          className="text-xl md:text-2xl max-w-3xl mx-auto mb-12 text-base-content/90 leading-relaxed"
        >
          Our design system harmonizes{" "}
          <span className="text-primary font-semibold">strategic clarity</span> with{" "}
          <span className="text-accent font-semibold">creative strength</span>,
          forming a cohesive visual language across all touchpoints.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          variants={contentItemVariants}
          whileHover={{ scale: 1.05, y: -3 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="inline-block"
        >
          <a
            href="/Emelephant_Brand_Pack.zip"
            className="btn btn-lg rounded-2xl px-8 bg-base-200/50 backdrop-blur-lg border-2 border-base-300/20 hover:border-base-300/40 hover:bg-base-200/70 transition-all shadow-lg hover:shadow-xl flex items-center gap-3"
            download
          >
            <FaDownload className="text-xl text-primary" />
            <span className="text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-semibold">
              Download Assets
            </span>
            <FaBrush className="text-xl text-accent" />
          </a>
        </motion.div>

        {/* Brand Elements Preview Grid */}
        <div
          className="mt-16 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {/* Color Palette Card - Scroll Linked */}
          <motion.div
            ref={colorCardRef}
            style={{
              opacity: colorCardOpacity,
              y: colorCardY,
              willChange: 'transform, opacity'
            }}
            whileHover={{ scale: 1.03, y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="card bg-base-200/50 backdrop-blur-lg border border-base-300/20 p-6"
          >
            <div className="text-left">
              <h3 className="text-xl font-semibold text-primary mb-4">Color System</h3>
              <div className="flex flex-wrap gap-4">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-2xl bg-primary shadow-md" />
                  <span className="text-sm opacity-80">Primary</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-2xl bg-accent shadow-md" />
                  <span className="text-sm opacity-80">Accent</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-2xl bg-secondary shadow-md" />
                  <span className="text-sm opacity-80">Secondary</span>
                </div>
                 <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-2xl bg-base-content shadow-md" />
                  <span className="text-sm opacity-80">Content</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Typography Card - Scroll Linked */}
          <motion.div
            ref={typoCardRef}
             style={{
              opacity: typoCardOpacity,
              y: typoCardY,
              willChange: 'transform, opacity'
            }}
            whileHover={{ scale: 1.03, y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="card bg-base-200/50 backdrop-blur-lg border border-base-300/20 p-6"
          >
            <div className="text-left">
              <h3 className="text-xl font-semibold text-primary mb-4">Type System</h3>
              <div className="space-y-3">
                <div className="font-poppins text-3xl font-bold">Poppins Bold</div>
                <div className="font-nunito text-xl font-semibold">Nunito Semibold</div>
                <div className="font-nunito text-lg">Nunito Regular</div>
                <div className="font-manrope text-base opacity-80">Manrope Regular (Body)</div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Brand;
