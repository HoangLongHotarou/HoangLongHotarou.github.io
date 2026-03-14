import type { ProfileData } from '../types';

/**
 * Static profile data — edit this object to personalise the portfolio.
 *
 * Fields:
 *  - name       Full display name shown in the header and hero section.
 *  - title      Job title shown beneath the name.
 *  - bio        Short paragraph shown in the hero and About Me section.
 *  - avatarSrc  URL to a profile image. Leave empty ("") to show initials instead.
 *  - categories Blade filter labels. First entry should always be "All".
 *  - skills     Array of skills. Each skill's `category` must match a `categories` entry.
 *
 * Example:
 *   avatarSrc: 'https://avatars.githubusercontent.com/u/12345678',
 *   skills: [{ name: 'TypeScript', category: 'DevOps' }],
 */
export const PROFILE: ProfileData = {
  name: 'Long Hoang',
  title: 'DevOps & Cloud Engineer',
  bio: 'Passionate about automating infrastructure, building resilient systems, and designing for scale.',
  avatarSrc: '', // set to image URL or leave empty for initials
  categories: ['All', 'DevOps', 'Cloud', 'System Design'],
  skills: [
    { name: 'Kubernetes', category: 'DevOps' },
    { name: 'Docker', category: 'DevOps' },
    { name: 'Terraform', category: 'DevOps' },
    { name: 'AWS', category: 'Cloud' },
    { name: 'Azure', category: 'Cloud' },
    { name: 'CI/CD Pipelines', category: 'DevOps' },
    { name: 'Helm', category: 'DevOps' },
    { name: 'Microservices', category: 'System Design' },
    { name: 'Event-Driven Architecture', category: 'System Design' },
    { name: 'Observability', category: 'DevOps' },
    { name: 'GitOps', category: 'DevOps' },
    { name: 'GCP', category: 'Cloud' },
  ],
};
