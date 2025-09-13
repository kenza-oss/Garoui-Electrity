// Simple API client for Garoui backend

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
const DEFAULT_IMAGE = '/default.jpg';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

function getToken() {
  try {
    return localStorage.getItem('garoui_token');
  } catch {
    return null;
  }
}

function pickImage(...vals: Array<any>) {
  for (const v of vals) {
    if (typeof v === 'string' && v.trim().length > 0) return v;
  }
  return DEFAULT_IMAGE;
}

async function request<T>(path: string, options: { method?: HttpMethod; body?: any; headers?: Record<string, string> } = {}): Promise<T> {
  const { method = 'GET', body, headers = {} } = options;

  const token = getToken();
  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      // Only set Content-Type when sending a non-FormData body
      ...(!isFormData && body ? { 'Content-Type': 'application/json' } : {}),
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
    if (typeof window !== 'undefined') {
      // Surface errors to console during dev
      // eslint-disable-next-line no-console
      console.error('API error', { path, status: res.status, message });
    }
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
  // Normalizers to tolerate backend field naming variations
  _normalizeOffer(item: any) {
    return {
      id: String(item.id ?? item._id ?? ''),
      title: item.title ?? item.titre ?? '',
      description: item.description ?? '',
      contractType: (item.contractType ?? item.contract_type ?? 'cdi') as 'cdi'|'cdd'|'stage'|'apprentissage'|'projet',
      experienceRequired: Number(item.experienceRequired ?? item.experience ?? item.years ?? 0),
      wilaya: item.wilaya ?? item.location ?? item.region ?? '',
      createdAt: item.createdAt ?? item.created_at ?? item.created ?? new Date().toISOString(),
      isActive: Boolean(item.isActive ?? item.active ?? item.is_active ?? true),
    };
  },
  _normalizeProduct(item: any) {
    return {
      id: String(item.id ?? item._id ?? ''),
      name: item.name ?? item.nom ?? item.title ?? '',
      category: item.category ?? item.categorie ?? '',
      voltage: item.voltage ?? item.tension ?? '',
      price: Number(item.price ?? item.prix ?? 0),
      image: pickImage(item.image, item.imageUrl, item.image_url),
      description: item.description ?? '',
      specifications: item.specifications ?? item.specs ?? {},
    };
  },
  _normalizeService(item: any) {
    return {
      id: String(item.id ?? item._id ?? ''),
      title: item.title ?? item.name ?? '',
      description: item.description ?? '',
      icon: item.icon ?? '',
      category: item.category ?? '',
    };
  },
  _normalizePartner(item: any) {
    return {
      id: String(item.id ?? item._id ?? ''),
      companyName: item.companyName ?? item.raison_sociale ?? item.name ?? '',
      contactName: item.contactName ?? item.contact ?? '',
      phone: item.phone ?? '',
      expertise: Array.isArray(item.expertise) ? item.expertise : (Array.isArray(item.specialites) ? item.specialites : []),
      location: item.location ?? item.wilaya ?? item.region ?? '',
      status: item.status ?? 'approved',
      documents: item.documents ?? {},
      logoUrl: pickImage(item.logoUrl, item.logo_url),
      secteur: item.secteur ?? item.category ?? undefined,
      wilaya: item.wilaya ?? item.region ?? undefined,
      description: item.description ?? undefined,
      site: item.site ?? item.website ?? undefined,
    };
  },
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
    const raw = await request<any>(`/offres`);
    const list = Array.isArray(raw) ? raw : (raw?.items || raw?.offres || []);
    return list.map((it: any) => this._normalizeOffer(it));
  },
  async getOffer(id: string) {
    const raw = await request<any>(`/offres/${id}`);
    const item = raw?.offer ?? raw?.offre ?? raw;
    return this._normalizeOffer(item);
  },
  async createOffer(payload: Record<string, any>) {
    const raw = await request<any>(`/offres`, { method: 'POST', body: payload });
    const item = raw?.offer ?? raw?.offre ?? raw;
    return this._normalizeOffer(item);
  },
  async updateOffer(id: string, payload: Record<string, any>) {
    const raw = await request<any>(`/offres/${id}`, { method: 'PUT', body: payload });
    const item = raw?.offer ?? raw?.offre ?? raw;
    return this._normalizeOffer(item);
  },
  async deleteOffer(id: string) {
    return request(`/offres/${id}`, { method: 'DELETE' });
  },

  // Offers -> subscribers (applications)
  async listOfferSubscribers(offreId: string) {
    const raw = await request<any>(`/offres-abonnes/${offreId}/abonnes`);
    const list = Array.isArray(raw) ? raw : (raw?.items || raw?.abonnes || raw?.candidats || raw?.applications || []);
    return list;
  },

  // Recruitment – candidate application with files
  async submitCandidature(form: FormData) {
    return request(`/recrutement/candidature`, { method: 'POST', body: form });
  },
  async myCandidatures() {
    const raw = await request<any>(`/recrutement/mes-candidatures`);
    const list = Array.isArray(raw) ? raw : (raw?.items || raw?.candidatures || []);
    return list;
  },

  // Sous-traitance (company)
  async myCompany() {
    const raw = await request<any>(`/sous-traitance/mon-entreprise`);
    return raw?.entreprise ?? raw?.company ?? raw;
  },
  async createCompany(payload: Record<string, any>) {
    return request(`/sous-traitance/entreprise`, { method: 'POST', body: payload });
  },
  async searchCompanies(query: Record<string, string>) {
    const params = new URLSearchParams(query).toString();
    const raw = await request<any>(`/sous-traitance/recherche?${params}`);
    const list = Array.isArray(raw) ? raw : (raw?.items || raw?.entreprises || raw?.companies || []);
    return list.map((it: any) => this._normalizePartner(it));
  },

  // Services
  async listServices() {
    const raw = await request<any>(`/services/catalogue`);
    const list = Array.isArray(raw) ? raw : (raw?.items || raw?.services || []);
    return list.map((it: any) => this._normalizeService(it));
  },
  async createDevis(payload: Record<string, any>) {
    return request(`/services/devis`, { method: 'POST', body: payload });
  },
  async myDevis() {
    const raw = await request<any>(`/services/mes-devis`);
    const list = Array.isArray(raw) ? raw : (raw?.items || raw?.devis || []);
    return list;
  },

  // Partenaires
  async listPartners() {
    const raw = await request<any>(`/partenaires/partenaires`);
    const list = Array.isArray(raw) ? raw : (raw?.items || raw?.partenaires || []);
    return list.map((it: any) => this._normalizePartner(it));
  },
  async listPartnerCategories() {
    const raw = await request<any>(`/partenaires/categories`);
    return raw?.categories || raw?.items || raw;
  },

  // Matériel
  async listProducts() {
    const raw = await request<any>(`/materiel/produits`);
    const list = Array.isArray(raw) ? raw : (raw?.items || raw?.produits || []);
    return list.map((it: any) => this._normalizeProduct(it));
  },
  async listCategories() {
    const raw = await request<any>(`/materiel/categories`);
    return raw?.categories || raw?.items || raw;
  },
  async listBrands() {
    const raw = await request<any>(`/materiel/marques`);
    return raw?.brands || raw?.marques || raw?.items || raw;
  },
};

export type ApiClient = typeof api;
