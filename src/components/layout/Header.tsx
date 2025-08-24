import React from 'react';
import { Menu, X, Zap, User } from 'lucide-react';
import { Button } from '../common/Button';

interface HeaderProps {
  activeSection: string;
  isMobileMenuOpen: boolean;
  onNavigate: (section: string) => void;
  onToggleMobileMenu: () => void;
}

  const navItems = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'recrutement', label: 'Recrutement' },
    { id: 'sous-traitance', label: 'Sous-traitance' },
    { id: 'services', label: 'Services' },
    { id: 'materiel', label: 'Matériel' },
    { id: 'entreprise', label: 'Entreprise' },
    { id: 'partenaires', label: 'Partenaires' },
    { id: 'gestion-mots-de-passe', label: 'Gestion MDP' },
    { id: 'contact', label: 'Contact' },
  ];

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  isMobileMenuOpen,
  onNavigate,
  onToggleMobileMenu,
}) => {
  return (
    <header className="bg-primary text-white shadow-sm border-b border-primary sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onNavigate('accueil')}>
            <img 
              src="/logo-garoui.jpg" 
              alt="Garoui Electricité" 
              className="w-12 h-12 rounded-lg object-cover"
            />
            <span className="text-xl font-bold text-white">Garoui Electricité</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-sm font-medium transition-colors px-2 py-1 rounded hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary ${
                  activeSection === item.id ? 'text-accent underline underline-offset-4' : 'text-white/80'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Client Space Button & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onToggleMobileMenu}
              className="md:hidden p-2 rounded-lg hover:bg-primary/80 transition-colors"
              aria-label="Ouvrir le menu mobile"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-primary/30 bg-primary">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`text-left px-4 py-2 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary ${
                    activeSection === item.id 
                      ? 'bg-accent/10 text-accent' 
                      : 'text-white/80 hover:bg-primary/80 hover:text-accent'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};