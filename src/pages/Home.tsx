import { HeroSection } from '../components/home/HeroSection';
import { SidePanel } from '../components/home/SidePanel';
import { SystemSpecs } from '../components/home/SystemSpecs';

export function Home() {
  return (
    <main className="max-md:min-h-screen max-md:overflow-y-auto md:h-[calc(100vh-48px)] w-full grid grid-cols-12 gap-0 md:overflow-hidden border-b border-secondary-container">
      <div className="col-span-12 md:col-span-9 flex flex-col md:overflow-hidden">
        <div className="max-md:h-auto h-[70%]">
          <HeroSection />
        </div>
        <div className="max-md:h-auto h-[30%] bg-surface-container-low border-t border-secondary-container">
          <SystemSpecs />
        </div>
      </div>
      <SidePanel />
    </main>
  );
}
