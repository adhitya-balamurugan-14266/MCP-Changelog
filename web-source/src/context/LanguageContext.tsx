import { createContext, useContext } from 'react';
import type { Lang } from '@/data/translations';

export const LanguageContext = createContext<Lang>('en');

export function useLang(): Lang {
  return useContext(LanguageContext);
}
