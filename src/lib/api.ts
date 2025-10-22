export const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    console.error(`[API ERROR] ${endpoint}`, await res.text());
    throw new Error(`Failed to fetch ${endpoint}`);
  }

  return res.json();
}