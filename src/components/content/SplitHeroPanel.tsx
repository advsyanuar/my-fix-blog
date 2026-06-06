import type { StatItem } from '../../types/content';

interface SplitHeroPanelProps {
  label: string;
  title: string;
  stats: StatItem[];
  ctaText?: string;
  footnote?: string;
}

export function SplitHeroPanel({
  label,
  title,
  stats,
}: SplitHeroPanelProps) {
  return (
    <section className="w-full md:w-[40%] border-r border-secondary-container bg-surface-container-lowest flex flex-col justify-center p-margin-lg relative blueprint-bg overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none from-primary-container/5 to-transparent" />
      <div className="relative z-10">
        <div className='flex w-full gap-2'>
          <span className="font-label-md display-stray text-label-md text-primary block tracking-widest">
            {label}
          </span>
          <span className="font-label-md display-baudot text-2xl text-primary block tracking-widest">
            {title}
          </span>
        </div>
        <h1 className="font-display-lg display-bitrate text-[120px] leading-18 text-primary-container tracking-wider uppercase mb-4">
          {title}
        </h1>
        <div className="grid grid-cols-1 gap-gutter bg-secondary-container border border-secondary-container">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-background p-margin-md flex justify-between items-center"
            >
              <span className="font-label-md text-label-md text-on-surface-variant">
                {stat.label}
              </span>
              <span
                className={`font-headline-md text-headline-md ${stat.valueColor ?? 'text-primary'}`}
              >
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
