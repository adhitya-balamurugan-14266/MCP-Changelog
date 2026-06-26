import clsx from 'clsx';
import type { ReleaseCategory } from '@/types';
import { BADGE_STYLES } from '@/data/constants';

interface Props {
  category: ReleaseCategory;
  size?: 'sm' | 'md';
}

export default function Badge({ category, size = 'md' }: Props) {
  const styles = BADGE_STYLES[category];
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 rounded-full font-medium tracking-wide',
        styles.bg,
        styles.text,
        size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs',
      )}
    >
      <span className={clsx('inline-block h-1.5 w-1.5 rounded-full', styles.dot)} />
      {category}
    </span>
  );
}
