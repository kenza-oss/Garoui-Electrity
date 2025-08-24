import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './components/sections/HomePage';
import { RecruitmentPage } from './components/sections/RecruitmentPage';
import { SubscriptionPage } from './components/sections/SubscriptionPage';
import { SubcontractingPage } from './components/sections/SubcontractingPage';
import { ServicesPage } from './components/sections/ServicesPage';
import { MaterialPage } from './components/sections/MaterialPage';
import { ContactPage } from './components/sections/ContactPage';
import { CompanyPage } from './components/sections/CompanyPage';
import { PasswordManagementPage } from './components/sections/PasswordManagementPage';

function App() {
  const [activeSection, setActiveSection] = useState('accueil');
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigate = (section: string) => {
    setMobileMenuOpen(false);
    setActiveSection(section);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'accueil':
        return <HomePage onNavigate={handleNavigate} />;
      case 'recrutement':
        return <RecruitmentPage onNavigate={handleNavigate} />;
      case 'subscription':
        return <SubscriptionPage onNavigate={handleNavigate} />;
      case 'sous-traitance':
        return <SubcontractingPage onNavigate={handleNavigate} />;
      case 'services':
        return <ServicesPage onNavigate={handleNavigate} />;
      case 'materiel':
        return <MaterialPage onNavigate={handleNavigate} />;
                      case 'entreprise':
                  return <CompanyPage onNavigate={handleNavigate} />;
                case 'gestion-mots-de-passe':
                  return <PasswordManagementPage />;
                case 'partenaires':
                  return <SubcontractingPage onNavigate={handleNavigate} showPartnersDefault={true} />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
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
        {renderSection()}
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;