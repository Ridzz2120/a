import React, { useState } from 'react';
import { Camera, Search, Sparkles, Shield, AlertCircle, CheckCircle2 } from 'lucide-react';
import { QUICK_DEMO_PRESETS, normalizePlateNumber } from '../../services/vehicleService';

interface PlateScannerCardProps {
  onSearchPlate: (plate: string) => void;
  onOpenScanner: () => void;
  isLoading: boolean;
}

export const PlateScannerCard: React.FC<PlateScannerCardProps> = ({
  onSearchPlate,
  onOpenScanner,
  isLoading,
}) => {
  const [manualInput, setManualInput] = useState('');

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualInput.trim()) {
      onSearchPlate(manualInput.trim());
    }
  };

  const handlePresetClick = (presetPlate: string) => {
    setManualInput(presetPlate);
    onSearchPlate(presetPlate);
  };

  return (
    <div
      id="plate-scanner-card"
      className="p-5 sm:p-6 rounded-3xl glass-panel shadow-md border border-white/90 space-y-4"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-blue-50 text-[#0066FF]">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-[#0C2340]">
              Plate Scanner & OCR Lookup
            </h3>
            <p className="text-xs text-slate-500">
              Verify RTO registration, police clearance & safety trust score before boarding.
            </p>
          </div>
        </div>

        {/* OCR Scan Camera Trigger Button */}
        <button
          id="btn-open-camera-scanner"
          onClick={onOpenScanner}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-[#0066FF] text-white text-xs font-bold shadow-md shadow-blue-500/25 hover:bg-blue-700 active:scale-95 transition-all shrink-0"
        >
          <Camera className="w-4 h-4" />
          <span>Scan Plate Camera / OCR</span>
        </button>
      </div>

      {/* Manual Plate Entry Form */}
      <form onSubmit={handleManualSubmit} className="flex flex-col sm:flex-row gap-2.5">
        <div className="flex-1 flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-white border border-slate-200/90 focus-within:border-[#0066FF] focus-within:ring-2 focus-within:ring-[#0066FF]/20 transition-all shadow-xs">
          <span className="font-mono text-xs font-bold text-slate-400 uppercase">IND</span>
          <div className="w-[1px] h-4 bg-slate-200" />
          <input
            id="input-manual-plate"
            type="text"
            value={manualInput}
            onChange={(e) => setManualInput(e.target.value.toUpperCase())}
            placeholder="e.g. DL-1RA-4521"
            className="w-full font-mono font-bold text-sm sm:text-base text-[#0C2340] placeholder-slate-400 bg-transparent outline-none uppercase"
          />
        </div>

        <button
          id="btn-submit-manual-plate"
          type="submit"
          disabled={isLoading || !manualInput.trim()}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#0C2340] text-white text-xs font-bold hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xs shrink-0"
        >
          {isLoading ? (
            <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Search className="w-4 h-4" />
          )}
          <span>Search Vehicle</span>
        </button>
      </form>

      {/* Quick Demo Presets (Requirement #16) */}
      <div className="pt-3 border-t border-slate-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" /> Quick Demo Benchmarks:
          </span>
          <span className="text-[10px] text-slate-400">Click to run instant test</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {QUICK_DEMO_PRESETS.map((demo) => {
            const isSafe = demo.status === 'verified';
            const isDanger = demo.status === 'danger';
            return (
              <button
                key={demo.cleanPlate}
                id={`btn-preset-${demo.cleanPlate}`}
                type="button"
                onClick={() => handlePresetClick(demo.plate)}
                className={`p-2.5 rounded-xl border text-left transition-all hover:scale-[1.02] flex items-center justify-between ${
                  isSafe
                    ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                    : isDanger
                    ? 'bg-rose-50/80 border-rose-200 text-rose-950'
                    : 'bg-slate-50/80 border-slate-200 text-slate-800'
                }`}
              >
                <div>
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wide opacity-80">
                    {demo.label}
                  </div>
                  <div className="font-mono font-extrabold text-xs tracking-tight">
                    {demo.plate}
                  </div>
                </div>
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                    isSafe
                      ? 'bg-emerald-200/90 text-emerald-900'
                      : isDanger
                      ? 'bg-rose-200/90 text-rose-900'
                      : 'bg-slate-200/90 text-slate-800'
                  }`}
                >
                  {demo.score}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
