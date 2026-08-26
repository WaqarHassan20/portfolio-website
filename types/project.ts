export type ProjectShowcaseItem = {
  number: string;
  name: string;
  category: string;
  description: string;
  tools: string;
  accent: string;
  image: string;
  images?: string[];
  live?: string;
  githubUrl?: string;
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
  githubUrl?: string;
  image?: string;
  images?: string[];
  thumbnailUrl?: string;
};

export type ProjectCardView = {
  key: string;
  number: string;
  name: string;
  category: string;
  description: string;
  tools: string;
  href: string;
  githubUrl?: string;
  thumbnail: string;
  images?: string[];
};