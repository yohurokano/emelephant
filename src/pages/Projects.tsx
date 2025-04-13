import React from "react";
import { motion } from "framer-motion";
import { FaGamepad, FaRegCalendarCheck, FaPaw, FaSeedling, FaBrain, FaUsers, FaLeaf, FaTrophy, FaStore } from "react-icons/fa";

const Projects: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 120, damping: 20 }
    }
  };

  return (
    <section id="projects" className="py-28 px-6 md:px-20 bg-base-200 text-base-content overflow-hidden">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="max-w-7xl mx-auto"
      >
        <motion.h2 
          className="text-5xl md:text-6xl font-bold text-center mb-16 font-poppins tracking-tight"
          variants={itemVariants}
        >
          Crafting <span className="text-accent">Future</span> Experiences
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* HeroQuest Card */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -8, scale: 1.02 }}
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

          {/* Kairova Card */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -8, scale: 1.02 }}
            className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all group relative overflow-hidden"
          >
            <div className="card-body p-8 relative">
              <div className="mb-6 flex items-start gap-5">
                <div className="p-3 bg-accent/10 rounded-xl border border-accent/20 relative">
                  <FaRegCalendarCheck className="text-4xl text-accent" />
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

        {/* Upcoming Projects */}
        <motion.div
          variants={itemVariants}
          className="mt-20"
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