import React, { useState } from 'react';
import { Star, X, CheckCircle, Sparkles, Send, ThumbsUp } from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitSafetyReport } from '../../services/safetyReportService';
import { Driver } from '../../types';

interface RideFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeDriver: Driver | null;
  activeVehicleId: string | null;
  onFeedbackSubmitted: (earnedTokens: number) => void;
}

const AVAILABLE_TAGS = [
  'Standard Fare Used',
  'Polite & Helpful',
  'Safe & Smooth Driving',
  'Clean E-Rickshaw',
  'Tour Advice Given',
  'Demanded Overcharge',
  'Refused Meter',
  'Aggressive Tout',
  'Wrong Route Taken',
];

export const RideFeedbackModal: React.FC<RideFeedbackModalProps> = ({
  isOpen,
  onClose,
  activeDriver,
  activeVehicleId,
  onFeedbackSubmitted,
}) => {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [selectedTags, setSelectedTags] = useState<string[]>(['Standard Fare Used', 'Safe & Smooth Driving']);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  if (!isOpen) return null;

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeDriver) return;

    setIsSubmitting(true);
    try {
      const result = await submitSafetyReport({
        vehicleId: activeVehicleId || activeDriver.id,
        plateNumber: activeDriver.plateNumber,
        rating,
        tags: selectedTags,
        comment,
      });

      // Fire festive canvas confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#0066FF', '#10B981', '#E65A00', '#F59E0B'],
        });
      } catch (err) {
        // Safe if canvas is restricted
      }

      setShowCelebration(true);
      onFeedbackSubmitted(result.tokensEarned);

      setTimeout(() => {
        setShowCelebration(false);
        onClose();
      }, 1800);
    } catch (err) {
      console.error('Failed to submit report', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="ride-feedback-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in"
    >
      <div
        id="ride-feedback-modal"
        className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl border border-slate-100 text-[#0C2340] space-y-4 max-h-[90vh] overflow-y-auto"
      >
        {showCelebration ? (
          <div className="py-8 text-center space-y-3 animate-scale-up">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <Sparkles className="w-8 h-8 animate-bounce" />
            </div>
            <h3 className="text-xl font-black text-[#0C2340]">Audit Report Verified!</h3>
            <p className="text-xs text-slate-600">
              Thank you for contributing to Indian heritage tourist safety.
            </p>
            <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 font-mono font-extrabold text-sm">
              <span>🪙</span>
              <span>+15 Mitra Tokens Awarded!</span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#0C2340]">Log Trip Safety Audit</h3>
                <p className="text-xs text-slate-500">
                  Driver: <strong>{activeDriver?.name}</strong> ({activeDriver?.plateNumber})
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Star Rating */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
              <span className="text-xs font-semibold text-slate-600">Rate Ride Experience</span>
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    className="p-1 transition-transform hover:scale-125"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= (hoverRating || rating)
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-slate-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Tags Selection */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">
                Audit Feedback Tags:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {AVAILABLE_TAGS.map((tag) => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        isSelected
                          ? 'bg-[#0C2340] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Comment Box */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Additional Comments (Optional):
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Mention fare agreed, meter behavior, tout behavior, or helpful tips for other travellers..."
                rows={3}
                className="w-full text-xs p-3 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
              />
            </div>

            {/* Submit Button with Mitra Token Reward Flag */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 rounded-2xl bg-[#0066FF] text-white text-xs font-bold hover:bg-blue-700 active:scale-[0.98] transition-all shadow-md shadow-blue-500/25 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                <span>Submit Report & Claim +15 Mitra Tokens</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
