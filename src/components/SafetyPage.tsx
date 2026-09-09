import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Camera, Search, AlertTriangle, PhoneCall, Share2, History, Sparkles } from 'lucide-react';
import { PlateScannerCard } from './safety/PlateScannerCard';
import { SafeDriverCard } from './safety/SafeDriverCard';
import { DangerDriverCard } from './safety/DangerDriverCard';
import { UnverifiedDriverCard } from './safety/UnverifiedDriverCard';
import { CameraScannerModal } from './safety/CameraScannerModal';
import { PlateConfirmationModal } from './safety/PlateConfirmationModal';
import { RideFeedbackModal } from './safety/RideFeedbackModal';
import { RecentlyScanned } from './safety/RecentlyScanned';
import { searchVehicleByPlate } from '../services/vehicleService';
import { Driver, DataSource, RecentlyScannedItem } from '../types';

interface SafetyPageProps {
  onOpenSos: () => void;
  onShareGpsWhatsapp: () => void;
  onTokensUpdated: (newTokens: number) => void;
}

export const SafetyPage: React.FC<SafetyPageProps> = ({
  onOpenSos,
  onShareGpsWhatsapp,
  onTokensUpdated,
}) => {
  const [activeDriver, setActiveDriver] = useState<Driver | null>(null);
  const [activeVehicleId, setActiveVehicleId] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<DataSource>('mock');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Modals
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [detectedPlateCandidate, setDetectedPlateCandidate] = useState('');
  const [detectedConfidence, setDetectedConfidence] = useState(96.4);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  // Recently Scanned Vehicles cache
  const [recentVehicles, setRecentVehicles] = useState<RecentlyScannedItem[]>([
    {
      id: 'rec-1',
      plateNumber: 'DL-1RA-4521',
      driverName: 'Ramesh Kumar Sharma',
      vehicleType: 'Smart Green E-Rickshaw',
      trustScore: 96,
      status: 'verified',
      scannedAt: 'Just now',
    },
    {
      id: 'rec-2',
      plateNumber: 'DL-1RB-9988',
      driverName: 'Vikram Singh (Flagged)',
      vehicleType: 'Commercial Auto #9988',
      trustScore: 24,
      status: 'danger',
      scannedAt: '2h ago',
    },
  ]);

  const hasInitialized = useRef(false);

  // Requirement #22: Initial vehicle lookup on mount for DL-1RA-4521 so activeVehicleId is correctly populated
  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    async function initialVehicleLookup() {
      setIsLoading(true);
      try {
        const res = await searchVehicleByPlate('DL-1RA-4521');
        setActiveDriver(res.driver);
        setActiveVehicleId(res.vehicleId);
        setDataSource(res.dataSource);
      } catch (err) {
        console.warn('Initial vehicle lookup failed:', err);
      } finally {
        setIsLoading(false);
      }
    }

    initialVehicleLookup();
  }, []);

  const handleLookupPlate = async (plateQuery: string) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const result = await searchVehicleByPlate(plateQuery);
      setActiveDriver(result.driver);
      setActiveVehicleId(result.vehicleId);
      setDataSource(result.dataSource);

      // Add to recently scanned list
      const newItem: RecentlyScannedItem = {
        id: `rec-${Date.now()}`,
        plateNumber: result.driver.plateNumber,
        driverName: result.driver.name,
        vehicleType: result.driver.vehicleType,
        trustScore: result.driver.trustScore,
        status: result.driver.status,
        scannedAt: 'Just now',
      };

      setRecentVehicles((prev) => {
        const filtered = prev.filter((p) => p.plateNumber !== result.driver.plateNumber);
        return [newItem, ...filtered].slice(0, 6);
      });
    } catch (err: any) {
      setErrorMessage(err.message || 'Could not verify vehicle. Please check plate number.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlateDetectedFromOcr = (plate: string, confidence: number) => {
    setDetectedPlateCandidate(plate);
    setDetectedConfidence(confidence);
    setIsConfirmOpen(true);
  };

  const handleConfirmOcrPlate = (confirmedPlate: string) => {
    setIsConfirmOpen(false);
    handleLookupPlate(confirmedPlate);
  };

  return (
    <div id="safety-page-view" className="w-full max-w-7xl mx-auto px-4 space-y-6 pb-24">
      {/* Plate Scanner Main Card (Requirement #15 & #16) */}
      <PlateScannerCard
        onSearchPlate={handleLookupPlate}
        onOpenScanner={() => setIsCameraOpen(true)}
        isLoading={isLoading}
      />

      {/* Error Banner if any */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2 animate-shake">
          <AlertTriangle className="w-4 h-4 text-[#DC2626] shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Driver Result Cards based on status (Requirement #19) */}
      {activeDriver && (
        <div id="driver-verification-results">
          {activeDriver.status === 'verified' && (
            <SafeDriverCard
              driver={activeDriver}
              dataSource={dataSource}
              onOpenFeedback={() => setIsFeedbackOpen(true)}
            />
          )}

          {activeDriver.status === 'danger' && (
            <DangerDriverCard
              driver={activeDriver}
              dataSource={dataSource}
              onOpenSos={onOpenSos}
              onShareGpsWhatsapp={onShareGpsWhatsapp}
              onOpenFeedback={() => setIsFeedbackOpen(true)}
            />
          )}

          {activeDriver.status === 'unverified' && (
            <UnverifiedDriverCard
              driver={activeDriver}
              dataSource={dataSource}
              onOpenFeedback={() => setIsFeedbackOpen(true)}
              onScanAnother={() => {
                setActiveDriver(null);
                setErrorMessage(null);
              }}
            />
          )}
        </div>
      )}

      {/* Recently Scanned Vehicles List (Requirement #23) */}
      <RecentlyScanned
        items={recentVehicles}
        onSelectVehicle={(plate) => handleLookupPlate(plate)}
      />

      {/* Camera OCR Scanner Modal (Requirement #17) */}
      <CameraScannerModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onPlateDetected={handlePlateDetectedFromOcr}
      />

      {/* Plate Confirmation Modal (Requirement #18) */}
      <PlateConfirmationModal
        isOpen={isConfirmOpen}
        detectedPlate={detectedPlateCandidate}
        confidence={detectedConfidence}
        onConfirm={handleConfirmOcrPlate}
        onCancel={() => setIsConfirmOpen(false)}
      />

      {/* Ride Feedback & Safety Report Modal (+15 Mitra Tokens) (Requirement #21) */}
      <RideFeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
        activeDriver={activeDriver}
        activeVehicleId={activeVehicleId}
        onFeedbackSubmitted={(earned) => onTokensUpdated(earned)}
      />
    </div>
  );
};
