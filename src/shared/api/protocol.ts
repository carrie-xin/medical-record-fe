export interface ApiEnvelope<T> {
  data: T;
  message?: string;
  code?: string | number;
}

export interface ApiErrorPayload {
  message?: string;
  error?: string;
  code?: string | number;
}

export interface QueryParams {
  [key: string]: string | number | boolean | undefined | null;
}

export interface RequestOptions<TData> {
  url: string;
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  data?: TData;
  query?: QueryParams;
}
