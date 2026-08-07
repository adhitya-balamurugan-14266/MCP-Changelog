import { useState, useMemo, useEffect } from 'react';
import Header from '@/components/Header';
import CategoryTabs from '@/components/CategoryTabs';
import Sidebar from '@/components/Sidebar';
import ReleaseList from '@/components/ReleaseList';
import BackToTop from '@/components/BackToTop';
import { LanguageContext } from '@/context/LanguageContext';
import type { Lang } from '@/data/translations';
import type { FilterState, Theme, Release } from '@/types';

const RELEASES_API =
  'https://mcp-changelog-60047186223.development.catalystserverless.in/server/asset_manager/releases';

const INITIAL_FILTERS: FilterState = {
  search: '',
  selectedMonth: null,
  selectedServices: [],
  selectedDCs: [],
  selectedCategories: [],
};

function applyFilters(releases: Release[], filters: FilterState) {
  let result = releases;

  // Search
  if (filters.search.trim()) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        (Array.isArray(r.description) ? r.description.join(' ') : r.description).toLowerCase().includes(q) ||
        r.services.some((s) => s.toLowerCase().includes(q)) ||
        r.category.toLowerCase().includes(q),
    );
  }

  // Month
  if (filters.selectedMonth) {
    result = result.filter((r) => r.date.startsWith(filters.selectedMonth!));
  }

  // Categories
  if (filters.selectedCategories.length > 0) {
    result = result.filter((r) => filters.selectedCategories.includes(r.category));
  }

  // Services
  if (filters.selectedServices.length > 0) {
    result = result.filter((r) =>
      r.services.some((s) => filters.selectedServices.includes(s)),
    );
  }

  // DCs
  if (filters.selectedDCs.length > 0) {
    result = result.filter((r) =>
      r.dataCenters.some((dc) => filters.selectedDCs.includes(dc)),
    );
  }

  return result;
}

export default function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  const [allReleases, setAllReleases] = useState<Release[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    fetch(RELEASES_API)
      .then((r) => r.json())
      .then((data: Release[]) => {
        setAllReleases(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Apply dark class to html element
  if (typeof document !== 'undefined') {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('theme', next);
  }

  const latestMonthKey = useMemo(
    () => allReleases.map((r) => r.date.slice(0, 7)).sort((a, b) => b.localeCompare(a))[0],
    [allReleases],
  );

  const filtered = useMemo(() => applyFilters(allReleases, filters), [allReleases, filters]);

  return (
    <LanguageContext.Provider value={language as Lang}>
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <Header
        search={filters.search}
        onSearchChange={(v) => setFilters((f) => ({ ...f, search: v }))}
        theme={theme}
        onThemeToggle={toggleTheme}
        language={language}
        onLanguageChange={setLanguage}
      />
      <CategoryTabs
        selected={filters.selectedCategories}
        onChange={(cats) => setFilters((f) => ({ ...f, selectedCategories: cats }))}
      />

      <main className="mx-auto max-w-screen-xl px-6 py-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          <Sidebar
            filters={filters}
            onFiltersChange={setFilters}
          />
          <div className="min-w-0 flex-1">
            {loading ? (
              <div className="flex flex-col gap-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-28 animate-pulse rounded-xl bg-zinc-100 dark:bg-zinc-800" />
                ))}
              </div>
            ) : (
              <ReleaseList releases={filtered} latestMonthKey={latestMonthKey} />
            )}
          </div>
        </div>
      </main>

      <BackToTop />
    </div>
    </LanguageContext.Provider>
  );
}
