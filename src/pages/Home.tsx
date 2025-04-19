import React, { useEffect, useRef, useMemo, memo } from "react";
import {
  motion,
  useAnimation,
  Variants,
  useMotionValue,
  useTransform,
  useSpring,
  LazyMotion,
  domAnimation,
  m,
  AnimatePresence,
  MotionValue // Import MotionValue type
} from "framer-motion";
import { useInView } from "react-intersection-observer";

// --- Animation Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12, // Slightly faster stagger for better flow
      delayChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 85, damping: 16 }, // Fine-tuned spring
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 110, damping: 18 },
  },
};

// New particle animation for decorative elements
const particleVariants: Variants = {
  initial: { scale: 0, opacity: 0 },
  animate: (i: number) => ({ // Added type for i
    scale: 1,
    opacity: [0, 0.8, 0],
    transition: {
      scale: { type: "spring", stiffness: 50, damping: 15, delay: i * 0.1 },
      opacity: { duration: 4, times: [0, 0.2, 1], repeat: Infinity, delay: i * 0.1 },
    },
  }),
};

// --- Prop Types ---
interface BackgroundElementsProps {
  bgTranslateX1: MotionValue<string>;
  bgTranslateY1: MotionValue<string>;
  bgTranslateX2: MotionValue<string>;
  bgTranslateY2: MotionValue<string>;
}

interface AnimatedLogoProps {
  rotateX: MotionValue<string>;
  rotateY: MotionValue<string>;
}

interface FancyHeadlineProps {
  headline1: string;
  headline2: string;
}


// --- Memoized Components ---
const BackgroundElements = memo(({ bgTranslateX1, bgTranslateY1, bgTranslateX2, bgTranslateY2 }: BackgroundElementsProps) => (
  <motion.div
    className="absolute inset-0 pointer-events-none z-0"
    aria-hidden="true"
    style={{ transformStyle: 'preserve-3d' }}
  >
    {/* Element 1 with parallax */}
    <motion.div
      className="absolute w-[800px] h-[800px] bg-primary/5 blur-[100px] rounded-3xl -top-48 -left-48 transform rotate-12"
      style={{ x: bgTranslateX1, y: bgTranslateY1 }}
    />
    {/* Element 2 with parallax */}
    <motion.div
      className="absolute w-[600px] h-[600px] bg-accent/5 blur-[80px] rounded-2xl bottom-0 -right-64 transform -rotate-12"
      style={{ x: bgTranslateX2, y: bgTranslateY2 }}
    />
    {/* Element 3 - New accent blob */}
    <motion.div
      className="absolute w-[400px] h-[400px] bg-secondary/3 blur-[70px] rounded-full top-1/3 right-1/4 transform rotate-45"
      style={{
        // Explicitly type 'v' as number, assuming the input MotionValue is numeric before transformation to string
        x: useTransform(bgTranslateX1, (v: string) => `-${parseFloat(v) * 0.7}px`),
        y: useTransform(bgTranslateY1, (v: string) => `-${parseFloat(v) * 0.7}px`)
      }}
    />
    {/* Grid overlay */}
    <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-[0.03]" />
  </motion.div>
));
BackgroundElements.displayName = 'BackgroundElements'; // Add display name

const AnimatedLogo = memo(({ rotateX, rotateY }: AnimatedLogoProps) => (
  <motion.div
    className="absolute center top-16 left-1/2 -translate-x-1/2 z-10"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.2 }}
    style={{ x: '-50%', rotateX, rotateY }}
  >
    <a href="/" aria-label="Emelephant Homepage" className="relative block">
      <img
        src="/emlogo.svg"
        alt="Emelephant Logo"
        loading="lazy"
        className="w-32 h-auto hover:opacity-80 transition-opacity duration-300"
      />
      {/* Logo glow effect */}
      <motion.div
        className="absolute inset-0 bg-primary/10 rounded-full blur-2xl"
        animate={{
          opacity: [0.2, 0.4, 0.2],
          scale: [0.8, 1.1, 0.8],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        aria-hidden="true"
      />
    </a>
  </motion.div>
));
AnimatedLogo.displayName = 'AnimatedLogo'; // Add display name

