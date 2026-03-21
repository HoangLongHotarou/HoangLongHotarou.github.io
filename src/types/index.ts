export interface Skill {
  name: string;
  category: string;
  icon?: string;
}

export interface ProfileData {
  name: string;
  title: string;
  bio: string;
  avatarSrc: string;
  skills: Skill[];
  categories: string[];
}

export interface Update {
  slug: string;
  title: string;
  date: string;
  summary: string;
  content: string;
}

export interface SearchResult {
  type: 'page' | 'category';
  label: string;
  sublabel: string;
  to: string;
}
