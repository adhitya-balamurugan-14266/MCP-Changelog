import React, { useState } from 'react';
import type { Release } from '@/types';
import Badge from './Badge';
import { SERVICE_LOGOS } from '@/data/constants';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/data/translations';
import { ChevronRight, ExternalLink } from 'lucide-react';

interface Props {
  releases: Release[];
}

const CATEGORY_PRIORITY: Record<string, number> = {
  'New Service': 0,
  'New Tool': 1,
  'Enhancement': 2,
  'Tool Change': 3,
  'Tool Removed': 4,
  'Service Removed': 5,
};

function getIdSeq(id: string): number {
  const m = id.match(/(\d+)[a-z]?$/);
  return m ? parseInt(m[1], 10) : 0;
}

function sortReleases(releases: Release[]): Release[] {
  return [...releases].sort((a, b) => {
    const catDiff = (CATEGORY_PRIORITY[a.category] ?? 99) - (CATEGORY_PRIORITY[b.category] ?? 99);
    if (catDiff !== 0) return catDiff;
    return getIdSeq(b.id) - getIdSeq(a.id);
  });
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
  return `${monthName} ${year}`;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

// Returns true for camelCase (getFields) or snake_case (add_purchase_order_attachment) identifiers
function isCodeIdentifier(s: string): boolean {
  return (
    /^[a-z][a-zA-Z0-9]*[A-Z][a-zA-Z0-9]*$/.test(s) ||
    /^[a-z][a-z0-9]+(?:_[a-z0-9]+)+$/.test(s)
  );
}

const CODE_INLINE_RE = /\b([a-z][a-zA-Z0-9]*[A-Z][a-zA-Z0-9]*|[a-z][a-z0-9]+(?:_[a-z0-9]+)+)\b/g;

function renderTextWithCode(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let last = 0;
  CODE_INLINE_RE.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = CODE_INLINE_RE.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    parts.push(
      <code
        key={m.index}
        className="rounded border border-zinc-200 bg-zinc-100 px-1 py-0.5 font-mono text-[11px] text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
      >
        {m[0]}
      </code>
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

type DescSegment =
  | { type: 'text'; content: string }
  | { type: 'group'; items: string[]; code: boolean };

function parseDescription(desc: string): DescSegment[] {
  const parts: DescSegment[] = [];
  const regex = /\(([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(desc)) !== null) {
    if (m.index > last) parts.push({ type: 'text', content: desc.slice(last, m.index) });
    const items = m[1].split(',').map((s) => s.trim()).filter(Boolean);
    parts.push({ type: 'group', items, code: items.every(isCodeIdentifier) });
    last = m.index + m[0].length;
  }
  if (last < desc.length) parts.push({ type: 'text', content: desc.slice(last) });
  return parts;
}

function ReleaseEntry({ r }: { r: Release }) {
  const [toolsOpen, setToolsOpen] = useState(false);
  const TOOL_LIMIT = 20;
  // Enforce: New Tool/New Service cards only show additions; Tool Removed cards only show removals
  const showNewSection = r.category !== 'Tool Removed';
  const showRemovedSection = r.category !== 'New Tool' && r.category !== 'New Service';
  const hasNew = showNewSection && (r.newTools?.length ?? 0) > 0;
  const hasRemoved = showRemovedSection && (r.removedTools?.length ?? 0) > 0;
  const hasBoth = hasNew && hasRemoved;
  const visibleNew = hasNew ? (r.newTools?.slice(0, TOOL_LIMIT) ?? []) : [];
  const visibleRemoved = hasRemoved ? (r.removedTools?.slice(0, TOOL_LIMIT) ?? []) : [];
  const maxRows = hasBoth ? Math.min(Math.max(visibleNew.length, visibleRemoved.length), TOOL_LIMIT) : 0;

  return (
    <div className="py-5 first:pt-0">
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
        {parseDescription(r.description).map((seg, i) => {
          if (seg.type === 'text') {
            return <span key={i}>{renderTextWithCode(seg.content)}</span>;
          }
          if (seg.code) {
            // camelCase/snake_case tool names → inline code chips
            return (
              <span key={i} className="inline-flex flex-wrap items-center gap-1 align-baseline mx-0.5">
                {seg.items.map((item, j) => (
                  <code
                    key={j}
                    className="rounded border border-zinc-200 bg-zinc-100 px-1 py-0.5 font-mono text-[11px] text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                  >
                    {item}
                  </code>
                ))}
              </span>
            );
          }
          // Plain English groupings → italic
          return (
            <em key={i} className="not-italic mx-0.5">
              <span className="italic text-zinc-500 dark:text-zinc-400">
                {seg.items.join(', ')}
              </span>
            </em>
          );
        })}
      </p>

      {/* Tools accordion */}
      {(hasNew || hasRemoved) && (
        <div className="mb-3">
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
            <div className="mt-2">
              {hasBoth ? (
                <div className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700">
                  <table className="w-full border-collapse text-xs">
                    <thead>
                      <tr className="bg-zinc-50 dark:bg-zinc-800/60">
                        <th className="border-b border-r border-zinc-200 px-2 py-1 text-left font-semibold text-emerald-600 dark:border-zinc-700 dark:text-emerald-400">
                          Added ({r.newTools!.length})
                        </th>
                        <th className="border-b border-zinc-200 px-2 py-1 text-left font-semibold text-rose-600 dark:border-zinc-700 dark:text-rose-400">
                          Removed ({r.removedTools!.length})
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from({ length: maxRows }).map((_, i) => (
                        <tr key={i} className="border-b border-zinc-100 last:border-0 dark:border-zinc-800">
                          <td className="border-r border-zinc-100 px-2 py-0.5 align-top dark:border-zinc-800">
                            {visibleNew[i] != null && (
                              <code className="rounded border border-emerald-200 bg-emerald-50 px-1.5 py-0.5 font-mono text-[11px] text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                                {visibleNew[i]}
                              </code>
                            )}
                          </td>
                          <td className="px-2 py-0.5 align-top">
                            {visibleRemoved[i] != null && (
                              <code className="rounded border border-rose-200 bg-rose-50 px-1.5 py-0.5 font-mono text-[11px] text-rose-700 dark:border-rose-800 dark:bg-rose-950 dark:text-rose-300">
                                {visibleRemoved[i]}
                              </code>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : hasNew ? (
                <div className="inline-block overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700">
                  <table className="border-collapse text-xs">
                    <thead>
                      <tr className="bg-zinc-50 dark:bg-zinc-800/60">
                        <th className="border-b border-zinc-200 px-2 py-1 text-left font-semibold text-emerald-600 dark:border-zinc-700 dark:text-emerald-400">
                          Added Tools ({r.newTools!.length})
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {visibleNew.map((tool, i) => (
                        <tr key={i} className="border-b border-zinc-100 last:border-0 dark:border-zinc-800">
                          <td className="px-2 py-0.5">
                            <code className="rounded border border-emerald-200 bg-emerald-50 px-1.5 py-0.5 font-mono text-[11px] text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                              {tool}
                            </code>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="inline-block overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700">
                  <table className="border-collapse text-xs">
                    <thead>
                      <tr className="bg-zinc-50 dark:bg-zinc-800/60">
                        <th className="border-b border-zinc-200 px-2 py-1 text-left font-semibold text-rose-600 dark:border-zinc-700 dark:text-rose-400">
                          Removed Tools ({r.removedTools!.length})
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {visibleRemoved.map((tool, i) => (
                        <tr key={i} className="border-b border-zinc-100 last:border-0 dark:border-zinc-800">
                          <td className="px-2 py-0.5">
                            <code className="rounded border border-rose-200 bg-rose-50 px-1.5 py-0.5 font-mono text-[11px] text-rose-700 dark:border-rose-800 dark:bg-rose-950 dark:text-rose-300">
                              {tool}
                            </code>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-1.5">
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

        {/* View All Tools button */}
        <a
          href="https://zoho-mcp-manual-tool-guide.onslate.in/zoho-services"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-medium text-zinc-600 transition-colors hover:border-zinc-300 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:bg-zinc-700"
        >
          View All Tools of the Service
          <ExternalLink size={10} strokeWidth={2} />
        </a>
      </div>
    </div>
  );
}

export default function ReleaseList({ releases }: Props) {
  const lang = useLang();
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set());

  if (releases.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-base font-medium text-zinc-400 dark:text-zinc-500">{t(lang, 'noReleases')}</p>
      </div>
    );
  }

  const grouped = groupByYearMonth(releases);
  const sortedKeys = Array.from(grouped.keys()).sort((a, b) => b.localeCompare(a));
  const latestKey = sortedKeys[0];

  function toggleKey(key: string) {
    setExpandedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  return (
    <div>
      {sortedKeys.map((key) => {
        const group = grouped.get(key)!;
        const label = formatSectionLabel(key);
        const isLatest = key === latestKey;
        const isExpanded = expandedKeys.has(key);

        if (isLatest) {
          return (
            <section key={key} id={`month-${key}`} className="border-b border-zinc-200 py-8 last:border-b-0 dark:border-zinc-800">
              <h2 className="mb-6 text-xl font-bold text-zinc-900 dark:text-zinc-100">
                {label}
              </h2>
              <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {sortReleases(group).map((r) => <ReleaseEntry key={r.id} r={r} />)}
              </div>
            </section>
          );
        }

        return (
          <section key={key} id={`month-${key}`} className="border-b border-zinc-200 dark:border-zinc-800 last:border-b-0">
            <button
              onClick={() => toggleKey(key)}
              className="flex w-full items-center justify-between py-5 text-left"
            >
              <h2 className="text-base font-semibold text-zinc-700 dark:text-zinc-300">
                {label} Releases
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-400 dark:text-zinc-500">
                  {group.length} release{group.length !== 1 ? 's' : ''}
                </span>
                <ChevronRight
                  size={16}
                  strokeWidth={2}
                  className={`shrink-0 text-zinc-400 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
                />
              </div>
            </button>
            {isExpanded && (
              <div className="pb-6">
                <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {group
                    .sort((a, b) => b.date.localeCompare(a.date))
                    .map((r) => <ReleaseEntry key={r.id} r={r} />)}
                </div>
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