const FancyHeadline = memo(({ headline1, headline2 }: FancyHeadlineProps) => (
  <motion.h1
    className="text-6xl md:text-8xl font-bold font-poppins text-primary drop-shadow-lg overflow-hidden py-2"
    variants={itemVariants}
  >
    {/* Animate first line word by word */}
    <span className="block">
      {headline1.split(" ").map((word: string, index: number) => ( // Added types
        <motion.span
          key={`${word}-${index}`}
          className="inline-block mr-4 relative"
          variants={wordVariants}
          style={{ willChange: 'transform, opacity' }}
        >
          {word}
          {index === 0 && (
            <motion.span
              className="absolute -right-2 -top-1 text-3xl text-accent"
              animate={{
                rotate: [0, 10, 0],
                y: [0, -3, 0]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              ✦
            </motion.span>
          )}
        </motion.span>
      ))}
    </span>
    {/* Animate second line word by word */}
    <span className="block mt-4 text-accent">
      {headline2.split(" ").map((word: string, index: number) => ( // Added types
        <motion.span
          key={`${word}-${index}`}
          className="inline-block mr-4 relative"
          variants={wordVariants}
          style={{ willChange: 'transform, opacity' }}
        >
          {word}
          {index === 1 && (
            <motion.span
              className="absolute -right-2 bottom-0 text-3xl text-primary"
              animate={{
                rotate: [0, -10, 0],
                y: [0, 3, 0]
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              ✦
            </motion.span>
          )}
        </motion.span>
      ))}
    </span>
  </motion.h1>
));
FancyHeadline.displayName = 'FancyHeadline'; // Add display name

// Floating decoration elements
const FloatingParticles = memo(() => {
  // Create multiple particles with different positions
  const particles = useMemo(() =>
    Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      size: Math.random() * 8 + 4, // 4-12px
      x: `${Math.random() * 80 + 10}%`, // 10-90%
      y: `${Math.random() * 80 + 10}%`, // 10-90%
      delay: i * 0.4
    })),
  []);

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary/30 blur-sm"
          style={{
            width: particle.size,
            height: particle.size,
            left: particle.x,
            top: particle.y,
          }}
          custom={particle.id}
          variants={particleVariants}
          initial="initial"
          animate="animate"
        />
      ))}
    </div>
  );
});
FloatingParticles.displayName = 'FloatingParticles'; // Add display name

// CTAs Component
const CallToActions = memo(() => (
  <motion.div
    className="flex flex-col sm:flex-row gap-6 justify-center"
    variants={itemVariants}
    style={{ willChange: 'transform, opacity' }}
  >
    {/* Explore Work Button */}
    <motion.a
      href="#projects"
      className="btn btn-lg rounded-2xl px-8 bg-primary text-secondary-content border-primary hover:bg-primary-focus hover:border-primary-focus transform transition-all duration-300 shadow-lg hover:shadow-xl flex items-center relative overflow-hidden"
      aria-label="Explore our projects"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Button glow effect */}
      <motion.div
        className="absolute inset-0 bg-white opacity-0"
        whileHover={{
          opacity: [0, 0.2, 0],
          x: ["0%", "100%"]
        }}
        transition={{
          duration: 0.8,
        }}
        aria-hidden="true"
      />

      <span className="text-lg relative z-10">Explore Work</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 ml-2 relative z-10"
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
    <motion.a
      href="#contact"
      className="btn btn-lg rounded-2xl px-8 bg-base-200/50 backdrop-blur-lg border-2 border-base-300/20 hover:border-base-300/40 hover:bg-base-200/70 transition-all shadow-lg hover:shadow-xl relative overflow-hidden"
      aria-label="Start collaboration"
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Button subtle pulse effect */}
      <motion.div
        className="absolute inset-0 bg-accent/5 rounded-2xl"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0, 0.5, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "loop"
        }}
        aria-hidden="true"
      />

      <span className="text-lg text-accent relative z-10">Let's Collaborate</span>
    </motion.a>
  </motion.div>
));
CallToActions.displayName = 'CallToActions'; // Add display name

