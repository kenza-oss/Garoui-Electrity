// Simple API client for Garoui backend

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

function getToken() {
  try {
    return localStorage.getItem('garoui_token');
  } catch {
    return null;
  }
}

async function request<T>(path: string, options: { method?: HttpMethod; body?: any; headers?: Record<string, string> } = {}): Promise<T> {
  const { method = 'GET', body, headers = {} } = options;

  const token = getToken();
  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: isFormData ? body : body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    let message = `HTTP ${res.status}`;
    try {
      const data = await res.json();
      message = (data && (data.message || data.error)) || message;
    } catch {}
    throw new Error(message);
  }

  // Some endpoints may return 204 No Content
  if (res.status === 204) return undefined as unknown as T;

  const contentType = res.headers.get('Content-Type') || '';
  if (contentType.includes('application/json')) {
    return (await res.json()) as T;
  }
  // Fallback: text
  return (await res.text()) as unknown as T;
}

export const api = {
  // Auth
  async login(payload: { email: string; password: string }) {
    // Expected: { token }
    const data = await request<{ token: string }>(`/auth/login`, { method: 'POST', body: payload });
    localStorage.setItem('garoui_token', data.token);
    return data;
  },
  async register(payload: Record<string, any>) {
    return request(`/auth/register`, { method: 'POST', body: payload });
  },
  async logout() {
    localStorage.removeItem('garoui_token');
  },
  async getProfile() {
    return request(`/auth/profile`);
  },

  // Subscription
  async subscribe(payload: { plan: 'mensuel' | 'trimestriel'; [k: string]: any }) {
    return request(`/abonnement/souscrire`, { method: 'POST', body: payload });
  },
  async getMySubscription() {
    return request(`/abonnement/mon-abonnement`);
  },
  async cancelSubscription() {
    return request(`/abonnement/annuler`, { method: 'POST' });
  },

  // Job Offers
  async listOffers() {
    return request(`/offres`);
  },
  async getOffer(id: string) {
    return request(`/offres/${id}`);
  },
  async createOffer(payload: Record<string, any>) {
    return request(`/offres`, { method: 'POST', body: payload });
  },
  async updateOffer(id: string, payload: Record<string, any>) {
    return request(`/offres/${id}`, { method: 'PUT', body: payload });
  },
  async deleteOffer(id: string) {
    return request(`/offres/${id}`, { method: 'DELETE' });
  },

  // Recruitment – candidate application with files
  async submitCandidature(form: FormData) {
    return request(`/recrutement/candidature`, { method: 'POST', body: form });
  },
  async myCandidatures() {
    return request(`/recrutement/mes-candidatures`);
  },

  // Sous-traitance (company)
  async myCompany() {
    return request(`/sous-traitance/mon-entreprise`);
  },
  async createCompany(payload: Record<string, any>) {
    return request(`/sous-traitance/entreprise`, { method: 'POST', body: payload });
  },
  async searchCompanies(query: Record<string, string>) {
    const params = new URLSearchParams(query).toString();
    return request(`/sous-traitance/recherche?${params}`);
  },
};

export type ApiClient = typeof api;

