import React from 'react';
import { History, ArrowRight, ShieldCheck, AlertOctagon, HelpCircle } from 'lucide-react';
import { RecentlyScannedItem } from '../../types';

interface RecentlyScannedProps {
  items: RecentlyScannedItem[];
  onSelectVehicle: (plateNumber: string) => void;
}

export const RecentlyScanned: React.FC<RecentlyScannedProps> = ({
  items,
  onSelectVehicle,
}) => {
  if (!items || items.length === 0) return null;

  return (
    <div
      id="recently-scanned-container"
      className="p-5 rounded-3xl glass-panel shadow-sm border border-white/90 space-y-3"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
          <History className="w-4 h-4 text-[#0066FF]" />
          <span>Recently Verified Vehicles</span>
        </div>
        <span className="text-[10px] text-slate-400 font-mono">
          {items.length} records in cache
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
        {items.map((item) => {
          const isSafe = item.status === 'verified';
          const isDanger = item.status === 'danger';

          return (
            <button
              key={item.id + item.plateNumber}
              onClick={() => onSelectVehicle(item.plateNumber)}
              className="p-3 rounded-2xl bg-white/80 border border-slate-200/80 hover:border-[#0066FF] hover:bg-white text-left transition-all shadow-2xs group flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2.5 truncate">
                <div
                  className={`p-2 rounded-xl text-white shrink-0 ${
                    isSafe ? 'bg-emerald-500' : isDanger ? 'bg-[#DC2626]' : 'bg-slate-500'
                  }`}
                >
                  {isSafe ? (
                    <ShieldCheck className="w-4 h-4" />
                  ) : isDanger ? (
                    <AlertOctagon className="w-4 h-4" />
                  ) : (
                    <HelpCircle className="w-4 h-4" />
                  )}
                </div>
                <div className="truncate">
                  <div className="font-mono text-xs font-bold text-[#0C2340] group-hover:text-[#0066FF] transition-colors">
                    {item.plateNumber}
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">{item.driverName}</div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span
                  className={`font-mono text-xs font-extrabold ${
                    isSafe ? 'text-emerald-700' : isDanger ? 'text-rose-700' : 'text-slate-600'
                  }`}
                >
                  {item.trustScore}%
                </span>
                <span className="block text-[9px] text-slate-400">{item.scannedAt}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
