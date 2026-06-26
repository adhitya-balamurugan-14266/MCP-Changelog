import { ChevronRight } from 'lucide-react';
import type { Release } from '@/types';
import Badge from './Badge';

interface Props {
  release: Release;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function ReleaseCard({ release }: Props) {
  return (
    <article className="group rounded-2xl border border-zinc-200 bg-white p-5 transition-all duration-200 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <Badge category={release.category} />
        <span className="text-xs text-zinc-400 dark:text-zinc-500">{formatDate(release.date)}</span>
      </div>

      <h3 className="mb-2 text-sm font-semibold leading-snug text-zinc-900 dark:text-zinc-100">
        {release.title}
      </h3>

      <p className="mb-4 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
        {release.description}
      </p>

      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Services */}
        <div className="flex flex-wrap gap-1.5">
          {release.services.map((s) => (
            <span
              key={s}
              className="rounded-md border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[11px] font-medium text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400"
            >
              {s}
            </span>
          ))}
        </div>

        {/* DCs */}
        <div className="flex flex-wrap gap-1">
          {release.dataCenters.map((dc) => (
            <span
              key={dc}
              className="rounded bg-zinc-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-zinc-500 dark:bg-zinc-800 dark:text-zinc-500"
            >
              {dc}
            </span>
          ))}
        </div>
      </div>

      <button className="mt-3 flex items-center gap-0.5 text-xs font-medium text-zinc-400 transition-colors hover:text-zinc-700 dark:hover:text-zinc-200">
        Read more <ChevronRight size={12} strokeWidth={2.5} />
      </button>
    </article>
  );
}
