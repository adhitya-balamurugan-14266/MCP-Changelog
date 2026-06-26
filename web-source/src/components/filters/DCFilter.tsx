import type { DataCenter } from '@/types';
import { ALL_DATA_CENTERS } from '@/data/constants';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/data/translations';

interface Props {
  selected: DataCenter[];
  onChange: (dcs: DataCenter[]) => void;
}

const DC_KEY_MAP: Record<DataCenter, 'dcAll' | 'dcUS' | 'dcEU' | 'dcIN' | 'dcAU' | 'dcJP' | 'dcCN' | 'dcCA' | 'dcSA'> = {
  All: 'dcAll',
  US: 'dcUS',
  EU: 'dcEU',
  IN: 'dcIN',
  AU: 'dcAU',
  JP: 'dcJP',
  CN: 'dcCN',
  CA: 'dcCA',
  SA: 'dcSA',
};

export default function DCFilter({ selected, onChange }: Props) {
  const lang = useLang();
  function toggle(dc: DataCenter) {
    if (selected.includes(dc)) {
      onChange(selected.filter((d) => d !== dc));
    } else {
      onChange([...selected, dc]);
    }
  }

  return (
    <div>
      <div className="mb-2.5 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
          {t(lang, 'dataCenter')}
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
      <div className="space-y-0.5">
        {ALL_DATA_CENTERS.map((dc) => {
          const checked = selected.includes(dc);
          return (
            <label key={dc} className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggle(dc)}
                className="h-3.5 w-3.5 cursor-pointer rounded border-zinc-300 accent-zinc-900 dark:accent-white"
              />
              <span className="text-xs text-zinc-600 dark:text-zinc-400">
                <span className="mr-1.5 font-semibold text-zinc-800 dark:text-zinc-200">{dc}</span>
                {t(lang, DC_KEY_MAP[dc])}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
