import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBlogPost } from '../api/blogs';
import { ContentViewer } from '../components/content/ContentViewer';
import type { StrapiBlog } from '../types/strapi';

export function BlogView() {
  const { documentId } = useParams<{ documentId: string }>();
  const [entry, setEntry] = useState<StrapiBlog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!documentId) {
      setError('No post ID specified');
      setLoading(false);
      return;
    }
    getBlogPost(documentId)
      .then((res) => {
        setEntry(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Failed to load post');
        setLoading(false);
      });
  }, [documentId]);

  if (loading) {
    return (
      <main className="h-screen flex items-center justify-center bg-background">
        <span className="font-label-md text-label-md text-on-surface-variant animate-pulse">
          LOADING_ARCHIVE...
        </span>
      </main>
    );
  }

  if (error || !entry) {
    return (
      <main className="h-screen flex flex-col items-center justify-center bg-background gap-4">
        <span className="font-headline-md text-headline-md text-error uppercase">
          ERROR_{error ? 'LOAD_FAILED' : 'NOT_FOUND'}
        </span>
        <p className="font-body-md text-body-md text-on-surface-variant">{error ?? 'Entry not found'}</p>
      </main>
    );
  }

  return <ContentViewer entry={entry} />;
}
