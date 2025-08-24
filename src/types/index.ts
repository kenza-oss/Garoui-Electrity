export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  applicationDate: string;
  status: 'nouveau' | 'en_cours' | 'accepte' | 'refuse';
  cvUrl?: string;
  coverLetterUrl?: string;
}

export interface Partner {
  id: string;
  companyName: string;
  contactName: string;
  password: string;
  phone: string;
  expertise: string[];
  location: string;
  status: 'pending' | 'approved' | 'rejected';
  documents: {
    kbis?: string;
    insurance?: string;
  };
  logoUrl?: string;
  secteur?: string;
  wilaya?: string;
  description?: string;
  site?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  voltage: string;
  price: number;
  image: string;
  description: string;
  specifications: Record<string, string>;
}

export interface QuoteRequest {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  company?: string;
  serviceType: string;
  description: string;
  status: 'en_attente' | 'en_cours' | 'envoye' | 'accepte';
  createdAt: string;
}

export interface JobOffer {
  id: string;
  title: string;
  description: string;
  contractType: 'cdi' | 'cdd' | 'stage' | 'apprentissage';
  experienceRequired: number;
  wilaya: string;
  createdAt: string;
  isActive: boolean;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profession: string;
  experience: number;
  subscriptionStatus: 'free' | 'premium' | 'expired';
  subscriptionEndDate?: string;
  createdAt: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  duration: number; // en mois
  features: string[];
  isPopular?: boolean;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank_transfer' | 'mobile_money';
  last4?: string;
  brand?: string;
  isDefault: boolean;
}

export interface Payment {
  id: string;
  userId: string;
  planId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  paymentMethod: string;
  createdAt: string;
  transactionId?: string;
}

export interface Company {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  wilaya: string;
  description: string;
  logoUrl?: string;
  isPartner: boolean;
  partnerSince?: string;
  contactPerson: string;
  website?: string;
}

export interface CompanyJobOffer {
  id: string;
  companyId: string;
  companyName: string;
  title: string;
  description: string;
  requirements: string[];
  contractType: 'cdi' | 'cdd' | 'stage' | 'apprentissage' | 'projet';
  experienceRequired: number;
  wilaya: string;
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  isActive: boolean;
  createdAt: string;
  applications: CompanyJobApplication[];
}

export interface CompanyJobApplication {
  id: string;
  jobOfferId: string;
  electricianId: string;
  electricianName: string;
  electricianEmail: string;
  electricianPhone: string;
  cvUrl?: string;
  coverLetterUrl?: string;
  status: 'nouveau' | 'en_cours' | 'accepte' | 'refuse';
  appliedAt: string;
}

export interface ElectricianCV {
  id: string;
  electricianId: string;
  electricianName: string;
  email: string;
  phone: string;
  experience: number;
  skills: string[];
  cvUrl: string;
  coverLetterUrl?: string;
  appliedAt: string;
}