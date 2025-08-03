import React from 'react';
import { Briefcase, Calendar, MapPin, Users, Lock, Crown } from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { JobOffer, User } from '../../types';

interface JobOffersSectionProps {
  jobOffers: JobOffer[];
  currentUser: User | null;
  onNavigateToSubscription: () => void;
}

export const JobOffersSection: React.FC<JobOffersSectionProps> = ({
  jobOffers,
  currentUser,
  onNavigateToSubscription,
}) => {
  const getContractTypeLabel = (type: string) => {
    switch (type) {
      case 'cdi': return 'CDI';
      case 'cdd': return 'CDD';
      case 'stage': return 'Stage';
      case 'apprentissage': return 'Apprentissage';
      default: return type;
    }
  };

  const canAccessFullFeatures = currentUser && currentUser.subscriptionStatus === 'premium';

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-primary">Offres d'emploi disponibles</h2>
        {!canAccessFullFeatures && (
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Lock className="w-4 h-4" />
            <span>Abonnement premium requis pour postuler</span>
          </div>
        )}
      </div>

      {jobOffers.filter(offer => offer.isActive).length === 0 ? (
        <Card className="text-center py-12">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Briefcase className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Aucune offre disponible</h3>
          <p className="text-slate-600">Aucune offre d'emploi n'est actuellement disponible.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobOffers.filter(offer => offer.isActive).map((offer) => (
            <Card key={offer.id} className="p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col bg-gradient-to-br from-white to-slate-50 border border-slate-200 hover:border-primary/20 group">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-bold text-primary text-xl mb-3 group-hover:text-accent transition-colors">{offer.title}</h3>
              </div>
              
              <p className="text-sm text-slate-600 mb-6 flex-1 leading-relaxed">{offer.description}</p>
              
              <div className="space-y-3 text-sm text-slate-600">
                <div className="flex items-center justify-center gap-2 p-3 bg-white rounded-lg shadow-sm border border-slate-100 group-hover:border-primary/20 transition-colors">
                  <Briefcase className="w-5 h-5 text-primary" />
                  <span className="font-medium">{getContractTypeLabel(offer.contractType)}</span>
                </div>
                <div className="flex items-center justify-center gap-2 p-3 bg-white rounded-lg shadow-sm border border-slate-100 group-hover:border-primary/20 transition-colors">
                  <Users className="w-5 h-5 text-primary" />
                  <span className="font-medium">{offer.experienceRequired === 0 ? 'Débutant' : `${offer.experienceRequired} ans d'expérience`}</span>
                </div>
                <div className="flex items-center justify-center gap-2 p-3 bg-white rounded-lg shadow-sm border border-slate-100 group-hover:border-primary/20 transition-colors">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="font-medium">{offer.wilaya}</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-xs text-slate-500 pt-3 border-t border-slate-200">
                  <Calendar className="w-4 h-4" />
                  Publié le {new Date(offer.createdAt).toLocaleDateString('fr-FR')}
                </div>
              </div>

              {/* Bouton d'action */}
              <div className="mt-6 pt-4 border-t border-slate-200">
                {canAccessFullFeatures ? (
                  <Button variant="accent" className="w-full">
                    Postuler maintenant
                  </Button>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center justify-center gap-2 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">
                      <Crown className="w-4 h-4 text-accent" />
                      <span>Abonnement premium requis</span>
                    </div>
                    <Button 
                      onClick={onNavigateToSubscription} 
                      variant="outline" 
                      className="w-full"
                    >
                      Voir les abonnements
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {!canAccessFullFeatures && (
        <Card className="mt-8 p-6 bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/20">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
              <Crown className="w-6 h-6 text-accent" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Débloquez toutes les fonctionnalités</h3>
              <p className="text-slate-600 mb-4">
                Avec un abonnement premium, vous pouvez postuler aux offres d'emploi, accéder aux missions exclusives et bénéficier d'un support prioritaire.
              </p>
              <Button onClick={onNavigateToSubscription} variant="accent">
                Voir les abonnements
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}; 