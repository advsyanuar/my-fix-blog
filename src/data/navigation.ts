import type { NavItem } from '../types/content';

export const navSections: NavItem[] = [
  {
    label: 'HOME',
    path: '/',
    icon: "home",
    description: 'Home is where the haunt is.',
  },
  {
    label: 'PROJECTS',
    path: '/projects',
    icon: "deployed_code",
    description: 'Deployment logs of verified system architectures.',
  },
  {
    label: 'BLOGS',
    path: '/blogs',
    icon: "post",
    description: 'Intelligence feeds and system updates.',
  },
  {
    label: 'DEMOS',
    path: '/demos',
    icon: "breaking_news_alt_1",
    description: 'Interactive runtime environments.',
  },
  {
    label: 'ABOUT',
    path: '/about',
    icon: "article_person",
    description: 'Core architecture specifications.',
  },
];
