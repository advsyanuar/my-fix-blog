interface TagProps {
  label: string;
}

export function Tag({ label }: TagProps) {
  return (
    <span className="px-2 py-0.5 border border-secondary text-secondary font-label-sm text-label-sm">
      {label}
    </span>
  );
}
