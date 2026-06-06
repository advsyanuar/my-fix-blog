export interface NavItem {
  label: string;
  path: string;
  icon?: string;
  description: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  tags: string[];
  body: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  status: "active" | "offline" | "critical";
  tags: string[];
}

export interface BlogEntry {
  id: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
}

export interface ProjectEntry {
  id: string;
  title: string;
  status: string;
  date: string;
  description: string;
  tags: string[];
}

export interface StatItem {
  label: string;
  value: string | number;
  valueColor?: string;
}
