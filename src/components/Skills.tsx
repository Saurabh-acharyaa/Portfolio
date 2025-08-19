import type { FC, ReactNode } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState, useRef } from "react";
import { 
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaPython, FaJava, FaGitAlt, FaTimes 
} from "react-icons/fa";
import { SiTypescript, SiTailwindcss, SiCplusplus, SiC } from "react-icons/si";

interface SkillCardProps {
  name: string;
  icon: ReactNode;
  color: string;
  index: number;
  controls: any;
  onClick: (event: React.MouseEvent, skillName: string) => void;
}

interface SkillDetail {
  name: string;
  description: string;
}

interface Position {
  x: number;
  y: number;
  direction: 'top' | 'bottom';
}

// Typewriter effect component
const Typewriter: FC<{ text: string; speed?: number; onComplete?: () => void }> = ({ 
  text, 
  speed = 30,
  onComplete 
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      
      return () => clearTimeout(timer);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  return <>{displayedText}</>;
};

const SkillCard: FC<SkillCardProps> = ({ name, icon, color, index, controls, onClick }) => {
  const glowColor = color.split(' ')[0].replace('from-', '');

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={controls}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ 
        y: -4,
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.95 }}
      className="p-3 sm:p-4 bg-gray-800/50 rounded-xl border border-gray-700 flex flex-col items-center transition-all duration-300 hover:border-gray-600 hover:bg-gray-800/70 group relative overflow-hidden cursor-pointer touch-manipulation"
      onClick={(e) => onClick(e, name)}
    >
      {/* Glow Effect */}
      <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br ${color}`}></div>
      
      {/* Icon with continuous animation */}
      <motion.div
        animate={{
          y: [0, -5, 0],
          scale: [1, 1.05, 1],
          opacity: [0.9, 1, 0.9]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className={`relative z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gray-700/80 flex items-center justify-center text-xl sm:text-2xl mb-2 sm:mb-3 group-hover:shadow-[0_0_15px_3px] group-hover:shadow-${glowColor}/30`}
      >
        {icon}
      </motion.div>
      
      <h3 className="relative z-10 text-xs sm:text-sm font-medium text-gray-200 group-hover:text-white transition-colors duration-300 text-center px-1">
        {name}
      </h3>
    </motion.div>
  );
};

const Skills: FC = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });
  const [selectedSkill, setSelectedSkill] = useState<SkillDetail | null>(null);
  const [modalPosition, setModalPosition] = useState<Position>({ x: 0, y: 0, direction: 'bottom' });
  const [typingComplete, setTypingComplete] = useState(false);
  const skillsGridRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5 }
      });
    } else {
      controls.start({
        opacity: 0,
        scale: 0.95,
        transition: { duration: 0.5 }
      });
    }
  }, [controls, inView]);

  const skills = [
    { name: "HTML", icon: <FaHtml5 className="text-orange-500" />, color: "from-orange-500 to-orange-300" },
    { name: "CSS", icon: <FaCss3Alt className="text-blue-500" />, color: "from-blue-500 to-blue-300" },
    { name: "JavaScript", icon: <FaJs className="text-yellow-400" />, color: "from-yellow-400 to-yellow-200" },
    { name: "React", icon: <FaReact className="text-cyan-400" />, color: "from-cyan-400 to-cyan-200" },
    { name: "TypeScript", icon: <SiTypescript className="text-blue-600" />, color: "from-blue-600 to-blue-400" },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-300" />, color: "from-cyan-500 to-cyan-300" },
    { name: "Python", icon: <FaPython className="text-blue-400" />, color: "from-blue-400 to-blue-200" },
    { name: "Java", icon: <FaJava className="text-red-500" />, color: "from-red-500 to-red-300" },
    { name: "C", icon: <SiC className="text-blue-300" />, color: "from-blue-700 to-blue-400" },
    { name: "C++", icon: <SiCplusplus className="text-blue-400" />, color: "from-blue-600 to-blue-300" },
    { name: "Git", icon: <FaGitAlt className="text-orange-600" />, color: "from-orange-600 to-orange-400" },
  ];

  const skillDetails: Record<string, SkillDetail> = {
    "HTML": {
      name: "HTML",
      description: "HyperText Markup Language is the standard markup language for documents designed to be displayed in a web browser. I use semantic HTML5 elements to create well-structured, accessible web pages."
    },
    "CSS": {
      name: "CSS",
      description: "Cascading Style Sheets is used for describing the presentation of web pages. I'm proficient in modern CSS features including Flexbox, Grid, animations, and responsive design principles."
    },
    "JavaScript": {
      name: "JavaScript",
      description: "JavaScript is a programming language that enables interactive web pages. I have extensive experience with ES6+ features, asynchronous programming, DOM manipulation, and modern JavaScript frameworks."
    },
    "React": {
      name: "React",
      description: "React is a JavaScript library for building user interfaces. I'm skilled in functional components with hooks, state management, context API, and integrating React with various backend services."
    },
    "TypeScript": {
      name: "TypeScript",
      description: "TypeScript is a strongly typed programming language that builds on JavaScript. I use TypeScript to write more maintainable code with better tooling and catch errors during development."
    },
    "Tailwind CSS": {
      name: "Tailwind CSS",
      description: "Tailwind CSS is a utility-first CSS framework. I use it to rapidly build custom designs without writing custom CSS, leveraging its responsive modifiers and component-friendly approach."
    },
    "Python": {
      name: "Python",
      description: "Python is a high-level, interpreted programming language. I've used Python for web development, data analysis, automation scripts, and algorithmic problem solving."
    },
    "Java": {
      name: "Java",
      description: "Java is a class-based, object-oriented programming language. I have experience with Java for building Android applications and university-level coursework."
    },
    "C": {
      name: "C",
      description: "C is a general-purpose programming language known for its efficiency and low-level capabilities. I've used C for systems programming, embedded systems, and understanding computer architecture fundamentals."
    },
    "C++": {
      name: "C++",
      description: "C++ is an extension of C with object-oriented features. I have experience with C++ for competitive programming, algorithm implementation, and university projects requiring high performance."
    },
    "Git": {
      name: "Git",
      description: "Git is a distributed version control system. I use Git for tracking changes in source code during software development, collaborating with teams, and managing project versions efficiently."
    }
  };

  const handleSkillClick = (event: React.MouseEvent, skillName: string) => {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const gridRect = skillsGridRef.current?.getBoundingClientRect();
    
    if (gridRect) {
      // Calculate position relative to the skills grid
      const x = rect.left - gridRect.left + rect.width / 2;
      const y = rect.top - gridRect.top + rect.height;
      
      // Check if modal would go off screen
      const modalHeight = 220; // Approximate modal height
      const viewportHeight = window.innerHeight;
      const absoluteY = rect.top + rect.height;
      
      // Determine if modal should appear above or below the skill card
      let direction: 'top' | 'bottom' = 'bottom';
      if (absoluteY + modalHeight > viewportHeight - 20 && rect.top > modalHeight + 20) {
        direction = 'top';
      }
      
      setModalPosition({ x, y, direction });
      setSelectedSkill(skillDetails[skillName]);
      setTypingComplete(false);
    }
  };

  const closeModal = () => {
    setSelectedSkill(null);
    setTypingComplete(false);
  };

  const handleTypingComplete = () => {
    setTypingComplete(true);
  };

  // Handle click outside modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeModal();
      }
    };

    if (selectedSkill) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside as EventListener);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside as EventListener);
    };
  }, [selectedSkill]);

  return (
    <section 
      id="skills" 
      ref={ref}
      className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 px-4 py-12 sm:py-16 text-white relative"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{
            opacity: inView ? 1 : 0,
            y: inView ? 0 : -10
          }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-8 sm:mb-12"
        >
          <div className="relative mb-3 sm:mb-4 group">
            <motion.div
              animate={{
                rotate: inView ? [0, 10, -5, 0] : 0,
                opacity: inView ? 1 : 0.7
              }}
              transition={{ duration: 1 }}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-purple-600 to-purple-500 flex items-center justify-center shadow-lg group-hover:shadow-purple-500/30"
            >
              <div className="text-white text-xl sm:text-3xl font-bold">{"</>"}</div>
            </motion.div>
            <motion.div
              animate={{
                rotate: inView ? 360 : 0,
                opacity: inView ? 1 : 0.5
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-300 border-4 border-gray-900 shadow-sm"
            ></motion.div>
          </div>
          
          <motion.h2
            animate={{
              opacity: inView ? 1 : 0.7,
              scale: inView ? 1 : 0.98
            }}
            className="text-2xl sm:text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-300 mb-2"
          >
            My Skills
          </motion.h2>
          <motion.p
            animate={{
              opacity: inView ? 1 : 0.7
            }}
            className="text-center text-gray-300 text-xs sm:text-sm max-w-md"
          >
            Skills I'm familiar with. Click on any skill to learn more.
          </motion.p>
        </motion.div>

        {/* Skills Grid Container - for relative positioning */}
        <div className="relative" ref={skillsGridRef}>
          <motion.div
            animate={controls}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4"
          >
            {skills.map((skill, index) => (
              <SkillCard 
                key={skill.name} 
                {...skill} 
                index={index}
                controls={controls}
                onClick={handleSkillClick}
              />
            ))}
          </motion.div>

          {/* Skill Detail Modal - positioned relative to the grid */}
          <AnimatePresence>
            {selectedSkill && (
              <motion.div
                ref={modalRef}
                initial={{ opacity: 0, scale: 0.8, y: modalPosition.direction === 'bottom' ? 20 : -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: modalPosition.direction === 'bottom' ? 20 : -20 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className="fixed sm:absolute z-50 w-11/12 sm:w-72 bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl overflow-hidden border border-gray-700 shadow-2xl"
                style={{
                  left: '50%',
                  transform: 'translateX(-50%)',
                  ...(modalPosition.direction === 'bottom' 
                    ? { top: `calc(${modalPosition.y}px + 15px)` }
                    : { bottom: `calc(100% - ${modalPosition.y}px + 15px)` }
                  )
                }}
              >
                {/* Premium accent line */}
                <div className="h-1 bg-gradient-to-r from-purple-600 to-cyan-500"></div>
                
                <div className="relative p-4 sm:p-5">
                  <button
                    onClick={closeModal}
                    className="absolute top-2 right-2 sm:top-3 sm:right-3 text-gray-400 hover:text-white transition-colors duration-200 z-10 p-1 rounded-full bg-gray-700/50 hover:bg-gray-700"
                  >
                    <FaTimes className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </button>
                  
                  <div className="flex flex-col items-center text-center">
                    <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center text-xl sm:text-2xl mb-3 sm:mb-4 shadow-lg">
                      {skills.find(s => s.name === selectedSkill.name)?.icon}
                    </div>
                    
                    <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-300">
                      {selectedSkill.name}
                    </h2>
                    
                    <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent via-purple-500 to-transparent mb-3 sm:mb-4"></div>
                    
                    <div className="min-h-[80px] sm:min-h-[100px]">
                      <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light">
                        <Typewriter 
                          text={selectedSkill.description} 
                          speed={20}
                          onComplete={handleTypingComplete}
                        />
                        {!typingComplete && (
                          <motion.span
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                            className="ml-0.5 inline-block w-1 h-3 sm:h-4 bg-cyan-400 align-middle"
                          />
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Subtle glow effect */}
                <div className="absolute inset-0 rounded-xl opacity-20 bg-gradient-to-br from-purple-500 to-cyan-400 pointer-events-none"></div>
                
                {/* Arrow pointing to the skill card - hidden on mobile */}
                <div className={`hidden sm:block absolute left-1/2 transform -translate-x-1/2 ${
                  modalPosition.direction === 'bottom' 
                    ? 'top-0 -translate-y-full' 
                    : 'bottom-0 translate-y-full'
                }`}>
                  <div className={`w-3 h-3 sm:w-4 sm:h-4 bg-gray-800 rotate-45 transform ${
                    modalPosition.direction === 'bottom' 
                      ? 'origin-bottom-right border-t border-l' 
                      : 'origin-top-right border-b border-r'
                  } border-gray-700`}></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Backdrop overlay */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={closeModal}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Skills;
