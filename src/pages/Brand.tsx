import React from "react";
import { motion } from "framer-motion";
import { FaDownload, FaPalette, FaBrush } from "react-icons/fa";

const Brand: React.FC = () => {
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
    <section
      id="brand"
      className="py-28 px-6 md:px-20 bg-base-100 text-base-content relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute w-[600px] h-[600px] bg-primary/5 blur-[100px] rounded-full -top-48 -left-48" />
        <div className="absolute w-[500px] h-[500px] bg-accent/5 blur-[80px] rounded-full -bottom-32 -right-32" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-[0.02]" />
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="max-w-7xl mx-auto text-center relative z-10"
      >
        {/* Icon */}
        <motion.div
          variants={itemVariants}
          className="mb-12 inline-block"
        >
          <div className="p-6 bg-primary/10 rounded-2xl border border-primary/20 inline-block">
            <FaPalette className="text-6xl text-primary" />
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h2
          variants={itemVariants}
          className="text-5xl md:text-6xl font-bold mb-8 font-poppins tracking-tight"
        >
          Visual <span className="text-primary">Identity</span> System
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl max-w-3xl mx-auto mb-12 text-base-content/90 leading-relaxed"
        >
          Our design system harmonizes{" "}
          <span className="text-primary font-semibold">strategic clarity</span> with{" "}
          <span className="text-accent font-semibold">creative strength</span>, 
          forming a cohesive visual language across all touchpoints.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          className="inline-block"
        >
          <a
            href="/Emelephant_Brand_Pack.zip"
            className="btn btn-lg rounded-2xl px-8 bg-base-200/50 backdrop-blur-lg border-2 border-base-300/20 hover:border-base-300/40 hover:bg-base-200/70 transition-all shadow-lg hover:shadow-xl"
            download
          >
            <FaDownload className="mr-3 text-xl text-primary" />
            <span className="text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Download Assets
            </span>
            <FaBrush className="ml-3 text-xl text-accent" />
          </a>
        </motion.div>

        {/* Brand Elements Preview */}
        <motion.div
          variants={containerVariants}
          className="mt-16 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {/* Color Palette */}
          <motion.div
            variants={itemVariants}
            className="card bg-base-200/50 backdrop-blur-lg border border-base-300/20 hover:border-base-300/40 p-6 transition-all"
          >
            <div className="text-left">
              <h3 className="text-xl font-semibold text-primary mb-4">Color System</h3>
              <div className="flex gap-3">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-2xl bg-primary" />
                  <span className="text-sm">Primary</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-2xl bg-accent" />
                  <span className="text-sm">Accent</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-2xl bg-secondary" />
                  <span className="text-sm">Secondary</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Typography */}
          <motion.div
            variants={itemVariants}
            className="card bg-base-200/50 backdrop-blur-lg border border-base-300/20 hover:border-base-300/40 p-6 transition-all"
          >
            <div className="text-left">
              <h3 className="text-xl font-semibold text-primary mb-4">Type System</h3>
              <div className="space-y-3">
                <div className="font-poppins text-2xl font-bold">Satoshi</div>
                <div className="font-nunito text-xl">Nunito</div>
                <div className="font-manrope text-lg opacity-80">Manrope</div>
                <div className="font-manrope text-lg opacity-80">Poppins</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Brand;