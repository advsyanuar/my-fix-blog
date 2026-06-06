import type { ProjectEntry } from '../types/content';

export const projects: ProjectEntry[] = [
  {
    id: '#PRJ_0042_A',
    title: 'Sector 7 Automation Overhaul',
    status: 'ACTIVE',
    date: '2024.03.10',
    description:
      'Complete rewiring of manufacturing line control systems. Implementing redundant neural relays and failover protocols for zero-downtime operations.',
    tags: ['INFRASTRUCTURE', 'AUTOMATION'],
  },
  {
    id: '#PRJ_0041_B',
    title: 'Quantum Key Distribution Mesh',
    status: 'ACTIVE',
    date: '2024.02.28',
    description:
      'Deploying a city-scale QKD network for unhackable communication between financial district nodes. Phase 3 encryption handshake testing underway.',
    tags: ['SECURITY', 'NETWORK'],
  },
  {
    id: '#PRJ_0039_F',
    title: 'Bio-Synthetic Cooling Towers',
    status: 'COMPLETED',
    date: '2024.01.15',
    description:
      'Design and installation of algae-based passive cooling systems for high-density server farms. 40% reduction in energy overhead achieved.',
    tags: ['INFRASTRUCTURE', 'SUSTAINABILITY'],
  },
  {
    id: '#PRJ_0037_X',
    title: 'Subterranean Transit Control',
    status: 'ON_HOLD',
    date: '2023.12.01',
    description:
      'Centralized traffic management system for the underground logistics network. Pending regulatory approval for autonomous cargo pod integration.',
    tags: ['LOGISTICS', 'AUTOMATION'],
  },
  {
    id: '#PRJ_0036_C',
    title: 'Holo-Interface Workstation v3',
    status: 'COMPLETED',
    date: '2023.11.20',
    description:
      'Third generation holographic control interface for hazardous environment operators. Reduced cognitive load by 35% in field trials.',
    tags: ['UI', 'HARDWARE'],
  },
];
