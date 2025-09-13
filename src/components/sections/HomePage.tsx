import React from 'react';
import Users from 'lucide-react/dist/esm/icons/users';
import Award from 'lucide-react/dist/esm/icons/award';
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';
import Building2 from 'lucide-react/dist/esm/icons/building-2';
import Zap from 'lucide-react/dist/esm/icons/zap';
import { motion } from 'framer-motion';

interface HomePageProps {
  onNavigate: (section: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const stats = [
    { icon: Users, label: 'Techniciens & Ingénieurs', value: '80+' },
    { icon: Award, label: "Années d'expérience", value: '15+' },
    { icon: CheckCircle, label: 'Projets Sonelgaz', value: '1200+' },
    { icon: Building2, label: 'Wilayas couvertes', value: '58/58' },
  ];

  const services = [
    {
      title: 'Installation électrique',
      description: 'Solutions complètes pour résidentiel et commercial',
      features: ['Mise aux normes', 'Installation neuve', 'Rénovation']
    },
    {
      title: 'Maintenance & Dépannage',
      description: "Service d'urgence et maintenance préventive",
      features: ["Intervention rapide", "Diagnostic expert", "Garantie service"]
    },
    {
      title: 'Éclairage professionnel',
      description: "Conception et installation d'éclairage sur mesure",
      features: ["LED haute efficacité", "Automatisation", "Design personnalisé"]
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#002B45]">
      {/* Hero Section à la danskecommodities.com */}
      <div className="relative min-h-screen flex flex-col">
        {/* Fond image sombre + overlay arrondi bleu nuit */}
        <div className="absolute inset-0 w-full h-full">
          <img src="/bg.jpg" alt="hero-bg" className="w-full h-full object-cover object-center brightness-50" />
          <svg className="absolute top-0 right-0 h-full w-2/3 md:w-1/2" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M800 0V800H0C200 600 600 200 800 0Z" fill="#002B45" />
          </svg>
        </div>
        {/* Texte hero */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-8 py-24 md:py-0 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <h1 className="text-3xl md:text-5xl font-light leading-tight mb-6 tracking-tight text-white" style={{fontFamily: 'Poppins, Inter, sans-serif'}}>
              Garoui Électricité, agrée<br className="hidden md:inline" />
              par l’État, autorisée par<br className="hidden md:inline" />
              Sonelgaz et opérationnelle<br className="hidden md:inline" />
              dans les 58 wilayas d’Algérie
            </h1>
            <p className="text-base md:text-xl text-white/90 font-light max-w-2xl mb-6" style={{fontFamily: 'Inter, Poppins, sans-serif'}}>
              Garoui Électricité accompagne entreprises, collectivités et particuliers dans tous leurs projets électriques : installation, maintenance, dépannage, HT/BT, éclairage public, et bien plus. Notre équipe expérimentée, notre conformité réglementaire et notre réseau de partenaires font de nous un acteur de référence sur tout le territoire algérien. Qualité, sécurité et innovation sont au cœur de notre engagement.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="bg-white py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center rounded-2xl border border-[#002B45]/15 bg-white p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <stat.icon className="w-8 h-8 text-[#002B45] mx-auto mb-3" />
                <div className="text-2xl font-bold text-[#002B45] mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-[#002B45]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Solutions Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="bg-white py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#002B45] mb-4">Nos solutions</h2>
            <p className="text-lg text-[#002B45] max-w-2xl mx-auto">Une gamme complète de services électriques adaptés à vos besoins spécifiques</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="h-full border border-[#002B45]/15 bg-white rounded-2xl p-8 text-[#002B45] flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <CheckCircle className="w-8 h-8 text-[#002B45] mb-4" aria-hidden="true" />
                <h3 className="text-xl font-semibold text-[#002B45] mb-2">{service.title}</h3>
                <p className="mb-6">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-[#002B45] mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};
