import { supabase, isSupabaseConfigured } from './supabaseClient';
import { ReportSubmission } from '../types';

const TOKENS_PER_REPORT = 15;
const STORAGE_KEY_REPORTS = 'safaradda_safety_reports_v1';
const STORAGE_KEY_USER_TOKENS = 'safaradda_user_tokens_v1';

export function getStoredUserTokens(): number {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_USER_TOKENS);
    return saved ? parseInt(saved, 10) : 145; // Default starter balance
  } catch {
    return 145;
  }
}

export function addMitraTokens(amount: number): number {
  const current = getStoredUserTokens();
  const updated = current + amount;
  try {
    localStorage.setItem(STORAGE_KEY_USER_TOKENS, updated.toString());
  } catch (err) {
    console.warn('Could not save tokens to localStorage', err);
  }
  return updated;
}

export async function submitSafetyReport(submission: ReportSubmission): Promise<{
  success: boolean;
  reportId: string;
  tokensEarned: number;
  dataSource: 'supabase' | 'local';
}> {
  const reportPayload = {
    vehicle_id: submission.vehicleId || null,
    plate_number: submission.plateNumber.toUpperCase(),
    rating: submission.rating,
    tags: submission.tags,
    comment: submission.comment || '',
    created_at: new Date().toISOString(),
    status: 'verified',
    reporter_tokens_awarded: TOKENS_PER_REPORT,
  };

  // 1. Try Supabase insert
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('safety_reports')
        .insert([reportPayload])
        .select('id')
        .single();

      if (!error && data) {
        addMitraTokens(TOKENS_PER_REPORT);
        return {
          success: true,
          reportId: data.id,
          tokensEarned: TOKENS_PER_REPORT,
          dataSource: 'supabase',
        };
      }
    } catch (err) {
      console.warn('Supabase safety report insert error, falling back to local store:', err);
    }
  }

  // 2. Local Fallback Persistence
  const localId = `rep-loc-${Date.now()}`;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_REPORTS);
    const existingList = raw ? JSON.parse(raw) : [];
    existingList.unshift({
      id: localId,
      ...reportPayload,
    });
    localStorage.setItem(STORAGE_KEY_REPORTS, JSON.stringify(existingList.slice(0, 50)));
  } catch (err) {
    console.warn('Local storage report save error', err);
  }

  addMitraTokens(TOKENS_PER_REPORT);

  return {
    success: true,
    reportId: localId,
    tokensEarned: TOKENS_PER_REPORT,
    dataSource: 'local',
  };
}
