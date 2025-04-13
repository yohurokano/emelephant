import React from "react";
import { motion } from "framer-motion";
import { FaPuzzlePiece } from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";

const About: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 120, damping: 20 },
    },
  };

  const founderCardVariants = {
    hidden: { scale: 0.98, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", bounce: 0.3, duration: 0.6 },
    },
  };

  return (
    <section
      id="about"
      className="py-28 px-6 md:px-20 bg-base-100 text-base-content space-y-28 overflow-hidden"
    >
      {/* About Company */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="space-y-10 relative"
        >
          {/* Geometric background elements */}
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-primary/5 blur-[100px] rounded-3xl rotate-45" />
          <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-accent/5 blur-[100px] rounded-3xl -rotate-45" />

          <motion.h2
            className="text-5xl md:text-6xl font-bold text-primary font-poppins tracking-tight"
            variants={itemVariants}
          >
            Crafting Digital<br />
            <span className="text-accent">Experiences</span>
          </motion.h2>

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
                whileHover={{ scale: 1.05 }}
              >
                mindful design
              </motion.span>{" "}
              with{" "}
              <motion.span 
                className="text-secondary font-medium"
                whileHover={{ scale: 1.05 }}
              >
                playful innovation
              </motion.span>
              , crafting tools that grow with their users.
            </p>
          </motion.div>
        </motion.div>

        {/* Interactive Icon Card */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", bounce: 0.3, duration: 0.8 }}
        >
          <div className="bg-base-200 p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <FaPuzzlePiece className="text-8xl md:text-9xl text-primary mx-auto transition-transform duration-500 group-hover:rotate-12" />
              <div className="mt-6 text-lg font-nunito text-base-content/80 text-center">
                Where Strategy Meets Play
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Founders Section */}
      <motion.div
        className="max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <motion.h3
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-primary font-poppins tracking-tight"
          variants={itemVariants}
        >
          The Minds Behind
        </motion.h3>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Ricardo */}
          <motion.div
            variants={founderCardVariants}
            whileHover={{ y: -8 }}
            className="card bg-base-200 shadow-lg hover:shadow-2xl transition-all group overflow-hidden"
          >
            <div className="card-body items-center text-center p-8">
              <div className="mb-6 relative">
                <BsPersonCircle className="text-7xl text-accent transition-colors duration-300 group-hover:text-primary" />
              </div>
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

          {/* Apisada */}
          <motion.div
            variants={founderCardVariants}
            whileHover={{ y: -8 }}
            className="card bg-base-200 shadow-lg hover:shadow-2xl transition-all group overflow-hidden"
          >
            <div className="card-body items-center text-center p-8">
              <div className="mb-6 relative">
                <BsPersonCircle className="text-7xl text-accent transition-colors duration-300 group-hover:text-primary" />
              </div>
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
        </div>
      </motion.div>
    </section>
  );
};

export default About;