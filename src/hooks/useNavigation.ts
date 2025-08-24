import { useState } from 'react';

export const useNavigation = () => {
  const [activeSection, setActiveSection] = useState('accueil');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigateTo = (section: string) => {
    setActiveSection(section);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return {
    activeSection,
    isMobileMenuOpen,
    navigateTo,
    toggleMobileMenu,
  };
};