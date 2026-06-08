import { useState } from 'react';

interface SpecItemProps {
  name: string;
  src: string;
  alt: string;
}

function SpecItem({ name, src, alt }: SpecItemProps) {
  const [error, setError] = useState(false);

  if (error) return null;

  return (
    <div className="flex items-center gap-3 group">
      <div className="w-7 h-7 flex items-center justify-center shrink-0">
        <img
          src={src}
          alt={alt}
          onError={() => setError(true)}
          className="w-full h-full object-contain grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-300"
        />
      </div>
      <span className="font-label-sm text-label-sm text-on-surface-variant group-hover:text-primary transition-colors uppercase tracking-wider">
        {name}
      </span>
    </div>
  );
}

function WaybarIcon() {
  return (
    <div className="w-7 h-7 flex items-center justify-center shrink-0 text-outline group-hover:text-primary transition-colors">
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="6" width="20" height="12" rx="1" />
        <rect x="5" y="9" width="3" height="6" fill="currentColor" stroke="none" />
        <rect x="10" y="9" width="3" height="6" fill="currentColor" stroke="none" opacity="0.7" />
        <rect x="15" y="9" width="4" height="6" fill="currentColor" stroke="none" opacity="0.4" />
      </svg>
    </div>
  );
}

export function SystemSpecs() {
  return (
    <div className="flex max-md:flex-col h-full w-full">
      <div className="flex-1 p-margin-sm border-b md:border-b-0 md:border-r border-secondary-container">
        <span className="font-label-sm text-label-sm text-outline uppercase tracking-widest block mb-6">
          POWERED_BY 
        </span>
        <div className="flex flex-col gap-4">
          <SpecItem
            name="ARCH LINUX"
            src="https://dl.svgcdn.com/svg/logos/archlinux.svg"
            alt="Arch Linux"
          />
          <div className="flex items-center gap-3 group">
            <WaybarIcon />
            <span className="font-label-sm text-label-sm text-on-surface-variant group-hover:text-primary transition-colors uppercase tracking-wider">
              WAYBAR
            </span>
          </div>
          <SpecItem
            name="HYPRLAND"
            src="https://raw.githubusercontent.com/hyprwm/Hyprland/main/assets/hyprland.png"
            alt="Hyprland"
          />
        </div>
      </div>

      <div className="flex-1 p-margin-sm">
        <span className="font-label-sm text-label-sm text-outline uppercase tracking-widest block mb-6">
          STACK_USED
        </span>
        <div className="flex flex-col gap-4">
          <SpecItem
            name="REACT 19"
            src="https://dl.svgcdn.com/svg/logos/react.svg"
            alt="React"
          />
          <SpecItem
            name="VITE"
            src="https://vite.dev/logo.svg"
            alt="Vite"
          />
          <SpecItem
            name="TYPESCRIPT"
            src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg"
            alt="TypeScript"
          />
          <SpecItem
            name="TAILWIND CSS"
            src="https://tailwindcss.com/_next/static/media/tailwindcss-mark.svg"
            alt="Tailwind CSS"
          />
          <SpecItem
            name="STRAPI 5"
            src="https://static.cdnlogo.com/logos/s/41/strapi.svg"
            alt="Strapi"
          />
        </div>
      </div>
    </div>
  );
}
