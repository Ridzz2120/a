import React from 'react';
import { ArrowLeft, MapPin, ChevronDown } from 'lucide-react';
import { HeritageMonument } from '../types';

interface SearchHeaderBarProps {
  currentMonument: HeritageMonument;
  allMonuments: HeritageMonument[];
  onSelectMonument: (monument: HeritageMonument) => void;
  onNewSearch: () => void;
}

export const SearchHeaderBar: React.FC<SearchHeaderBarProps> = ({
  currentMonument,
  allMonuments,
  onSelectMonument,
  onNewSearch,
}) => {
  return (
    <div
      id="search-result-banner"
      className="w-full max-w-7xl mx-auto px-4 py-2.5 sm:py-3 mb-4"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl glass-panel shadow-sm border border-white/80">
        <div className="flex items-center gap-3">
          {/* New Search Back Button */}
          <button
            id="btn-new-search"
            onClick={onNewSearch}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white text-[#0C2340] border border-slate-200/90 text-xs font-bold hover:bg-slate-50 hover:border-[#0066FF] transition-all shadow-2xs shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#0066FF]" />
            <span>New Search</span>
          </button>

          {/* Destination Breadcrumb */}
          <div className="flex flex-col">
            <span className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase">
              SEARCH RESULT FOR:
            </span>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#E65A00] shrink-0" />
              <span className="text-sm sm:text-base font-extrabold text-[#0C2340] tracking-tight">
                {currentMonument.name}
              </span>
              <span className="hidden md:inline text-xs text-slate-500 font-medium">
                ({currentMonument.city}, {currentMonument.state})
              </span>
            </div>
          </div>
        </div>

        {/* Quick Monument Switcher Dropdown */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="relative">
            <select
              id="select-monument-switch"
              value={currentMonument.id}
              onChange={(e) => {
                const found = allMonuments.find((m) => m.id === e.target.value);
                if (found) onSelectMonument(found);
              }}
              className="appearance-none pl-3 pr-8 py-1.5 rounded-xl bg-slate-100/90 border border-slate-200 text-xs font-semibold text-[#0C2340] focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] cursor-pointer"
            >
              {allMonuments.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <span className="px-2 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-[#10B981] text-[11px] font-mono font-bold">
            LIVE INTEL
          </span>
        </div>
      </div>
    </div>
  );
};
