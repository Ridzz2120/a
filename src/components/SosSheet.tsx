import React, { useState } from 'react';
import { ShieldAlert, PhoneCall, Share2, Volume2, VolumeX, X, AlertOctagon, MapPin, Check } from 'lucide-react';
import { HeritageMonument } from '../types';

interface SosSheetProps {
  isOpen: boolean;
  onClose: () => void;
  currentMonument: HeritageMonument;
}

export const SosSheet: React.FC<SosSheetProps> = ({
  isOpen,
  onClose,
  currentMonument,
}) => {
  const [isSirenActive, setIsSirenActive] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const userLocationText = `${currentMonument.primaryGate}, near ${currentMonument.name} (${currentMonument.city})`;
  const emergencyMessage = encodeURIComponent(
    `🚨 EMERGENCY ALERT - SafarAdda Tourist Guardian\n\nI need immediate safety assistance at:\n📍 ${userLocationText}\nCoords: ${currentMonument.radarTargets[0]?.coordsText || '27.1751 N, 78.0421 E'}\n\nPlease dispatch local PCR van / tourist police unit immediately.`
  );

  const handleShareWhatsapp = () => {
    window.open(`https://wa.me/?text=${emergencyMessage}`, '_blank');
  };

  const handleCopyGps = () => {
    navigator.clipboard.writeText(`Emergency Location: ${userLocationText}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const toggleSiren = () => {
    setIsSirenActive(!isSirenActive);
    // Beep oscillator audio
    if (!isSirenActive) {
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(800, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1400, audioCtx.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 1.2);
      } catch (e) {
        // Audio fallback
      }
    }
  };

  return (
    <div
      id="sos-sheet-backdrop"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in"
    >
      <div
        id="sos-sheet-modal"
        className="w-full max-w-lg rounded-t-3xl sm:rounded-3xl bg-[#0C2340] text-white p-6 shadow-2xl border-2 border-red-500/80 space-y-5 animate-slide-up"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#DC2626] text-white shadow-lg shadow-red-500/40 animate-pulse">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-red-400">
                  NATIONAL EMERGENCY PROTOCOL
                </span>
              </div>
              <h3 className="text-xl font-black text-white tracking-tight">SOS Emergency Guardian</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Current Ingress Location Telemetry */}
        <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 truncate">
            <MapPin className="w-4 h-4 text-red-400 shrink-0" />
            <span className="font-mono text-slate-200 truncate">{userLocationText}</span>
          </div>
          <button
            onClick={handleCopyGps}
            className="px-2 py-1 rounded bg-white/20 hover:bg-white/30 text-[10px] font-mono font-bold shrink-0 text-white"
          >
            {copiedLink ? 'COPIED ✓' : 'COPY GPS'}
          </button>
        </div>

        {/* Emergency Call Action Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* 112 National Emergency */}
          <a
            id="btn-call-112"
            href="tel:112"
            className="p-4 rounded-2xl bg-[#DC2626] hover:bg-red-700 text-white shadow-lg shadow-red-600/30 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <PhoneCall className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-red-200 block">
                  ALL-INDIA POLICE
                </span>
                <span className="text-2xl font-mono font-black leading-none">112</span>
              </div>
            </div>
            <span className="text-xs font-bold bg-black/30 px-2.5 py-1 rounded-lg">
              CALL NOW
            </span>
          </a>

          {/* 1091 Women Safety Helpline */}
          <a
            id="btn-call-1091"
            href="tel:1091"
            className="p-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <ShieldAlert className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-200 block">
                  WOMEN HELPLINE
                </span>
                <span className="text-2xl font-mono font-black leading-none">1091</span>
              </div>
            </div>
            <span className="text-xs font-bold bg-black/30 px-2.5 py-1 rounded-lg">
              CALL NOW
            </span>
          </a>
        </div>

        {/* WhatsApp GPS Broadcast Action (Requirement #24) */}
        <button
          id="btn-sos-whatsapp-gps"
          onClick={handleShareWhatsapp}
          className="w-full p-4 rounded-2xl bg-[#10B981] hover:bg-emerald-600 text-white font-bold text-sm shadow-lg shadow-emerald-500/30 transition-all flex items-center justify-center gap-2"
        >
          <Share2 className="w-5 h-5" />
          <span>Broadcast Live GPS Alert on WhatsApp</span>
        </button>

        {/* Strobe Siren Alarm Trigger */}
        <div className="pt-2 flex items-center justify-between border-t border-white/10 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <AlertOctagon className="w-4 h-4 text-amber-400" />
            <span>Sound Loud Deterrent Alarm:</span>
          </div>
          <button
            onClick={toggleSiren}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
              isSirenActive
                ? 'bg-amber-400 text-black animate-pulse'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            {isSirenActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span>{isSirenActive ? 'SIREN ACTIVE' : 'TEST SIREN'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
