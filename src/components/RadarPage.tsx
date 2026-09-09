import React, { useState } from 'react';
import {
  Radio,
  Navigation,
  ShieldCheck,
  AlertTriangle,
  MapPin,
  Compass,
  Footprints,
  Zap,
  Info,
  ChevronRight,
} from 'lucide-react';
import { HeritageMonument, RadarTarget, TransitMode } from '../types';

interface RadarPageProps {
  monument: HeritageMonument;
  onNavigateToSafety: () => void;
}

export const RadarPage: React.FC<RadarPageProps> = ({
  monument,
  onNavigateToSafety,
}) => {
  const [selectedMode, setSelectedMode] = useState<TransitMode>('ERIKSHAW');
  const [activeTargetId, setActiveTargetId] = useState<string>(
    monument.radarTargets[0]?.id || ''
  );
  const [radarRange, setRadarRange] = useState<number>(500);

  const activeTarget =
    monument.radarTargets.find((t) => t.id === activeTargetId) ||
    monument.radarTargets[0];

  return (
    <div id="radar-page-view" className="w-full max-w-7xl mx-auto px-4 space-y-6 pb-24">
      {/* Top Header & Transit Mode Selectors (Requirement #14) */}
      <div className="p-4 sm:p-5 rounded-3xl glass-panel shadow-sm border border-white/90 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-blue-50 text-[#0066FF] text-xs font-mono font-bold uppercase mb-1">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>500M PROXIMITY SCAM & FARE RADAR</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0C2340] tracking-tight">
            Ingress Telemetry & Stand Scanner
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time proximity rings detecting verified queues vs flagged tout hotspots around{' '}
            <strong>{monument.name}</strong>.
          </p>
        </div>

        {/* Transit Mode Selector Buttons */}
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200/80 self-start md:self-auto">
          <button
            id="btn-mode-erickshaw"
            onClick={() => setSelectedMode('ERIKSHAW')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedMode === 'ERIKSHAW'
                ? 'bg-[#0C2340] text-white shadow-xs'
                : 'text-slate-700 hover:text-black hover:bg-white/60'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>E-RICKSHAW</span>
          </button>

          <button
            id="btn-mode-sharedauto"
            onClick={() => setSelectedMode('SHAREDAUTO')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedMode === 'SHAREDAUTO'
                ? 'bg-[#0C2340] text-white shadow-xs'
                : 'text-slate-700 hover:text-black hover:bg-white/60'
            }`}
          >
            <Navigation className="w-3.5 h-3.5 text-[#0066FF]" />
            <span>SHARED AUTO</span>
          </button>

          <button
            id="btn-mode-heritagewalk"
            onClick={() => setSelectedMode('HERITAGEWALK')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedMode === 'HERITAGEWALK'
                ? 'bg-[#0C2340] text-white shadow-xs'
                : 'text-slate-700 hover:text-black hover:bg-white/60'
            }`}
          >
            <Footprints className="w-3.5 h-3.5 text-[#10B981]" />
            <span>HERITAGE WALK</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Radar Screen & Target Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: 500m Concentric Radar Canvas Simulation (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div
            id="proximity-radar-canvas"
            className="relative w-full max-w-[480px] aspect-square rounded-3xl bg-[#0C2340] p-4 shadow-2xl border-2 border-white/80 overflow-hidden flex items-center justify-center select-none"
          >
            {/* Grid Coordinates & Compass Headings */}
            <div className="absolute top-2.5 font-mono text-[10px] font-bold text-blue-300/60 tracking-widest">
              N • 000°
            </div>
            <div className="absolute bottom-2.5 font-mono text-[10px] font-bold text-blue-300/60 tracking-widest">
              S • 180°
            </div>
            <div className="absolute left-2.5 font-mono text-[10px] font-bold text-blue-300/60 tracking-widest">
              W • 270°
            </div>
            <div className="absolute right-2.5 font-mono text-[10px] font-bold text-blue-300/60 tracking-widest">
              E • 090°
            </div>

            {/* Concentric Proximity Range Rings (100m, 250m, 400m, 500m) */}
            <div className="absolute w-[90%] h-[90%] rounded-full border border-blue-500/20 flex items-center justify-center">
              <span className="absolute top-1 text-[9px] font-mono text-blue-400/50">500m</span>
            </div>
            <div className="absolute w-[72%] h-[72%] rounded-full border border-blue-500/25 flex items-center justify-center">
              <span className="absolute top-1 text-[9px] font-mono text-blue-400/60">400m</span>
            </div>
            <div className="absolute w-[50%] h-[50%] rounded-full border border-blue-500/30 flex items-center justify-center">
              <span className="absolute top-1 text-[9px] font-mono text-blue-400/70">250m</span>
            </div>
            <div className="absolute w-[28%] h-[28%] rounded-full border border-blue-400/40 flex items-center justify-center">
              <span className="absolute top-1 text-[9px] font-mono text-blue-300/80">100m</span>
            </div>

            {/* Crosshair Grids */}
            <div className="absolute w-full h-[1px] bg-blue-500/20" />
            <div className="absolute h-full w-[1px] bg-blue-500/20" />

            {/* Rotating Radar Sweep Animation */}
            <div className="absolute inset-0 pointer-events-none origin-center animate-radar-sweep">
              <div
                className="w-1/2 h-1/2 origin-bottom-right"
                style={{
                  background:
                    'conic-gradient(from 0deg at 100% 100%, rgba(0, 102, 255, 0.45) 0deg, rgba(0, 102, 255, 0) 65deg)',
                }}
              />
            </div>

            {/* Center "YOU" Marker */}
            <div className="relative z-20 flex flex-col items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-[#0066FF] border-2 border-white shadow-lg shadow-blue-500 animate-pulse" />
              <span className="mt-1 px-1.5 py-0.2 rounded bg-black/60 text-[9px] font-mono font-bold text-white uppercase tracking-wider">
                YOU
              </span>
            </div>

            {/* Interactive Radar Targets Plotted on Canvas */}
            {monument.radarTargets.map((target) => {
              // Convert polar coordinates (distance, angle) to cartesian percentages
              const radiusPercent = (target.distance / 500) * 44; // max radius is 44% of container
              const angleRad = ((target.angle - 90) * Math.PI) / 180;
              const xPos = 50 + radiusPercent * Math.cos(angleRad);
              const yPos = 50 + radiusPercent * Math.sin(angleRad);
              const isSelected = target.id === activeTargetId;

              return (
                <button
                  key={target.id}
                  id={`btn-radar-target-${target.id}`}
                  onClick={() => setActiveTargetId(target.id)}
                  style={{ top: `${yPos}%`, left: `${xPos}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 z-30 group cursor-pointer transition-all ${
                    isSelected ? 'scale-125 z-40' : 'hover:scale-110'
                  }`}
                  title={`${target.name} (${target.distance}m)`}
                >
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center border-2 shadow-md transition-all ${
                      target.isFlagged
                        ? 'bg-[#DC2626] border-white animate-bounce shadow-red-500'
                        : 'bg-[#10B981] border-white shadow-emerald-500'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>
                  {/* Floating Micro Tag */}
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 bottom-5 px-1.5 py-0.5 rounded text-[8px] font-mono font-bold whitespace-nowrap backdrop-blur-md transition-opacity pointer-events-none ${
                      isSelected
                        ? 'bg-white text-[#0C2340] opacity-100 ring-1 ring-blue-500'
                        : 'bg-black/75 text-white/90 opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    {target.name.slice(0, 16)}… ({target.distance}m)
                  </div>
                </button>
              );
            })}
          </div>

          {/* Telemetry Status Bar */}
          <div className="w-full max-w-[480px] mt-3 p-3 rounded-2xl glass-panel border border-white/80 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-1.5 text-emerald-700">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span>GPS 3D LOCK: OK</span>
            </div>
            <div className="text-slate-500">
              RADIUS: <strong className="text-[#0C2340]">500M</strong>
            </div>
            <div className="text-blue-700 font-bold">
              TARGETS: {monument.radarTargets.length} ACTIVE
            </div>
          </div>
        </div>

        {/* Right Column: Selected Target Breakdown & Directives (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Active Target Card */}
          {activeTarget && (
            <div
              id="active-radar-target-card"
              className={`p-5 rounded-3xl glass-panel shadow-md border ${
                activeTarget.isFlagged
                  ? 'border-rose-300 bg-rose-50/40'
                  : 'border-emerald-300 bg-emerald-50/40'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  {activeTarget.isFlagged ? (
                    <div className="p-2 rounded-xl bg-red-100 text-[#DC2626]">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                  ) : (
                    <div className="p-2 rounded-xl bg-emerald-100 text-[#10B981]">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                  )}
                  <div>
                    <span
                      className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                        activeTarget.isFlagged ? 'text-red-700' : 'text-emerald-800'
                      }`}
                    >
                      {activeTarget.isFlagged ? 'FLAGGED SCAM ZONE' : 'VERIFIED TRANSIT STAND'}
                    </span>
                    <h3 className="text-base font-bold text-[#0C2340] leading-tight">
                      {activeTarget.name}
                    </h3>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-lg font-extrabold text-[#0C2340]">
                    {activeTarget.distance}m
                  </div>
                  <div className="text-[10px] font-mono text-slate-400">Proximity</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-slate-200/70 text-xs">
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">
                    Estimated Fare
                  </span>
                  <span className="font-mono font-extrabold text-sm text-[#0C2340]">
                    {activeTarget.fareEst}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">
                    Status & Telemetry
                  </span>
                  <span className="font-semibold text-slate-700">{activeTarget.statusText}</span>
                </div>
              </div>

              <div className="mt-3 p-2.5 rounded-xl bg-white/80 border border-slate-200 text-xs flex items-center justify-between">
                <span className="font-mono text-slate-500 text-[11px]">
                  COORDS: {activeTarget.coordsText}
                </span>
                <span className="px-2 py-0.5 rounded bg-blue-50 text-[#0066FF] text-[10px] font-mono font-bold">
                  Azimuth: {activeTarget.angle}°
                </span>
              </div>
            </div>
          )}

          {/* List of All Nearby Proximity Nodes */}
          <div className="p-4 rounded-3xl glass-panel border border-white/80 shadow-sm space-y-2">
            <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-2">
              All 500m Radar Nodes
            </h4>
            <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1">
              {monument.radarTargets.map((item) => {
                const isSelected = item.id === activeTargetId;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTargetId(item.id)}
                    className={`w-full p-2.5 rounded-xl text-left text-xs transition-all flex items-center justify-between gap-2 ${
                      isSelected
                        ? 'bg-[#0C2340] text-white shadow-xs'
                        : 'bg-white/70 hover:bg-white text-slate-800 border border-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 ${
                          item.isFlagged ? 'bg-[#DC2626]' : 'bg-[#10B981]'
                        }`}
                      />
                      <span className="font-semibold truncate">{item.name}</span>
                    </div>
                    <span
                      className={`font-mono text-[11px] font-bold shrink-0 ${
                        isSelected ? 'text-blue-300' : 'text-slate-500'
                      }`}
                    >
                      {item.distance}m
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Prompt to verify vehicle before boarding */}
          <div className="p-4 rounded-3xl bg-[#0066FF] text-white shadow-lg shadow-blue-500/20 flex items-center justify-between gap-3">
            <div>
              <div className="text-xs font-mono font-bold text-blue-100 uppercase">
                At The Stand?
              </div>
              <div className="text-sm font-bold">Verify Driver Plate Now</div>
            </div>
            <button
              onClick={onNavigateToSafety}
              className="px-3.5 py-2 rounded-xl bg-white text-[#0066FF] text-xs font-bold hover:bg-blue-50 transition-colors shadow-xs"
            >
              Scan Plate OCR →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
