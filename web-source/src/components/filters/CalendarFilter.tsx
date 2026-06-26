import { useState } from 'react';
import clsx from 'clsx';
import { ChevronRight } from 'lucide-react';
import { CALENDAR_MONTHS } from '@/data/constants';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/data/translations';
import type { TranslationKey } from '@/data/translations';

interface Props {
  selected: string | null; // "YYYY-MM" or null
  onChange: (month: string | null) => void;
}

// Descending order: most recent year first
const YEAR_GROUPS = [
  { year: 2026, months: CALENDAR_MONTHS.filter((m) => m.year === 2026) },
  { year: 2025, months: CALENDAR_MONTHS.filter((m) => m.year === 2025) },
];

export default function CalendarFilter({ selected, onChange }: Props) {
  const lang = useLang();
  const [expanded, setExpanded] = useState<Set<number>>(new Set([2026]));

  function toggleYear(year: number) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(year)) next.delete(year);
      else next.add(year);
      return next;
    });
  }

  return (
    <div>
      <p className="mb-2.5 text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
        {t(lang, 'month')}
      </p>
      {YEAR_GROUPS.map(({ year, months }) => {
        const isOpen = expanded.has(year);
        return (
          <div key={year} className="mb-1.5">
            <button
              onClick={() => toggleYear(year)}
              className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-xs font-semibold text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
            >
              {year}
              <ChevronRight
                size={13}
                strokeWidth={2.5}
                className={clsx('transition-transform duration-200', isOpen && 'rotate-90')}
              />
            </button>
            {isOpen && (
              <div className="mt-1.5 grid grid-cols-3 gap-1.5">
                {months.map(({ month, label }) => {
                  const key = `${year}-${String(month).padStart(2, '0')}`;
                  const isSelected = selected === key;
                  return (
                    <button
                      key={key}
                      onClick={() => onChange(isSelected ? null : key)}
                      className={clsx(
                        'rounded-lg py-1.5 text-xs font-medium transition-colors',
                        isSelected
                          ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                          : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700',
                      )}
                    >
                      {t(lang, label as TranslationKey)}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
