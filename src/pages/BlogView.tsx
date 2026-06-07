import { useParams } from 'react-router-dom';
import { ContentViewer } from '../components/content/ContentViewer';
import { blogPosts } from '../data/blog-posts';
import type { StrapiProject } from '../types/strapi';

function blogEntryToViewerEntry(blog: typeof blogPosts[number]): StrapiProject {
  return {
    id: Number(blog.id.replace(/\D/g, '').slice(0, 4)),
    documentId: blog.id,
    title: blog.title,
    description: blog.description,
    category: blog.tags[0] ?? 'GENERAL',
    date_start: blog.date.replace(/\./g, '-'),
    date_end: null,
    is_ongoing: true,
    language: 'EN',
    content: blog.content,
    cover_image: null,
    tags: blog.tags,
    createdAt: blog.date.replace(/\./g, '-') + 'T00:00:00.000Z',
    updatedAt: blog.date.replace(/\./g, '-') + 'T00:00:00.000Z',
    publishedAt: blog.date.replace(/\./g, '-') + 'T00:00:00.000Z',
  };
}

export function BlogView() {
  const { id } = useParams<{ id: string }>();
  const blog = blogPosts.find((p) => p.id === id);

  if (!blog) {
    return (
      <main className="h-screen flex flex-col items-center justify-center bg-background gap-4">
        <span className="font-headline-md text-headline-md text-error uppercase">
          ERROR_NOT_FOUND
        </span>
        <p className="font-body-md text-body-md text-on-surface-variant">Blog entry not found</p>
      </main>
    );
  }

  return <ContentViewer entry={blogEntryToViewerEntry(blog)} />;
}
