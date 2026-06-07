import { HeroSection } from '../components/home/HeroSection';
import { SidePanel } from '../components/home/SidePanel';

export function Home() {
  return (
    <main className="max-md:min-h-screen max-md:overflow-y-auto md:h-[calc(100vh-48px)] w-full grid grid-cols-12 md:grid-rows-6 gap-0 md:overflow-hidden border-b border-secondary-container">
      <HeroSection />
      <SidePanel />
    </main>
  );
}
