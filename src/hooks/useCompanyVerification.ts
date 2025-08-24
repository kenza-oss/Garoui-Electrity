import { useState, useEffect } from 'react';
import { Partner } from '../types';

// Mock data des partenaires existants - dans une vraie app, ceci viendrait d'une API
const existingPartners: Partner[] = [
  {
    id: '1',
    companyName: 'Mono Electric',
    contactName: 'Service Commercial',
    password: 'mono2024',
    phone: '+213 21 00 00 01',
    expertise: ['Appareillage', 'LED'],
    location: 'Alger',
    status: 'approved',
    documents: { kbis: 'available', insurance: 'available' },
    logoUrl: 'mono.png',
    secteur: 'Appareillage & LED',
    wilaya: 'Alger',
    description: 'Fabricant d\'appareillage électrique et solutions LED pour le résidentiel et le tertiaire.',
    site: 'https://monoelectric.com',
  },
  {
    id: '2',
    companyName: 'BMS Electric SARL',
    contactName: 'Service Client',
    password: 'bms2024',
    phone: '+213 21 00 00 02',
    expertise: ['Appareillage', 'Accessoires'],
    location: 'Oran',
    status: 'approved',
    documents: { kbis: 'available', insurance: 'available' },
    logoUrl: 'bms.jpg',
    secteur: 'Appareillage & accessoires',
    wilaya: 'Oran',
    description: 'Distributeur d\'appareillage, accessoires et solutions électriques pour professionnels.',
    site: 'https://bms-electric.com',
  },
  {
    id: '3',
    companyName: 'SAIEG (Sonelgaz)',
    contactName: 'Direction',
    password: 'saieg2024',
    phone: '+213 21 00 00 03',
    expertise: ['Équipements énergétiques'],
    location: 'Blida',
    status: 'approved',
    documents: { kbis: 'available', insurance: 'available' },
    logoUrl: 'sonalgaz.png',
    secteur: 'Équipements énergétiques',
    wilaya: 'Blida',
    description: 'Filiale Sonelgaz spécialisée dans les équipements et solutions énergétiques.',
    site: 'https://fr.wikipedia.org/wiki/SAIEG',
  },
  {
    id: '4',
    companyName: 'Schneider Electric Algérie',
    contactName: 'Service Pro',
    password: 'schneider2024',
    phone: '+213 21 00 00 04',
    expertise: ['Automatisme', 'Distribution'],
    location: 'Alger',
    status: 'approved',
    documents: { kbis: 'available', insurance: 'available' },
    logoUrl: 'schneider.jpg',
    secteur: 'Automatisme & distribution',
    wilaya: 'Alger',
    description: 'Leader mondial des solutions d\'automatisme et de distribution électrique.',
    site: 'https://www.se.com/dz/fr/',
  },
  {
    id: '5',
    companyName: 'Legrand Algérie',
    contactName: 'Service Commercial',
    password: 'legrand2024',
    phone: '+213 21 00 00 05',
    expertise: ['Appareillage', 'Domotique'],
    location: 'Alger',
    status: 'approved',
    documents: { kbis: 'available', insurance: 'available' },
    logoUrl: 'legrand.png',
    secteur: 'Appareillage & domotique',
    wilaya: 'Alger',
    description: 'Spécialiste des solutions d\'appareillage électrique et de domotique.',
    site: 'https://www.legrand.fr/',
  },
  {
    id: '6',
    companyName: 'Entreprise Électrique Plus',
    contactName: 'Ahmed Benali',
    password: 'entreprise2024',
    phone: '+213 123 456 789',
    expertise: ['Installation électrique', 'Maintenance'],
    location: 'Alger',
    status: 'approved',
    documents: { kbis: 'available', insurance: 'available' },
    logoUrl: undefined,
    secteur: 'Installation & maintenance',
    wilaya: 'Alger',
    description: 'Spécialisée dans l\'installation électrique industrielle et la maintenance.',
    site: 'www.entreprise-electrique.com',
  }
];

export const useCompanyVerification = () => {
  const [isPartner, setIsPartner] = useState(false);
  const [currentCompany, setCurrentCompany] = useState<Partner | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simuler une vérification asynchrone
    const checkCompanyStatus = async () => {
      setIsLoading(true);
      
      // Dans une vraie app, on ferait un appel API ici
      // Pour la démo, on simule une vérification basée sur le localStorage
      const savedCompanyId = localStorage.getItem('garoui-current-company-id');
      
      if (savedCompanyId) {
        const company = existingPartners.find(p => p.id === savedCompanyId);
        if (company) {
          setCurrentCompany(company);
          setIsPartner(true);
        }
      }
      
      setIsLoading(false);
    };

    checkCompanyStatus();
  }, []);

  const checkCompanyByName = (companyName: string): Partner | null => {
    return existingPartners.find(p => 
      p.companyName.toLowerCase() === companyName.toLowerCase()
    ) || null;
  };

  const checkCompanyByPassword = (password: string): Partner | null => {
    return existingPartners.find(p => 
      p.password === password
    ) || null;
  };

  const setCurrentCompanyAsPartner = (company: Partner) => {
    setCurrentCompany(company);
    setIsPartner(true);
    localStorage.setItem('garoui-current-company-id', company.id);
  };

  const clearCurrentCompany = () => {
    setCurrentCompany(null);
    setIsPartner(false);
    localStorage.removeItem('garoui-current-company-id');
  };

  return {
    isPartner,
    currentCompany,
    isLoading,
    existingPartners,
    checkCompanyByName,
    checkCompanyByPassword,
    setCurrentCompanyAsPartner,
    clearCurrentCompany
  };
};
