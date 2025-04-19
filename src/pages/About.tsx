import React, { useRef, useState, useCallback, memo, useMemo } from "react";
import {
  //motion,
  useScroll,
  Variants,
  useTransform,
  useMotionValueEvent,
  LazyMotion,
  domAnimation,
  m, // Using 'm' as shorthand for motion
} from "framer-motion";
// Updated Icons
import { 
  //FaPuzzlePiece, 
  FaLinkedin, 
  FaTwitter, 
  FaHeart, 
  FaGamepad, 
  //FaUsersCog, 
  FaBrain, 
  FaSyncAlt, 
  FaComments,
  FaGithub // Added GitHub icon for social links
} from "react-icons/fa";
import { FiTarget } from "react-icons/fi";

// --- Animation Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.12, 
      delayChildren: 0.1, 
      ease: "easeOut" 
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 40, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { 
      type: "spring", 
      stiffness: 85, 
      damping: 14 
    },
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      type: "spring", 
      stiffness: 110, 
      damping: 16 
    },
  },
};

const founderCardVariants: Variants = {
  hidden: { scale: 0.95, opacity: 0, y: 20 },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: { 
      type: "spring", 
      stiffness: 85, 
      damping: 14, 
      mass: 0.8 
    },
  },
};

// --- Memoized Sub-Components ---
const PlaceholderAvatar = memo(({ className }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 100 100" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg" 
    aria-hidden="true"
  >
    <circle cx="50" cy="35" r="20" />
    <path d="M50 60 C 30 60, 20 80, 20 90 L 80 90 C 80 80, 70 60, 50 60 Z" />
  </svg>
));
PlaceholderAvatar.displayName = 'PlaceholderAvatar';

const SocialButton = memo(({ 
  icon: Icon, 
  label, 
  href 
}: { 
  icon: React.ElementType; 
  label: string; 
  href: string; 
}) => (
  <m.a
    href={href} 
    aria-label={label} 
    target="_blank" 
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full flex items-center justify-center bg-base-300/70 text-primary hover:bg-primary hover:text-base-100 transition-all duration-300"
    whileHover={{ scale: 1.12, y: -3 }} 
    whileTap={{ scale: 0.92 }}
  > 
    <Icon className="text-lg" /> 
  </m.a>
));
SocialButton.displayName = 'SocialButton';

// Renamed from FeatureCard to DifferentiatorCard for clarity
const DifferentiatorCard = memo(({ 
  icon: Icon, 
  title, 
  description 
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string; 
}) => (
  <m.div
    className="p-6 bg-base-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-transparent hover:border-primary/20 relative overflow-hidden"
    whileHover={{ y: -6, backgroundColor: "rgba(var(--b2), 0.95)" }}
    variants={itemVariants}
  >
    {/* Subtle Background Icon */}
    <div className="absolute -right-6 -bottom-6 opacity-5 text-primary text-[120px]" aria-hidden="true">
      <Icon />
    </div>
    
    <div className="relative z-10">
      <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-5">
        <Icon className="text-3xl text-primary" />
      </div>
      <h4 className="text-xl font-bold mb-3 font-poppins text-base-content">{title}</h4>
      <p className="text-base font-nunito text-base-content/80 leading-relaxed">{description}</p>
    </div>
  </m.div>
));
DifferentiatorCard.displayName = 'DifferentiatorCard';

const FounderCard = memo(({ 
  name, 
  title, 
  description, 
  rotate, 
  linkedinUrl, 
  twitterUrl,
  githubUrl 
}: { 
  name: string; 
  title: string; 
  description: React.ReactNode; 
  rotate: number; 
  linkedinUrl?: string; 
  twitterUrl?: string;
  githubUrl?: string;
}) => (
  <m.div
    variants={founderCardVariants}
    whileHover={{ 
      y: -10, 
      scale: 1.02, 
      boxShadow: '0 22px 25px -5px rgba(0, 0, 0, 0.12), 0 12px 12px -5px rgba(0, 0, 0, 0.06)' 
    }}
    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
    className="card bg-base-200 shadow-lg transition-all group overflow-hidden rounded-2xl"
  >
    {/* Card Background */}
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-base-300/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />
    
    <div className="card-body items-center text-center p-8 relative z-10">
      <m.div
        className="mb-6 relative" 
        whileHover={{ scale: 1.1, rotate }} 
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        <div className="relative">
          <PlaceholderAvatar className="text-7xl text-accent transition-colors duration-300 group-hover:text-primary" />
          <div className="absolute inset-0 bg-primary/10 rounded-full scale-110 opacity-0 group-hover:opacity-100 -z-10 transition-opacity duration-300" aria-hidden="true" />
        </div>
      </m.div>
      
      <h4 className="text-3xl font-bold mb-2 font-poppins">{name}</h4>
      <p className="text-sm uppercase tracking-wide text-base-content/70 mb-4 font-medium">{title}</p>
      <p className="text-lg font-nunito text-base-content/90 leading-relaxed">{description}</p>
      
      {/* Social Links */}
      <div className="flex space-x-3 mt-6">
        {linkedinUrl && <SocialButton icon={FaLinkedin} label={`${name}'s LinkedIn`} href={linkedinUrl} />}
        {twitterUrl && <SocialButton icon={FaTwitter} label={`${name}'s Twitter`} href={twitterUrl} />}
        {githubUrl && <SocialButton icon={FaGithub} label={`${name}'s GitHub`} href={githubUrl} />}
      </div>
    </div>
  </m.div>
));
FounderCard.displayName = 'FounderCard';

