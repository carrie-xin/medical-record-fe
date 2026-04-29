import Taro from '@tarojs/taro';
import { API_BASE_URL } from '@/shared/config/app';
import {
  ApiEnvelope,
  ApiErrorPayload,
  QueryParams,
  RequestOptions,
} from '@/shared/api/protocol';
import { storage } from '@/shared/utils/storage';

function buildQueryString(query?: QueryParams) {
  if (!query) {
    return '';
  }

  const searchParams = Object.entries(query).flatMap(([key, value]) => {
    if (value === undefined || value === null || value === '') {
      return [];
    }

    return `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`;
  });

  return searchParams.length ? `?${searchParams.join('&')}` : '';
}

function unwrapEnvelope<T>(payload: T | ApiEnvelope<T>) {
  if (
    payload &&
    typeof payload === 'object' &&
    'data' in (payload as ApiEnvelope<T>)
  ) {
    return (payload as ApiEnvelope<T>).data;
  }

  return payload as T;
}

export async function request<TResponse, TData = Record<string, unknown>>({
  url,
  method = 'GET',
  data,
  query,
}: RequestOptions<TData>) {
  const userId = storage.getUserId();
  const response = await Taro.request<TResponse | ApiEnvelope<TResponse>>({
    url: `${API_BASE_URL}${url}${buildQueryString(query)}`,
    method,
    data,
    timeout: 10000,
    header: {
      'content-type': 'application/json',
      ...(userId ? { 'x-user-id': userId } : {}),
    },
  });

  if (response.statusCode >= 400) {
    const errorData = response.data as ApiErrorPayload | undefined;
    const errorMessage =
      errorData?.message ||
      errorData?.error ||
      `Request failed with status ${response.statusCode}`;

    throw new Error(errorMessage);
  }

  return unwrapEnvelope(response.data);
}
