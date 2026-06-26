import clsx from 'clsx';
import { ALL_SERVICES } from '@/data/constants';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/data/translations';

interface Props {
  selected: string[];
  onChange: (services: string[]) => void;
}

export default function ServicesFilter({ selected, onChange }: Props) {
  const lang = useLang();
  function toggle(service: string) {
    if (selected.includes(service)) {
      onChange(selected.filter((s) => s !== service));
    } else {
      onChange([...selected, service]);
    }
  }

  return (
    <div>
      <div className="mb-2.5 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
          {t(lang, 'services')}
        </p>
        {selected.length > 0 && (
          <button
            onClick={() => onChange([])}
            className="text-[10px] font-medium text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
          >
            {t(lang, 'clear')}
          </button>
        )}
      </div>
      <div className="max-h-64 space-y-0.5 overflow-y-auto pr-1">
        {ALL_SERVICES.map((service) => {
          const checked = selected.includes(service);
          return (
            <label key={service} className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggle(service)}
                className="h-3.5 w-3.5 cursor-pointer rounded border-zinc-300 accent-zinc-900 dark:accent-white"
              />
              <span className={clsx('text-xs', checked ? 'font-medium text-zinc-900 dark:text-zinc-100' : 'text-zinc-600 dark:text-zinc-400')}>
                {service}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
