import type { FC, FormEvent } from "react";
import { useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const Contact: FC = () => {
  const [status, setStatus] = useState<"idle" | "success" | "error" | "loading">("idle");
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false // Reset when leaving view
  });

  const floatingAnimation = {
    y: [0, -5, 0],
    transition: {
      y: {
        duration: 4,
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
        duration: 5,
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/xpwlenek", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 px-6 py-20 text-white"
    >
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
        Contact Me
      </motion.h2>

      {/* Contact Form */}
      <motion.form
        initial="hidden"
        animate={controls}
        variants={cardVariants}
        whileInView={floatingAnimation}
        viewport={{ margin: "-100px" }}
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto p-6 bg-gray-800 rounded-2xl shadow-lg border border-gray-700 space-y-4"
      >
        <motion.div animate={inView ? glowAnimation : {}}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="w-full p-3 rounded-lg bg-gray-900/70 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="w-full p-3 rounded-lg bg-gray-900/70 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 mt-4"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows={5}
            required
            className="w-full p-3 rounded-lg bg-gray-900/70 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 mt-4"
          ></textarea>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-gradient-to-r from-purple-500 to-cyan-400 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50 mt-4"
          >
            {status === "loading" ? "Sending..." : "Send Message"}
          </motion.button>

          {/* Success / Error Messages */}
          {status === "success" && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-400 font-medium mt-3"
            >
              ✅ Message sent successfully!
            </motion.p>
          )}
          {status === "error" && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400 font-medium mt-3"
            >
              ❌ Something went wrong. Please try again.
            </motion.p>
          )}
        </motion.div>
      </motion.form>

      {/* Social Links */}
      <motion.div 
        initial="hidden"
        animate={controls}
        variants={cardVariants}
        transition={{ delay: 0.2 }}
        className="flex justify-center gap-6 mt-10"
      >
        <motion.a
          whileHover={{ 
            scale: 1.05,
            y: -3
          }}
          whileInView={floatingAnimation}
          viewport={{ margin: "-100px" }}
          href="https://github.com/your-github-username"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-800 border border-gray-700 shadow-md hover:shadow-purple-500/30 hover:border-transparent hover:bg-gradient-to-r from-purple-500 to-cyan-400 transition"
        >
          <FaGithub className="text-xl" />
          <span className="font-medium">GitHub</span>
        </motion.a>

        <motion.a
          whileHover={{ 
            scale: 1.05,
            y: -3
          }}
          whileInView={floatingAnimation}
          viewport={{ margin: "-100px" }}
          href="https://www.linkedin.com/in/saurabh-acharya-3344702b8/overlay/about-this-profile/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BNgbSn1S2RGCc6pntGPJTxw%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-800 border border-gray-700 shadow-md hover:shadow-cyan-500/30 hover:border-transparent hover:bg-gradient-to-r from-cyan-400 to-purple-500 transition"
        >
          <FaLinkedin className="text-xl" />
          <span className="font-medium">LinkedIn</span>
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Contact;