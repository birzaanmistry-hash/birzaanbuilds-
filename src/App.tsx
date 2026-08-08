import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Ventures from "./components/Ventures";
import Achievements from "./components/Achievements";
import Certifications from "./components/Certifications";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-bg">
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Ventures />
      <Achievements />
      <Certifications />
      <Footer />
    </div>
  );
}
