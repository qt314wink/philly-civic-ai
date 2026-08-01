import { useState } from 'react';
import { ChevronRight, Database } from 'lucide-react';

const flipThemes = {
  rose: { front: 'bg-rose-50 text-rose-600', back: 'bg-rose-600' },
  emerald: { front: 'bg-emerald-50 text-emerald-600', back: 'bg-emerald-600' },
  blue: { front: 'bg-blue-50 text-blue-600', back: 'bg-blue-600' },
};

const FlipCard = ({ icon: Icon, title, frontText, backStats, theme }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const colors = flipThemes[theme];
  const toggle = () => setIsFlipped((value) => !value);

  return (
    <button
      type="button"
      className="group perspective h-80 w-full cursor-pointer text-left"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onFocus={() => setIsFlipped(true)}
      onBlur={() => setIsFlipped(false)}
      onClick={toggle}
      aria-pressed={isFlipped}
      aria-label={`${title}: ${isFlipped ? 'show summary' : 'show empirical data'}`}
    >
      <span className={`preserve-3d relative block h-full w-full transition-transform duration-700 ${isFlipped ? 'rotate-y-180' : ''}`}>
        <span className="backface-hidden absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-stone-200 bg-white p-8 text-center shadow-sm">
          <span className={`mb-6 rounded-full p-4 ${colors.front}`}><Icon size={40} /></span>
          <span className="mb-3 block font-serif text-xl font-bold text-slate-900">{title}</span>
          <span className="block text-sm leading-relaxed text-slate-600">{frontText}</span>
          <span className="mt-auto flex items-center pt-4 text-xs font-medium uppercase tracking-widest text-slate-400">Hover, focus, or tap for data <ChevronRight size={14} className="ml-1" /></span>
        </span>
        <span className={`backface-hidden rotate-y-180 absolute inset-0 flex flex-col justify-center rounded-2xl p-8 text-white shadow-lg ${colors.back}`}>
          <span className="mb-6 flex items-center border-b border-white/20 pb-2 text-lg font-bold"><Database size={18} className="mr-2" /> Empirical Data</span>
          <span className="space-y-4">
            {backStats.map((stat) => <span key={stat} className="flex items-start text-sm"><span className="mr-2 font-bold text-white/90">•</span><span className="text-white/90">{stat}</span></span>)}
          </span>
        </span>
      </span>
    </button>
  );
};

export default FlipCard;
