const STRAPI_URL = import.meta.env.VITE_STRAPI_URL ?? 'http://localhost:1337';

export function resolveStrapiMedia(url: string): string {
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
}

function getToken(): string | null {
  return localStorage.getItem('strapi_token') ?? import.meta.env.VITE_STRAPI_TOKEN ?? null;
}

export class StrapiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'StrapiError';
    this.status = status;
  }
}

export async function strapiFetch<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options?.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${STRAPI_URL}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const message = body?.error?.message ?? `Request failed with status ${res.status}`;
    throw new StrapiError(message, res.status);
  }

  return res.json();
}
