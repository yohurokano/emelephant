import React, { useRef, useState, useCallback, memo } from "react";
import {
  // motion, // Removed unused import
  useScroll,
  Variants,
  useTransform,
  AnimatePresence,
  LazyMotion,
  domAnimation,
  m
} from "framer-motion";
// Organized icons by purpose
import {
  FaGamepad,
  FaRegCalendarCheck,
  FaPaw,
  FaSeedling,
  FaBrain,
  FaUsers,
  // FaLeaf, // Removed unused import
  // FaTrophy, // Removed unused import
  FaStore,
  FaChild,
  FaUserGraduate,
  FaReact, // Keep for HeroQuest Web
  FaDatabase,
  FaInfoCircle,
  // FaExternalLinkAlt, // Removed unused import
  FaMobileAlt,
  // FaPalette, // Removed unused import
  FaCode,
  FaBullseye,
  // FaChartLine, // Removed unused import
  // FaUsersCog, // Removed unused import
  FaArrowUp,
  FaArrowDown,
  FaHourglassHalf // Added for status
} from "react-icons/fa";
import { IconType } from "react-icons"; // Import IconType
import {
  SiSupabase,
  SiTypescript,
  SiNodedotjs,
  SiPostgresql,
  SiTailwindcss,
  SiVercel,
  SiReact, // Keep for HeroQuest Web
  SiFirebase,
  SiFramer
} from "react-icons/si";

// --- Animation Variants ---
const containerVariants: Variants = { /* ... variants remain the same ... */
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const headlineItemVariants: Variants = { /* ... variants remain the same ... */
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 18 } },
};
const detailSectionVariants: Variants = { /* ... variants remain the same ... */
    hidden: { opacity: 0, height: 0, marginTop: 0 },
    visible: { opacity: 1, height: 'auto', marginTop: '2.5rem', transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] } },
    exit: { opacity: 0, height: 0, marginTop: 0, transition: { duration: 0.4, ease: [0.5, 0, 0.75, 0] } }
};
const featureTagVariants: Variants = { /* ... variants remain the same ... */
  initial: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.2 } }
};

// --- Prop Types ---
interface FeatureTagProps {
  icon: IconType;
  text: string;
  color: string;
}

interface TechStackIconProps {
  Icon: IconType | (() => React.ReactElement); // Use React.ReactElement instead of JSX.Element
  title: string;
  color: string;
}

// --- Memoized Sub-Components ---
const FeatureTag = memo(({ icon, text, color }: FeatureTagProps) => { /* ... component remains the same ... */
  const baseClass = `flex items-center gap-1.5 py-1 px-3 rounded-full bg-${color}/10 text-${color} font-medium border border-${color}/20 transition-all duration-300 hover:shadow-md`;
  const Icon = icon;
  return ( <m.span className={baseClass} variants={featureTagVariants} initial="initial" whileHover="hover"> <Icon className="opacity-80"/> {text} </m.span> );
});
FeatureTag.displayName = 'FeatureTag';

const TechStackIcon = memo(({ Icon, title, color }: TechStackIconProps) => ( /* ... component remains the same ... */
  <div className="tooltip tooltip-secondary" data-tip={title}>
    <Icon className={`text-xl text-${color} transition-transform hover:scale-125`} />
  </div>
));
TechStackIcon.displayName = 'TechStackIcon';

