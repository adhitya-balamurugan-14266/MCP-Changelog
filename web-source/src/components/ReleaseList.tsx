import type { Release } from '@/types';
import Badge from './Badge';
import { SERVICE_LOGOS } from '@/data/constants';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/data/translations';

interface Props {
  releases: Release[];
}

function groupByYearMonth(releases: Release[]): Map<string, Release[]> {
  const map = new Map<string, Release[]>();
  for (const r of releases) {
    const key = r.date.slice(0, 7); // "YYYY-MM"
    const list = map.get(key) ?? [];
    list.push(r);
    map.set(key, list);
  }
  return map;
}

function formatSectionLabel(key: string): string {
  const [year, month] = key.split('-');
  const monthName = new Date(Number(year), Number(month) - 1, 1).toLocaleDateString('en-US', {
    month: 'long',
  });
  return `${year} - ${monthName}`;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export default function ReleaseList({ releases }: Props) {
  const lang = useLang();
  if (releases.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-base font-medium text-zinc-400 dark:text-zinc-500">{t(lang, 'noReleases')}</p>
      </div>
    );
  }

  const grouped = groupByYearMonth(releases);
  const sortedKeys = Array.from(grouped.keys()).sort((a, b) => b.localeCompare(a));

  return (
    <div>
      {sortedKeys.map((key) => {
        const group = grouped.get(key)!;
        const sectionLabel = formatSectionLabel(key);

        return (
          <section key={key} id={`month-${key}`} className="border-b border-zinc-200 py-8 last:border-b-0 dark:border-zinc-800">
            <h2 className="mb-6 text-xl font-bold text-zinc-900 dark:text-zinc-100">
              {sectionLabel}
            </h2>
            <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {group
                .sort((a, b) => b.date.localeCompare(a.date))
                .map((r) => {
                  return (
                    <div key={r.id} className="py-5 first:pt-0">
                      <div className="mb-2 flex items-center gap-2.5">
                        <Badge category={r.category} size="sm" />
                        <span className="text-xs text-zinc-400 dark:text-zinc-500">
                          {formatDate(r.date)}
                        </span>
                      </div>
                      <h3 className="mb-1.5 text-base font-semibold text-zinc-900 dark:text-zinc-100">
                        {r.services.filter((s) => SERVICE_LOGOS[s]).map((s) => (
                          <img
                            key={s}
                            src={SERVICE_LOGOS[s]}
                            alt=""
                            aria-hidden="true"
                            className="mr-1.5 inline h-5 w-5 object-contain align-middle"
                          />
                        ))}
                        {r.title}
                      </h3>
                      <p className="mb-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                        {r.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {r.services.map((s) => {
                          const logo = SERVICE_LOGOS[s];
                          return (
                            <span
                              key={s}
                              className="inline-flex items-center gap-1 rounded-md bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                            >
                              {logo && (
                                <img src={logo} alt="" aria-hidden="true" className="h-3.5 w-3.5 object-contain" />
                              )}
                              {s}
                            </span>
                          );
                        })}
                        {r.dataCenters.map((dc) => (
                          <span
                            key={dc}
                            className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                          >
                            {dc}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
