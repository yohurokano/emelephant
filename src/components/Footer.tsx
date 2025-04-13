import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaRegSmileWink } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";

const Footer: React.FC = () => {
  return (
    <motion.footer
      className="bg-base-200 text-base-content border-t border-base-content/10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-10 items-start">
          {/* Brand Column */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex flex-col items-center md:items-start text-center md:text-left"
          >
            <h3 className="text-2xl font-bold text-primary mb-3 font-poppins">
              Emelephant
            </h3>
            <p className="text-sm opacity-80 max-w-xs leading-relaxed">
              Big Ideas. Bright Design. Where clarity meets creativity.
            </p>
            <FaRegSmileWink className="mt-4 text-xl text-accent" />
          </motion.div>

          {/* Links Column */}
          <motion.nav
            className="flex flex-col items-center space-y-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {["About", "Projects", "Brand", "Contact"].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm hover:text-primary transition-colors font-medium"
                whileHover={{ x: 6 }}
                transition={{ delay: index * 0.05 }}
              >
                <FiChevronRight className="inline-block mr-1 text-accent" />
                {item}
              </motion.a>
            ))}
          </motion.nav>

          {/* Social Column */}
          <motion.div
            className="flex justify-center md:justify-end items-center gap-6"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-primary transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              <FaGithub />
            </motion.a>
            <motion.a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-accent transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              <FaLinkedin />
            </motion.a>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-base-content/10 mt-10 pt-6 text-center text-sm opacity-70"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          © {new Date().getFullYear()} Emelephant. Built with purpose 🐘
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
