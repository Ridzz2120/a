import React from 'react';
import { HelpCircle, AlertCircle, ShieldAlert, Sparkles, RefreshCw, FileText } from 'lucide-react';
import { Driver, DataSource } from '../../types';

interface UnverifiedDriverCardProps {
  driver: Driver;
  dataSource: DataSource;
  onOpenFeedback: () => void;
  onScanAnother: () => void;
}

export const UnverifiedDriverCard: React.FC<UnverifiedDriverCardProps> = ({
  driver,
  dataSource,
  onOpenFeedback,
  onScanAnother,
}) => {
  return (
    <div
      id="unverified-driver-card"
      className="p-6 rounded-3xl glass-panel shadow-md border-2 border-slate-300 bg-slate-50/70 space-y-5"
    >
      {/* Top Status Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-slate-600 text-white shadow-md">
            <HelpCircle className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-slate-200 text-slate-800 font-mono text-[11px] font-bold uppercase tracking-wider">
                UNVERIFIED COMMERCIAL VEHICLE
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                Source: {dataSource.toUpperCase()}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#0C2340] tracking-tight mt-0.5">
              Plate: {driver.plateNumber}
            </h3>
          </div>
        </div>

        {/* Pending Score Badge */}
        <div className="flex items-center gap-2 sm:flex-col sm:items-end self-start sm:self-auto">
          <div className="px-4 py-2 rounded-2xl bg-slate-500 text-white shadow-md text-center">
            <div className="font-mono text-xl font-bold leading-none">{driver.trustScore}%</div>
            <div className="text-[9px] font-mono uppercase tracking-wider text-slate-200 mt-0.5">
              Pending Audit
            </div>
          </div>
        </div>
      </div>

      {/* Warning Notice Box */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs space-y-2">
        <div className="flex items-center gap-2 text-amber-900 font-bold">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Vehicle Not Yet Registered in Heritage Safety Network</span>
        </div>
        <p className="text-slate-600 leading-relaxed">
          This plate is not currently linked to an active police-cleared driver badge. You may still board, but strictly negotiate a standard fare (e.g. ₹15–₹20) beforehand.
        </p>
      </div>

      {/* Unverified Advisory Flags */}
      {driver.flags && (
        <div className="space-y-1.5 text-xs text-slate-600">
          {driver.flags.map((flag, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
              <span>{flag}</span>
            </div>
          ))}
        </div>
      )}

      {/* Action Footer */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
        <button
          onClick={onScanAnother}
          className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-2xl bg-white border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Scan Another Plate</span>
        </button>

        <button
          id="btn-unverified-feedback"
          onClick={onOpenFeedback}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-[#0066FF] text-white text-xs font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20"
        >
          <FileText className="w-4 h-4" />
          <span>Log Trip Audit (+15 Mitra Tokens)</span>
        </button>
      </div>
    </div>
  );
};
