"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Globe, Server, Cloud, Brain, ArrowRight } from "lucide-react";

const SERVICES = [
  {
    icon: Globe,
    title: "Full-Stack Development",
    desc: "End-to-end web applications built with React, Next.js, and Node.js. From MVP to production — clean code, great UX, and fast performance.",
    points: [
      "Next.js App Router & Server Components",
      "REST / GraphQL / tRPC APIs",
      "Authentication & Authorization",
      "Database design & optimization",
    ],
  },
  {
    icon: Server,
    title: "Backend Engineering",
    desc: "Scalable server-side systems with real-time capabilities, message queues, and microservices architecture built for high availability.",
    points: [
      "Node.js / Bun servers",
      "Apache Kafka & RabbitMQ queues",
      "WebSocket real-time features",
      "API design & OpenAPI documentation",
    ],
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    desc: "Infrastructure automation, containerization, and CI/CD pipelines for reliable, zero-downtime deployments at any scale.",
    points: [
      "Docker & Kubernetes orchestration",
      "AWS / DigitalOcean / Cloudflare",
      "GitHub Actions CI/CD pipelines",
      "Terraform infrastructure as code",
    ],
  },
  {
    icon: Brain,
    title: "AI Integration",
    desc: "Integrating large language models and intelligent workflows into your product using the LangChain ecosystem and modern AI APIs.",
    points: [
      "LangChain & LangGraph agentic workflows",
      "LLM API integration (OpenAI, etc.)",
      "RAG (Retrieval Augmented Generation)",
      "LangSmith tracing & observability",
    ],
  },
];

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" ref={ref} className="relative py-32 px-6 overflow-hidden">
      <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />
      <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-slate-400 text-sm font-mono mb-6">
            <span className="w-2 h-2 rounded-full bg-slate-400 animate-pulse" />
            Services
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-white mb-4">
            What I Offer
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            From idea to deployment — services I provide to individuals, startups,
            and companies building great software.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="glass rounded-2xl p-7 border border-white/[0.06] group hover:border-white/[0.12] transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center mb-5 group-hover:bg-white/[0.07] transition-all duration-300">
                <service.icon className="w-5 h-5 text-slate-400 group-hover:text-slate-200 transition-colors" />
              </div>

              {/* Title + desc */}
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-slate-100 transition-colors">
                {service.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-5">{service.desc}</p>

              {/* Points */}
              <ul className="space-y-2 mb-6">
                {service.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2 text-sm text-slate-500">
                    <span className="w-1 h-1 rounded-full bg-slate-600 flex-shrink-0 mt-2" />
                    {pt}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <motion.a
                href="#contact"
                onClick={scrollToContact}
                whileHover={{ x: 4 }}
                className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-white transition-colors font-medium group/link"
              >
                Get in touch
                <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
