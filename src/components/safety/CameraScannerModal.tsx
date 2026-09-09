import React, { useState, useRef, useEffect } from 'react';
import { Camera, X, RefreshCw, Upload, Sparkles, Check, AlertCircle } from 'lucide-react';

interface CameraScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlateDetected: (detectedPlate: string, confidence: number) => void;
}

export const CameraScannerModal: React.FC<CameraScannerModalProps> = ({
  isOpen,
  onClose,
  onPlateDetected,
}) => {
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(true);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      // Stop camera stream when modal is closed
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
      }
      return;
    }

    let currentStream: MediaStream | null = null;

    async function initCamera() {
      try {
        const media = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
        });
        currentStream = media;
        setStream(media);
        setHasCameraPermission(true);
        if (videoRef.current) {
          videoRef.current.srcObject = media;
        }
      } catch (err) {
        console.warn('Camera access not granted or not available:', err);
        setHasCameraPermission(false);
      }
    }

    initCamera();

    return () => {
      if (currentStream) {
        currentStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const simulateOcrCapture = (plateCandidate?: string) => {
    setIsScanning(true);
    // Simulate high-speed AI OCR recognition delay
    setTimeout(() => {
      const detected = plateCandidate || 'DL-1RA-4521';
      const confidence = 96.4;
      onPlateDetected(detected, confidence);
      onClose();
    }, 900);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      simulateOcrCapture('DL-1RA-4521');
    }
  };

  return (
    <div
      id="camera-scanner-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in"
    >
      <div
        id="camera-scanner-modal"
        className="w-full max-w-lg rounded-3xl bg-[#0C2340] text-white p-6 shadow-2xl border border-white/20 relative flex flex-col space-y-4"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-600 text-white">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold">Smart AI Plate Scanner</h3>
              <p className="text-[11px] text-blue-200">Point viewfinder at vehicle number plate</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Viewfinder Viewport */}
        <div className="relative w-full aspect-[4/3] rounded-2xl bg-black overflow-hidden border-2 border-blue-500/50 flex items-center justify-center">
          {hasCameraPermission ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="p-6 text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-white/10 flex items-center justify-center text-blue-400">
                <Camera className="w-6 h-6" />
              </div>
              <p className="text-xs text-slate-300">
                Camera stream simulation active or permission required. You can capture instant sample or upload a plate photo.
              </p>
            </div>
          )}

          {/* OCR Target Alignment Bounding Box */}
          <div className="absolute inset-x-8 inset-y-12 border-2 border-dashed border-[#0066FF] rounded-xl pointer-events-none flex items-center justify-center">
            {/* Corner Markers */}
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-amber-400" />
            <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-amber-400" />
            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-amber-400" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-amber-400" />

            {/* Scanning Laser Line */}
            <div className="w-full h-0.5 bg-[#10B981] shadow-lg shadow-emerald-500 animate-pulse" />
          </div>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/70 text-[10px] font-mono font-bold tracking-wider text-emerald-400">
            AUTO-DETECT OCR: ENGAGED
          </div>
        </div>

        {/* Action Controls */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => simulateOcrCapture('DL-1RA-4521')}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#0066FF] text-white font-bold text-xs hover:bg-blue-600 transition-all shadow-md shadow-blue-500/30"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Capture Plate</span>
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/10 text-white font-bold text-xs hover:bg-white/20 transition-all border border-white/20"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Photo</span>
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />
        </div>
      </div>
    </div>
  );
};
