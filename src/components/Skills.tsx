"use client";

import { useState, type FC } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Skill {
  name: string;
  description: string;
  icon: string;
}

const skills: Skill[] = [
  {
    name: "HTML",
    description: "The standard markup language for creating web pages and applications.",
    icon: "🌐",
  },
  {
    name: "CSS",
    description: "A style sheet language used for describing the look and formatting of a document.",
    icon: "🎨",
  },
  {
    name: "JavaScript",
    description: "The programming language of the Web, enabling interactive websites.",
    icon: "⚡",
  },
  {
    name: "React",
    description: "A JavaScript library for building fast, reusable, and dynamic user interfaces.",
    icon: "⚛️",
  },
  {
    name: "Tailwind CSS",
    description: "A utility-first CSS framework for rapid UI development with responsive design.",
    icon: "💨",
  },
];

const Skills: FC = () => {
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
  const [modalPosition, setModalPosition] = useState<{ x: number; y: number; direction: "top" | "bottom" }>({
    x: 0,
    y: 0,
    direction: "bottom",
  });

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>, skill: Skill) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const spaceBelow = windowHeight - rect.bottom;

    setHoveredSkill(skill);
    setModalPosition({
      x: rect.left + rect.width / 2,
      y: spaceBelow < 240 ? rect.top : rect.bottom,
      direction: spaceBelow < 240 ? "top" : "bottom",
    });
  };

  return (
    <section
      id="skills"
      className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 px-3 sm:px-4 md:px-8 py-12 sm:py-16 text-white relative"
    >
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold text-center mb-10 sm:mb-14 bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent"
        >
          Skills
        </motion.h2>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={(e) => handleMouseEnter(e, skill)}
              onMouseLeave={() => setHoveredSkill(null)}
              className="p-4 sm:p-5 bg-gray-800 rounded-xl shadow-lg cursor-pointer hover:bg-gradient-to-br from-purple-600/20 to-cyan-600/20 transition-all border border-gray-700 hover:border-transparent"
            >
              <div className="text-2xl sm:text-3xl mb-2">{skill.icon}</div>
              <h3 className="text-base sm:text-lg font-semibold">{skill.name}</h3>
            </motion.div>
          ))}
        </div>

        {/* Floating Modal */}
        <AnimatePresence>
          {hoveredSkill && (
            <motion.div
              key={hoveredSkill.name}
              initial={{ opacity: 0, y: modalPosition.direction === "bottom" ? 20 : -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: modalPosition.direction === "bottom" ? 20 : -20 }}
              transition={{ duration: 0.3 }}
              style={{
                left: `${modalPosition.x}px`,
                top:
                  modalPosition.direction === "bottom"
                    ? `${modalPosition.y}px`
                    : `${modalPosition.y - 240}px`,
                transform: "translateX(-50%)",
              }}
              className="absolute z-50 max-w-[90vw] w-64 sm:w-72 md:w-80 bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl overflow-hidden border border-gray-700 shadow-2xl"
            >
              <div className="relative p-4 sm:p-5">
                {/* Close Button */}
                <button
                  onClick={() => setHoveredSkill(null)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-white text-lg sm:text-xl"
                >
                  ×
                </button>

                <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent">
                  {hoveredSkill.icon} {hoveredSkill.name}
                </h2>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light mt-2">
                  {hoveredSkill.description}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Skills;
