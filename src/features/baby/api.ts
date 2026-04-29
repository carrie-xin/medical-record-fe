import { request } from '@/shared/api/request';
import { Baby, CreateBabyPayload } from '@/features/baby/types';

export function createBaby(payload: CreateBabyPayload) {
  return request<Baby, CreateBabyPayload>({
    url: '/babies',
    method: 'POST',
    data: payload,
  });
}

export function getBabies(familyId?: string) {
  return request<Baby[]>({
    url: '/babies',
    query: {
      familyId,
    },
  });
}
