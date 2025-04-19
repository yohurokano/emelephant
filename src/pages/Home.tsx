import React, { useEffect, useRef } from "react";
import {
  motion,
  useAnimation,
  Variants,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import { useInView } from "react-intersection-observer";

// --- Animation Variants ---

// Container for staggering children
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Slightly faster stagger
      delayChildren: 0.2,
    },
  },
};

// General item slide-up animation
const itemVariants: Variants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 80, damping: 15 }, // Adjusted spring
  },
};

// Word animation for the headline
const wordVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

// --- Component Definition ---

const Home: React.FC = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true }); // Slightly higher threshold
  const sectionRef = useRef<HTMLElement>(null); // Ref for the section element for mouse tracking

  // --- Mouse Tracking for Parallax ---
  // Get mouse position relative to the window
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Apply spring physics for smoother tracking
  const springConfig = { damping: 40, stiffness: 200, mass: 1 };
  const springMouseX = useSpring(mouseX, springConfig);
  const springMouseY = useSpring(mouseY, springConfig);

  // Transform mouse position into rotation/translation values for parallax
  // Adjust the output range (e.g., [-5, 5]) to control the intensity of the effect
  const rotateX = useTransform(springMouseY, [-0.5, 0.5], ["7.5deg", "-7.5deg"]); // Tilt effect
  const rotateY = useTransform(springMouseX, [-0.5, 0.5], ["-7.5deg", "7.5deg"]); // Tilt effect
  const bgTranslateX1 = useTransform(springMouseX, [-0.5, 0.5], ["-20px", "20px"]); // Background element 1 parallax
  const bgTranslateY1 = useTransform(springMouseY, [-0.5, 0.5], ["-15px", "15px"]);
  const bgTranslateX2 = useTransform(springMouseX, [-0.5, 0.5], ["15px", "-15px"]); // Background element 2 parallax (opposite direction)
  const bgTranslateY2 = useTransform(springMouseY, [-0.5, 0.5], ["10px", "-10px"]);

  // Update mouse position on mouse move within the section
  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const { clientX, clientY } = event;
    const { left, top, width, height } = sectionRef.current.getBoundingClientRect();
    // Normalize mouse position to range [-0.5, 0.5] relative to the section center
    const normalizedX = (clientX - (left + width / 2)) / width;
    const normalizedY = (clientY - (top + height / 2)) / height;
    mouseX.set(normalizedX);
    mouseY.set(normalizedY);
  };

  // Reset mouse position when mouse leaves the section
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // --- Effects ---
  // Trigger initial animation when in view
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // --- Headline Text Splitting ---
  const headline1 = "Big Ideas.";
  const headline2 = "Bright Design.";

  return (
    <motion.section
      id="home"
      ref={sectionRef} // Attach ref for mouse tracking
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="Hero Section"
      className="min-h-screen relative flex items-center justify-center px-6 md:px-20 bg-base-100 text-base-content overflow-hidden perspective" // Added perspective for 3D transforms
      style={{ perspective: '1000px' }} // Apply perspective for tilt effect
    >
      {/* --- Background Elements --- */}
      {/* Applying parallax transforms based on mouse position */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
        style={{ transformStyle: 'preserve-3d' }} // Needed for children transforms
      >
        {/* Element 1 with parallax */}
        <motion.div
          className="absolute w-[800px] h-[800px] bg-primary/5 blur-[100px] rounded-3xl -top-48 -left-48 transform rotate-12"
          style={{ x: bgTranslateX1, y: bgTranslateY1 }} // Apply motion values
        />
        {/* Element 2 with parallax */}
        <motion.div
          className="absolute w-[600px] h-[600px] bg-accent/5 blur-[80px] rounded-2xl bottom-0 -right-64 transform -rotate-12"
          style={{ x: bgTranslateX2, y: bgTranslateY2 }} // Apply motion values
        />
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-[0.03]" />
      </motion.div>

      {/* --- Logo --- */}
      {/* Applying slight counter-parallax to logo for depth */}
      <motion.div
        className="absolute center top-16 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{ x: '-50%', rotateX, rotateY }} // Apply tilt, keep translate centered
      >
        <a href="/" aria-label="Emelephant Homepage">
          <img
            src="/emlogo.svg"
            alt="Emelephant Logo"
            loading="lazy"
            className="w-32 h-auto hover:opacity-80 transition-opacity duration-300"
          />
        </a>
      </motion.div>

      {/* --- Content Container --- */}
      {/* Applying tilt effect based on mouse position */}
      <motion.div
        className="max-w-7xl w-full text-center space-y-16 relative z-10"
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }} // Apply tilt effect
      >
        {/* --- Headline with Word Animation --- */}
        <motion.h1
          className="text-6xl md:text-8xl font-bold font-poppins text-primary drop-shadow-lg overflow-hidden py-2" // Added overflow-hidden and padding for word animation
          variants={itemVariants} // Use itemVariants for the container H1 itself
        >
          {/* Animate first line word by word */}
          <span className="block">
            {headline1.split(" ").map((word, index) => (
              <motion.span
                key={`${word}-${index}`}
                className="inline-block mr-4" // Add margin between words
                variants={wordVariants} // Apply word animation variants
                style={{ willChange: 'transform, opacity' }} // Performance hint
              >
                {word}
              </motion.span>
            ))}
          </span>
          {/* Animate second line word by word */}
          <span className="block mt-4 text-accent">
            {headline2.split(" ").map((word, index) => (
              <motion.span
                key={`${word}-${index}`}
                className="inline-block mr-4" // Add margin between words
                variants={wordVariants} // Apply word animation variants
                style={{ willChange: 'transform, opacity' }} // Performance hint
              >
                {word}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        {/* --- Subheadline --- */}
        <motion.p
          className="text-xl md:text-2xl max-w-2xl mx-auto font-nunito text-base-content/90 leading-relaxed"
          variants={itemVariants}
          style={{ willChange: 'transform, opacity' }} // Performance hint
        >
          We blend <span className="text-primary font-bold">creative resilience</span> with{' '}
          <span className="text-accent font-bold">digital craftsmanship</span> to build
          human-centered tech experiences.
        </motion.p>

        {/* --- Call-to-Action (CTA) buttons --- */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center"
          variants={itemVariants}
          style={{ willChange: 'transform, opacity' }} // Performance hint
        >
          {/* Explore Work Button */}
          <motion.a // Use motion.a for potential hover/tap animations later
            href="#projects"
            className="btn btn-lg rounded-2xl px-8 bg-primary text-secondary-content border-primary hover:bg-primary-focus hover:border-primary-focus transform hover:scale-[1.03] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center" // Slightly increased hover scale
            aria-label="Explore our projects"
            whileHover={{ scale: 1.05, transition: { type: 'spring', stiffness: 300 } }} // Framer Motion hover effect
            whileTap={{ scale: 0.98 }} // Framer Motion tap effect
          >
            <span className="text-lg">Explore Work</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
          {/* Collaborate Button */}
          <motion.a // Use motion.a
            href="#contact"
            className="btn btn-lg rounded-2xl px-8 bg-base-200/50 backdrop-blur-lg border-2 border-base-300/20 hover:border-base-300/40 hover:bg-base-200/70 transition-all shadow-lg hover:shadow-xl"
            aria-label="Start collaboration"
            whileHover={{ scale: 1.05, y: -2, transition: { type: 'spring', stiffness: 300 } }} // Add slight lift on hover
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-lg text-accent">Let's Collaborate</span>
          </motion.a>
        </motion.div>

        {/* Decorative line element - hidden from screen readers */}
        <motion.div
          className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-[1200px] h-px bg-base-300/20"
          variants={itemVariants}
          aria-hidden="true"
          style={{ willChange: 'transform, opacity' }} // Performance hint
        />
      </motion.div>
    </motion.section>
  );
};

export default Home;
