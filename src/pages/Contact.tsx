import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { FaPaperPlane, FaUser, FaEnvelope, FaLightbulb } from "react-icons/fa";

const SERVICE_ID = "service_1o9jmfc";
const TEMPLATE_ID = "template_an3yev2";
const PUBLIC_KEY = "A0FNWMPQXkFQLXWI9";

const Contact: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      form.current.reset();
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatusMessage('An error occurred while sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-28 px-6 md:px-20 bg-base-100 text-base-content relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute w-[600px] h-[600px] bg-primary/10 blur-[100px] rounded-full -top-48 -left-48 animate-pulse-slow" />
        <div className="absolute w-[500px] h-[500px] bg-accent/10 blur-[80px] rounded-full -bottom-32 -right-32 animate-pulse-slow" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-[0.02]" />
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-3xl mx-auto relative z-10"
      >
        {/* Heading */}
        <motion.h2 className="text-5xl md:text-6xl font-bold text-center mb-12 font-poppins tracking-tight">
          Let's Create
          <span className="block mt-2 text-primary">Something Amazing</span>
        </motion.h2>

        {/* Contact Form */}
        <motion.form ref={form} onSubmit={sendEmail} className="space-y-8">
          {/* Name Input */}
          <div className="group relative">
            <input
              type="text"
              name="user_name"
              placeholder="Your Name"
              className="input input-lg w-full bg-base-100/50 backdrop-blur-lg border-2 border-base-content/20 focus:border-primary focus:ring-0 transition-all pl-14"
              required
            />
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-base-content/60 group-focus-within:text-primary transition-colors">
              <FaUser className="text-xl" />
            </span>
          </div>

          {/* Email Input */}
          <div className="group relative">
            <input
              type="email"
              name="user_email"
              placeholder="Your Email"
              className="input input-lg w-full bg-base-100/50 backdrop-blur-lg border-2 border-base-content/20 focus:border-accent focus:ring-0 transition-all pl-14"
              required
            />
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-base-content/60 group-focus-within:text-accent transition-colors">
              <FaEnvelope className="text-xl" />
            </span>
          </div>

          {/* Message Textarea */}
          <div className="group relative">
            <textarea
              name="message"
              placeholder="Your Vision..."
              className="textarea textarea-lg w-full bg-base-100/50 backdrop-blur-lg border-2 border-base-content/20 focus:border-secondary focus:ring-0 transition-all pl-14 pt-4"
              rows={5}
              required
            />
            <span className="absolute left-5 top-6 text-base-content/60 group-focus-within:text-secondary transition-colors">
              <FaLightbulb className="text-xl" />
            </span>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="btn btn-lg w-full bg-primary text-primary-content hover:bg-primary-focus border-0 shadow-lg hover:shadow-xl transition-all group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
          >
            <FaPaperPlane className="mr-3 text-xl transition-transform group-hover:rotate-12" />
            <span className="text-lg">
              {isSubmitting ? "Sending..." : "Launch Collaboration"}
            </span>
          </motion.button>

          {/* Status Message */}
          {statusMessage && (
            <p className={`text-center mt-4 ${statusMessage.includes("successfully") ? "text-success" : "text-error"}`}>
              {statusMessage}
            </p>
          )}
        </motion.form>
      </motion.div>
    </section>
  );
};

export default Contact;
