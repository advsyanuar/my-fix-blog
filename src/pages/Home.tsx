import { HeroSection } from '../components/home/HeroSection';
import { SidePanel } from '../components/home/SidePanel';

export function Home() {
  return (
    <main className="h-[calc(100vh-48px)] w-full grid grid-cols-12 grid-rows-6 gap-0 overflow-hidden border-b border-secondary-container">
      <HeroSection />
      <SidePanel />
    </main>
  );
}
