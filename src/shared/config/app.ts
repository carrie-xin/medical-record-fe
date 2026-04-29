export const API_BASE_URL =
  process.env.TARO_APP_API_BASE_URL || 'http://127.0.0.1:3000/api';

export const STORAGE_KEYS = {
  userId: 'medical-record-user-id',
  familyId: 'medical-record-family-id',
  babyId: 'medical-record-baby-id',
} as const;
