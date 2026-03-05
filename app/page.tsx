import Hero from "./components/Hero";
import About from "./components/About";
import Domains from "./components/Domains";
import TechStack from "./components/TechStack";
import Experience from "./components/Experience";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#060606]">
      {/* Content */}
      <div className="relative z-10">
        <Hero />
        <About />
        <Domains />
        <TechStack />
        <Experience />
        <Footer />
      </div>
    </main>
  );
}

