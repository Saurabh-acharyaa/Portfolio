import type { FC } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

const App: FC = () => {
  return (
    <div className="font-sans scroll-smooth">
      <Navbar />
      <Home />
      <Skills />
      <Projects />
      <Contact />

      {/* Footer */}
      <footer className="bg-gray-100 text-center py-4 text-sm text-gray-600">
        © {new Date().getFullYear()} Saurabh. All rights reserved.
      </footer>
    </div>
  );
};

export default App;
