import type { FC } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

const Home: FC = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-br from-gray-900 to-gray-800 px-6 pt-20"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"  // Added this wrapper for perfect centering
      >
        <img
          src="FinalPic.jpg"
          alt="Profile Photo"
          className="w-40 h-40 rounded-full shadow-lg mb-4 object-cover border-4 border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 mx-auto"  // Added mx-auto
        />
        <h2 className="text-4xl md:text-5xl font-bold text-purple-400 mb-2">Saurabh</h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-4 max-w-2xl text-gray-300 leading-relaxed text-lg"
      >
        <TypeAnimation
          sequence={[
            "Hi, I'm Saurabh",
            300,
            "Hi, I'm Saurabh — a web developer",
            300,
            "Hi, I'm Saurabh — a web developer passionate about creating clean, responsive applications.",
            300,
            "Hi, I'm Saurabh — a web developer passionate about creating clean, responsive, and user-friendly applications. I love building beautiful front-end experiences while constantly learning and exploring new technologies.",
            1000
          ]}
          wrapper="span"
          cursor={true}
          repeat={0}
          speed={70}
          deletionSpeed={90}
          style={{ 
            display: "inline-block",
            textAlign: "center",
            lineHeight: "1.6"
          }}
        />
      </motion.div>
    </section>
  );
};

export default Home;