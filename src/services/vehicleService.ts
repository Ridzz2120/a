import { supabase, isSupabaseConfigured } from './supabaseClient';
import { Driver, VehicleRecord, DataSource } from '../types';

/**
 * Normalizes Indian registration plate formats.
 * Removes whitespace, dashes, dots, and converts to uppercase.
 * Example: "dl-1ra-4521" -> "DL1RA4521"
 */
export function normalizePlateNumber(plate: string): string {
  if (!plate) return '';
  return plate
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .trim();
}

/**
 * Transforms raw Supabase vehicle record to Driver interface
 */
export function vehicleRecordToDriver(record: VehicleRecord): Driver {
  return {
    id: record.id,
    plateNumber: record.plate_number,
    name: record.driver_name || 'Registered Driver',
    vehicleType: record.vehicle_type || 'Electric Rickshaw',
    trustScore: record.trust_score ?? 85,
    status: record.status || (record.trust_score < 40 ? 'danger' : 'verified'),
    isVerified: Boolean(record.is_verified),
    totalTrips: record.total_trips ?? 1240,
    rating: record.rating ?? 4.8,
    phone: record.phone_number,
    rtoState: record.rto_registered_state || 'Delhi RTO',
    complaintsCount: record.complaints_count ?? 0,
    flags: record.flags || [],
    lastInspected: record.last_inspected || 'August 2026',
    badge: record.badge || 'Verified Tourism Commute Partner',
    photoUrl: record.photo_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
  };
}

/**
 * Benchmark Mock Drivers for Instant Fallback and Quick Demo Presets
 */
export const MOCK_DRIVERS: Record<string, Driver> = {
  'DL1RA4521': {
    id: 'veh-safe-001',
    plateNumber: 'DL-1RA-4521',
    name: 'Ramesh Kumar Sharma',
    vehicleType: 'Smart Green E-Rickshaw #4521',
    trustScore: 96,
    status: 'verified',
    isVerified: true,
    totalTrips: 2840,
    rating: 4.9,
    phone: '+91 98712 34567',
    rtoState: 'Delhi Central RTO (Registered & Police Cleared)',
    complaintsCount: 0,
    flags: ['Zero Overcharging Flags', 'Tourism Board Badge Holder', 'GPS Telemetry Active', 'Digital UPI Verified'],
    lastInspected: '28 Aug 2026',
    badge: '★ Elite Heritage Guardian Driver',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80',
  },
  'DL1RB9988': {
    id: 'veh-danger-002',
    plateNumber: 'DL-1RB-9988',
    name: 'Vikram Singh (Flagged Operator)',
    vehicleType: 'Non-Metered Commercial Auto #9988',
    trustScore: 24,
    status: 'danger',
    isVerified: false,
    totalTrips: 410,
    rating: 2.1,
    phone: '+91 98111 88899',
    rtoState: 'Delhi North RTO (Permit Status: Suspended/Warning)',
    complaintsCount: 18,
    flags: [
      '18 Severe Overcharging Complaints',
      'Unauthorized Monument Tout Zone Loitering',
      'Manipulated Fare Quote Reported (₹250 vs ₹20)',
      'Aggressive Tourist Harassment Flagged',
      'Tampered Meter Inspection Notice'
    ],
    lastInspected: 'Expired May 2025',
    badge: '🚨 Critical High-Risk Alert',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
  },
  'DL1RC1234': {
    id: 'veh-unverified-003',
    plateNumber: 'DL-1RC-1234',
    name: 'Unregistered Commercial Fleet Operator',
    vehicleType: 'Private Commercial Transport',
    trustScore: 48,
    status: 'unverified',
    isVerified: false,
    totalTrips: 45,
    rating: 3.5,
    phone: '+91 98990 00000',
    rtoState: 'RTO Verification Pending / No Police ID Match',
    complaintsCount: 2,
    flags: [
      'Vehicle Not Registered with Heritage Transit Cell',
      'No SafarAdda Safety Badge Active',
      'Fare Tariff Not Standardized by Municipal Authority'
    ],
    lastInspected: 'Not on Record',
    badge: '⚠️ Unverified Driver Notice',
    photoUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=80',
  },
};

export const QUICK_DEMO_PRESETS = [
  {
    label: 'Safe Driver',
    plate: 'DL-1RA-4521',
    cleanPlate: 'DL1RA4521',
    status: 'verified',
    color: 'emerald',
    score: '96% Trust',
  },
  {
    label: 'High Risk',
    plate: 'DL-1RB-9988',
    cleanPlate: 'DL1RB9988',
    status: 'danger',
    color: 'crimson',
    score: '24% Risk',
  },
  {
    label: 'Unverified',
    plate: 'DL-1RC-1234',
    cleanPlate: 'DL1RC1234',
    status: 'unverified',
    color: 'slate',
    score: 'Pending',
  },
];

/**
 * Searches for a vehicle in Supabase `vehicles` table,
 * falling back gracefully to benchmark mock drivers or creating an unverified profile.
 */
export async function searchVehicleByPlate(plateNumber: string): Promise<{
  driver: Driver;
  vehicleId: string;
  dataSource: DataSource;
}> {
  const clean = normalizePlateNumber(plateNumber);
  if (!clean) {
    throw new Error('Please enter a valid registration plate number');
  }

  // 1. Try Supabase if configured
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .or(`plate_number.ilike.%${clean}%,plate_number.eq.${plateNumber}`)
        .limit(1)
        .maybeSingle();

      if (!error && data) {
        const driver = vehicleRecordToDriver(data as VehicleRecord);
        return {
          driver,
          vehicleId: data.id,
          dataSource: 'supabase',
        };
      }
    } catch (err) {
      console.warn('Supabase query error, switching to mock/local fallback:', err);
    }
  }

  // 2. Try Benchmark Mock Drivers lookup
  if (MOCK_DRIVERS[clean]) {
    const driver = MOCK_DRIVERS[clean];
    return {
      driver,
      vehicleId: driver.id,
      dataSource: 'mock',
    };
  }

  // 3. Fallback: Dynamic Unverified Driver Record
  const dynamicUnverified: Driver = {
    id: `veh-unv-${clean}`,
    plateNumber: plateNumber.toUpperCase(),
    name: 'Unlisted Independent Operator',
    vehicleType: 'Commercial Auto / E-Rickshaw',
    trustScore: 45,
    status: 'unverified',
    isVerified: false,
    totalTrips: 12,
    rating: 3.4,
    rtoState: 'Cross-State Verification In Progress',
    complaintsCount: 0,
    flags: [
      'Plate not registered in SafarAdda safety ledger',
      'Exercise caution: agree on ₹10–₹20 flat fare before boarding',
      'Help fellow tourists: submit a safety report after your ride'
    ],
    badge: 'Unregistered Vehicle Notice',
    photoUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=80',
  };

  return {
    driver: dynamicUnverified,
    vehicleId: dynamicUnverified.id,
    dataSource: 'local',
  };
}
