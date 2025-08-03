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
  email: string;
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