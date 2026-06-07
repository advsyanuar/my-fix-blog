import { useState, useEffect } from 'react';
import { SplitHeroPanel } from '../components/content/SplitHeroPanel';
import { ContentEntry } from '../components/content/ContentEntry';
import { getProjects } from '../api/projects';
import type { StrapiProject } from '../types/strapi';

function formatDate(dateStr: string): string {
  const [y, m, d] = dateStr.split('-');
  return `${y}.${m}.${d}`;
}

function formatDateRange(project: StrapiProject): string {
  const start = formatDate(project.date_start);
  if (project.is_ongoing) return `${start} → present`;
  if (project.date_end) return `${start} → ${formatDate(project.date_end)}`;
  return start;
}

export function Projects() {
  const [strapiProjects, setStrapiProjects] = useState<StrapiProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProjects()
      .then((res) => {
        setStrapiProjects(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Failed to load projects');
        setLoading(false);
      });
  }, []);

  return (
    <main className="max-md:min-h-screen max-md:flex-col max-md:overflow-y-auto md:h-[calc(100vh-48px)] flex w-full md:overflow-hidden">
      <SplitHeroPanel
        label="DEPLOYMENT_LOGS"
        title="PROJECTS"
        stats={[
          { label: 'TOTAL_PROJECTS', value: strapiProjects.length },
          { label: 'LANGUAGES', value: [...new Set(strapiProjects.map((p) => p.language))].length },
          { label: 'ONGOING', value: strapiProjects.filter((p) => p.is_ongoing).length, valueColor: 'text-on-surface-variant' },
        ]}
        footnote="ALL DEPLOYMENTS ARE LOGGED AND TIME-STAMPED PER PROTOCOL 12-B."
      />
      <section className="w-full md:w-[60%] bg-background overflow-y-auto custom-scrollbar flex flex-col">
        {loading && (
          <div className="flex items-center justify-center h-48 text-on-surface-variant">
            LOADING...
          </div>
        )}
        {error && (
          <div className="flex items-center justify-center h-48 text-error">
            {error}
          </div>
        )}
        {!loading && !error && (
          <div className="divide-y divide-secondary-container">
            {strapiProjects.map((project) => (
              <ContentEntry
                key={project.documentId}
                id={project.documentId}
                to={`/projects/${project.documentId}`}
                title={project.title}
                date={formatDateRange(project)}
                description={project.description}
                tags={[project.category, project.language, ...(project.tags ?? [])]}
              />
            ))}
          </div>
        )}
        <div className="h-24" />
      </section>
    </main>
  );
}
