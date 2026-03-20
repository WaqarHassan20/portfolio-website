import Hero from "./components/Hero";
import About from "./components/About";
import Domains from "./components/Domains";
import TechStack from "./components/TechStack";
import Experience from "./components/Experience";
import Collaborate from "./components/Collaborate";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#050505]">
      <div className="relative z-10">
        <Hero />
        <About />
        <Domains />
        <TechStack />
        <Experience />
        <Collaborate />
        <Footer />
      </div>
    </main>
  );
}