// --- Main Component Definition ---
const Home: React.FC = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });
  const sectionRef = useRef<HTMLElement>(null);

  // --- Mouse Tracking for Parallax ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Apply spring physics for smoother tracking
  const springConfig = { damping: 45, stiffness: 180, mass: 1 }; // Adjusted for smoother feel
  const springMouseX = useSpring(mouseX, springConfig);
  const springMouseY = useSpring(mouseY, springConfig);

  // Transform mouse position into rotation/translation values for parallax
  // Explicitly type 'v' as number, as springMouse values are numbers
  const rotateX = useTransform(springMouseY, [-0.5, 0.5], [5, -5], { clamp: false }); // Use numbers for rotation degrees
  const rotateY = useTransform(springMouseX, [-0.5, 0.5], [-5, 5], { clamp: false }); // Use numbers for rotation degrees
  const bgTranslateX1 = useTransform(springMouseX, [-0.5, 0.5], [-25, 25], { clamp: false }); // Use numbers for pixels
  const bgTranslateY1 = useTransform(springMouseY, [-0.5, 0.5], [-20, 20], { clamp: false }); // Use numbers for pixels
  const bgTranslateX2 = useTransform(springMouseX, [-0.5, 0.5], [18, -18], { clamp: false }); // Use numbers for pixels
  const bgTranslateY2 = useTransform(springMouseY, [-0.5, 0.5], [12, -12], { clamp: false }); // Use numbers for pixels

  // Convert numeric MotionValues to string MotionValues for style prop where needed (e.g., rotate, translate)
  const rotateXString = useTransform(rotateX, (v) => `${v}deg`);
  const rotateYString = useTransform(rotateY, (v) => `${v}deg`);
  const bgTranslateX1String = useTransform(bgTranslateX1, (v) => `${v}px`);
  const bgTranslateY1String = useTransform(bgTranslateY1, (v) => `${v}px`);
  const bgTranslateX2String = useTransform(bgTranslateX2, (v) => `${v}px`);
  const bgTranslateY2String = useTransform(bgTranslateY2, (v) => `${v}px`);


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

  // Handle mouse leave with a smoother transition
  const handleMouseLeave = () => {
    // Remove the transition object here. The spring handles the smooth return.
    mouseX.set(0);
    mouseY.set(0);
  };

  // --- Touch Support for Mobile ---
  const handleTouchMove = (event: React.TouchEvent<HTMLElement>) => {
    if (!sectionRef.current || event.touches.length < 1) return;
    const touch = event.touches[0];
    const { left, top, width, height } = sectionRef.current.getBoundingClientRect();
    // Apply a damping factor to reduce sensitivity on touch
    const normalizedX = ((touch.clientX - (left + width / 2)) / width) * 0.5; // 50% sensitivity
    const normalizedY = ((touch.clientY - (top + height / 2)) / height) * 0.5; // 50% sensitivity
    mouseX.set(normalizedX);
    mouseY.set(normalizedY);
  };

  // Trigger initial animation when in view
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // --- Headline Text Splitting ---
  const headline1 = "Big Ideas.";
  const headline2 = "Bright Design.";

  // Scroll down indicator animation
  const scrollIndicatorVariants = {
    animate: {
      y: [0, 12, 0],
      opacity: [0.5, 1, 0.5],
      transition: {
        y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
        opacity: { repeat: Infinity, duration: 2, ease: "easeInOut" }
      }
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <m.section
        id="home"
        ref={sectionRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseLeave}
        aria-label="Hero Section"
        className="min-h-screen relative flex flex-col items-center justify-center px-6 md:px-20 bg-base-100 text-base-content overflow-hidden"
        style={{ perspective: '1200px' }} // Enhanced perspective for better 3D effect
      >
        {/* --- Background Elements --- */}
        <BackgroundElements
          bgTranslateX1={bgTranslateX1String}
          bgTranslateY1={bgTranslateY1String}
          bgTranslateX2={bgTranslateX2String}
          bgTranslateY2={bgTranslateY2String}
        />

        {/* --- Floating Particles --- */}
        <FloatingParticles />

        {/* --- Logo --- */}
        <AnimatedLogo rotateX={rotateXString} rotateY={rotateYString} />

        {/* --- Content Container --- */}
        <m.div
          className="max-w-7xl w-full text-center space-y-16 relative z-10"
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          style={{
            rotateX: rotateXString, // Use string version for style
            rotateY: rotateYString, // Use string version for style
            transformStyle: 'preserve-3d',
            transformPerspective: '1200px' // More pronounced 3D for content
          }}
        >
          {/* --- Headline with Word Animation --- */}
          <FancyHeadline headline1={headline1} headline2={headline2} />

          {/* --- Subheadline --- */}
          <m.div
            variants={itemVariants}
            style={{ willChange: 'transform, opacity' }}
            className="relative"
          >
            <p className="text-xl md:text-2xl max-w-2xl mx-auto font-nunito text-base-content/90 leading-relaxed">
              We blend <span className="text-primary font-bold">creative resilience</span> with{' '}
              <span className="text-accent font-bold">digital craftsmanship</span> to build
              human-centered tech experiences.
            </p>

            {/* Text highlight animation effect */}
            <AnimatePresence>
              <m.span
                className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 pointer-events-none"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 3, delay: 2, ease: "easeInOut" }}
                exit={{ opacity: 0 }}
                aria-hidden="true"
              />
            </AnimatePresence>
          </m.div>

          {/* --- Call-to-Action (CTA) buttons --- */}
          <CallToActions />

          {/* Decorative line element */}
          <m.div
            className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-[1200px] h-px bg-base-300/20"
            variants={itemVariants}
            aria-hidden="true"
            style={{ willChange: 'transform, opacity' }}
          />
        </m.div>

        {/* --- Scroll Down Indicator --- */}
        <m.div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} // Changed target to #about
          variants={scrollIndicatorVariants}
          animate="animate"
          aria-label="Scroll down"
        >
          <span className="text-sm font-medium mb-2 opacity-80">Scroll</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-primary"
          >
            <path
              d="M12 5L12 19M12 19L19 12M12 19L5 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              // Removed transform rotate as arrow points down now
            />
          </svg>
        </m.div>

        {/* --- Skip Link for Accessibility --- */}
        <a
          href="#about" // Changed target to #about
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:p-4 focus:bg-primary focus:text-white focus:rounded-md"
        >
          Skip to main content
        </a>
        {/* Added id for skip link target */}
        <div id="main-content" className="absolute top-0 left-0 w-px h-px overflow-hidden" />
      </m.section>
    </LazyMotion>
  );
};

export default Home;
