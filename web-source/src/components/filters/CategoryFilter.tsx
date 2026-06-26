import clsx from 'clsx';
import type { ReleaseCategory } from '@/types';
import { BADGE_STYLES } from '@/data/constants';

const ALL_CATEGORIES: ReleaseCategory[] = [
  'New Service',
  'New Tool',
  'Enhancement',
  'Tool Change',
  'Tool Removed',
  'Service Removed',
];

interface Props {
  selected: ReleaseCategory[];
  onChange: (cats: ReleaseCategory[]) => void;
}

export default function CategoryFilter({ selected, onChange }: Props) {
  function toggle(cat: ReleaseCategory) {
    if (selected.includes(cat)) {
      onChange(selected.filter((c) => c !== cat));
    } else {
      onChange([...selected, cat]);
    }
  }

  return (
    <div>
      <div className="mb-2.5 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
          Category
        </p>
        {selected.length > 0 && (
          <button
            onClick={() => onChange([])}
            className="text-[10px] font-medium text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
          >
            Clear
          </button>
        )}
      </div>
      <div className="flex flex-col gap-1.5">
        {ALL_CATEGORIES.map((cat) => {
          const styles = BADGE_STYLES[cat];
          const checked = selected.includes(cat);
          return (
            <button
              key={cat}
              onClick={() => toggle(cat)}
              className={clsx(
                'flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all',
                checked
                  ? `${styles.bg} ${styles.text} ring-1 ring-current/30`
                  : 'bg-zinc-50 text-zinc-500 hover:bg-zinc-100 dark:bg-zinc-800/50 dark:text-zinc-500 dark:hover:bg-zinc-800',
              )}
            >
              <span className={clsx('h-1.5 w-1.5 rounded-full', styles.dot)} />
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}
