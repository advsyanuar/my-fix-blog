import { SplitHeroPanel } from '../components/content/SplitHeroPanel';
import { ContentEntry } from '../components/content/ContentEntry';
import { blogPosts } from '../data/blog-posts';

export function Blog() {
  return (
    <main className="h-[calc(100vh-48px)] flex w-full overflow-hidden">
      <SplitHeroPanel
        label="SYSTEM_LOGS"
        title="BLOGS"
        stats={[
          { label: 'TOTAL_POSTS', value: blogPosts.length },
          { label: 'CATEGORIES', value: 6 },
          { label: 'DRAFTS', value: 5, valueColor: 'text-error' },
        ]}
        ctaText="NEW_ENTRY"
        footnote="ENCRYPTED DATA STREAM SECURED. ALL LOGS ARE SUBJECT TO ARCHIVAL PROTOCOL 9."
      />
      <section className="w-full md:w-[60%] bg-background overflow-y-auto custom-scrollbar flex flex-col">
        <div className="divide-y divide-secondary-container">
          {blogPosts.map((post) => (
            <ContentEntry
              key={post.id}
              id={post.id}
              title={post.title}
              date={post.date}
              description={post.description}
              tags={post.tags}
            />
          ))}
        </div>
        <div className="h-24" />
      </section>
    </main>
  );
}
