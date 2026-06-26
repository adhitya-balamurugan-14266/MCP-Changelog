import clsx from 'clsx';
import type { ReleaseCategory } from '@/types';
import { BADGE_STYLES } from '@/data/constants';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/data/translations';

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

export default function CategoryTabs({ selected, onChange }: Props) {
  const active = selected.length === 1 ? selected[0] : null;
  const lang = useLang();

  return (
    <div className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-screen-xl px-6">
        <div className="flex items-center justify-center gap-0 overflow-x-auto">
          <button
            onClick={() => onChange([])}
            className={clsx(
              'shrink-0 border-b-2 px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap',
              active === null
                ? 'border-zinc-900 text-zinc-900 dark:border-zinc-100 dark:text-zinc-100'
                : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200',
            )}
          >
            {t(lang, 'all')}
          </button>
          {ALL_CATEGORIES.map((cat) => {
            const isActive = active === cat;
            const styles = BADGE_STYLES[cat];
            return (
              <button
                key={cat}
                onClick={() => onChange(isActive ? [] : [cat])}
                className={clsx(
                  'shrink-0 border-b-2 px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap',
                  isActive
                    ? `border-current ${styles.text}`
                    : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200',
                )}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
