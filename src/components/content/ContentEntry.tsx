import { Tag } from '../common/Tag';

interface ContentEntryProps {
  id: string;
  title: string;
  date?: string;
  description: string;
  tags: string[];
}

export function ContentEntry({ id, title, date, description, tags }: ContentEntryProps) {
  return (
    <article className="group p-margin-lg max-md:p-margin-md flex flex-col gap-margin-sm hover:bg-surface-container transition-all cursor-pointer relative overflow-hidden">
      <div className="absolute top-0 right-0 p-unit font-label-sm text-label-sm text-secondary-container opacity-50">
        {id}
      </div>
      <div className="flex justify-between items-start">
        <h2 className="font-headline-md text-headline-md max-md:text-xl text-primary group-hover:text-primary-container transition-colors uppercase">
          {title}
        </h2>
        {date && <span className="font-label-md text-label-md text-secondary">{date}</span>}
      </div>
      <p className="font-body-md text-body-md max-md:text-xs text-on-surface-variant max-w-2xl">
        {description}
      </p>
      <div className="flex gap-margin-sm mt-unit">
        {tags.map((tag) => (
          <Tag key={tag} label={tag} />
        ))}
      </div>
    </article>
  );
}
