import React, { useState } from 'react';
import { Search, ArrowRight, ShieldCheck, MapPin, Compass, CheckCircle2 } from 'lucide-react';
import { HeritageMonument } from '../types';

interface HomeLandingProps {
  monuments: HeritageMonument[];
  selectedMonument: HeritageMonument;
  onSelectMonument: (monument: HeritageMonument) => void;
  onExploreRoute: (destinationQuery: string) => void;
}

export const HomeLanding: React.FC<HomeLandingProps> = ({
  monuments,
  selectedMonument,
  onSelectMonument,
  onExploreRoute,
}) => {
  const [searchQuery, setSearchQuery] = useState(selectedMonument.name);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onExploreRoute(searchQuery);
  };

  const handlePickMonument = (monument: HeritageMonument) => {
    setSearchQuery(monument.name);
    onSelectMonument(monument);
  };

  return (
    <div id="home-landing-view" className="w-full max-w-4xl mx-auto px-4 py-6 sm:py-12 flex flex-col items-center">
      {/* Top Protocol Status Pill */}
      <div
        id="landing-hero-tag"
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-slate-200/80 shadow-xs text-xs font-semibold text-[#0C2340] mb-4 backdrop-blur-md"
      >
        <span className="flex h-2 w-2 rounded-full bg-[#10B981] animate-ping" />
        <img
          id="landing-hero-logo"
          src="/logo.svg"
          alt="SafarSarthi Logo"
          className="w-4 h-4 sm:w-5 sm:h-5 rounded-full object-cover shrink-0 shadow-2xs"
          onError={(e) => {
            // Graceful fallback if image URL changes
            (e.currentTarget as HTMLImageElement).style.display = 'none';
          }}
        />
        <span className="font-mono text-[#0066FF] font-bold">SafarSarthi</span>
        <span className="text-slate-300">|</span>
        <span className="text-slate-600 font-medium">Heritage Mobility Engine</span>
      </div>

      {/* Main Headline */}
      <h1
        id="landing-headline"
        className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#0C2340] text-center tracking-tight leading-[1.15] mb-8 max-w-2xl"
      >
        Wherever travel takes you,{' '}
        <span className="text-[#0066FF] inline-block underline decoration-[#E65A00]/30 decoration-wavy decoration-2">
          we'll be there.
        </span>
      </h1>

      {/* Search-First Dock (WHERE Search Card) */}
      <div
        id="search-dock-card"
        className="w-full max-w-2xl p-3 sm:p-4 rounded-3xl glass-panel shadow-xl border border-white/90 backdrop-blur-xl mb-6"
      >
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch gap-2.5">
          <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-white rounded-2xl border border-slate-200/80 focus-within:border-[#0066FF] focus-within:ring-2 focus-within:ring-[#0066FF]/20 transition-all shadow-xs">
            <div className="flex flex-col">
              <span className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase">
                WHERE
              </span>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#E65A00] shrink-0" />
                <input
                  id="input-landing-where"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. Taj Mahal, Agra Gate 1"
                  className="w-full text-sm sm:text-base font-semibold text-[#0C2340] placeholder-slate-400 bg-transparent outline-none"
                />
              </div>
            </div>
          </div>

          <button
            id="btn-explore-route"
            type="submit"
            className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-[#0066FF] text-white font-bold text-sm tracking-wide shadow-lg shadow-blue-500/25 hover:bg-blue-700 active:scale-[0.98] transition-all shrink-0"
          >
            <span>EXPLORE ROUTE</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Monument Suggestions */}
        <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-medium text-slate-500 mr-1 flex items-center gap-1">
            <Compass className="w-3 h-3 text-slate-400" /> Popular:
          </span>
          {monuments.map((m) => {
            const isSelected = m.id === selectedMonument.id;
            return (
              <button
                key={m.id}
                id={`btn-suggest-${m.id}`}
                type="button"
                onClick={() => handlePickMonument(m)}
                className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-[#0C2340] text-white shadow-xs'
                    : 'bg-slate-100/90 text-slate-700 hover:bg-white hover:border-slate-300 border border-transparent'
                }`}
              >
                {m.name.split(',')[0]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Trust Rating & Protocol Badges */}
      <div
        id="landing-rating-badge"
        className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center px-4 py-2 rounded-2xl bg-white/70 backdrop-blur-sm border border-slate-200/60 shadow-xs mb-8"
      >
        <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
        </div>
        <div className="text-xs font-mono font-bold tracking-tight text-[#0C2340]">
          TOP RATED 4.9/5 COMMUTE INTELLIGENCE PROTOCOL
        </div>
        <div className="hidden sm:inline text-slate-300">•</div>
        <div className="text-xs font-medium text-slate-600 flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
          <span>48,000+ Verified Tourist Ingresses</span>
        </div>
      </div>
    </div>
  );
};
