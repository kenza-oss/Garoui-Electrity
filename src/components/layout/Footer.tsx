import React from 'react';
import { Zap, Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
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
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="space-y-2 text-sm text-white/80">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+33 1 23 45 67 89</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>contact@garoui-electricite.fr</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Algerie</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Liens utiles</h3>
            <div className="space-y-2 text-sm text-white/80">
              <Link to="/services" className="block hover:text-accent transition-colors">Nos services</Link>
              <Link to="/materiel" className="block hover:text-accent transition-colors">Catalogue produits</Link>
              <Link to="/sous-traitance" className="block hover:text-accent transition-colors">Devenir partenaire</Link>
              <Link to="/recrutement" className="block hover:text-accent transition-colors">Carrières</Link>
              <Link to="/contact" className="block hover:text-accent transition-colors">Support client</Link>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Suivez-nous</h3>
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 bg-primary/80 rounded-lg flex items-center justify-center hover:bg-accent transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-primary/80 rounded-lg flex items-center justify-center hover:bg-accent transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-primary/80 rounded-lg flex items-center justify-center hover:bg-accent transition-colors" aria-label="Linkedin">
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