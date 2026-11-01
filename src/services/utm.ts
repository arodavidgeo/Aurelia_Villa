import { UTMData } from '../types';

const UTM_STORAGE_KEY = 'va_utm_parameters';

export const initUTMTracking = (): UTMData => {
  if (typeof window === 'undefined') return {};

  try {
    const params = new URLSearchParams(window.location.search);
    const utmKeys: (keyof UTMData & string)[] = [
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'utm_term',
      'utm_content',
    ];

    const currentUtm: UTMData = {};
    let hasUtm = false;

    utmKeys.forEach((key) => {
      const val = params.get(key);
      if (val) {
        currentUtm[key] = val;
        hasUtm = true;
      }
    });

    if (hasUtm) {
      sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(currentUtm));
      return currentUtm;
    }

    // Retrieve previous UTM from this session if present
    const stored = sessionStorage.getItem(UTM_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.warn('Failed to parse or persist UTM parameters:', e);
  }

  return {};
};

export const getStoredUTM = (): UTMData => {
  if (typeof window === 'undefined') return {};
  try {
    const stored = sessionStorage.getItem(UTM_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