const AnimatedHeadline = memo(({ line1, line2 }: { line1: string; line2: string }) => (
  <m.h2
    className="text-5xl md:text-6xl font-bold text-primary font-poppins tracking-tight overflow-hidden py-1"
    variants={itemVariants}
  >
    <span className="block">
      {line1.split(" ").map((word, index) => (
        <m.span
          key={`h1-${word}-${index}`} 
          className="inline-block mr-3" 
          variants={wordVariants} 
          style={{ willChange: 'transform, opacity' }}
        > 
          {word} 
        </m.span>
      ))}
    </span>
    <span className="block text-accent mt-3">
      {line2.split(" ").map((word, index) => (
        <m.span
          key={`h2-${word}-${index}`} 
          className="inline-block mr-3" 
          variants={wordVariants} 
          style={{ willChange: 'transform, opacity' }}
        > 
          {word} 
        </m.span>
      ))}
    </span>
  </m.h2>
));
AnimatedHeadline.displayName = 'AnimatedHeadline';

// Define section data outside component for better memory management
const differentiators = [
  {
    icon: FaHeart,
    title: "Emotional Intelligence Focus",
    description: "Designing experiences that resonate personally, fostering deeper connections and genuine engagement."
  },
  {
    icon: FaGamepad,
    title: "Gamification for Growth",
    description: "Utilizing game mechanics not just for fun, but to motivate consistent progress in learning and self-development."
  },
  {
    icon: FiTarget,
    title: "Targeted, Inclusive Design",
    description: "Catering to diverse audiences, including neurodivergent learners, ensuring our tools are welcoming and effective for all."
  },
  {
    icon: FaBrain,
    title: "Psychology & Education Integrated",
    description: "Combining psychological insights with educational strategies to create adaptive tools that support user needs and goals."
  },
  {
    icon: FaSyncAlt,
    title: "Continuous Evolution",
    description: "Our applications adapt and grow with users, providing ongoing support, unlike static solutions."
  },
  {
    icon: FaComments,
    title: "Strong Community Focus",
    description: "Building communities around our products to encourage collaboration, shared growth, and enhanced user retention."
  }
];

const founders = [
  {
    name: "Ricardo Costa",
    title: "Co-Founder & CEO",
    description: "10+ years in Illustration, Graphic Design & UX. Animation degree fuels creative engagement. Inspired by personal reflection to build tools supporting others' life journeys.",
    rotate: -5,
    linkedinUrl: "#",
    twitterUrl: "#",
    githubUrl: "#"
  },
  {
    name: "Apisada",
    title: "Co-Founder & Executive of Creative Dept.",
    description: "Skilled visual designer focused on intuitive, emotionally engaging interfaces. Animation background influences design philosophy. Driven to create meaningful user experiences.",
    rotate: 5,
    linkedinUrl: "#",
    twitterUrl: "#"
  }
];

