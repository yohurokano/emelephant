import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Home: React.FC = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  return (
    <section
      id="home"
      className="min-h-screen relative flex items-center justify-center px-6 md:px-20 bg-base-100 text-base-content overflow-hidden"
      aria-label="Emelephant Homepage"
    >
      {/* Geometric background elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute w-[800px] h-[800px] bg-primary/5 blur-[100px] rounded-3xl -top-48 -left-48 transform rotate-12" />
        <div className="absolute w-[600px] h-[600px] bg-accent/5 blur-[80px] rounded-2xl bottom-0 -right-64 transform -rotate-12" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-[0.03]" />
      </div>

       {/* Logo as image */}
       <motion.div 
        className="absolute center top-16 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <a href="/" aria-label="Emelephant Homepage">
          <img 
            src="/src/assets/logo.svg" 
            alt="Emelephant Logo"
            className="w-32 h-auto hover:opacity-80 transition-opacity duration-300"
          />
        </a>
      </motion.div>

      {/* Content container */}
      <motion.div
        className="max-w-7xl w-full text-center space-y-16 relative z-10"
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        ref={ref}
      >
        {/* Headline with solid colors */}
        <motion.h1
          className="text-6xl md:text-8xl font-bold font-poppins text-primary drop-shadow-lg"
          variants={itemVariants}
        >
          <span className="block">Big Ideas.</span>
          <span className="block mt-4 text-accent">Bright Design.</span>
        </motion.h1>

        {/* Subheadline with bold accents */}
        <motion.p
          className="text-xl md:text-2xl max-w-2xl mx-auto font-nunito text-base-content/90 leading-relaxed"
          variants={itemVariants}
        >
          We blend <span className="text-primary font-bold">creative resilience</span> with{' '}
          <span className="text-accent font-bold">digital craftsmanship</span> to build
          human-centered tech experiences.
        </motion.p>

        {/* Minimal CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center"
          variants={itemVariants}
        >
          <a
            href="#projects"
            className="btn btn-lg rounded-2xl px-8 bg-primary text-secondary-content border-primary hover:bg-primary-focus hover:border-primary-focus transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center"
            aria-label="Explore our projects"
          >
            <span className="text-lg">Explore Work</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#contact"
            className="btn btn-lg rounded-2xl px-8 bg-base-200/50 backdrop-blur-lg border-2 border-base-300/20 hover:border-base-300/40 hover:bg-base-200/70 transition-all shadow-lg hover:shadow-xl"
            aria-label="Start collaboration"
          >
            <span className="text-lg text-accent">Let's Collaborate</span>
          </a>
        </motion.div>

        {/* Decorative line elements */}
        <motion.div 
          className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-[1200px] h-px bg-base-300/20"
          variants={itemVariants}
        />
      </motion.div>
    </section>
  );
};

export default Home;
