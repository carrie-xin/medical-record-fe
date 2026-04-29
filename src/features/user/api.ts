import { request } from '@/shared/api/request';
import { CreateUserPayload, User } from '@/features/user/types';

export function createUser(payload: CreateUserPayload) {
  return request<User, CreateUserPayload>({
    url: '/users',
    method: 'POST',
    data: payload,
  });
}

export function getUsers() {
  return request<User[]>({
    url: '/users',
  });
}
