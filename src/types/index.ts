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