// --- Main Projects Component ---
const Projects: React.FC = () => {
  // State
  const [showHeroQuestDetails, setShowHeroQuestDetails] = useState(false);
  const [showKairovaDetails, setShowKairovaDetails] = useState(false);
  const toggleHeroQuestDetails = useCallback(() => { setShowHeroQuestDetails(prev => !prev); }, []);
  const toggleKairovaDetails = useCallback(() => { setShowKairovaDetails(prev => !prev); }, []);

  // Refs
  const sectionRef = useRef<HTMLElement>(null);
  const projectCardRef1 = useRef<HTMLDivElement>(null);
  const projectCardRef2 = useRef<HTMLDivElement>(null);
  const upcomingCardRef = useRef<HTMLDivElement>(null);

  // Scroll Tracking & Transformations (remain the same)
  const { scrollYProgress: sectionScrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const { scrollYProgress: card1ScrollYProgress } = useScroll({ target: projectCardRef1, offset: ["start end", "start 0.7"] });
  const { scrollYProgress: card2ScrollYProgress } = useScroll({ target: projectCardRef2, offset: ["start end", "start 0.7"] });
  const { scrollYProgress: upcomingScrollYProgress } = useScroll({ target: upcomingCardRef, offset: ["start end", "start 0.8"] });
  const bgTranslateY1 = useTransform(sectionScrollYProgress, [0, 1], ["-70px", "70px"]);
  const bgTranslateY2 = useTransform(sectionScrollYProgress, [0, 1], ["80px", "-80px"]);
  const card1Opacity = useTransform(card1ScrollYProgress, [0, 0.6], [0, 1]);
  const card1Scale = useTransform(card1ScrollYProgress, [0, 1], [0.9, 1]);
  const card2Opacity = useTransform(card2ScrollYProgress, [0, 0.6], [0, 1]);
  const card2Scale = useTransform(card2ScrollYProgress, [0, 1], [0.9, 1]);
  const upcomingOpacity = useTransform(upcomingScrollYProgress, [0, 0.8], [0, 1]);
  const upcomingY = useTransform(upcomingScrollYProgress, [0, 1], ["50px", "0px"]);
  const rotateIcon = useTransform(sectionScrollYProgress, [0, 0.5, 1], [0, 180, 360]);

  return (
    <LazyMotion features={domAnimation}>
      <section id="projects" ref={sectionRef} className="py-28 px-6 md:px-20 bg-base-200 text-base-content overflow-hidden relative">
        {/* Background Elements (remain the same) */}
        <m.div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/4 -z-0" aria-hidden="true" style={{ y: bgTranslateY1 }} />
        <m.div className="absolute bottom-0 right-0 w-72 h-72 bg-accent/5 blur-[120px] rounded-full translate-x-1/2 translate-y-1/4 -z-0" aria-hidden="true" style={{ y: bgTranslateY2 }} />
        <m.div className="absolute top-1/2 left-1/4 w-48 h-48 bg-secondary/5 blur-[100px] rounded-full -z-0" aria-hidden="true" style={{ rotate: rotateIcon }} />

        {/* Main Content Container */}
        <m.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={containerVariants} className="max-w-7xl mx-auto relative z-10">
          <m.div variants={headlineItemVariants} className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold font-poppins tracking-tight"> Crafting <span className="text-accent">Future</span> Experiences </h2>
            <p className="text-base-content/80 max-w-2xl mx-auto mt-4">Innovative digital solutions that combine emotional intelligence, gamification, and technology.</p>
          </m.div>

          {/* Project Grid */}
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-10">

            {/* --- HeroQuest Card (Updated Status) --- */}
            <m.div ref={projectCardRef1} style={{ opacity: card1Opacity, scale: card1Scale, willChange: 'transform, opacity' }} whileHover={{ y: -8, scale: 1.01 }} className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all group relative overflow-hidden flex flex-col">
              {/* Card decorations (remain the same) */}
              <div className="absolute -top-16 -right-16 w-32 h-32 bg-primary/5 rounded-full blur-lg"></div>
              <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
              {/* Card Body */}
              <div className="card-body p-8 relative flex-grow">
                {/* Header */}
                <div className="mb-5 flex items-start gap-5">
                  <div className="p-3 bg-primary/10 rounded-xl border border-primary/20 relative group-hover:shadow-md transition-all">
                    <FaGamepad className="text-4xl text-primary" />
                    {/* Updated status indicator */}
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-warning rounded-full flex items-center justify-center text-black text-xs font-bold tooltip tooltip-warning" data-tip="Closed Beta">
                      <FaHourglassHalf/>
                    </span>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-primary mb-1 group-hover:text-primary/90 transition-colors">HeroQuest</h3>
                    <p className="text-sm uppercase tracking-wide text-primary/80 font-medium"> Gamified Learning Ecosystem </p>
                    {/* Updated Status Text */}
                    <span className="inline-block mt-2 text-xs py-0.5 px-2 rounded bg-warning/20 text-warning-content font-semibold">Closed Beta (Open Beta Soon!)</span>
                  </div>
                </div>
                {/* Description (remains the same) */}
                <p className="text-base leading-relaxed text-base-content/90 mb-5"> Transforms academic tasks into engaging quests for children (ages 6-12), especially neurodivergent learners. Fosters a love for learning through storytelling, adaptive play, and a pressure-free, growth-focused environment. </p>
                {/* Key Features (remain the same) */}
                <div className="space-y-3 mb-6">
                   <h4 className="font-semibold text-base-content/90 text-sm uppercase tracking-wider mb-2">Key Features</h4>
                   <div className="flex flex-wrap items-center gap-3 text-sm">
                      <FeatureTag icon={FaChild} text="Ages 6-12" color="primary" />
                      <FeatureTag icon={FaUsers} text="Teacher Dashboard" color="secondary" />
                      <FeatureTag icon={FaPaw} text="Neurodivergent Friendly" color="accent" />
                      {/* Keep React icon as web is first */}
                      <FeatureTag icon={FaReact} text="React & Supabase" color="info" />
                   </div>
                </div>
              </div>
              {/* Card Actions */}
              <div className="card-actions justify-end p-6 pt-0">
                <button onClick={toggleHeroQuestDetails} className="btn btn-sm btn-primary btn-outline group/btn gap-2" aria-expanded={showHeroQuestDetails} aria-controls="heroquest-details-section">
                  {showHeroQuestDetails ? (<>Show Less <FaArrowUp className="opacity-70 group-hover/btn:opacity-100 text-xs transition-all"/></>) : (<>Learn More <FaArrowDown className="opacity-70 group-hover/btn:opacity-100 text-xs transition-all"/></>)}
                </button>
              </div>
            </m.div>

            {/* --- Kairova Card (Updated Status) --- */}
            <m.div ref={projectCardRef2} style={{ opacity: card2Opacity, scale: card2Scale, willChange: 'transform, opacity' }} whileHover={{ y: -8, scale: 1.01 }} className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all group relative overflow-hidden flex flex-col">
              {/* Card decorations (remain the same) */}
              <div className="absolute -top-16 -right-16 w-32 h-32 bg-accent/5 rounded-full blur-lg"></div>
              <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-accent/30 to-transparent"></div>
              {/* Card Body */}
              <div className="card-body p-8 relative flex-grow">
                {/* Header */}
                <div className="mb-5 flex items-start gap-5">
                  <div className="p-3 bg-accent/10 rounded-xl border border-accent/20 relative group-hover:shadow-md transition-all">
                    <FaRegCalendarCheck className="text-4xl text-accent" />
                    <FaPaw className="text-lg text-secondary absolute -top-2 -right-2 animate-pulse" /> {/* Changed from animate-float */}
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-accent mb-1 group-hover:text-accent/90 transition-colors">Kairova</h3>
                    <p className="text-sm uppercase tracking-wide text-accent/80 font-medium"> AI Life Companion </p>
                    {/* Updated Status Text */}
                    <span className="inline-block mt-2 text-xs py-0.5 px-2 rounded bg-info/20 text-info-content font-semibold">Early Development</span>
                  </div>
                </div>
                {/* Description (remains the same) */}
                <p className="text-base leading-relaxed text-base-content/90 mb-5"> A personalized life OS guiding users (teens, young adults, career-changers) towards purpose using psychology, AI, and gamification. Features self-discovery quizzes, AI roadmaps, and visual progress tracking. </p>
                {/* Key Features (remain the same) */}
                <div className="space-y-3 mb-6">
                   <h4 className="font-semibold text-base-content/90 text-sm uppercase tracking-wider mb-2">Key Features</h4>
                   <div className="flex flex-wrap items-center gap-3 text-sm">
                      <FeatureTag icon={FaBrain} text="AI Roadmap" color="primary" />
                      <FeatureTag icon={FaSeedling} text="Pet & Tree Growth" color="success" />
                      <FeatureTag icon={FaUserGraduate} text="Self-Discovery Quiz" color="secondary" />
                      <FeatureTag icon={FaMobileAlt} text="React Native" color="info" />
                   </div>
                </div>
              </div>
               {/* Card Actions */}
               <div className="card-actions justify-end p-6 pt-0">
                 <button onClick={toggleKairovaDetails} className="btn btn-sm btn-accent btn-outline group/btn gap-2" aria-expanded={showKairovaDetails} aria-controls="kairova-details-section">
                   {showKairovaDetails ? (<>Show Less <FaArrowUp className="opacity-70 group-hover/btn:opacity-100 text-xs transition-all"/></>) : (<>Learn More <FaArrowDown className="opacity-70 group-hover/btn:opacity-100 text-xs transition-all"/></>)}
                 </button>
              </div>
            </m.div>
          </div> {/* End of Project Grid */}

          {/* --- Detail Sections (HeroQuest Updated) --- */}
          <AnimatePresence mode="wait">
            {/* HeroQuest Details Section */}
            {showHeroQuestDetails && (
              <m.div key="heroquest-details" id="heroquest-details-section" variants={detailSectionVariants} initial="hidden" animate="visible" exit="exit" className="lg:col-span-2 bg-base-100/50 backdrop-blur-md rounded-2xl p-8 border border-primary/20 shadow-lg overflow-hidden">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-2xl font-bold text-primary flex items-center gap-3"> <FaGamepad/> HeroQuest Details </h4>
                  <button onClick={toggleHeroQuestDetails} className="btn btn-sm btn-ghost text-primary" aria-label="Close details"> <FaArrowUp /> </button>
                </div>
                <div className="grid md:grid-cols-2 gap-8 text-sm"> {/* Increased gap */}
                  <div className="space-y-6">
                    <div>
                      <h5 className="text-lg font-semibold text-primary/90 mb-3 flex items-center gap-2"> <FaBullseye className="text-primary/80" /> Core Concept </h5>
                      <p className="mb-3 text-base-content/90 leading-relaxed"> Transforms learning into adventure via quests (math, vocab, logic), storytelling, and visual charm. Focuses on growth, curiosity, and empathy, reducing pressure for neurodivergent learners. Includes customizable avatars & printable resources. </p>
                    </div>
                    <div>
                      <h5 className="text-lg font-semibold text-primary/90 mb-3 flex items-center gap-2"> <FaUsers className="text-primary/80" /> Target Audience </h5>
                      <ul className="space-y-1.5"> {/* Increased spacing */}
                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span><span>Children Aged 6-12</span></li>
                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span><span>Neurodivergent Learners (Autism, ADHD)</span></li>
                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span><span>Parents & Teachers</span></li>
                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span><span>Homeschooling Families</span></li>
                      </ul>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                       <h5 className="text-lg font-semibold text-primary/90 mb-3 flex items-center gap-2"> <FaCode className="text-primary/80" /> Technology Stack </h5>
                       <div className="flex flex-wrap gap-4 mb-3">
                         <TechStackIcon Icon={SiReact} title="React (Web)" color="blue-500"/>
                         <TechStackIcon Icon={SiTypescript} title="TypeScript" color="blue-400"/>
                         <TechStackIcon Icon={SiTailwindcss} title="Tailwind CSS" color="cyan-500"/>
                         <TechStackIcon Icon={SiFramer} title="Framer Motion" color="purple-500"/>
                         <TechStackIcon Icon={SiSupabase} title="Supabase" color="green-600"/>
                         <TechStackIcon Icon={SiVercel} title="Vercel" color="gray-800"/>
                         <TechStackIcon Icon={SiNodedotjs} title="Node.js" color="green-500"/>
                         <TechStackIcon Icon={SiPostgresql} title="PostgreSQL" color="blue-700"/>
                       </div>
                    </div>
                    <div>
                      <h5 className="text-lg font-semibold text-primary/90 mb-3 flex items-center gap-2"> <FaRegCalendarCheck className="text-primary/80" /> Status & Roadmap </h5>
                      {/* Updated Status/Timeline */}
                      <p className="mb-3 text-base-content/90 font-medium">Current Status: <span className="text-warning">Closed Beta</span></p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3"> <div className="w-16 text-xs text-center font-semibold bg-primary/20 rounded py-0.5 text-primary">Q3 2025</div> <div>Open Beta Launch</div> </div>
                        <div className="flex items-center gap-3"> <div className="w-16 text-xs text-center font-semibold bg-primary/20 rounded py-0.5 text-primary">Late 2025</div> <div>Full Web Version Release</div> </div>
                        <div className="flex items-center gap-3"> <div className="w-16 text-xs text-center font-semibold bg-primary/20 rounded py-0.5 text-primary">Q2 2026</div> <div>Mobile App (iOS/Android)</div> </div>
                        <div className="flex items-center gap-3"> <div className="w-16 text-xs text-center font-semibold bg-primary/20 rounded py-0.5 text-primary">2026+</div> <div>Classroom Tools & Licensing</div> </div>
                      </div>
                    </div>
                  </div>
                </div>
              </m.div>
            )}

            {/* Kairova Details Section (remains mostly the same, status updated on card) */}
            {showKairovaDetails && (
              <m.div key="kairova-details" id="kairova-details-section" variants={detailSectionVariants} initial="hidden" animate="visible" exit="exit" className="lg:col-span-2 bg-base-100/50 backdrop-blur-md rounded-2xl p-8 border border-accent/20 shadow-lg overflow-hidden">
                 <div className="flex items-center justify-between mb-6">
                   <h4 className="text-2xl font-bold text-accent flex items-center gap-3"> <FaRegCalendarCheck/> Kairova Details </h4>
                   <button onClick={toggleKairovaDetails} className="btn btn-sm btn-ghost text-accent" aria-label="Close details"> <FaArrowUp /> </button>
                 </div>
                 <div className="grid md:grid-cols-2 gap-8 text-sm">
                    <div className="space-y-6">
                       <div>
                          <h5 className="text-lg font-semibold text-accent/90 mb-3 flex items-center gap-2"> <FaBullseye className="text-accent/80" /> Core Concept </h5>
                          <p className="mb-3 text-base-content/90 leading-relaxed"> AI-powered life companion helping users find purpose and grow via personalized roadmaps, adaptive daily planning, and gamification (XP, pets, trees, avatars). Integrates psychology for self-discovery. </p>
                       </div>
                       <div>
                          <h5 className="text-lg font-semibold text-accent/90 mb-3 flex items-center gap-2"> <FaUsers className="text-accent/80" /> Target Audience </h5>
                          <ul className="space-y-1.5">
                             <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent"></span><span>Teens & Young Adults</span></li>
                             <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent"></span><span>Career Changers</span></li>
                             <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent"></span><span>Neurodivergent Individuals</span></li>
                             <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent"></span><span>Anyone seeking direction</span></li>
                          </ul>
                       </div>
                    </div>
                    <div className="space-y-6">
                       <div>
                          <h5 className="text-lg font-semibold text-accent/90 mb-3 flex items-center gap-2"> <FaCode className="text-accent/80" /> Technology Stack </h5>
                          <div className="flex flex-wrap gap-4 mb-3">
                             <TechStackIcon Icon={FaMobileAlt} title="React Native" color="blue-500"/>
                             <TechStackIcon Icon={SiTypescript} title="TypeScript" color="blue-400"/>
                             <TechStackIcon Icon={() => <span className="text-xl">🐻</span>} title="Zustand" color="gray-700"/> {/* Using emoji for Zustand */}
                             <TechStackIcon Icon={SiTailwindcss} title="Tailwind CSS" color="cyan-500"/>
                             <TechStackIcon Icon={SiSupabase} title="Supabase" color="green-600"/>
                             <TechStackIcon Icon={FaBrain} title="GPT Integration (Planned)" color="purple-500"/>
                             <TechStackIcon Icon={SiFirebase} title="Firebase (Potential)" color="yellow-500"/>
                          </div>
                       </div>
                       <div>
                          <h5 className="text-lg font-semibold text-accent/90 mb-3 flex items-center gap-2"> <FaRegCalendarCheck className="text-accent/80" /> Future Roadmap </h5>
                          <div className="space-y-2">
                             <div className="flex items-center gap-3"> <div className="w-16 text-xs text-center font-semibold bg-accent/20 rounded py-0.5 text-accent">Q3 2025</div> <div>AI Mentoring Capabilities</div> </div>
                             <div className="flex items-center gap-3"> <div className="w-16 text-xs text-center font-semibold bg-accent/20 rounded py-0.5 text-accent">Q4 2025</div> <div>Mood-Based Daily Planning</div> </div>
                             <div className="flex items-center gap-3"> <div className="w-16 text-xs text-center font-semibold bg-accent/20 rounded py-0.5 text-accent">Q1 2026</div> <div>Enhanced Community Features</div> </div>
                             <div className="flex items-center gap-3"> <div className="w-16 text-xs text-center font-semibold bg-accent/20 rounded py-0.5 text-accent">2027</div> <div>Wearable Technology Integration</div> </div>
                          </div>
                       </div>
                    </div>
                 </div>
              </m.div>
            )}
          </AnimatePresence>

          {/* --- Upcoming Projects (remains the same) --- */}
          <m.div ref={upcomingCardRef} style={{ opacity: upcomingOpacity, y: upcomingY, willChange: 'transform, opacity' }} className="mt-16">
             <div className="bg-gradient-to-br from-base-300/10 to-base-300/30 p-8 rounded-2xl border border-base-content/10 hover:border-base-content/20 transition-all text-center group backdrop-blur-sm">
                <div className="mb-4 flex justify-center">
                   <div className="relative">
                      <FaInfoCircle className="text-3xl text-primary opacity-70 group-hover:opacity-100 transition-opacity"/>
                      <m.div className="absolute inset-0 rounded-full border-2 border-primary/30" animate={{ scale: [1, 1.2, 1], opacity: [0.7, 0, 0.7] }} transition={{ duration: 3, repeat: Infinity, repeatType: "loop" }} />
                   </div>
                </div>
                <h3 className="text-2xl font-semibold text-primary mb-3"> Emerging Innovations </h3>
                <p className="text-lg text-base-content/90 max-w-2xl mx-auto"> Continuously exploring new ways to blend <span className="text-accent font-medium">emotional intelligence</span> and <span className="text-secondary font-medium">gamification</span> for creative empowerment and digital well-being. Stay tuned! </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                   <div className="bg-base-100/30 p-4 rounded-xl border border-base-content/5 w-48 backdrop-blur-sm hover:scale-105 transition-all">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3"> <FaStore className="text-primary" /> </div>
                      <h4 className="font-medium">Digital Marketplace</h4> <p className="text-xs text-base-content/70 mt-1">Coming Q3 2025</p>
                   </div>
                   <div className="bg-base-100/30 p-4 rounded-xl border border-base-content/5 w-48 backdrop-blur-sm hover:scale-105 transition-all">
                      <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-3"> <FaDatabase className="text-secondary" /> </div>
                      <h4 className="font-medium">Data Analytics Suite</h4> <p className="text-xs text-base-content/70 mt-1">Coming Q4 2025</p>
                   </div>
                   <div className="bg-base-100/30 p-4 rounded-xl border border-base-content/5 w-48 backdrop-blur-sm hover:scale-105 transition-all">
                      <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-3"> <FaMobileAlt className="text-accent" /> </div>
                      <h4 className="font-medium">Mobile Companion</h4> <p className="text-xs text-base-content/70 mt-1">Coming 2026</p>
                   </div>
                </div>
                <div className="mt-8 flex justify-center gap-3 opacity-70">
                   <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                   <div className="w-2 h-2 bg-secondary rounded-full animate-pulse delay-100" />
                   <div className="w-2 h-2 bg-accent rounded-full animate-pulse delay-200" />
                </div>
             </div>
          </m.div>
        </m.div>
      </section>
    </LazyMotion>
  );
};

export default memo(Projects);
