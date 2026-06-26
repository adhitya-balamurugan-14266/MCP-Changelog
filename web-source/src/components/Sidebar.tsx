import CalendarFilter from './filters/CalendarFilter';
import ServicesFilter from './filters/ServicesFilter';
import DCFilter from './filters/DCFilter';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/data/translations';
import type { FilterState, DataCenter } from '@/types';

interface Props {
  filters: FilterState;
  onFiltersChange: (f: FilterState) => void;
}

export default function Sidebar({ filters, onFiltersChange }: Props) {
  const lang = useLang();
  const hasActiveFilters =
    filters.selectedMonth !== null ||
    filters.selectedServices.length > 0 ||
    filters.selectedDCs.length > 0 ||
    filters.selectedCategories.length > 0;

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="sticky top-6 max-h-[calc(100vh-3rem)] overflow-y-auto rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
        {hasActiveFilters && (
          <div className="mb-4 flex justify-end">
            <button
              onClick={() =>
                onFiltersChange({
                  ...filters,
                  selectedMonth: null,
                  selectedServices: [],
                  selectedDCs: [],
                  selectedCategories: [],
                })
              }
              className="text-xs font-medium text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
            >
              {t(lang, 'resetAll')}
            </button>
          </div>
        )}

        <div className="space-y-6 divide-y divide-zinc-100 dark:divide-zinc-800">
          <CalendarFilter
            selected={filters.selectedMonth}
            onChange={(month) => onFiltersChange({ ...filters, selectedMonth: month })}
          />
          <div className="pt-5">
            <ServicesFilter
              selected={filters.selectedServices}
              onChange={(services) => onFiltersChange({ ...filters, selectedServices: services })}
            />
          </div>
          <div className="pt-5">
            <DCFilter
              selected={filters.selectedDCs}
              onChange={(dcs: DataCenter[]) =>
                onFiltersChange({ ...filters, selectedDCs: dcs })
              }
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
