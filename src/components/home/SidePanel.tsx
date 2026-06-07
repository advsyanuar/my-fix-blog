import { useNavigate } from 'react-router-dom';
import { useMouseGlow } from '../../hooks/useMouseGlow';
import { navSections } from '../../data/navigation';

export function SidePanel() {
  const navigate = useNavigate();
  const glowRef = useMouseGlow<HTMLDivElement>();

  return (
    <div
      ref={glowRef}
      className="col-span-12 md:col-span-4 md:border-l border-secondary-container bg-surface-container flex flex-col cursor-pointer overflow-hidden md:row-span-6 h-full"
    >
      <div className="flex flex-col h-full">
        {navSections.map((section) => (
          <button
            key={section.path}
            onClick={() => navigate(section.path)}
            className="h-1/4 p-margin-md border-b border-secondary-container/30 flex flex-col justify-center hover:bg-secondary-container transition-colors group text-left"
          >
            <span className="material-symbols-outlined text-[18px]">{section.icon}</span>
            <h2 className="font-headline-md text-2xl md:text-3xl text-primary uppercase">
              {section.label}
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant/60 mt-unit">
              {section.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
