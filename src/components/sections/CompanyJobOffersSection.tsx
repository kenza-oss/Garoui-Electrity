import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { 
  Building2, 
  Briefcase, 
  Calendar, 
  MapPin, 
  Users, 
  Eye, 
  Mail, 
  Phone,
  Lock,
  Crown
} from 'lucide-react';
import { CompanyJobOffer, User } from '../../types';

interface CompanyJobOffersSectionProps {
  companyJobOffers: CompanyJobOffer[];
  currentUser: User | null;
  onNavigateToSubscription: () => void;
}

export const CompanyJobOffersSection: React.FC<CompanyJobOffersSectionProps> = ({
  companyJobOffers,
  currentUser,
  onNavigateToSubscription
}) => {
  const [showCompanyDetails, setShowCompanyDetails] = useState<string | null>(null);

  const getContractTypeLabel = (type: string) => {
    switch (type) {
      case 'cdi': return 'CDI';
      case 'cdd': return 'CDD';
      case 'stage': return 'Stage';
      case 'apprentissage': return 'Apprentissage';
      case 'projet': return 'Projet';
      default: return type;
    }
  };

  const handleApply = (jobOffer: CompanyJobOffer) => {
    if (!currentUser) {
      onNavigateToSubscription();
      return;
    }
    
    if (currentUser.subscriptionStatus === 'free') {
      onNavigateToSubscription();
      return;
    }
    
    // Ici, on pourrait ouvrir un formulaire de candidature
    alert(`Candidature envoyée pour le poste : ${jobOffer.title}`);
  };

  const handleViewCompanyDetails = (companyId: string) => {
    if (!currentUser || currentUser.subscriptionStatus === 'free') {
      onNavigateToSubscription();
      return;
    }
    
    setShowCompanyDetails(showCompanyDetails === companyId ? null : companyId);
  };

  if (companyJobOffers.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <Building2 className="w-8 h-8 text-primary mr-3" />
        <h2 className="text-2xl font-bold text-gray-900">Offres d'emploi des entreprises partenaires</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companyJobOffers.map((jobOffer) => (
          <Card key={jobOffer.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{jobOffer.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-3">{jobOffer.description}</p>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Building2 className="w-4 h-4 mr-2 text-primary" />
                <span className="font-medium">{jobOffer.companyName}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center text-gray-600">
                  <Briefcase className="w-4 h-4 mr-2" />
                  <span>{getContractTypeLabel(jobOffer.contractType)}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  <span>{jobOffer.experienceRequired} ans</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{jobOffer.wilaya}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{new Date(jobOffer.createdAt).toLocaleDateString('fr-FR')}</span>
                </div>
              </div>

              {jobOffer.salary && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-sm font-medium text-gray-900">
                    Salaire : {jobOffer.salary.min.toLocaleString()} - {jobOffer.salary.max.toLocaleString()} {jobOffer.salary.currency}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-center items-center pt-4 border-t border-gray-200">
              {currentUser?.subscriptionStatus === 'premium' ? (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewCompanyDetails(jobOffer.companyId)}
                    className="flex items-center mr-3"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Détails entreprise
                  </Button>
                  
                  <Button
                    onClick={() => handleApply(jobOffer)}
                    className="flex items-center"
                    size="sm"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Postuler
                  </Button>
                </>
              ) : (
                <Button
                  onClick={onNavigateToSubscription}
                  className="flex items-center bg-primary hover:bg-primary-dark text-white"
                  size="sm"
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Abonnement requis pour postuler
                </Button>
              )}
            </div>

            {/* Détails de l'entreprise (visible uniquement avec abonnement premium) */}
            {showCompanyDetails === jobOffer.companyId && currentUser?.subscriptionStatus === 'premium' && (
              <div className="mt-4 pt-4 border-t border-gray-200 bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Coordonnées de l'entreprise</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Building2 className="w-4 h-4 mr-2" />
                    <span>{jobOffer.companyName}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    <span>contact@entreprise-electrique.com</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    <span>+213 123 456 789</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>123 Rue de l'Électricité, Alger</span>
                  </div>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};
