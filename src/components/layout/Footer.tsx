import React from 'react';
import Zap from 'lucide-react/dist/esm/icons/zap';
import Mail from 'lucide-react/dist/esm/icons/mail';
import Phone from 'lucide-react/dist/esm/icons/phone';
import MapPin from 'lucide-react/dist/esm/icons/map-pin';
import Linkedin from 'lucide-react/dist/esm/icons/linkedin';

interface FooterProps {
  onNavigate?: (section: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xl font-bold">Garoui Electricité</span>
            </div>
            <p className="text-white/80 text-sm">
              Votre partenaire de confiance pour tous vos projets électriques. 
              Solutions professionnelles et innovantes depuis plus de 15 ans.
            </p>
            <div className="text-white/80 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Tizi ghennif, Tizi Ouzou, Algérie</span>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="space-y-2 text-sm text-white/80">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+213 540 83 63 21</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>garoui.electricity@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Tizi ghennif, Tizi Ouzou, Algérie</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Liens utiles</h3>
            <div className="space-y-2 text-sm text-white/80">
              <button onClick={() => onNavigate?.('services')} className="block hover:text-accent transition-colors text-left w-full">Nos services</button>
              <button onClick={() => onNavigate?.('materiel')} className="block hover:text-accent transition-colors text-left w-full">Catalogue produits</button>
              <button onClick={() => onNavigate?.('recrutement')} className="block hover:text-accent transition-colors text-left w-full">Recrutement / Offres d'emploi</button>
              <button onClick={() => onNavigate?.('contact')} className="block hover:text-accent transition-colors text-left w-full">Support client</button>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Suivez-nous</h3>
            <div className="flex space-x-4">
              <a 
                href="https://www.linkedin.com/in/garoui-jugurtha-512a03343/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 bg-primary/80 rounded-lg flex items-center justify-center hover:bg-accent transition-colors" 
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 flex justify-center items-center text-sm text-white/60">
          <p>&copy; 2025 Garoui Electricité. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};
