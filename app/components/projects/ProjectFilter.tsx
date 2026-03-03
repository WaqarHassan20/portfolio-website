"use client";
import { motion } from "framer-motion";
import { LayoutGrid, Bot } from "lucide-react";
import { SiEthereum, SiNodedotjs, SiReact, SiDocker } from "react-icons/si";
import type { ProjectCategory } from "@/app/data/projects";

interface FilterTab {
  id: ProjectCategory;
  label: string;
  icon: React.ElementType;
}

const FILTERS: FilterTab[] = [
  { id: "all",       label: "All Projects", icon: LayoutGrid  },
  { id: "fullstack", label: "Full Stack",   icon: SiNodedotjs },
  { id: "frontend",  label: "Frontend",     icon: SiReact     },
  { id: "web3",      label: "Web3",         icon: SiEthereum  },
  { id: "devops",    label: "DevOps",       icon: SiDocker    },
  { id: "ai",        label: "AI",           icon: Bot         },
];

interface ProjectFilterProps {
  active: ProjectCategory;
  onChange: (cat: ProjectCategory) => void;
  counts: Record<ProjectCategory, number>;
}

export default function ProjectFilter({ active, onChange, counts }: ProjectFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {FILTERS.map((tab) => {
        const Icon = tab.icon;
        const isActive = active === tab.id;
        return (
          <motion.button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.96 }}
            className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium
                        transition-colors duration-200 cursor-pointer ${
              isActive
                ? "text-white/90 border border-white/15 bg-white/[0.07]"
                : "text-white/40 border border-white/6 glass hover:text-white/70 hover:border-white/10"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="filter-pill"
                className="absolute inset-0 rounded-xl bg-white/4"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <Icon className="w-3.5 h-3.5 relative z-10 shrink-0" />
            <span className="relative z-10">{tab.label}</span>
            <span
              className={`relative z-10 text-[10px] font-mono px-1.5 py-0.5 rounded-md ${
                isActive ? "bg-white/10 text-white/55" : "bg-white/4 text-white/20"
              }`}
            >
              {counts[tab.id]}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