// --- Main About Component ---
const About: React.FC = () => {
  // Refs
  const sectionRef = useRef<HTMLElement>(null);
  const differentiatorsSectionRef = useRef<HTMLDivElement>(null);
  const foundersSectionRef = useRef<HTMLDivElement>(null);

  // State for visibility triggers
  const [isDifferentiatorVisible, setIsDifferentiatorVisible] = useState(false);
  const [isFoundersVisible, setIsFoundersVisible] = useState(false);

  // --- Scroll Tracking ---
  const { scrollYProgress: sectionScrollYProgress } = useScroll({ 
    target: sectionRef, 
    offset: ["start end", "end start"] 
  });
  
  const { scrollYProgress: differentiatorScrollYProgress } = useScroll({ 
    target: differentiatorsSectionRef, 
    offset: ["start 0.85", "start 0.35"] 
  });
  
  const { scrollYProgress: foundersScrollYProgress } = useScroll({ 
    target: foundersSectionRef, 
    offset: ["start 0.85", "start 0.35"] 
  });

  // --- Scroll Event Listeners ---
  useMotionValueEvent(differentiatorScrollYProgress, "change", 
    useCallback((latest) => setIsDifferentiatorVisible(latest > 0.1), [])
  );
  
  useMotionValueEvent(foundersScrollYProgress, "change", 
    useCallback((latest) => setIsFoundersVisible(latest > 0.1), [])
  );

  // --- Scroll-Linked Transformations (Background) ---
  const bgTranslateY1 = useTransform(sectionScrollYProgress, [0, 1], ["-90px", "90px"]);
  const bgTranslateY2 = useTransform(sectionScrollYProgress, [0, 1], ["90px", "-90px"]);
  const bgOpacity = useTransform(sectionScrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  // --- Text Content ---
  const headlineLine1 = "Bridging Technology &";
  const headlineLine2 = "Emotional Intelligence";

  // Memoized section data
  const renderedDifferentiators = useMemo(() => 
    differentiators.map((item, index) => (
      <DifferentiatorCard
        key={`differentiator-${index}`}
        icon={item.icon}
        title={item.title}
        description={item.description}
      />
    )), 
    []
  );

  const renderedFounders = useMemo(() => 
    founders.map((founder, index) => (
      <FounderCard
        key={`founder-${index}`}
        name={founder.name}
        title={founder.title}
        description={founder.description}
        rotate={founder.rotate}
        linkedinUrl={founder.linkedinUrl}
        twitterUrl={founder.twitterUrl}
        githubUrl={founder.githubUrl}
      />
    )),
    []
  );

  return (
    <LazyMotion features={domAnimation}>
      <m.section
        id="about"
        ref={sectionRef}
        className="py-32 px-6 md:px-20 lg:px-24 bg-base-100 text-base-content space-y-32 overflow-hidden relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={containerVariants}
      >
        {/* Background Elements */}
        <m.div className="absolute inset-0 pointer-events-none -z-10" aria-hidden="true">
          <m.div
            className="absolute -top-40 -left-40 w-80 h-80 bg-primary/5 blur-[120px] rounded-full"
            style={{ y: bgTranslateY1, x: '-50px', opacity: bgOpacity }}
          />
          <m.div
            className="absolute -bottom-40 -right-40 w-72 h-72 bg-accent/5 blur-[110px] rounded-full"
            style={{ y: bgTranslateY2, x: '50px', opacity: bgOpacity }}
          />
          {/* Added third subtle background element */}
          <m.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary/3 blur-[150px] rounded-full"
            style={{ scale: useTransform(sectionScrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]) }}
          />
        </m.div>

        {/* --- Intro Section --- */}
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedHeadline line1={headlineLine1} line2={headlineLine2} />
          <m.div variants={itemVariants}>
            <p className="text-xl md:text-2xl mt-8 leading-relaxed font-nunito text-base-content/90 max-w-3xl mx-auto">
              Emelephant pioneers emotionally intelligent, gamified digital experiences. We empower individuals by blending psychology, education, and playful design, making personal growth and learning accessible, engaging, and adaptable to unique life journeys.
            </p>
            <m.div 
              className="w-24 h-2 bg-accent/60 mx-auto mt-10 rounded-full"
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 96, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
            />
          </m.div>
        </div>

        {/* --- What Makes Us Different Section --- */}
        <m.div
          ref={differentiatorsSectionRef}
          className="max-w-7xl mx-auto"
        >
          <m.h3
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-primary font-poppins tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={isDifferentiatorVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
          >
            What Makes Us Different
          </m.h3>

          {/* Differentiators Grid */}
          <m.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate={isDifferentiatorVisible ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {renderedDifferentiators}
          </m.div>
        </m.div>

        {/* --- Founders Section --- */}
        <m.div
          id="founders"
          ref={foundersSectionRef}
          className="max-w-7xl mx-auto scroll-mt-24"
        >
          <m.h3
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-primary font-poppins tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={isFoundersVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
          >
            Meet the Founders
          </m.h3>

          <m.div
            className="grid md:grid-cols-2 gap-12"
            initial="hidden"
            animate={isFoundersVisible ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {renderedFounders}
          </m.div>
        </m.div>

        {/* Decorative element at bottom of section */}
        <m.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex space-x-2">
            <span className="w-2 h-2 rounded-full bg-primary/30" />
            <span className="w-2 h-2 rounded-full bg-accent/40" />
            <span className="w-2 h-2 rounded-full bg-secondary/30" />
          </div>
        </m.div>
      </m.section>
    </LazyMotion>
  );
};

export default About;