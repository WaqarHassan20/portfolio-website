import Hero from "./components/Hero";
import About from "./components/About";
import Domains from "./components/Domains";
import TechStack from "./components/TechStack";
import Experience from "./components/Experience";
import Collaborate from "./components/Collaborate";
import Github from "./components/Github";
import Projects from "./components/Projects";
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
        <Github />
        <Projects />
        <Collaborate />
        <Footer />
      </div>
    </main>
  );
}



// "use client";
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { Home } from "lucide-react";

// const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// export default function NotFound() {
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) return null;

//   return (
//     <div className="relative min-h-screen bg-[#050505] flex items-center justify-center px-4 sm:px-8 overflow-hidden">
//       {/* Ambient glow */}
//       <div
//         className="absolute inset-0 pointer-events-none"
//         style={{
//           background: [
//             "radial-gradient(ellipse 75% 50% at 50% 50%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 40%, transparent 68%)",
//             "radial-gradient(ellipse 55% 40% at 30% 40%, rgba(200,214,224,0.055) 0%, transparent 55%)",
//             "radial-gradient(ellipse 50% 45% at 72% 65%, rgba(180,200,220,0.045) 0%, transparent 55%)",
//           ].join(", "),
//         }}
//       />

//       <div className="relative z-10 max-w-2xl mx-auto w-full text-center">
//         {/* Large 404 */}
//         <motion.div
//           initial={{ opacity: 0, y: 40, scale: 0.9 }}
//           animate={{ opacity: 1, y: 0, scale: 1 }}
//           transition={{ duration: 0.8, ease: EASE }}
//           className="mb-8"
//         >
//           <div className="relative inline-block">
//             <div
//               className="absolute inset-0 rounded-full blur-3xl opacity-30"
//               style={{
//                 background:
//                   "radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)",
//               }}
//             />
//             <h1 className="relative font-mono font-black text-[clamp(5rem,20vw,12rem)] leading-none text-white/85 tracking-tighter">
//               404
//             </h1>
//           </div>
//         </motion.div>

//         {/* Error message */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
//           className="mb-8"
//         >
//           <h2 className="font-mono font-bold text-2xl sm:text-3xl text-white mb-3 tracking-tight">
//             Page Not Found
//           </h2>
//           <p className="font-light leading-relaxed text-white/65 text-base sm:text-lg max-w-sm mx-auto">
//             The page you&apos;re looking for doesn&apos;t exist. But don&apos;t worry, you can navigate back to home.
//           </p>
//         </motion.div>

//         {/* Action buttons */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
//           className="flex flex-col sm:flex-row gap-3 justify-center items-center"
//         >
//           <Link
//             href="/"
//             className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full border border-white/20 bg-white/5 text-white/85 font-jetbrains text-sm uppercase tracking-[0.16em] transition-all duration-300 hover:bg-white hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40 group"
//           >
//             <Home size={16} />
//             Back to Home
//           </Link>
//         </motion.div>

//         {/* Decorative elements */}
//         <motion.div
//           className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full pointer-events-none opacity-10"
//           style={{
//             background:
//               "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
//           }}
//           animate={{
//             y: [0, 20, 0],
//           }}
//           transition={{
//             duration: 6,
//             repeat: Infinity,
//             ease: "easeInOut",
//           }}
//         />
//         <motion.div
//           className="absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none opacity-10"
//           style={{
//             background:
//               "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
//           }}
//           animate={{
//             y: [0, -20, 0],
//           }}
//           transition={{
//             duration: 8,
//             repeat: Infinity,
//             ease: "easeInOut",
//           }}
//         />
//       </div>
//     </div>
//   );
// }
