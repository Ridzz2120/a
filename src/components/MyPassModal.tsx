import React, { useState } from 'react';
import { Ticket, X, Sparkles, Award, Shield, CheckCircle2, QrCode, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { addMitraTokens } from '../services/safetyReportService';

interface MyPassModalProps {
  isOpen: boolean;
  onClose: () => void;
  tokensBalance: number;
  onTokensUpdated: (newTokens: number) => void;
}

interface PassItem {
  id: string;
  title: string;
  cost: number;
  monument: string;
  description: string;
  isRedeemed?: boolean;
}

export const MyPassModal: React.FC<MyPassModalProps> = ({
  isOpen,
  onClose,
  tokensBalance,
  onTokensUpdated,
}) => {
  const [activeTab, setActiveTab] = useState<'passes' | 'earn'>('passes');
  const [redeemedPasses, setRedeemedPasses] = useState<string[]>([]);

  const availablePasses: PassItem[] = [
    {
      id: 'pass-shilpgram',
      title: 'Shilpgram E-Cart Priority Ingress',
      cost: 60,
      monument: 'Taj Mahal, Agra',
      description: 'Skip standard golf cart queues from Shilpgram parking directly to Gate 1.',
    },
    {
      id: 'pass-pinkcity',
      title: 'Pink City Heritage Transit Pass',
      cost: 90,
      monument: 'Hawa Mahal & City Palace',
      description: 'Unlimited 1-day rides on verified green e-rickshaws across Badi Chaupar.',
    },
    {
      id: 'pass-godowlia',
      title: 'Godowlia Aarti Fast-Track Corridor',
      cost: 75,
      monument: 'Varanasi Ghats',
      description: 'Police-monitored EV shuttle pass to Dashashwamedh ghat evening prayer.',
    },
  ];

  if (!isOpen) return null;

  const handleRedeem = (pass: PassItem) => {
    if (tokensBalance < pass.cost) return;

    // Deduct tokens
    const updated = addMitraTokens(-pass.cost);
    onTokensUpdated(updated);
    setRedeemedPasses([...redeemedPasses, pass.id]);

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#0066FF', '#E65A00', '#10B981'],
      });
    } catch (e) {}
  };

  return (
    <div
      id="my-pass-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in"
    >
      <div
        id="my-pass-modal"
        className="w-full max-w-lg rounded-3xl bg-white text-[#0C2340] p-6 shadow-2xl border border-slate-100 space-y-5 max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-amber-100 text-amber-900">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0C2340]">My Pass & Mitra Wallet</h3>
              <p className="text-xs text-slate-500">Commuter rewards & transit vouchers</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-400"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mitra Tokens Wallet Card */}
        <div className="p-5 rounded-3xl bg-gradient-to-br from-[#0C2340] to-[#0047b3] text-white shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between relative z-10">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-200 block">
                CURRENT TOKEN BALANCE
              </span>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-2xl">🪙</span>
                <span className="font-mono text-3xl font-black">{tokensBalance}</span>
                <span className="font-mono text-xs text-amber-300 font-bold">Mitra Tokens</span>
              </div>
            </div>
            <div className="text-right">
              <span className="px-2.5 py-1 rounded-xl bg-white/20 backdrop-blur-md text-[11px] font-bold font-mono text-white flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-amber-300" />
                <span>Guardian Tier II</span>
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-xs text-blue-100 relative z-10">
            <span>Verified Audits: <strong>3 Submitted</strong></span>
            <span>OCR Scans: <strong>8 Performed</strong></span>
          </div>

          {/* Background Decorative Circle */}
          <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/5 pointer-events-none" />
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-2xl">
          <button
            onClick={() => setActiveTab('passes')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'passes'
                ? 'bg-white text-[#0C2340] shadow-xs'
                : 'text-slate-600 hover:text-black'
            }`}
          >
            🎟️ Redeemable Passes
          </button>
          <button
            onClick={() => setActiveTab('earn')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'earn'
                ? 'bg-white text-[#0C2340] shadow-xs'
                : 'text-slate-600 hover:text-black'
            }`}
          >
            ⚡ Earning Missions
          </button>
        </div>

        {/* Tab 1: Redeemable Passes */}
        {activeTab === 'passes' && (
          <div className="space-y-3">
            {availablePasses.map((pass) => {
              const isRedeemed = redeemedPasses.includes(pass.id);
              const canAfford = tokensBalance >= pass.cost;

              return (
                <div
                  key={pass.id}
                  className="p-4 rounded-2xl border border-slate-200/80 bg-white hover:border-[#0066FF]/40 transition-all shadow-2xs space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase text-[#0066FF] block">
                        {pass.monument}
                      </span>
                      <h4 className="text-sm font-bold text-[#0C2340]">{pass.title}</h4>
                    </div>
                    <div className="px-2.5 py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 font-mono text-xs font-bold shrink-0">
                      🪙 {pass.cost}
                    </div>
                  </div>

                  <p className="text-xs text-slate-500">{pass.description}</p>

                  <div className="pt-1 flex items-center justify-between">
                    {isRedeemed ? (
                      <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Pass Active on Account (QR Ready)</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleRedeem(pass)}
                        disabled={!canAfford}
                        className="px-4 py-2 rounded-xl bg-[#0066FF] text-white text-xs font-bold hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs"
                      >
                        {canAfford ? `Redeem for ${pass.cost} Tokens` : 'Insufficient Tokens'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 2: Earning Missions */}
        {activeTab === 'earn' && (
          <div className="space-y-3">
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs space-y-1">
              <div className="flex items-center justify-between font-bold text-emerald-900">
                <span>Submit Ride Safety Audit</span>
                <span className="font-mono text-amber-700">+15 Mitra</span>
              </div>
              <p className="text-slate-600 text-[11px]">
                Rate auto/e-rickshaw fares or report overcharging after any ride.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 text-xs space-y-1">
              <div className="flex items-center justify-between font-bold text-blue-900">
                <span>Scan License Plate with OCR</span>
                <span className="font-mono text-amber-700">+20 Mitra</span>
              </div>
              <p className="text-slate-600 text-[11px]">
                Capture and verify number plate at monument parking gates.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs space-y-1">
              <div className="flex items-center justify-between font-bold text-amber-900">
                <span>Spot & Flag Tout Hotspot on Radar</span>
                <span className="font-mono text-amber-700">+30 Mitra</span>
              </div>
              <p className="text-slate-600 text-[11px]">
                Pinpoint unauthorized commission shops or unmetered clusters.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
