import { useState, useEffect } from 'react';
import { api } from '../lib/api';

export const useCompanyVerification = () => {
  const [isPartner, setIsPartner] = useState(false);
  const [currentCompany, setCurrentCompany] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [partners, setPartners] = useState<any[]>([]);

  useEffect(() => {
    const checkCompanyStatus = async () => {
      setIsLoading(true);
      try {
        const company = await api.myCompany();
        if (company) {
          setCurrentCompany(company);
          setIsPartner(true);
        } else {
          setIsPartner(false);
        }
      } catch {
        setIsPartner(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkCompanyStatus();
  }, []);

  const checkCompanyByName = async (companyName: string): Promise<any | null> => {
    try {
      const result = await api.searchCompanies({ q: companyName });
      const list = Array.isArray(result) ? result : (result?.items || []);
      setPartners(list);
      return list.find((p: any) => (p.companyName || p.name || '').toLowerCase() === companyName.toLowerCase()) || null;
    } catch {
      return null;
    }
  };

  const checkCompanyByPassword = async (_password: string): Promise<any | null> => {
    // No password search in public API; return null
    return null;
  };

  const setCurrentCompanyAsPartner = (company: any) => {
    setCurrentCompany(company);
    setIsPartner(true);
  };

  const clearCurrentCompany = () => {
    setCurrentCompany(null);
    setIsPartner(false);
  };

  return {
    isPartner,
    currentCompany,
    isLoading,
    existingPartners: partners,
    checkCompanyByName,
    checkCompanyByPassword,
    setCurrentCompanyAsPartner,
    clearCurrentCompany,
  };
};
