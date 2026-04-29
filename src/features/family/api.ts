import { request } from '@/shared/api/request';
import { CreateFamilyPayload, Family } from '@/features/family/types';

export function createFamily(payload: CreateFamilyPayload) {
  return request<Family, CreateFamilyPayload>({
    url: '/families',
    method: 'POST',
    data: payload,
  });
}

export function getFamilies() {
  return request<Family[]>({
    url: '/families',
  });
}
