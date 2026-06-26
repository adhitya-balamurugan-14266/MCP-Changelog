import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import CategoryTabs from '@/components/CategoryTabs';
import Sidebar from '@/components/Sidebar';
import ReleaseList from '@/components/ReleaseList';
import BackToTop from '@/components/BackToTop';
import { RELEASES } from '@/data/releases';
import { LanguageContext } from '@/context/LanguageContext';
import type { Lang } from '@/data/translations';
import type { FilterState, Theme } from '@/types';

const INITIAL_FILTERS: FilterState = {
  search: '',
  selectedMonth: null,
  selectedServices: [],
  selectedDCs: [],
  selectedCategories: [],
};

function applyFilters(filters: FilterState) {
  let result = RELEASES;

  // Search
  if (filters.search.trim()) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
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

  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [language, setLanguage] = useState('en');

  // Apply dark class to html element
  if (typeof document !== 'undefined') {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('theme', next);
  }

  const filtered = useMemo(() => applyFilters(filters), [filters]);

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
            <ReleaseList releases={filtered} />
          </div>
        </div>
      </main>

      <BackToTop />
    </div>
    </LanguageContext.Provider>
  );
}
