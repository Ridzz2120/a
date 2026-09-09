import React, { useState } from 'react';
import { CheckCircle2, X, Sparkles, Edit3 } from 'lucide-react';

interface PlateConfirmationModalProps {
  isOpen: boolean;
  detectedPlate: string;
  confidence: number;
  onConfirm: (confirmedPlate: string) => void;
  onCancel: () => void;
}

export const PlateConfirmationModal: React.FC<PlateConfirmationModalProps> = ({
  isOpen,
  detectedPlate,
  confidence,
  onConfirm,
  onCancel,
}) => {
  const [editablePlate, setEditablePlate] = useState(detectedPlate);

  if (!isOpen) return null;

  return (
    <div
      id="plate-confirmation-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in"
    >
      <div
        id="plate-confirmation-modal"
        className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-100 text-[#0C2340] space-y-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-50 text-[#10B981]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0C2340]">OCR Detection Result</h3>
              <p className="text-xs text-slate-500">Confirm plate before running RTO audit</p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Plate Display & Edit Box */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
            Detected License Plate
          </span>
          <div className="flex items-center justify-center">
            <input
              type="text"
              value={editablePlate}
              onChange={(e) => setEditablePlate(e.target.value.toUpperCase())}
              className="w-full text-center font-mono font-black text-2xl tracking-wider text-[#0C2340] bg-white px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
            />
          </div>

          <div className="flex items-center justify-center gap-2 pt-1 text-xs font-mono">
            <span className="text-emerald-600 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> {confidence.toFixed(1)}% OCR Confidence
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={onCancel}
            className="py-3 px-4 rounded-2xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={() => onConfirm(editablePlate)}
            className="py-3 px-4 rounded-2xl bg-[#0066FF] text-white font-bold text-xs hover:bg-blue-700 transition-all shadow-md shadow-blue-500/25 flex items-center justify-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Confirm & Verify</span>
          </button>
        </div>
      </div>
    </div>
  );
};
