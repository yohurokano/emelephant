import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import {
  motion,
  useScroll,
  Variants,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { FaPaperPlane, FaUser, FaEnvelope, FaLightbulb } from "react-icons/fa";

// --- EmailJS Configuration ---
// Consider moving these to environment variables for better security practice,
// although EmailJS relies on client-side keys with backend restrictions.
const SERVICE_ID = "service_1o9jmfc";
const TEMPLATE_ID = "template_an3yev2";
const PUBLIC_KEY = "A0FNWMPQXkFQLXWI9";

// --- Animation Variants ---
const contentContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Stagger animation of children
      delayChildren: 0.1,
    },
  },
};

const contentItemVariants: Variants = {
  hidden: { y: 30, opacity: 0, scale: 0.98 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 90, damping: 15 },
  },
};

// --- Component Definition ---

const Contact: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Refs for scroll tracking
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null); // Ref for the main content container

  // State to control animation trigger
  const [isContentVisible, setIsContentVisible] = useState(false);

  // --- Scroll Tracking ---
  const { scrollYProgress: sectionScrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"], // Track throughout section visibility
  });

  const { scrollYProgress: contentScrollYProgress } = useScroll({
    target: contentRef,
    offset: ["start 0.9", "start 0.4"], // Trigger animation early as content enters
  });

  // --- Scroll Event Listener ---
  // Update state to trigger content animation
  useMotionValueEvent(contentScrollYProgress, "change", (latest) => {
    setIsContentVisible(latest > 0.1); // Trigger when 10% scrolled into view
  });

  // --- Scroll-Linked Transformations (Background) ---
  const bg1Y = useTransform(sectionScrollYProgress, [0, 1], ["-120px", "120px"]);
  const bg2Y = useTransform(sectionScrollYProgress, [0, 1], ["120px", "-120px"]);
  const gridOpacity = useTransform(sectionScrollYProgress, [0, 0.5, 1], [0.01, 0.03, 0.01]);

  // --- Email Sending Logic ---
  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;

    setIsSubmitting(true);
    setStatusMessage("");

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, {
        publicKey: PUBLIC_KEY,
      });
      setStatusMessage("Your message has been sent successfully!");
      form.current.reset(); // Clear form on success
    } catch (error) {
      console.error('EmailJS Error:', error); // Log error for debugging
      setStatusMessage('An error occurred. Please check console or try again.');
    } finally {
      setIsSubmitting(false); // Re-enable button
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef} // Attach ref
      className="py-28 px-6 md:px-20 bg-base-100 text-base-content relative overflow-hidden"
    >
      {/* Background elements with Scroll Parallax */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
      >
        {/* Removed animate-pulse-slow, now controlled by scroll */}
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

      {/* Main Content Container - Triggered by Scroll State */}
      <motion.div
        ref={contentRef} // Attach ref
        initial="hidden"
        animate={isContentVisible ? "visible" : "hidden"} // Animate based on state
        variants={contentContainerVariants} // Apply container variants for stagger
        className="max-w-3xl mx-auto relative z-10"
      >
        {/* Heading - Staggered Item */}
        <motion.h2
          variants={contentItemVariants} // Apply item variant
          className="text-5xl md:text-6xl font-bold text-center mb-12 font-poppins tracking-tight"
        >
          Let's Create
          <span className="block mt-2 text-primary">Something Amazing</span>
        </motion.h2>

        {/* Contact Form */}
        {/* Note: We apply variants to the form *children* for stagger effect */}
        <motion.form ref={form} onSubmit={sendEmail} className="space-y-8">
          {/* Name Input - Staggered Item */}
          <motion.div variants={contentItemVariants} className="group relative">
            <input
              type="text"
              name="user_name"
              placeholder="Your Name"
              className="input input-lg w-full bg-base-100/50 backdrop-blur-lg border-2 border-base-content/20 focus:border-primary focus:ring-0 transition-all pl-14 rounded-xl" // Added rounded-xl
              required
              aria-label="Your Name"
            />
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-base-content/60 group-focus-within:text-primary transition-colors pointer-events-none"> {/* Added pointer-events-none */}
              <FaUser className="text-xl" />
            </span>
          </motion.div>

          {/* Email Input - Staggered Item */}
          <motion.div variants={contentItemVariants} className="group relative">
            <input
              type="email"
              name="user_email"
              placeholder="Your Email"
              className="input input-lg w-full bg-base-100/50 backdrop-blur-lg border-2 border-base-content/20 focus:border-accent focus:ring-0 transition-all pl-14 rounded-xl" // Added rounded-xl
              required
              aria-label="Your Email"
            />
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-base-content/60 group-focus-within:text-accent transition-colors pointer-events-none"> {/* Added pointer-events-none */}
              <FaEnvelope className="text-xl" />
            </span>
          </motion.div>

          {/* Message Textarea - Staggered Item */}
          <motion.div variants={contentItemVariants} className="group relative">
            <textarea
              name="message"
              placeholder="Your Vision..."
              className="textarea textarea-lg w-full bg-base-100/50 backdrop-blur-lg border-2 border-base-content/20 focus:border-secondary focus:ring-0 transition-all pl-14 pt-4 rounded-xl" // Added rounded-xl
              rows={5}
              required
              aria-label="Your Vision or Message"
            />
            <span className="absolute left-5 top-6 text-base-content/60 group-focus-within:text-secondary transition-colors pointer-events-none"> {/* Added pointer-events-none */}
              <FaLightbulb className="text-xl" />
            </span>
          </motion.div>

          {/* Submit Button - Staggered Item */}
          <motion.div variants={contentItemVariants}>
            <motion.button
              type="submit"
              className="btn btn-lg w-full bg-primary text-primary-content hover:bg-primary-focus border-0 shadow-lg hover:shadow-xl transition-all group rounded-xl" // Added rounded-xl
              whileHover={{ scale: 1.02, y: -2 }} // Added y lift
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting} // Disable while submitting
              aria-live="polite" // Announce changes for screen readers
            >
              <FaPaperPlane className="mr-3 text-xl transition-transform group-hover:rotate-12" />
              <span className="text-lg font-semibold"> {/* Added font-semibold */}
                {isSubmitting ? "Sending..." : "Launch Collaboration"}
              </span>
            </motion.button>
          </motion.div>

          {/* Status Message - Appears without scroll animation */}
          {statusMessage && (
            <p className={`text-center mt-4 text-lg ${statusMessage.includes("successfully") ? "text-success" : "text-error"}`}>
              {statusMessage}
            </p>
          )}
        </motion.form>
      </motion.div>
    </section>
  );
};

export default Contact;
