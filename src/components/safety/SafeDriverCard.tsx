import React from 'react';
import { ShieldCheck, Star, Award, CheckCircle, Car, Phone, MapPin, ThumbsUp } from 'lucide-react';
import { Driver, DataSource } from '../../types';

interface SafeDriverCardProps {
  driver: Driver;
  dataSource: DataSource;
  onOpenFeedback: () => void;
}

export const SafeDriverCard: React.FC<SafeDriverCardProps> = ({
  driver,
  dataSource,
  onOpenFeedback,
}) => {
  return (
    <div
      id="safe-driver-card"
      className="p-6 rounded-3xl glass-panel shadow-lg border-2 border-emerald-300 bg-emerald-50/40 space-y-5"
    >
      {/* Top Status Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-emerald-200/80">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-emerald-500 text-white shadow-md shadow-emerald-500/30">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-emerald-200 text-emerald-900 font-mono text-[11px] font-bold uppercase tracking-wider">
                SAFE & VERIFIED DRIVER
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                Source: {dataSource.toUpperCase()}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#0C2340] tracking-tight mt-0.5">
              {driver.name}
            </h3>
          </div>
        </div>

        {/* Big Trust Score Metric */}
        <div className="flex items-center gap-2 sm:flex-col sm:items-end self-start sm:self-auto">
          <div className="px-4 py-2 rounded-2xl bg-emerald-600 text-white shadow-md text-center">
            <div className="font-mono text-2xl font-black leading-none">{driver.trustScore}%</div>
            <div className="text-[9px] font-mono uppercase tracking-wider text-emerald-100 mt-0.5">
              Trust Score
            </div>
          </div>
        </div>
      </div>

      {/* Driver & Vehicle Metadata */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Photo & Core Specs */}
        <div className="md:col-span-4 flex items-center gap-3 p-3 rounded-2xl bg-white/80 border border-emerald-100">
          <img
            src={driver.photoUrl}
            alt={driver.name}
            referrerPolicy="no-referrer"
            className="w-14 h-14 rounded-xl object-cover border border-emerald-200"
          />
          <div>
            <div className="font-mono text-sm font-black text-[#0C2340] bg-slate-100 px-2 py-0.5 rounded border border-slate-200 inline-block">
              {driver.plateNumber}
            </div>
            <div className="text-xs font-semibold text-slate-600 mt-1">{driver.vehicleType}</div>
            <div className="flex items-center gap-1 text-xs text-amber-500 font-bold mt-0.5">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{driver.rating} ★</span>
              <span className="text-slate-400 font-normal">({driver.totalTrips} rides)</span>
            </div>
          </div>
        </div>

        {/* Verification Checkmarks */}
        <div className="md:col-span-8 space-y-2">
          <div className="p-3 rounded-2xl bg-white/80 border border-emerald-100 space-y-1.5 text-xs">
            <div className="flex items-center gap-2 text-emerald-800 font-medium">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{driver.rtoState}</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-800 font-medium">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{driver.badge}</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-800 font-medium">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Last Safety Audit: <strong>{driver.lastInspected}</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Safety Flags & Positive Commendations */}
      {driver.flags && driver.flags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {driver.flags.map((flag, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-xl bg-emerald-100/80 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-1"
            >
              <Award className="w-3.5 h-3.5 text-emerald-700" />
              <span>{flag}</span>
            </span>
          ))}
        </div>
      )}

      {/* Action Footer: Feedback & Mitra Token Trigger */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-xs text-slate-500 flex items-center gap-1.5">
          <span className="text-emerald-600 font-bold">✓ Zero Grievances on File</span>
          <span>• Ride with confidence</span>
        </div>

        <button
          id="btn-rate-safe-ride"
          onClick={onOpenFeedback}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-[#0C2340] text-white text-xs font-bold hover:bg-[#0066FF] transition-all shadow-sm"
        >
          <ThumbsUp className="w-4 h-4 text-emerald-400" />
          <span>Rate Ride & Earn +15 Mitra Tokens</span>
        </button>
      </div>
    </div>
  );
};
