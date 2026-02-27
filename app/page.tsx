import ParticleField from "./components/ParticleField";
import AuroraBackground from "./components/AuroraBackground";
import Hero from "./components/Hero";
import TechStack from "./components/TechStack";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
    <main className="relative min-h-screen bg-[#060606]">
      {/* Layered backgrounds */}
      <AuroraBackground />
      <ParticleField />

      {/* Content */}
      <div className="relative z-10">
        <Hero />
        <TechStack />
        <Footer />
      </div>
    </main>
    </>
  );
}

