export interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  liveUrl?: string;
  repoUrl?: string;
}

export interface Skill {
  name: string;
  Icon: React.FC<{ className?: string }>;
}
