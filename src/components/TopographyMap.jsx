import { useEffect, useState } from 'react';
import { Activity } from 'lucide-react';

const TopographyMap = () => {
  const [telemetry, setTelemetry] = useState({ soilMoisture: 32.4, carbonLevel: 4.1, microbiome: 84 });

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTelemetry((previous) => ({
        soilMoisture: +(previous.soilMoisture + (Math.random() * 2 - 1)).toFixed(1),
        carbonLevel: +(previous.carbonLevel + (Math.random() * 0.1 - 0.05)).toFixed(2),
        microbiome: Math.min(100, Math.max(0, Math.floor(previous.microbiome + (Math.random() * 4 - 2)))),
      }));
    }, 2500);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="group relative flex h-96 w-full cursor-crosshair flex-col overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl" data-testid="telemetry-map">
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-20" preserveAspectRatio="none" viewBox="0 0 1000 500" fill="none" stroke="currentColor" aria-hidden="true">
        <g className="text-emerald-500" strokeWidth="1.5">
          <path d="M-100,250 Q150,100 400,200 T900,150 T1200,300" />
          <path d="M-100,300 Q150,150 400,250 T900,200 T1200,350" />
          <path d="M-100,350 Q150,200 400,300 T900,250 T1200,400" />
          <path d="M-100,400 Q150,250 400,350 T900,300 T1200,450" />
          <path d="M200,150 C250,100 350,120 380,180 C400,250 300,280 250,250 C180,220 150,200 200,150 Z" />
          <path d="M230,170 C260,140 320,150 340,190 C360,230 300,250 260,230 C210,210 190,190 230,170 Z" />
          <path d="M700,200 C750,150 850,170 880,230 C900,300 800,330 750,300 C680,270 650,250 700,200 Z" />
          <path d="M730,220 C760,190 820,200 840,240 C860,280 800,300 760,280 C710,260 690,240 730,220 Z" />
        </g>
      </svg>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="absolute left-[25%] top-[30%] flex flex-col items-center">
        <div className="absolute h-3 w-3 animate-ping rounded-full bg-emerald-400 opacity-75" />
        <div className="relative h-3 w-3 rounded-full bg-emerald-500" />
        <div className="mt-2 whitespace-nowrap rounded border border-emerald-500/30 bg-slate-800/80 px-2 py-1 font-mono text-[10px] text-emerald-300 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">Sector 7G • C-Seq: Active</div>
      </div>

      <div className="absolute left-[75%] top-[50%] flex flex-col items-center">
        <div className="absolute h-4 w-4 animate-ping rounded-full bg-blue-400 opacity-75 [animation-delay:1s]" />
        <div className="relative h-4 w-4 rounded-full bg-blue-500" />
        <div className="mt-2 whitespace-nowrap rounded border border-blue-500/30 bg-slate-800/80 px-2 py-1 font-mono text-[10px] text-blue-300 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">Zone B • H2O: Nominal</div>
      </div>

      <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-end justify-between">
        <div className="pointer-events-auto w-64 rounded-xl border border-slate-700 bg-slate-900/80 p-4 shadow-lg backdrop-blur-md">
          <div className="mb-3 flex items-center text-xs font-bold uppercase tracking-wider text-slate-300"><Activity size={14} className="mr-2 text-emerald-500" /> Live Field Telemetry</div>
          <div className="space-y-3 font-mono text-sm" aria-live="polite">
            <div className="flex items-center justify-between"><span className="text-slate-400">Soil Moisture</span><span className="text-blue-400">{telemetry.soilMoisture}%</span></div>
            <div className="flex items-center justify-between"><span className="text-slate-400">Carbon (SOM)</span><span className="text-emerald-400">{telemetry.carbonLevel}%</span></div>
            <div className="flex items-center justify-between"><span className="text-slate-400">Microbial Act.</span><span className="text-amber-400">{telemetry.microbiome} IDX</span></div>
          </div>
        </div>
        <div className="pointer-events-auto flex items-center space-x-2 rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-1.5 font-mono text-xs backdrop-blur-md"><div className="h-2 w-2 animate-pulse rounded-full bg-red-500" /><span className="text-slate-300">REC • SAT LINK 04</span></div>
      </div>
    </div>
  );
};

export default TopographyMap;
