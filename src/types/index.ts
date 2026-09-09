export type DriverStatus = 'verified' | 'danger' | 'unverified';

export type DataSource = 'supabase' | 'mock' | 'local';

export interface VehicleRecord {
  id: string;
  plate_number: string;
  driver_name: string;
  vehicle_type: string;
  trust_score: number;
  status: DriverStatus;
  is_verified: boolean;
  total_trips: number;
  rating: number;
  phone_number?: string;
  rto_registered_state?: string;
  complaints_count?: number;
  flags?: string[];
  last_inspected?: string;
  badge?: string;
  photo_url?: string;
}

export interface Driver {
  id: string;
  plateNumber: string;
  name: string;
  vehicleType: string;
  trustScore: number;
  status: DriverStatus;
  isVerified: boolean;
  totalTrips: number;
  rating: number;
  phone?: string;
  rtoState?: string;
  complaintsCount: number;
  flags: string[];
  lastInspected?: string;
  badge?: string;
  photoUrl?: string;
}

export interface SafetyReport {
  id: string;
  vehicle_id?: string;
  plate_number: string;
  rating: number;
  tags: string[];
  comment?: string;
  created_at: string;
  status: 'pending' | 'verified' | 'flagged';
  reporter_tokens_awarded: number;
}

export interface ReportSubmission {
  vehicleId?: string;
  plateNumber: string;
  rating: number;
  tags: string[];
  comment?: string;
}

export interface RecentlyScannedItem {
  id: string;
  plateNumber: string;
  driverName: string;
  vehicleType: string;
  trustScore: number;
  status: DriverStatus;
  scannedAt: string;
}

export interface TransitDirective {
  rate: string;
  spot: string;
  trap: string;
  wait: string;
}

export interface TimingWindow {
  bestWindow: string;
  bestDescription: string;
  peakRush: string;
  peakDescription: string;
  crowdLevel: number; // 0 - 100
}

export interface ScamWarning {
  id: string;
  title: string;
  severity: 'high' | 'medium' | 'critical';
  description: string;
  trapFare: string;
  officialFare: string;
  advice: string;
}

export interface RadarTarget {
  id: string;
  name: string;
  type: 'verified_stand' | 'scam_zone' | 'heritage_gate' | 'metro_hub' | 'rickshaw_cluster';
  distance: number; // in meters
  angle: number; // 0 - 360 degrees
  fareEst: string;
  statusText: string;
  isFlagged?: boolean;
  coordsText: string;
}

export type TransitMode = 'ERIKSHAW' | 'SHAREDAUTO' | 'HERITAGEWALK';

export interface RouteAlternative {
  id: string;
  mode: TransitMode;
  title: string;
  fare: string;
  duration: string;
  safetyScore: number;
  highlight: string;
  badgeText: string;
}

export interface HeritageMonument {
  id: string;
  name: string;
  city: string;
  state: string;
  primaryGate: string;
  headline: string;
  description: string;
  heroImage: string;
  videoThumb: string;
  videoDuration: string;
  directives: TransitDirective;
  timings: TimingWindow;
  scams: ScamWarning[];
  radarTargets: RadarTarget[];
  routeAlternatives: RouteAlternative[];
  officialTicketPrice: string;
  openingHours: string;
}

export interface MitraUser {
  tokens: number;
  level: string;
  reportsSubmitted: number;
  scansPerformed: number;
  passesRedeemed: number;
}
