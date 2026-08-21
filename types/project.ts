export type ProjectShowcaseItem = {
  number: string;
  name: string;
  category: string;
  description: string;
  tools: string;
  accent: string;
  image: string;
  live: string;
};

export type ProjectCard = {
  id?: string | number;
  number?: string;
  name?: string;
  category?: string;
  description?: string;
  details?: string;
  tools?: string;
  techStack?: string[];
  live?: string;
  liveUrl?: string;
  image?: string;
  thumbnailUrl?: string;
  caseStudy?: {
    overview: string;
    practice: string;
    skills: string[];
  };
};

export type ProjectCardView = {
  key: string;
  number: string;
  name: string;
  category: string;
  description: string;
  tools: string;
  href: string;
  thumbnail: string;
  caseStudy?: {
    overview: string;
    practice: string;
    skills: string[];
  };
};