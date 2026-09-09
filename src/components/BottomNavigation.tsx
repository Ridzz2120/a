import React from 'react';
import { Film, Radio, ShieldCheck, User, Sparkles } from 'lucide-react';

export type MainTab = 'reel' | 'radar' | 'safety' | 'profile';

interface BottomNavigationProps {
  activeTab: MainTab;
  onChangeTab: (tab: MainTab) => void;
  tokensBalance: number;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onChangeTab,
  tokensBalance,
}) => {
  return (
    <nav
      id="bottom-floating-navigation"
      aria-label="Main Navigation"
      className="fixed bottom-4 inset-x-0 z-40 px-4 pointer-events-none flex justify-center"
    >
      <div className="pointer-events-auto max-w-md w-full p-1.5 rounded-full bg-[#0C2340]/90 backdrop-blur-xl border border-white/20 shadow-2xl flex items-center justify-between gap-1">
        {/* Tab 1: AI Reel */}
        <button
          id="nav-tab-reel"
          onClick={() => onChangeTab('reel')}
          className={`flex-1 py-2.5 px-3 rounded-full flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 transition-all ${
            activeTab === 'reel'
              ? 'bg-[#0066FF] text-white font-bold shadow-md shadow-blue-500/30'
              : 'text-slate-300 hover:text-white hover:bg-white/10'
          }`}
        >
          <Film className="w-4 h-4" />
          <span className="text-[11px] sm:text-xs tracking-tight">AI REEL</span>
        </button>

        {/* Tab 2: 500m Radar */}
        <button
          id="nav-tab-radar"
          onClick={() => onChangeTab('radar')}
          className={`flex-1 py-2.5 px-3 rounded-full flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 transition-all ${
            activeTab === 'radar'
              ? 'bg-[#0066FF] text-white font-bold shadow-md shadow-blue-500/30'
              : 'text-slate-300 hover:text-white hover:bg-white/10'
          }`}
        >
          <Radio className="w-4 h-4" />
          <span className="text-[11px] sm:text-xs tracking-tight">RADAR</span>
        </button>

        {/* Tab 3: Safety Check */}
        <button
          id="nav-tab-safety"
          onClick={() => onChangeTab('safety')}
          className={`flex-1 py-2.5 px-3 rounded-full flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 transition-all ${
            activeTab === 'safety'
              ? 'bg-[#0066FF] text-white font-bold shadow-md shadow-blue-500/30'
              : 'text-slate-300 hover:text-white hover:bg-white/10'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span className="text-[11px] sm:text-xs tracking-tight">SAFETY</span>
        </button>

        {/* Tab 4: Profile & Earn */}
        <button
          id="nav-tab-profile"
          onClick={() => onChangeTab('profile')}
          className={`flex-1 py-2.5 px-3 rounded-full flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 transition-all ${
            activeTab === 'profile'
              ? 'bg-[#0066FF] text-white font-bold shadow-md shadow-blue-500/30'
              : 'text-slate-300 hover:text-white hover:bg-white/10'
          }`}
        >
          <div className="relative">
            <span className="text-xs">🪙</span>
          </div>
          <span className="text-[11px] sm:text-xs tracking-tight font-mono">{tokensBalance}</span>
        </button>
      </div>
    </nav>
  );
};
