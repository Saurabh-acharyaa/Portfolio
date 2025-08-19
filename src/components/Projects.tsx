import type { FC } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const Projects: FC = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false // Reset when leaving view
  });

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      y: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const glowAnimation = {
    boxShadow: [
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      "0 10px 15px -3px rgba(126, 34, 206, 0.3), 0 4px 6px -2px rgba(126, 34, 206, 0.05)",
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
    ],
    transition: {
      boxShadow: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="projects" ref={ref} className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 px-6 py-20 text-white">
      <motion.h2 
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: -20 },
          visible: { opacity: 1, y: 0 }
        }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-300"
      >
        Projects
      </motion.h2>
      
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={cardVariants}
          whileInView={floatingAnimation}
          viewport={{ margin: "-100px" }}
          whileHover={{
            scale: 1.03,
            transition: { duration: 0.2 }
          }}
          className="p-6 bg-gray-800 rounded-2xl shadow-lg border border-gray-700 hover:border-transparent hover:bg-gradient-to-br from-purple-600/20 to-cyan-600/20"
        >
          <motion.div animate={inView ? glowAnimation : {}}>
            <h3 className="text-xl font-bold text-white">Netflix Clone</h3>
            <p className="mt-2 text-gray-300">
              A Netflix-inspired web application with movie browsing, user authentication,
              and responsive design.
            </p>
            <div className="mt-4">
              <motion.a 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com/Saurabh-acharyaa/Netflix_clone" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-cyan-300 transition-colors duration-300"
              >
                GitHub
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={cardVariants}
          transition={{ delay: 0.2 }}
          whileInView={floatingAnimation}
          viewport={{ margin: "-100px" }}
          whileHover={{
            scale: 1.03,
            transition: { duration: 0.2 }
          }}
          className="p-6 bg-gray-800 rounded-2xl shadow-lg border border-gray-700 hover:border-transparent hover:bg-gradient-to-br from-purple-600/20 to-cyan-600/20"
        >
          <motion.div animate={inView ? glowAnimation : {}}>
            <h3 className="text-xl font-bold text-white">Online Appointment System</h3>
            <p className="mt-2 text-gray-300">
              A web-based appointment booking system with admin panel, user management,
              and scheduling features.
            </p>
            <div className="mt-4">
              <motion.a 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com/Saurabh-acharyaa/online_appointment" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-cyan-300 transition-colors duration-300"
              >
                GitHub
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;