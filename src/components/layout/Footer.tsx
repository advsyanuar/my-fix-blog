import { navSections } from '../../data/navigation';
import { DropdownMenu } from '../common/DropdownMenu';
import { usePageNavigation } from '../../hooks/usePageNavigation';

export function Footer() {
  const { goUp, goDown, goTop, goEnd, isFirst, isLast } = usePageNavigation();

  return (
    <footer className="fixed bottom-0 left-0 w-full z-50 flex justify-between items-stretch h-12 bg-surface-container-lowest border-t border-secondary-container">
      <DropdownMenu items={navSections} />

      <div className="hidden lg:flex items-center h-full">
        <div className="flex items-center">
          <button
            onClick={goUp}
            disabled={isFirst}
            className={`material-symbols-outlined border p-3 border-secondary-container text-primary transition-colors text-[18px] ${isFirst ? 'opacity-30 cursor-not-allowed' : 'hover:text-primary-container'}`}
          >
            keyboard_arrow_up
          </button>
          <button
            onClick={goDown}
            disabled={isLast}
            className={`material-symbols-outlined p-3 border border-secondary-container text-primary transition-colors text-[18px] ${isLast ? 'opacity-30 cursor-not-allowed' : 'hover:text-primary-container'}`}
          >
            keyboard_arrow_down
          </button>
        </div>
        <div className="relative flex items-center">
          <span className="absolute left-2 material-symbols-outlined text-lg text-primary opacity-50">
            search
          </span>
          <input
            type="text"
            placeholder="SEARCH..."
            className="bg-surface-container-low border border-secondary-container text-base font-label-md text-primary px-8 py-3 w-72 focus:outline-none focus:border-primary-container transition-colors placeholder:opacity-30"
          />
        </div>
        <div className="flex items-center font-label-sm text-on-surface-variant">
          <button
            onClick={goTop}
            disabled={isFirst}
            className={`p-3 border border-secondary-container transition-colors flex items-center gap-1 uppercase ${isFirst ? 'opacity-30 cursor-not-allowed text-on-surface-variant' : 'hover:text-primary'}`}
          >
            <span className="material-symbols-outlined text-[14px]">vertical_align_top</span>
            Top
          </button>
          <button
            onClick={goEnd}
            disabled={isLast}
            className={`p-3 border border-secondary-container transition-colors flex items-center gap-1 uppercase ${isLast ? 'opacity-30 cursor-not-allowed text-on-surface-variant' : 'hover:text-primary'}`}
          >
            <span className="material-symbols-outlined text-[14px]">vertical_align_bottom</span>
            End
          </button>
        </div>
      </div>
    </footer>
  );
}
