import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { resolveStrapiMedia } from '../../api/client';
import type { StrapiProject, StrapiBlog } from '../../types/strapi';
import type { Components } from 'react-markdown';

type ViewerEntry = StrapiProject | StrapiBlog;

interface ContentViewerProps {
  entry: ViewerEntry;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const h = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');
  return `${y}.${m}.${day} // ${h}:${min}_PST`;
}

function estimateReadingTime(text: string): string {
  const words = text.split(/\s+/).length;
  const min = Math.max(1, Math.ceil(words / 200));
  return `${String(min).padStart(2, '0')}_MIN`;
}

export function ContentViewer({ entry }: ContentViewerProps) {
  const location = useLocation();
  const articleRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [sections, setSections] = useState<{ id: string; label: string; number: number }[]>([]);
  const [activeSection, setActiveSection] = useState('');
  const headingCounterRef = useRef(0);

  const markdownComponents: Components = {
    h2: ({ children, ...props }) => {
      const index = headingCounterRef.current++;
      const id = `section-${index}`;
      return (
        <h2 id={id} {...props}>
          {children}
        </h2>
      );
    },
  };

  useEffect(() => {
    if (!headingRef.current) return;
    headingCounterRef.current = 0;
    const h2s = headingRef.current.querySelectorAll('h2');
    const extracted = Array.from(h2s).map((h2, i) => {
      const id = `section-${i}`;
      h2.id = id;
      return { id, label: h2.textContent ?? '', number: i + 1 };
    });
    setSections(extracted);
  }, [entry.content]);

  useEffect(() => {
    if (sections.length === 0) return;
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean);
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setActiveSection(e.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px' },
    );

    els.forEach((el) => observer.observe(el!));
    return () => observer.disconnect();
  }, [sections]);

  useEffect(() => {
    if (!articleRef.current) return;
    articleRef.current.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  useEffect(() => {
    const bars = document.querySelectorAll('.waveform-bar');
    const id = setInterval(() => {
      bars.forEach((bar) => {
        const el = bar as HTMLElement;
        const h = Math.floor(Math.random() * 80) + 10;
        el.style.height = `${h}%`;
      });
    }, 300);
    return () => clearInterval(id);
  }, [entry.content]);

  return (
    <main className="flex-grow md:h-[calc(100vh-48px)] flex overflow-hidden w-full max-w-container-max mx-auto border-x border-secondary-container">
      <article
        ref={articleRef}
        className="flex-grow overflow-y-auto custom-scrollbar relative p-margin-md md:p-margin-lg bg-surface"
      >
        <div className="absolute top-0 left-0 w-full h-32 inner-glow pointer-events-none" />
        <div className="max-w-6xl">
          <div className="flex flex-wrap gap-4 mb-8 border-b border-secondary-container pb-4">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-outline uppercase">Entry_Date</span>
              <span className="font-label-md text-label-md text-primary">
                {formatDate('date_start' in entry && entry.date_start ? entry.date_start : entry.publishedAt)}
              </span>
            </div>
            {'publishedAt' in entry && entry.publishedAt && (
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-outline uppercase">Published</span>
                <span className="font-label-md text-label-md text-secondary">
                  {formatDate(entry.publishedAt)}
                </span>
              </div>
            )}
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-outline uppercase">Access_Level</span>
              <span className="font-label-md text-label-md text-primary">
                CL_04_ADMIN
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-outline uppercase">Reading_Cycle</span>
              <span className="font-label-md text-label-md text-primary">
                {estimateReadingTime(entry.content)}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-outline uppercase">Subject_ID</span>
              <span className="font-label-md text-label-md text-secondary">
                {entry.documentId ? `ARCH_${entry.documentId.slice(0, 3).toUpperCase()}` : 'ARCH_000'}
              </span>
            </div>
          </div>

          <h1 className="font-display-lg font-bold text-5xl md:text-display-lg text-primary uppercase mb-12 tracking-tighter leading-tight md:leading-none">
            {entry.title}
          </h1>

          {entry.cover_image && (
            <div className="mb-12 border border-secondary-container">
              <img
                src={resolveStrapiMedia(entry.cover_image.url)}
                alt={entry.cover_image.alternativeText ?? entry.title}
                className="grayscale brightness-75 hover:grayscale-0 transition-all duration-700 w-full aspect-video object-cover"
              />
              <div className="p-2 border-t border-secondary-container bg-surface-container-lowest flex justify-between items-center">
                <span className="font-label-sm text-label-sm text-outline uppercase">
                  {entry.cover_image.alternativeText ?? `FIG: ${entry.title.toUpperCase().replace(/\s+/g, '_')}`}
                </span>
              </div>
            </div>
          )}

          <div ref={headingRef} className="content-viewer prose prose-invert max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={markdownComponents}
            >
              {entry.content}
            </ReactMarkdown>
          </div>
        </div>
      </article>

      <aside className="hidden lg:flex flex-col w-64 border-l border-secondary-container bg-surface-container-lowest shrink-0">
        <div className="p-4 border-b border-secondary-container bg-surface-container">
          <span className="font-label-sm text-label-sm text-outline uppercase block mb-1">Table_of_contents</span>
        </div>
        <nav className="flex-grow flex flex-col pt-4" id="toc">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`toc-link group flex items-center px-4 py-3 border-l-2 transition-all duration-150 hover:bg-surface-variant ${
                activeSection === s.id
                  ? 'border-primary-container bg-surface-variant'
                  : 'border-transparent'
              }`}
            >
              <span
                className={`font-label-sm text-label-sm mr-3 ${
                  activeSection === s.id ? 'text-primary' : 'text-outline group-hover:text-primary'
                }`}
              >
                {String(s.number).padStart(2, '0')}
              </span>
              <span
                className={`font-label-md ${
                  activeSection === s.id
                    ? 'text-primary-container'
                    : 'text-on-surface-variant group-hover:text-primary-container'
                }`}
              >
                {s.label}
              </span>
            </a>
          ))}
        </nav>
        <div className="p-4 border-t border-secondary-container bg-surface-container-low">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-primary shadow-[0_0_4px_#00EEFF] animate-pulse" />
            <span className="font-label-sm text-label-sm text-primary uppercase">System_Active</span>
          </div>
          <p className="font-label-sm text-label-sm text-outline">PORT_8080: LISTENING...</p>
          <div className="mt-4 h-16 w-full bg-surface-container-lowest border border-secondary-container relative overflow-hidden">
            <div className="waveform absolute bottom-0 left-0 flex items-end gap-[1px] h-full p-1">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="waveform-bar bg-primary/40 w-1"
                  style={{ height: `${Math.random() * 80 + 10}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </aside>
    </main>
  );
}
