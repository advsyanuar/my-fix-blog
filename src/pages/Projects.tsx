import { SplitHeroPanel } from '../components/content/SplitHeroPanel';
import { ContentEntry } from '../components/content/ContentEntry';
import { projects } from '../data/projects';

export function Projects() {
  return (
    <main className="h-[calc(100vh-48px)] flex w-full overflow-hidden">
      <SplitHeroPanel
        label="DEPLOYMENT_LOGS"
        title="PROJECTS"
        stats={[
          { label: 'TOTAL_PROJECTS', value: projects.length },
          { label: 'ACTIVE', value: projects.filter((p) => p.status === 'ACTIVE').length },
          { label: 'ARCHIVED', value: projects.filter((p) => p.status === 'COMPLETED').length, valueColor: 'text-on-surface-variant' },
        ]}
        footnote="ALL DEPLOYMENTS ARE LOGGED AND TIME-STAMPED PER PROTOCOL 12-B."
      />
      <section className="w-full md:w-[60%] bg-background overflow-y-auto custom-scrollbar flex flex-col">
        <div className="divide-y divide-secondary-container">
          {projects.map((project) => (
            <ContentEntry
              key={project.id}
              id={project.id}
              title={project.title}
              date={project.date}
              description={project.description}
              tags={[project.status, ...project.tags]}
            />
          ))}
        </div>
        <div className="h-24" />
      </section>
    </main>
  );
}
