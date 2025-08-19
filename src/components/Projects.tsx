import type { FC } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { FaGithub } from "react-icons/fa";  // ✅ GitHub icon

const Projects: FC = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    } else {
      controls.start({ opacity: 0, y: 20 });
    }
  }, [controls, inView]);

  return (
    <section
      id="projects"
      ref={ref}
      className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 px-6 py-20 text-white"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={controls}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-300"
      >
        Projects
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Netflix Clone Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileHover={{
            scale: 1.03,
            transition: { duration: 0.2 }
          }}
          className="p-6 bg-gray-900 rounded-2xl shadow-lg border border-gray-700 hover:border-transparent hover:bg-gradient-to-br from-purple-600/20 to-cyan-600/20"
        >
          <div>
            <h3 className="text-xl font-bold text-white">Netflix Clone</h3>
            {/* ✅ Project Image */}
            <img
              src="netflix.jpg"
              alt="Netflix Clone"
              className="mt-3 rounded-lg shadow-md"
            />
            <p className="mt-2 text-gray-300">
              A Netflix-inspired web application with movie browsing, user
              authentication, and responsive design.
            </p>
            <div className="mt-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com/Saurabh-acharyaa/Netflix_clone"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-purple-400 hover:text-cyan-300 transition-colors duration-300"
              >
                <FaGithub size={22} /> {/* ✅ GitHub icon */}
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Online Appointment System Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          whileHover={{
            scale: 1.03,
            transition: { duration: 0.2 }
          }}
          className="p-6 bg-gray-900 rounded-2xl shadow-lg border border-gray-700 hover:border-transparent hover:bg-gradient-to-br from-purple-600/20 to-cyan-600/20"
        >
          <div>
            <h3 className="text-xl font-bold text-white">Online Appointment System</h3>
            {/* ✅ Project Image */}
            <img
              src="online.jpg"
              alt="Online Appointment System"
              className="mt-3 rounded-lg shadow-md"
            />
            <p className="mt-2 text-gray-300">
              A web-based appointment booking system with admin panel, user
              management, and scheduling features.
            </p>
            <div className="mt-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com/Saurabh-acharyaa/online_appointment"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-purple-400 hover:text-cyan-300 transition-colors duration-300"
              >
                <FaGithub size={22} /> {/* ✅ GitHub icon */}
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
