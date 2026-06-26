import { useState } from 'react';
import { ChevronRight, ExternalLink } from 'lucide-react';
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
  const [toolsOpen, setToolsOpen] = useState(false);
  const hasNew = (release.newTools?.length ?? 0) > 0;
  const hasRemoved = (release.removedTools?.length ?? 0) > 0;
  const hasBoth = hasNew && hasRemoved;
  const hasTools = hasNew || hasRemoved;
  const maxRows = hasBoth
    ? Math.max(release.newTools!.length, release.removedTools!.length)
    : 0;

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

      {/* Tools Accordion */}
      {hasTools && (
        <div className="mb-4">
          <button
            onClick={() => setToolsOpen((o) => !o)}
            className="flex select-none items-center gap-1.5 text-xs font-medium text-zinc-500 transition-colors hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
          >
            <ChevronRight
              size={13}
              strokeWidth={2.5}
              className={`transition-transform duration-200 ${toolsOpen ? 'rotate-90' : ''}`}
            />
            Show Tools
          </button>

          {toolsOpen && (
            <div className="mt-3 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700">
              {hasBoth ? (
                /* Two-column table when both added + removed */
                <table className="w-full border-collapse text-xs">
                  <thead>
                    <tr className="bg-zinc-50 dark:bg-zinc-800/60">
                      <th className="border-b border-r border-zinc-200 px-3 py-2 text-left font-semibold text-emerald-600 dark:border-zinc-700 dark:text-emerald-400">
                        Added ({release.newTools!.length})
                      </th>
                      <th className="border-b border-zinc-200 px-3 py-2 text-left font-semibold text-rose-600 dark:border-zinc-700 dark:text-rose-400">
                        Removed ({release.removedTools!.length})
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: maxRows }).map((_, i) => (
                      <tr key={i} className="border-b border-zinc-100 last:border-0 dark:border-zinc-800">
                        <td className="border-r border-zinc-100 px-3 py-1.5 align-top dark:border-zinc-800">
                          {release.newTools![i] != null && (
                            <code className="rounded border border-emerald-200 bg-emerald-50 px-1.5 py-0.5 font-mono text-[11px] text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                              {release.newTools![i]}
                            </code>
                          )}
                        </td>
                        <td className="px-3 py-1.5 align-top">
                          {release.removedTools![i] != null && (
                            <code className="rounded border border-rose-200 bg-rose-50 px-1.5 py-0.5 font-mono text-[11px] text-rose-700 dark:border-rose-800 dark:bg-rose-950 dark:text-rose-300">
                              {release.removedTools![i]}
                            </code>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : hasNew ? (
                /* Single-column table for only added tools */
                <table className="w-full border-collapse text-xs">
                  <thead>
                    <tr className="bg-zinc-50 dark:bg-zinc-800/60">
                      <th className="border-b border-zinc-200 px-3 py-2 text-left font-semibold text-emerald-600 dark:border-zinc-700 dark:text-emerald-400">
                        Added Tools ({release.newTools!.length})
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {release.newTools!.map((tool, i) => (
                      <tr key={i} className="border-b border-zinc-100 last:border-0 dark:border-zinc-800">
                        <td className="px-3 py-1.5">
                          <code className="rounded border border-emerald-200 bg-emerald-50 px-1.5 py-0.5 font-mono text-[11px] text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                            {tool}
                          </code>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                /* Single-column table for only removed tools */
                <table className="w-full border-collapse text-xs">
                  <thead>
                    <tr className="bg-zinc-50 dark:bg-zinc-800/60">
                      <th className="border-b border-zinc-200 px-3 py-2 text-left font-semibold text-rose-600 dark:border-zinc-700 dark:text-rose-400">
                        Removed Tools ({release.removedTools!.length})
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {release.removedTools!.map((tool, i) => (
                      <tr key={i} className="border-b border-zinc-100 last:border-0 dark:border-zinc-800">
                        <td className="px-3 py-1.5">
                          <code className="rounded border border-rose-200 bg-rose-50 px-1.5 py-0.5 font-mono text-[11px] text-rose-700 dark:border-rose-800 dark:bg-rose-950 dark:text-rose-300">
                            {tool}
                          </code>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      )}

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

      {/* View All Tools of the Service */}
      <div className="mt-4 flex justify-end border-t border-zinc-100 pt-3 dark:border-zinc-800">
        <a
          href="https://zoho-mcp-manual-tool-guide.onslate.in/zoho-services"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:border-zinc-300 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:bg-zinc-700"
        >
          View All Tools of the Service
          <ExternalLink size={11} strokeWidth={2} />
        </a>
      </div>
    </article>
  );
}

