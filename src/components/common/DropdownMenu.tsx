import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import type { NavItem } from '../../types/content';

interface DropdownMenuProps {
  items: NavItem[];
}

export function DropdownMenu({ items }: DropdownMenuProps) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<string>('HOME');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative h-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 h-full flex items-center gap-2 text-primary hover:bg-secondary-container transition-all duration-75"
      >
        <span className="material-symbols-outlined text-[18px]">terminal</span>
        <span className="font-label-md">{selectedMenu}</span>
        <span
          className={`material-symbols-outlined text-[14px] transition-transform ${isOpen ? 'rotate-180' : ''}`}
        >
          expand_less
        </span>
      </button>
      <div
        className={`absolute bottom-full left-0 w-64 bg-surface-container-lowest border border-secondary-container z-50 ${isOpen ? 'block' : 'hidden'}`}
      >
        <div className="p-2 border-b border-secondary-container/30 bg-surface-container-low font-label-sm text-primary-container opacity-50">
          REGION_SELECT
        </div>
        {items.map((item) => (
          <button
            key={item.path}
            onClick={() => {
              setSelectedMenu(item.label);
              setIsOpen(false);
              navigate(item.path);
            }}
            className="block w-full text-left uppercase px-4 py-2 font-label-md text-on-surface-variant hover:bg-secondary-container hover:text-primary"
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
