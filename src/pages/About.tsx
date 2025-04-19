import React, { useRef, useState } from "react"; // Import useState
import {
  motion,
  useScroll,
  Variants,
  useTransform,
  useMotionValueEvent, // Import useMotionValueEvent
} from "framer-motion";
import { FaPuzzlePiece } from "react-icons/fa";

// --- Animation Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 80, damping: 15 },
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

const founderCardVariants: Variants = {
  hidden: { scale: 0.95, opacity: 0, y: 20 },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 15, mass: 0.8 },
  },
};


// --- Simple SVG Placeholder ---
const PlaceholderAvatar: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 100 100"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="50" cy="35" r="20" />
    <path d="M50 60 C 30 60, 20 80, 20 90 L 80 90 C 80 80, 70 60, 50 60 Z" />
  </svg>
);


// --- Component Definition ---

const About: React.FC = () => {
  // Refs for scroll tracking targets
  const sectionRef = useRef<HTMLElement>(null);
  const iconCardRef = useRef<HTMLDivElement>(null);
  const foundersSectionRef = useRef<HTMLDivElement>(null);

  // State to track if the founders section should be visible based on scroll
  const [isFoundersVisible, setIsFoundersVisible] = useState(false);

  // --- Scroll Tracking ---
  const { scrollYProgress: sectionScrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: iconCardScrollYProgress } = useScroll({
    target: iconCardRef,
    offset: ["start end", "start 0.5"],
  });

   const { scrollYProgress: foundersScrollYProgress } = useScroll({
    target: foundersSectionRef,
    offset: ["start end", "start 0.6"],
  });

  // --- Scroll Event Listener ---
  // Use useMotionValueEvent to react to changes in foundersScrollYProgress
  useMotionValueEvent(foundersScrollYProgress, "change", (latest) => {
    // Update state when scroll progress is greater than a small threshold (e.g., 0.05)
    // Using a small threshold avoids triggering right at the very start
    setIsFoundersVisible(latest > 0.05);
  });


  // --- Scroll-Linked Transformations ---
  const bgTranslateY1 = useTransform(sectionScrollYProgress, [0, 1], ["-60px", "60px"]);
  const bgTranslateY2 = useTransform(sectionScrollYProgress, [0, 1], ["60px", "-60px"]);
  const iconCardScale = useTransform(iconCardScrollYProgress, [0, 1], [0.8, 1]);
  const iconCardOpacity = useTransform(iconCardScrollYProgress, [0, 0.6], [0, 1]);
  const foundersHeadingOpacity = useTransform(foundersScrollYProgress, [0, 0.5], [0, 1]);
  const foundersHeadingY = useTransform(foundersScrollYProgress, [0, 0.5], ["40px", "0px"]);

  // --- Text Splitting ---
  const headlineLine1 = "Crafting Digital";
  const headlineLine2 = "Experiences";

  return (
    <motion.section
      id="about"
      ref={sectionRef}
      className="py-28 px-6 md:px-20 bg-base-100 text-base-content space-y-28 overflow-hidden"
    >
      {/* --- About Company Section --- */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Left Content Block */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="space-y-10 relative"
        >
          {/* Background Elements */}
          <motion.div
            className="absolute -top-32 -left-32 w-64 h-64 bg-primary/5 blur-[100px] rounded-3xl rotate-45 -z-10"
            aria-hidden="true"
            style={{ y: bgTranslateY1, x: '-50px' }}
          />
          <motion.div
            className="absolute -bottom-32 -right-32 w-64 h-64 bg-accent/5 blur-[100px] rounded-3xl -rotate-45 -z-10"
            aria-hidden="true"
            style={{ y: bgTranslateY2, x: '50px' }}
          />

          {/* Headline */}
          <motion.h2
            className="text-5xl md:text-6xl font-bold text-primary font-poppins tracking-tight overflow-hidden py-1"
            variants={itemVariants}
          >
             <span className="block">
              {headlineLine1.split(" ").map((word, index) => (
                <motion.span
                  key={`h1-${word}-${index}`}
                  className="inline-block mr-3"
                  variants={wordVariants}
                  style={{ willChange: 'transform, opacity' }}
                >
                  {word}
                </motion.span>
              ))}
            </span>
            <span className="block text-accent">
              {headlineLine2.split(" ").map((word, index) => (
                <motion.span
                  key={`h2-${word}-${index}`}
                  className="inline-block mr-3"
                  variants={wordVariants}
                  style={{ willChange: 'transform, opacity' }}
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </motion.h2>

          {/* Paragraphs */}
          <motion.div className="space-y-6" variants={itemVariants}>
             <p className="text-xl md:text-2xl leading-relaxed font-nunito text-base-content/90">
              We fuse <span className="text-primary font-semibold">strategic clarity</span> with{" "}
              <span className="text-accent font-semibold">technical strength</span> to create
              purpose-driven digital solutions.
            </p>
            <p className="text-xl md:text-2xl leading-relaxed font-nunito text-base-content/90">
              Our philosophy balances{" "}
              <motion.span
                className="text-success font-medium"
                whileHover={{ scale: 1.05, color: '#34d399' }}
              >
                mindful design
              </motion.span>{" "}
              with{" "}
              <motion.span
                className="text-secondary font-medium"
                whileHover={{ scale: 1.05, color: '#a78bfa' }}
              >
                playful innovation
              </motion.span>
              , crafting tools that grow with their users.
            </p>
          </motion.div>
        </motion.div>

        {/* Interactive Icon Card */}
        <div ref={iconCardRef} className="flex justify-center items-center">
          <motion.div
            className="bg-base-200 p-8 rounded-3xl shadow-xl group relative overflow-hidden cursor-pointer"
            style={{
              scale: iconCardScale,
              opacity: iconCardOpacity,
              willChange: 'transform, opacity'
            }}
            whileHover={{
              scale: 1.03,
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              transition: { type: 'spring', stiffness: 300, damping: 20 }
            }}
          >
            {/* Animated Gradient Background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              aria-hidden="true"
            />
            {/* Content with Animated Icon */}
            <div className="relative z-10 text-center">
              <motion.div
                 whileHover={{ rotate: 15, scale: 1.1 }}
                 transition={{ type: 'spring', stiffness: 300, damping: 10 }}
              >
                <FaPuzzlePiece className="text-8xl md:text-9xl text-primary mx-auto" />
              </motion.div>
              <div className="mt-6 text-lg font-nunito text-base-content/80">
                Where Strategy Meets Play
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* --- Founders Section --- */}
      <motion.div
        ref={foundersSectionRef}
        className="max-w-7xl mx-auto"
      >
        {/* Animate heading based on founders section scroll progress */}
        <motion.h3
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-primary font-poppins tracking-tight"
          style={{
            opacity: foundersHeadingOpacity,
            y: foundersHeadingY,
            willChange: 'transform, opacity'
          }}
        >
          The Minds Behind
        </motion.h3>

        {/* Use staggerChildren within the grid triggered by state */}
        <motion.div
           className="grid md:grid-cols-2 gap-12"
           initial="hidden"
           // Animate based on the isFoundersVisible state variable
           animate={isFoundersVisible ? "visible" : "hidden"}
           variants={containerVariants} // Use container variants for staggering
        >
          {/* Ricardo Card */}
          <motion.div
            variants={founderCardVariants}
            whileHover={{ y: -10, scale: 1.02, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            className="card bg-base-200 shadow-lg transition-shadow group overflow-hidden"
          >
             <div className="card-body items-center text-center p-8">
              <motion.div
                className="mb-6 relative"
                whileHover={{ scale: 1.1, rotate: -5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <PlaceholderAvatar className="text-7xl text-accent transition-colors duration-300 group-hover:text-primary" />
              </motion.div>
              <h4 className="text-3xl font-bold mb-2 font-poppins">Ricardo Costa</h4>
              <p className="text-sm uppercase tracking-wide opacity-70 mb-4">
                Product Visionary & Technologist
              </p>
              <p className="text-lg font-nunito text-base-content/90 leading-relaxed">
                Merging code with canvas to create{" "}
                <span className="text-primary font-medium">human-centric experiences</span>.
                Known for building intuitive systems that balance depth with approachability.
              </p>
            </div>
          </motion.div>

          {/* Apisada Card */}
          <motion.div
            variants={founderCardVariants}
            whileHover={{ y: -10, scale: 1.02, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            className="card bg-base-200 shadow-lg transition-shadow group overflow-hidden"
          >
             <div className="card-body items-center text-center p-8">
               <motion.div
                className="mb-6 relative"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <PlaceholderAvatar className="text-7xl text-accent transition-colors duration-300 group-hover:text-primary" />
              </motion.div>
              <h4 className="text-3xl font-bold mb-2 font-poppins">Apisada</h4>
              <p className="text-sm uppercase tracking-wide opacity-70 mb-4">
                Visual Architect & Strategist
              </p>
              <p className="text-lg font-nunito text-base-content/90 leading-relaxed">
                Crafting <span className="text-secondary font-medium">emotionally resonant</span> interfaces that
                tell compelling stories through form, function, and flow.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default About;
