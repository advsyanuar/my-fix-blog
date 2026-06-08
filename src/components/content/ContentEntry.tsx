import { useNavigate } from 'react-router-dom';
import { Tag } from '../common/Tag';

interface ContentEntryProps {
  id?: string;
  title: string;
  date?: string;
  description: string;
  tags: string[];
  to?: string;
}

export function ContentEntry({  title, date, description, tags, to }: ContentEntryProps) {
  const navigate = useNavigate();

  return (
    <article
      onClick={() => to && navigate(to)}
      className="border-b border-b-on-primary-container group p-6 flex flex-col gap-2 hover:bg-surface-container transition-all cursor-pointer relative overflow-hidden">
      <div className="flex justify-between items-start">
        <h2 className="font-headline-lg text-xl text-primary group-hover:text-primary-container transition-colors uppercase">
          {title}
        </h2>
        {date && <span className="font-label-md text-label-md text-secondary">{date}</span>}
      </div>
      <p className="font-body-md text-sm max-md:text-xs text-on-surface-variant max-w-2xl">
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
