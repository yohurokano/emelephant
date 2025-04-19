import React, { useRef } from "react";
import {
  motion,
  useScroll,
  Variants,
  useTransform,
} from "framer-motion";
import { FaGamepad, FaRegCalendarCheck, FaPaw, FaSeedling, FaBrain, FaUsers, FaLeaf, FaTrophy, FaStore } from "react-icons/fa";

// --- Animation Variants ---
// Keep container and item variants for the initial section load / headline
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Faster stagger for headline/initial items
      delayChildren: 0.1,
    },
  },
};

const headlineItemVariants: Variants = { // Renamed for clarity
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 18 },
  },
};

// Word animation variant (if needed for headline, though not implemented here yet)
// const wordVariants: Variants = { ... };

// --- Component Definition ---

const Projects: React.FC = () => {
  // Refs for scroll tracking targets
  const sectionRef = useRef<HTMLElement>(null);
  const projectCardRef1 = useRef<HTMLDivElement>(null);
  const projectCardRef2 = useRef<HTMLDivElement>(null);
  const upcomingCardRef = useRef<HTMLDivElement>(null);

  // --- Scroll Tracking ---
  // 1. Section scroll (for background parallax)
  const { scrollYProgress: sectionScrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // 2. Project Card 1 scroll
  const { scrollYProgress: card1ScrollYProgress } = useScroll({
    target: projectCardRef1,
    offset: ["start end", "start 0.7"], // Animate as it scrolls 70% into view from bottom
  });

  // 3. Project Card 2 scroll
  const { scrollYProgress: card2ScrollYProgress } = useScroll({
    target: projectCardRef2,
    offset: ["start end", "start 0.7"],
  });

  // 4. Upcoming Card scroll
  const { scrollYProgress: upcomingScrollYProgress } = useScroll({
    target: upcomingCardRef,
    offset: ["start end", "start 0.8"], // Animate later as it's lower down
  });


  // --- Scroll-Linked Transformations ---
  // Background parallax
  const bgTranslateY1 = useTransform(sectionScrollYProgress, [0, 1], ["-70px", "70px"]);
  const bgTranslateY2 = useTransform(sectionScrollYProgress, [0, 1], ["80px", "-80px"]);

  // Project Card 1 animations
  const card1Opacity = useTransform(card1ScrollYProgress, [0, 0.6], [0, 1]); // Fade in
  const card1Scale = useTransform(card1ScrollYProgress, [0, 1], [0.9, 1]);   // Scale up

  // Project Card 2 animations
  const card2Opacity = useTransform(card2ScrollYProgress, [0, 0.6], [0, 1]);
  const card2Scale = useTransform(card2ScrollYProgress, [0, 1], [0.9, 1]);

  // Upcoming Card animations
  const upcomingOpacity = useTransform(upcomingScrollYProgress, [0, 0.8], [0, 1]); // Fade in later/slower
  const upcomingY = useTransform(upcomingScrollYProgress, [0, 1], ["50px", "0px"]); // Slide up


  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-28 px-6 md:px-20 bg-base-200 text-base-content overflow-hidden relative" // Added relative for absolute bg elements
    >
      {/* Background Parallax Elements */}
       <motion.div
          className="absolute top-0 left-0 w-64 h-64 bg-primary/5 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/4 -z-0"
          aria-hidden="true"
          style={{ y: bgTranslateY1 }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-72 h-72 bg-accent/5 blur-[120px] rounded-full translate-x-1/2 translate-y-1/4 -z-0"
          aria-hidden="true"
          style={{ y: bgTranslateY2 }}
        />

      {/* Main Content Container */}
      <motion.div
        initial="hidden"
        whileInView="visible" // Trigger initial stagger for headline
        viewport={{ once: true, amount: 0.2 }} // Trigger early for headline
        variants={containerVariants}
        className="max-w-7xl mx-auto relative z-10" // Ensure content is above background
      >
        <motion.h2
          className="text-5xl md:text-6xl font-bold text-center mb-16 font-poppins tracking-tight"
          variants={headlineItemVariants} // Use specific variant for headline
        >
          Crafting <span className="text-accent">Future</span> Experiences
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* HeroQuest Card - Scroll Linked */}
          <motion.div
            ref={projectCardRef1} // Attach ref
            // Removed variants={itemVariants} - now controlled by scroll
            style={{
                opacity: card1Opacity, // Apply scroll-linked opacity
                scale: card1Scale,     // Apply scroll-linked scale
                willChange: 'transform, opacity'
            }}
            whileHover={{ y: -8, scale: 1.02 }} // Keep direct hover interaction
            className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all group relative overflow-hidden"
          >
            <div className="card-body p-8 relative">
              <div className="mb-6 flex items-start gap-5">
                <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">
                  <FaGamepad className="text-4xl text-primary" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-primary mb-2">HeroQuest</h3>
                  <p className="text-sm uppercase tracking-wide text-primary/80">
                    Gamified Learning Ecosystem
                  </p>
                </div>
              </div>
              <p className="text-lg leading-relaxed text-base-content/90 mb-6">
                Transformative educational platform where learning becomes an epic adventure through interactive quests and progress tracking.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm font-medium">
                  <span className="py-1 px-3 rounded-full bg-primary text-primary-content">Ages 6-12</span>
                  <span className="py-1 px-3 rounded-full bg-secondary text-secondary-content">Parent Dashboard</span>
                </div>
                <div className="flex items-center gap-2 text-base-content/70">
                  <FaUsers className="text-lg" />
                  <span>10k+ Active Learners</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Kairova Card - Scroll Linked */}
          <motion.div
            ref={projectCardRef2} // Attach ref
            // Removed variants={itemVariants}
             style={{
                opacity: card2Opacity,
                scale: card2Scale,
                willChange: 'transform, opacity'
            }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all group relative overflow-hidden"
          >
            <div className="card-body p-8 relative">
              <div className="mb-6 flex items-start gap-5">
                <div className="p-3 bg-accent/10 rounded-xl border border-accent/20 relative">
                  <FaRegCalendarCheck className="text-4xl text-accent" />
                  {/* Keep Tailwind animation */}
                  <FaPaw className="text-lg text-secondary absolute -top-2 -right-2 animate-float" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-accent mb-2">Kairova</h3>
                  <p className="text-sm uppercase tracking-wide text-accent/80">
                    AI Life Companion
                  </p>
                </div>
              </div>
              <p className="text-lg leading-relaxed text-base-content/90 mb-6">
                Intelligent growth system combining personalized roadmaps with adaptive routines and motivational companions.
              </p>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 p-3 bg-base-200 rounded-lg">
                    <FaBrain className="text-primary" />
                    <span className="text-sm">AI Engine</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-base-200 rounded-lg">
                    <FaSeedling className="text-success" />
                    <span className="text-sm">Pet System</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-base-200 rounded-lg">
                    <FaTrophy className="text-secondary" />
                    <span className="text-sm">Leaderboards</span>
                  </div>
                   <div className="flex items-center gap-2 p-3 bg-base-200 rounded-lg">
                    <FaStore className="text-accent" />
                    <span className="text-sm">Theme Shop</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-base-content/70">
                  <FaLeaf className="text-lg text-success" />
                  <span>Daily Habit Tracking</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Upcoming Projects - Scroll Linked */}
        <motion.div
          ref={upcomingCardRef} // Attach ref
          // Removed variants={itemVariants}
          style={{
            opacity: upcomingOpacity,
            y: upcomingY,
            willChange: 'transform, opacity'
          }}
          className="mt-20" // Keep margin
        >
          <div className="bg-base-300/20 p-8 rounded-2xl border-2 border-dashed border-primary/20 hover:border-primary/40 transition-colors text-center group">
            <h3 className="text-2xl font-semibold text-primary mb-3">
              Emerging Innovations
            </h3>
            <p className="text-lg text-base-content/90">
              Pioneering tools for <span className="text-accent font-medium">creative empowerment</span> and{' '}
              <span className="text-secondary font-medium">digital well-being</span>
            </p>
            <div className="mt-4 flex justify-center gap-3 opacity-70">
               {/* Keep Tailwind animation */}
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse delay-100" />
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse delay-200" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Projects;
