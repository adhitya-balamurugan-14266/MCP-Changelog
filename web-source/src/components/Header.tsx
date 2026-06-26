import { Search, X, BookOpen, ExternalLink } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import LanguageSelector from './LanguageSelector';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/data/translations';
import type { Theme } from '@/types';

interface Props {
  search: string;
  onSearchChange: (v: string) => void;
  theme: Theme;
  onThemeToggle: () => void;
  language: string;
  onLanguageChange: (code: string) => void;
}

export default function Header({
  search,
  onSearchChange,
  theme,
  onThemeToggle,
  language,
  onLanguageChange,
}: Props) {
  const lang = useLang();

  return (
    <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      {/* Top bar */}
      <div className="mx-auto flex max-w-screen-xl items-center justify-between gap-4 px-6 py-4">
        {/* Left: Logo + Help Docs */}
        <div className="flex items-center gap-6">
          <div>
            {theme === 'dark' ? (
              <img src="/MCP-logo-lockup-DarkBG.svg" alt="Zoho MCP Changelog" className="h-7 w-auto object-contain" />
            ) : (
              <div className="flex items-center gap-2">
                <img src="/MCP-WhiteBG.svg" alt="" aria-hidden="true" className="h-7 w-7 object-contain" />
                <span className="text-sm font-semibold text-zinc-900">Zoho MCP</span>
                <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                  Changelog
                </span>
              </div>
            )}
          </div>
          <a
            href="https://help.zoho.com/portal/en/kb/mcp"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-zinc-900 sm:flex dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            <BookOpen size={14} strokeWidth={2} />
            {t(lang, 'goToHelpDocs')}
          </a>
        </div>

        {/* Right: Language + Theme + Console */}
        <div className="flex items-center gap-3">
          <LanguageSelector currentLang={language} onChange={onLanguageChange} />
          <ThemeToggle theme={theme} onToggle={onThemeToggle} />
          <a
            href="https://mcp.zoho.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            <ExternalLink size={14} strokeWidth={2} />
            <span className="hidden sm:inline">{t(lang, 'goToConsole')}</span>
          </a>
        </div>
      </div>

      {/* Hero */}
      <div className="mx-auto max-w-screen-xl px-6 pb-10 pt-6 text-center">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          {t(lang, 'title')}
        </h1>
        <p className="mb-6 text-base text-zinc-500 dark:text-zinc-400">
          {t(lang, 'subtitle')}
        </p>

        {/* Search */}
        <div className="relative mx-auto max-w-lg">
          <Search
            size={16}
            strokeWidth={2}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t(lang, 'searchPlaceholder')}
            className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-2.5 pl-10 pr-10 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition-all focus:border-zinc-400 focus:bg-white dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-zinc-500 dark:focus:bg-zinc-900"
          />
          {search && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
            >
              <X size={14} strokeWidth={2.5} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
