import { request } from '@/shared/api/request';
import {
  CreateMedicalRecordPayload,
  MedicalRecord,
} from '@/features/medical-record/types';

export function createMedicalRecord(payload: CreateMedicalRecordPayload) {
  return request<MedicalRecord, CreateMedicalRecordPayload>({
    url: '/medical-records',
    method: 'POST',
    data: payload,
  });
}

export function getMedicalRecords(babyId?: string) {
  return request<MedicalRecord[]>({
    url: '/medical-records',
    query: {
      babyId,
    },
  });
}
