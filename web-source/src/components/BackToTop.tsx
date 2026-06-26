import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import clsx from 'clsx';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/data/translations';

export default function BackToTop() {
  const lang = useLang();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(scrollY > 400);
      setProgress(maxScroll > 0 ? scrollY / maxScroll : 0);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label={t(lang, 'backToTop')}
      title={t(lang, 'backToTop')}
      className={clsx(
        'group fixed bottom-6 right-6 z-50 h-12 w-12 transition-all duration-300',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none',
      )}
    >
      {/* Progress ring */}
      <svg
        className="absolute inset-0 -rotate-90"
        width="48"
        height="48"
        viewBox="0 0 48 48"
        aria-hidden="true"
      >
        <circle
          cx="24" cy="24" r={radius}
          fill="none" strokeWidth="2.5"
          className="stroke-zinc-200 dark:stroke-zinc-700"
        />
        <circle
          cx="24" cy="24" r={radius}
          fill="none" strokeWidth="2.5"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="stroke-zinc-800 transition-all duration-150 dark:stroke-zinc-200"
        />
      </svg>
      {/* Inner button */}
      <span className="absolute inset-1.5 flex items-center justify-center rounded-full bg-white shadow-sm transition-transform duration-150 group-hover:scale-110 dark:bg-zinc-800">
        <ArrowUp
          size={14}
          strokeWidth={2.5}
          className="text-zinc-700 transition-transform duration-200 group-hover:-translate-y-0.5 dark:text-zinc-300"
        />
      </span>
    </button>
  );
}

