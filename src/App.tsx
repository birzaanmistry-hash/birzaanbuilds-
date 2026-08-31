import { useCallback, useState } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Ventures from "./components/Ventures";
import Achievements from "./components/Achievements";
import Certifications from "./components/Certifications";
import Footer from "./components/Footer";
import BootSequence from "./components/BootSequence";
import ScrollProgress from "./components/ScrollProgress";
import Spotlight from "./components/Spotlight";
import Marquee from "./components/Marquee";

export default function App() {
  const [ready, setReady] = useState(false);
  const handleBooted = useCallback(() => setReady(true), []);

  return (
    <div className="grain min-h-screen bg-bg">
      <BootSequence onDone={handleBooted} />
      <ScrollProgress />
      <Spotlight />

      <Nav />
      <Hero ready={ready} />
      <Marquee />
      <Skills />
      <Projects />
      <Ventures />
      <Achievements />
      <Certifications />
      <Footer />
    </div>
  );
}
