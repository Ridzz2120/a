import React, { useState } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sparkles,
  Clock,
  AlertOctagon,
  ShieldCheck,
  Zap,
  TrendingUp,
  MapPin,
  CheckCircle,
  ExternalLink,
  Info,
  Layers,
} from 'lucide-react';
import { HeritageMonument, RouteAlternative } from '../types';

interface AiReelPageProps {
  monument: HeritageMonument;
  onNavigateToRadar: () => void;
  onNavigateToSafety: () => void;
}

export const AiReelPage: React.FC<AiReelPageProps> = ({
  monument,
  onNavigateToRadar,
  onNavigateToSafety,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [activeAlternativeId, setActiveAlternativeId] = useState<string>(
    monument.routeAlternatives[0]?.id || ''
  );

  return (
    <div id="ai-reel-page-view" className="w-full max-w-7xl mx-auto px-4 space-y-6 pb-24">
      {/* 4-Column AI Key Directives Banner (Requirement #11) */}
      <div
        id="ai-key-directives-banner"
        className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 sm:p-5 rounded-3xl glass-panel shadow-md border border-white/90"
      >
        {/* Col 1: RATE */}
        <div className="p-3 sm:p-4 rounded-2xl bg-blue-50/80 border border-blue-100 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-blue-600">
              RATE
            </span>
            <span className="w-2 h-2 rounded-full bg-[#0066FF]" />
          </div>
          <div className="mt-2">
            <div className="text-xl sm:text-2xl font-mono font-extrabold text-[#0C2340]">
              {monument.directives.rate}
            </div>
            <div className="text-[11px] text-slate-500 font-medium mt-0.5">
              Govt Standardized Tariff
            </div>
          </div>
        </div>

        {/* Col 2: SPOT */}
        <div className="p-3 sm:p-4 rounded-2xl bg-emerald-50/80 border border-emerald-100 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#10B981]">
              SPOT
            </span>
            <span className="w-2 h-2 rounded-full bg-[#10B981]" />
          </div>
          <div className="mt-2">
            <div className="text-lg sm:text-xl font-bold text-[#0C2340] truncate">
              {monument.directives.spot}
            </div>
            <div className="text-[11px] text-slate-500 font-medium mt-0.5">
              Official Boarding Stand
            </div>
          </div>
        </div>

        {/* Col 3: TRAP */}
        <div className="p-3 sm:p-4 rounded-2xl bg-rose-50/80 border border-rose-100 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#DC2626]">
              TRAP
            </span>
            <span className="w-2 h-2 rounded-full bg-[#DC2626]" />
          </div>
          <div className="mt-2">
            <div className="text-xl sm:text-2xl font-mono font-extrabold text-[#DC2626]">
              {monument.directives.trap}
            </div>
            <div className="text-[11px] text-rose-700/80 font-medium mt-0.5">
              Flagged Tout Gouge
            </div>
          </div>
        </div>

        {/* Col 4: WAIT */}
        <div className="p-3 sm:p-4 rounded-2xl bg-amber-50/80 border border-amber-100 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#E65A00]">
              WAIT
            </span>
            <span className="w-2 h-2 rounded-full bg-[#E65A00]" />
          </div>
          <div className="mt-2">
            <div className="text-xl sm:text-2xl font-mono font-extrabold text-[#0C2340]">
              {monument.directives.wait}
            </div>
            <div className="text-[11px] text-slate-500 font-medium mt-0.5">
              Avg Shuttle Interval
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: AI Video Spotlight + Bento Timings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: AI Reel Video Card (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div
            id="ai-video-card"
            className="relative overflow-hidden rounded-3xl glass-panel border border-white/90 shadow-lg group bg-slate-950"
          >
            {/* Visual Media Container with Cinematic Poster & Simulated Stream */}
            <div className="relative w-full aspect-video sm:aspect-[16/10] overflow-hidden bg-slate-900">
              <img
                src={monument.heroImage}
                alt={monument.name}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover transition-transform duration-700 ${
                  isPlaying ? 'scale-105 filter saturate-110' : 'scale-100 filter brightness-90'
                }`}
              />
              {/* Dynamic Video Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

              {/* AI Reel Floating Header Tag */}
              <div className="absolute top-3.5 left-3.5 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="font-mono text-amber-400">AI SPOTLIGHT REEL</span>
                <span className="text-white/60">|</span>
                <span className="text-xs font-mono">{monument.videoDuration}</span>
              </div>

              {/* Audio & Status Badges */}
              <div className="absolute top-3.5 right-3.5 flex items-center gap-2">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 rounded-xl bg-black/60 backdrop-blur-md text-white border border-white/20 hover:bg-black/80 transition-colors"
                  title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                </button>
              </div>

              {/* Subtitles & Transit Proof Bar at Bottom of Video */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#0066FF]/80 backdrop-blur-sm text-[11px] font-mono font-bold tracking-wide uppercase mb-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-white" />
                  <span>TRANSIT VERIFIED • {monument.primaryGate}</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug drop-shadow-md">
                  {monument.headline}
                </h3>
                <p className="text-xs text-white/80 line-clamp-2 mt-1 drop-shadow">
                  {monument.description}
                </p>
              </div>
            </div>

            {/* Playback Controls & Progress Bar */}
            <div className="p-4 bg-white/95 border-t border-slate-100 flex items-center justify-between gap-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0C2340] text-white text-xs font-bold hover:bg-[#0066FF] transition-all"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span>PAUSE INTEL</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>RESUME REEL</span>
                  </>
                )}
              </button>

              <div className="flex-1 hidden sm:flex items-center gap-2">
                <div className="h-1.5 flex-1 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-[#0066FF] rounded-full w-2/3 animate-pulse" />
                </div>
                <span className="font-mono text-[11px] text-slate-500 font-semibold">0:32 / 0:48</span>
              </div>

              <button
                onClick={onNavigateToRadar}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-50 text-[#0066FF] text-xs font-bold hover:bg-blue-100 transition-colors"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Open 500m Radar</span>
              </button>
            </div>
          </div>

          {/* Route & Switch Alternatives */}
          <div id="route-switch-section" className="p-5 rounded-3xl glass-panel shadow-sm border border-white/90">
            <div className="flex items-center justify-between mb-3.5">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#0066FF]" />
                <h4 className="text-sm font-bold text-[#0C2340]">Route & Switch Alternatives</h4>
              </div>
              <span className="text-[11px] font-mono text-slate-500 font-semibold">
                Updated Live
              </span>
            </div>

            <div className="space-y-2.5">
              {monument.routeAlternatives.map((alt) => {
                const isSelected = alt.id === activeAlternativeId;
                return (
                  <div
                    key={alt.id}
                    onClick={() => setActiveAlternativeId(alt.id)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-blue-50/90 border-[#0066FF] shadow-xs'
                        : 'bg-white/80 border-slate-200/70 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded-md bg-[#0066FF]/10 text-[#0066FF]">
                          {alt.badgeText}
                        </span>
                        <span className="text-sm font-bold text-[#0C2340]">{alt.title}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-sm font-extrabold text-[#0C2340]">
                          {alt.fare}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-2 mt-2 text-xs text-slate-500">
                      <span>{alt.highlight}</span>
                      <span className="font-mono font-semibold text-emerald-600">
                        {alt.safetyScore}% Safe
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Bento Timings & Scam Warnings (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Bento Timings Section (Requirement #12) */}
          <div
            id="timings-bento-section"
            className="p-5 rounded-3xl glass-panel shadow-sm border border-white/90 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#0066FF]" />
                <h4 className="text-sm font-bold text-[#0C2340]">Monument Ingress Timings</h4>
              </div>
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">
                Crowd Index
              </span>
            </div>

            {/* Best Window Card (Green visual treatment) */}
            <div className="p-4 rounded-2xl bg-emerald-50/90 border border-emerald-200/80">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
                  <span className="text-xs font-mono font-bold uppercase text-emerald-800 tracking-wider">
                    BEST INGRESS WINDOW
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-emerald-200/80 text-emerald-900 text-[11px] font-mono font-extrabold">
                  {monument.timings.bestWindow}
                </span>
              </div>
              <p className="text-xs text-emerald-900/90 mt-2 font-medium">
                {monument.timings.bestDescription}
              </p>
            </div>

            {/* Peak Rush Card (Orange/Crimson visual treatment) */}
            <div className="p-4 rounded-2xl bg-rose-50/90 border border-rose-200/80">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626]" />
                  <span className="text-xs font-mono font-bold uppercase text-rose-800 tracking-wider">
                    PEAK TOUT RUSH
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-rose-200/80 text-rose-900 text-[11px] font-mono font-extrabold">
                  {monument.timings.peakRush}
                </span>
              </div>
              <p className="text-xs text-rose-900/90 mt-2 font-medium">
                {monument.timings.peakDescription}
              </p>
            </div>

            {/* Live Crowd Density Progress Indicator */}
            <div className="pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-600">Current Commute Density:</span>
                <span className="font-mono font-bold text-[#0C2340]">
                  {monument.timings.crowdLevel}% (Moderate Flow)
                </span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500 rounded-full"
                  style={{ width: `${monument.timings.crowdLevel}%` }}
                />
              </div>
            </div>
          </div>

          {/* Scam Warnings Alert Card (Requirement #13) */}
          <div
            id="scam-warnings-card"
            className="p-5 rounded-3xl glass-panel shadow-sm border border-rose-200/80 bg-rose-50/30 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertOctagon className="w-4 h-4 text-[#DC2626]" />
                <h4 className="text-sm font-bold text-[#0C2340]">Scam & Overcharging Radar</h4>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-red-100 text-[#DC2626] text-[10px] font-mono font-bold">
                HIGH TOUT ALERT
              </span>
            </div>

            <div className="space-y-3">
              {monument.scams.map((scam) => (
                <div
                  key={scam.id}
                  className="p-3.5 rounded-2xl bg-white/95 border border-rose-100 shadow-2xs space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-bold text-[#0C2340] leading-snug">
                      {scam.title}
                    </span>
                    <span className="shrink-0 px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase rounded bg-rose-100 text-rose-700">
                      {scam.severity}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">{scam.description}</p>

                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100 text-[11px] font-mono">
                    <div className="text-rose-700">
                      <span className="block text-[9px] text-slate-400 uppercase">Trap Quote</span>
                      <strong>{scam.trapFare}</strong>
                    </div>
                    <div className="text-emerald-700">
                      <span className="block text-[9px] text-slate-400 uppercase">Govt Rate</span>
                      <strong>{scam.officialFare}</strong>
                    </div>
                  </div>

                  <div className="p-2 rounded-xl bg-blue-50/80 text-[11px] text-[#0C2340] font-medium flex items-start gap-1.5">
                    <Info className="w-3.5 h-3.5 text-[#0066FF] shrink-0 mt-0.5" />
                    <span>{scam.advice}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Safety Verification Link */}
            <button
              onClick={onNavigateToSafety}
              className="w-full py-2.5 px-4 rounded-xl bg-[#0C2340] text-white text-xs font-bold hover:bg-[#0066FF] transition-all flex items-center justify-center gap-1.5 shadow-sm"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verify Auto License Plate with OCR</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

