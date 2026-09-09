import React from 'react';
import { AlertOctagon, ShieldAlert, PhoneCall, Share2, AlertTriangle, Star, ThumbsDown } from 'lucide-react';
import { Driver, DataSource } from '../../types';

interface DangerDriverCardProps {
  driver: Driver;
  dataSource: DataSource;
  onOpenSos: () => void;
  onShareGpsWhatsapp: () => void;
  onOpenFeedback: () => void;
}

export const DangerDriverCard: React.FC<DangerDriverCardProps> = ({
  driver,
  dataSource,
  onOpenSos,
  onShareGpsWhatsapp,
  onOpenFeedback,
}) => {
  return (
    <div
      id="danger-driver-card"
      className="p-6 rounded-3xl glass-panel shadow-xl border-2 border-rose-400 bg-rose-50/50 space-y-5 animate-pulse-ring"
    >
      {/* Top Status Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-rose-200/80">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-[#DC2626] text-white shadow-md shadow-red-500/30 animate-bounce">
            <AlertOctagon className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-rose-200 text-rose-950 font-mono text-[11px] font-bold uppercase tracking-wider">
                HIGH-RISK DRIVER WARNING
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                Source: {dataSource.toUpperCase()}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#DC2626] tracking-tight mt-0.5">
              {driver.name}
            </h3>
          </div>
        </div>

        {/* Low Trust Score Metric */}
        <div className="flex items-center gap-2 sm:flex-col sm:items-end self-start sm:self-auto">
          <div className="px-4 py-2 rounded-2xl bg-[#DC2626] text-white shadow-md text-center">
            <div className="font-mono text-2xl font-black leading-none">{driver.trustScore}%</div>
            <div className="text-[9px] font-mono uppercase tracking-wider text-rose-100 mt-0.5">
              High Risk
            </div>
          </div>
        </div>
      </div>

      {/* Driver & Vehicle Metadata */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Photo & Core Specs */}
        <div className="md:col-span-4 flex items-center gap-3 p-3 rounded-2xl bg-white/90 border border-rose-200">
          <img
            src={driver.photoUrl}
            alt={driver.name}
            referrerPolicy="no-referrer"
            className="w-14 h-14 rounded-xl object-cover border border-rose-300 filter grayscale contrast-125"
          />
          <div>
            <div className="font-mono text-sm font-black text-[#DC2626] bg-rose-100 px-2 py-0.5 rounded border border-rose-300 inline-block">
              {driver.plateNumber}
            </div>
            <div className="text-xs font-semibold text-slate-600 mt-1">{driver.vehicleType}</div>
            <div className="flex items-center gap-1 text-xs text-rose-600 font-bold mt-0.5">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{driver.rating} ★ Rating</span>
              <span className="text-slate-400 font-normal">({driver.complaintsCount} Grievances)</span>
            </div>
          </div>
        </div>

        {/* Violation & Grievance Alert Badges */}
        <div className="md:col-span-8 space-y-2">
          <div className="p-3 rounded-2xl bg-white/90 border border-rose-200 space-y-1 text-xs">
            <div className="text-rose-900 font-bold flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-[#DC2626] shrink-0" />
              <span>{driver.rtoState}</span>
            </div>
            <p className="text-slate-600 text-[11px] pl-5">
              Do not board this vehicle alone. Demand meter usage or choose an alternative from the verified green stand.
            </p>
          </div>
        </div>
      </div>

      {/* Flagged Violation Tags */}
      {driver.flags && driver.flags.length > 0 && (
        <div className="space-y-1.5">
          <span className="text-[10px] font-mono font-bold text-rose-900 uppercase">
            Active Community Flags & Police Reports:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {driver.flags.map((flag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-xl bg-rose-100 border border-rose-300 text-rose-950 text-xs font-semibold flex items-center gap-1"
              >
                <AlertOctagon className="w-3.5 h-3.5 text-rose-700 shrink-0" />
                <span>{flag}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Immediate Emergency SOS & Share Actions */}
      <div className="p-4 rounded-2xl bg-[#0C2340] text-white flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-left w-full sm:w-auto">
          <div className="text-xs font-mono font-bold text-amber-400 uppercase">
            SAFETY GUARDIAN ACTIVE
          </div>
          <div className="text-sm font-bold">Uncomfortable or Facing Harassment?</div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            id="btn-danger-share-whatsapp"
            onClick={onShareGpsWhatsapp}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#10B981] text-white text-xs font-bold hover:bg-emerald-600 transition-colors shadow-xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share GPS on WhatsApp</span>
          </button>

          <button
            id="btn-danger-sos-call"
            onClick={onOpenSos}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#DC2626] text-white text-xs font-bold hover:bg-red-700 transition-colors shadow-xs"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>112 SOS</span>
          </button>
        </div>
      </div>

      {/* Submit Grievance */}
      <div className="flex items-center justify-between pt-1">
        <span className="text-xs text-slate-500">Experienced extortion by this driver?</span>
        <button
          onClick={onOpenFeedback}
          className="text-xs font-bold text-[#DC2626] underline hover:text-red-800"
        >
          Submit Grievance Report (+15 Mitra Tokens) →
        </button>
      </div>
    </div>
  );
};
