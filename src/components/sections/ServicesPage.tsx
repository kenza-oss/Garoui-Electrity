import React, { useState } from 'react';
import { Zap, Home, Building, Lightbulb, Wrench, Shield, ArrowRight, X, ChevronRight } from 'lucide-react';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Card } from '../common/Card';
import { Service, QuoteRequest } from '../../types';
import { motion } from 'framer-motion';

interface ServicesPageProps {
  onNavigate: (section: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [quoteStep, setQuoteStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showDashboard, setShowDashboard] = useState(false);
  const [quoteData, setQuoteData] = useState({
    clientName: '',
    email: '',
    phone: '',
    company: '',
    serviceType: '',
    projectDescription: '',
    timeline: '',
    budget: '',
  });

  const services: Service[] = [
    {
      id: '1',
      title: 'Branchement simple',
      description: 'Raccordement électrique pour habitations individuelles ou petits locaux.',
      icon: 'Zap',
      category: 'branchement',
    },
    {
      id: '2',
      title: 'Branchement complexe',
      description: 'Raccordement pour immeubles, sites industriels, ou besoins spécifiques.',
      icon: 'Building',
      category: 'branchement',
    },
    {
      id: '3',
      title: 'Coupure & rétablissement',
      description: "Intervention rapide pour coupure ou rétablissement d'alimentation.",
      icon: 'Shield',
      category: 'intervention',
    },
    {
      id: '4',
      title: 'Pose / dépose compteur',
      description: 'Installation ou retrait de compteurs électriques toutes puissances.',
      icon: 'Home',
      category: 'compteur',
    },
    {
      id: '5',
      title: 'Travaux HT/BT',
      description: 'Réalisation de travaux haute et basse tension pour hôtels, universités, hôpitaux, stades, etc.',
      icon: 'Wrench',
      category: 'htbt',
    },
    {
      id: '6',
      title: 'Éclairage public',
      description: "Installation et maintenance d'éclairage public et de sécurité.",
      icon: 'Lightbulb',
      category: 'eclairage',
    },
    {
      id: '7',
      title: 'Maintenance & dépannage',
      description: "Service d'urgence et maintenance préventive pour tous types de sites.",
      icon: 'Wrench',
      category: 'maintenance',
    },
    {
      id: '8',
      title: 'Bâtiment, maison',
      description: 'Solutions électriques pour bâtiments résidentiels, tertiaires et industriels.',
      icon: 'Home',
      category: 'batiment',
    },
  ];

  // Mock quote requests for dashboard
  const quoteRequests: QuoteRequest[] = [
    {
      id: '1',
      clientName: 'Restaurant Le Gourmet',
      email: 'contact@legourmet.fr',
      phone: '01 23 45 67 89',
      company: 'SARL Le Gourmet',
      serviceType: 'Installation électrique commerciale',
      description: 'Rénovation complète du système électrique',
      status: 'en_cours',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      clientName: 'Marie Dubois',
      email: 'marie.dubois@email.com',
      phone: '06 12 34 56 78',
      serviceType: 'Éclairage professionnel',
      description: 'Installation LED pour maison 120m²',
      status: 'envoye',
      createdAt: '2024-01-12'
    }
  ];

  const serviceTypes = [
    { value: '', label: 'Sélectionnez un service' },
    ...services.map(service => ({ value: service.title, label: service.title }))
  ];

  const timelineOptions = [
    { value: '', label: 'Délai souhaité' },
    { value: 'urgent', label: 'Urgent (sous 48h)' },
    { value: '1week', label: 'Dans la semaine' },
    { value: '1month', label: 'Dans le mois' },
    { value: 'flexible', label: 'Flexible' },
  ];

  const budgetOptions = [
    { value: '', label: 'Budget approximatif' },
    { value: '0-15000', label: 'Moins de 15 000 DA' },
    { value: '15000-75000', label: '15 000 DA - 75 000 DA' },
    { value: '75000-225000', label: '75 000 DA - 225 000 DA' },
    { value: '225000+', label: 'Plus de 225 000 DA' },
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Home': return Home;
      case 'Building': return Building;
      case 'Lightbulb': return Lightbulb;
      case 'Wrench': return Wrench;
      case 'Shield': return Shield;
      case 'Zap': return Zap;
      default: return Zap;
    }
  };

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setQuoteData({...quoteData, serviceType: service.title});
    setShowQuoteModal(true);
  };

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quoteStep < 3) {
      setQuoteStep(quoteStep + 1);
    } else {
      console.log('Quote request submitted:', quoteData);
      setShowQuoteModal(false);
      setQuoteStep(1);
      // Reset form or show success message
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'en_attente': return 'bg-blue-100 text-blue-800';
      case 'en_cours': return 'bg-yellow-100 text-yellow-800';
      case 'envoye': return 'bg-green-100 text-green-800';
      case 'accepte': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'en_attente': return 'En attente';
      case 'en_cours': return 'En cours';
      case 'envoye': return 'Devis envoyé';
      case 'accepte': return 'Accepté';
      default: return status;
    }
  };

  if (showDashboard) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 bg-cover bg-center"
        style={{ backgroundImage: "url('/service.jpg')" }}>
        <div className="max-w-2xl w-full bg-white/80 rounded-xl shadow-lg p-8">
          {/* Dashboard Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Dashboard Client</h1>
              <p className="text-slate-600 mt-2">Suivi de vos demandes de devis</p>
            </div>
            <Button onClick={() => setShowDashboard(false)} variant="outline">
              Retour aux services
            </Button>
          </div>

          {/* Timeline of Requests */}
          <Card>
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Historique des demandes</h2>
            <div className="space-y-6">
              {quoteRequests.map((request, index) => (
                <div key={request.id} className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                    {index < quoteRequests.length - 1 && (
                      <div className="w-px h-16 bg-slate-300 mt-2"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="bg-slate-50 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-slate-900">{request.serviceType}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                          {getStatusLabel(request.status)}
                        </span>
                      </div>
                      <p className="text-slate-600 text-sm mb-2">{request.description}</p>
                      <div className="flex justify-between items-center text-xs text-slate-500">
                        <span>Client: {request.clientName}</span>
                        <span>{new Date(request.createdAt).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 bg-cover bg-center"
      style={{ backgroundImage: "url('/service.jpg')" }}>
      <div className="w-full">
        <div className="space-y-16">
          {/* Hero Section */}
          <section className="w-full flex flex-col items-center justify-center py-16">
            <div className="max-w-3xl w-full text-center">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-primary">
                Nos <span className="text-blue-400">services</span>
              </h1>
              <p className="text-xl text-slate-700 mb-8 leading-relaxed">
                Une gamme complète de solutions électriques adaptées à tous vos projets. 
                De l'installation à la maintenance, nous vous accompagnons à chaque étape.
              </p>
              <Button onClick={() => setShowDashboard(true)} variant="accent">
                Accès espace client
              </Button>
            </div>
          </section>

          {/* Services Grid */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Nos expertises</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Découvrez l'ensemble de nos services et demandez votre devis personnalisé
              </p>
            </div>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08 } }
              }}
            >
              {services.map((service, index) => {
                const Icon = getIcon(service.icon);
                return (
                  <motion.div
                    key={service.id}
                    variants={{
                      hidden: { opacity: 0, y: 40 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.05 } }
                    }}
                  >
                    <Card hover className="h-full flex flex-col justify-between">
                      <div>
                        <Icon className="w-10 h-10 text-accent mb-4" aria-hidden="true" />
                        <h3 className="text-xl font-semibold text-primary mb-2">{service.title}</h3>
                        <p className="text-slate-700 mb-6">{service.description}</p>
                      </div>
                      <motion.div whileHover={{ scale: 1.07, boxShadow: '0 8px 32px 0 rgba(0,159,227,0.15)' }} transition={{ type: 'spring', stiffness: 300 }}>
                        <Button variant="accent" size="md" onClick={() => handleServiceSelect(service)} aria-label={`Demander un devis pour ${service.title}`}>
                          Demander devis
                        </Button>
                      </motion.div>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </section>

          {/* Quote Modal */}
          {showQuoteModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">Demande de devis</h2>
                      <p className="text-slate-600">Étape {quoteStep} sur 3</p>
                    </div>
                    <button 
                      onClick={() => setShowQuoteModal(false)}
                      className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-8">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">Informations</span>
                      <span className="text-sm font-medium text-slate-700">Projet</span>
                      <span className="text-sm font-medium text-slate-700">Confirmation</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(quoteStep / 3) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <form onSubmit={handleQuoteSubmit} className="space-y-6">
                    {quoteStep === 1 && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-slate-900">Vos informations</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <Input
                            label="Nom complet"
                            value={quoteData.clientName}
                            onChange={(value) => setQuoteData({...quoteData, clientName: value})}
                            required
                          />
                          <Input
                            label="Email"
                            type="email"
                            value={quoteData.email}
                            onChange={(value) => setQuoteData({...quoteData, email: value})}
                            required
                          />
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <Input
                            label="Téléphone"
                            type="tel"
                            value={quoteData.phone}
                            onChange={(value) => setQuoteData({...quoteData, phone: value})}
                            required
                          />
                          <Input
                            label="Entreprise (optionnel)"
                            value={quoteData.company}
                            onChange={(value) => setQuoteData({...quoteData, company: value})}
                          />
                        </div>
                      </div>
                    )}

                    {quoteStep === 2 && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-slate-900">Détails du projet</h3>
                        <Select
                          label="Type de service"
                          value={quoteData.serviceType}
                          onChange={(value) => setQuoteData({...quoteData, serviceType: value})}
                          options={serviceTypes}
                          required
                        />
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Description du projet <span className="text-red-500">*</span>
                          </label>
                          <textarea
                            value={quoteData.projectDescription}
                            onChange={(e) => setQuoteData({...quoteData, projectDescription: e.target.value})}
                            rows={4}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-colors"
                            placeholder="Décrivez votre projet en détail..."
                            required
                          />
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <Select
                            label="Délai souhaité"
                            value={quoteData.timeline}
                            onChange={(value) => setQuoteData({...quoteData, timeline: value})}
                            options={timelineOptions}
                            required
                          />
                          <Select
                            label="Budget approximatif"
                            value={quoteData.budget}
                            onChange={(value) => setQuoteData({...quoteData, budget: value})}
                            options={budgetOptions}
                          />
                        </div>
                      </div>
                    )}

                    {quoteStep === 3 && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-slate-900">Récapitulatif</h3>
                        <div className="bg-slate-50 rounded-lg p-4 space-y-3">
                          <div><strong>Service:</strong> {quoteData.serviceType}</div>
                          <div><strong>Client:</strong> {quoteData.clientName}</div>
                          <div><strong>Email:</strong> {quoteData.email}</div>
                          <div><strong>Téléphone:</strong> {quoteData.phone}</div>
                          {quoteData.company && <div><strong>Entreprise:</strong> {quoteData.company}</div>}
                          <div><strong>Délai:</strong> {timelineOptions.find(t => t.value === quoteData.timeline)?.label}</div>
                          {quoteData.budget && <div><strong>Budget:</strong> {budgetOptions.find(b => b.value === quoteData.budget)?.label}</div>}
                          <div><strong>Description:</strong> {quoteData.projectDescription}</div>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between pt-6">
                      {quoteStep > 1 && (
                        <Button 
                          type="button"
                          variant="outline" 
                          onClick={() => setQuoteStep(quoteStep - 1)}
                        >
                          Précédent
                        </Button>
                      )}
                      <Button 
                        type="submit"
                        variant="primary"
                        className={`bg-blue-600 hover:bg-blue-700 ${quoteStep === 1 ? 'ml-auto' : ''}`}
                      >
                        {quoteStep === 3 ? 'Envoyer la demande' : 'Suivant'}
                        {quoteStep < 3 && <ChevronRight className="w-4 h-4 ml-2" />}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};