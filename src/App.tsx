import React from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './components/sections/HomePage';
import { RecruitmentPage } from './components/sections/RecruitmentPage';
import { SubcontractingPage } from './components/sections/SubcontractingPage';
import { ServicesPage } from './components/sections/ServicesPage';
import { MaterialPage } from './components/sections/MaterialPage';
import { ContactPage } from './components/sections/ContactPage';
// TODO: import PartnerPage, ContactPage quand créés

const navToSection: Record<string, string> = {
  '/': 'accueil',
  '/recrutement': 'recrutement',
  '/sous-traitance': 'sous-traitance',
  '/services': 'services',
  '/materiel': 'materiel',
  '/partenaires': 'partenaires',
  '/contact': 'contact',
};

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const activeSection = navToSection[location.pathname] || 'accueil';
  const [isMobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleNavigate = (section: string) => {
    setMobileMenuOpen(false);
    if (section.startsWith('/')) {
      navigate(section);
      return;
    }
    switch (section) {
      case 'recrutement':
        navigate('/recrutement');
        break;
      case 'sous-traitance':
        navigate('/sous-traitance');
        break;
      case 'services':
        navigate('/services');
        break;
      case 'materiel':
        navigate('/materiel');
        break;
      case 'partenaires':
        navigate('/partenaires');
        break;
      case 'contact':
        navigate('/contact');
        break;
      default:
        navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header
        activeSection={activeSection}
        isMobileMenuOpen={isMobileMenuOpen}
        onNavigate={handleNavigate}
        onToggleMobileMenu={() => setMobileMenuOpen((v) => !v)}
      />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage onNavigate={handleNavigate} />} />
          <Route path="/recrutement" element={<RecruitmentPage onNavigate={handleNavigate} />} />
          <Route path="/sous-traitance" element={<SubcontractingPage onNavigate={handleNavigate} />} />
          <Route path="/services" element={<ServicesPage onNavigate={handleNavigate} />} />
          <Route path="/materiel" element={<MaterialPage onNavigate={handleNavigate} />} />
          <Route path="/partenaires" element={<SubcontractingPage onNavigate={handleNavigate} showPartnersDefault={true} />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* <Route path="/contact" element={<ContactPage onNavigate={handleNavigate} />} /> */}
          {/* Ajoutez d'autres routes ici */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;