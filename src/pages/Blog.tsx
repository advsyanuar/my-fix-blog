import { useState, useEffect } from 'react';
import { SplitHeroPanel } from '../components/content/SplitHeroPanel';
import { ContentEntry } from '../components/content/ContentEntry';
import { getBlogPosts } from '../api/blogs';
import type { StrapiBlog } from '../types/strapi';

export function Blog() {
  const [posts, setPosts] = useState<StrapiBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getBlogPosts()
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Failed to load posts');
        setLoading(false);
      });
  }, []);

  return (
    <main className="max-md:min-h-screen max-md:flex-col max-md:overflow-y-auto md:h-[calc(100vh-48px)] flex w-full md:overflow-hidden">
      <SplitHeroPanel
        label="SYSTEM_LOGS"
        title="BLOGS"
        stats={[
          { label: 'TOTAL_POSTS', value: posts.length },
          { label: 'CATEGORIES', value: 6 },
          { label: 'DRAFTS', value: 5, valueColor: 'text-error' },
        ]}
        ctaText="NEW_ENTRY"
        footnote="ENCRYPTED DATA STREAM SECURED. ALL LOGS ARE SUBJECT TO ARCHIVAL PROTOCOL 9."
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
            {posts.map((post) => (
              <ContentEntry
                key={post.documentId}
                id={post.documentId}
                to={`/blogs/${post.documentId}`}
                title={post.title}
                date={post.publishedAt?.split('T')[0].replace(/-/g, '.')}
                description={post.description}
                tags={[post.category, post.language, ...(post.tags ?? [])]}
              />
            ))}
          </div>
        )}
        <div className="h-24" />
      </section>
    </main>
  );
}
