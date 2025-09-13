import React, { useEffect, useState } from 'react';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import Building2 from 'lucide-react/dist/esm/icons/building-2';
import Briefcase from 'lucide-react/dist/esm/icons/briefcase';
import Users from 'lucide-react/dist/esm/icons/users';
import Plus from 'lucide-react/dist/esm/icons/plus';
import Eye from 'lucide-react/dist/esm/icons/eye';
import Mail from 'lucide-react/dist/esm/icons/mail';
import Phone from 'lucide-react/dist/esm/icons/phone';
import MapPin from 'lucide-react/dist/esm/icons/map-pin';
import Calendar from 'lucide-react/dist/esm/icons/calendar';
import FileText from 'lucide-react/dist/esm/icons/file-text';
import Download from 'lucide-react/dist/esm/icons/download';
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';
import XCircle from 'lucide-react/dist/esm/icons/x-circle';
import Clock from 'lucide-react/dist/esm/icons/clock';
import { Company, CompanyJobOffer, CompanyJobApplication, ElectricianCV } from '../../types';
import { api } from '../../lib/api';
import { CompanyApplicationsSection } from './CompanyApplicationsSection';
import { useCompanyVerification } from '../../hooks/useCompanyVerification';

interface CompanyPageProps {
  onNavigate: (section: string) => void;
}

export const CompanyPage: React.FC<CompanyPageProps> = ({ onNavigate }) => {
  const { 
    isPartner, 
    currentCompany, 
    isLoading, 
    checkCompanyByName, 
    checkCompanyByPassword, 
    setCurrentCompanyAsPartner,
    clearCurrentCompany,
  } = useCompanyVerification();
  
  const [activeTab, setActiveTab] = useState<'partner-request' | 'my-offers' | 'my-applications'>('partner-request');
  const [showJobForm, setShowJobForm] = useState(false);
  const [showCompanySearch, setShowCompanySearch] = useState(false);
  const [searchCompanyName, setSearchCompanyName] = useState('');
  const [searchCompanyPassword, setSearchCompanyPassword] = useState('');
  const [searchResult, setSearchResult] = useState<any>(null);
  const [searchError, setSearchError] = useState('');
  
  const [jobFormData, setJobFormData] = useState({
    title: '',
    description: '',
    contractType: '',
    experienceRequired: '',
    wilaya: '',
    salaryMin: '',
    salaryMax: ''
  });

  const [jobOffers, setJobOffers] = useState<CompanyJobOffer[]>([]);

  const [applications, setApplications] = useState<CompanyJobApplication[]>([]);

  const [electricianCVs, setElectricianCVs] = useState<ElectricianCV[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const list = await api.listOffers();
        const offers = Array.isArray(list) ? list : (list?.items || []);
        setJobOffers(offers as CompanyJobOffer[]);
        // Optionally load subscribers/applications per offer
        const allApps: CompanyJobApplication[] = [] as any;
        for (const offer of offers as any[]) {
          try {
            const subs = await api.listOfferSubscribers(String(offer.id));
            const items = Array.isArray(subs) ? subs : (subs?.items || []);
            for (const s of items) {
              allApps.push({
                id: String(s.id || `${offer.id}-${s.userId||s.candidateId}`),
                jobOfferId: String(offer.id),
                electricianId: String(s.userId || s.candidateId || ''),
                electricianName: s.name || s.fullName || s.email || 'Candidat',
                electricianEmail: s.email || '',
                electricianPhone: s.phone || '',
                status: (s.status || 'nouveau'),
                appliedAt: s.appliedAt || new Date().toISOString(),
              } as CompanyJobApplication);
            }
          } catch {}
        }
        setApplications(allApps);
      } catch {}
    };
    if (isPartner) load();
  }, [isPartner]);

  const handleCreateJobOffer = () => {
    setShowJobForm(true);
  };

  const handleSearchCompany = async () => {
    setSearchError('');
    setSearchResult(null);
    
    if (!searchCompanyName && !searchCompanyPassword) {
      setSearchError('Veuillez saisir au moins le nom de l\'entreprise ou le mot de passe');
      return;
    }
    
    let foundCompany = null as any;
    if (searchCompanyName) {
      foundCompany = await checkCompanyByName(searchCompanyName);
    }
    if (!foundCompany && searchCompanyPassword) {
      foundCompany = await checkCompanyByPassword(searchCompanyPassword);
    }
    
    if (foundCompany) {
      setSearchResult(foundCompany);
    } else {
      setSearchError('Aucune entreprise trouvée avec ces informations');
    }
  };

  const handleConfirmCompany = (company: any) => {
    setCurrentCompanyAsPartner(company);
    setShowCompanySearch(false);
    setSearchCompanyName('');
    setSearchCompanyPassword('');
    setSearchResult(null);
    setSearchError('');
  };

  const handleNewCompanyRequest = () => {
    setShowCompanySearch(false);
    onNavigate('sous-traitance');
  };

  const renderPartnerRequest = () => (
    <div className="text-center py-12">
      <Building2 className="w-24 h-24 text-white mx-auto mb-6" />
      <h2 className="text-3xl font-bold text-white mb-4">
        Espace Entreprise
      </h2>
      <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
        Vérifiez si votre entreprise est déjà partenaire ou demandez à rejoindre notre réseau 
        pour publier vos offres d'emploi et recevoir des candidatures d'électriciens qualifiés.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
        <Button 
          onClick={() => setShowCompanySearch(true)} 
          variant="outline" 
          className="!text-lg !px-8 !py-4 !bg-primary !text-white hover:!bg-primary-dark !border-primary"
        >
          Vérifier si mon entreprise existe
        </Button>
        <Button 
          onClick={() => onNavigate('sous-traitance')} 
          className="!text-lg !px-8 !py-4 !bg-white !text-gray-900 hover:!bg-gray-100"
        >
          Demander à devenir partenaire
        </Button>
      </div>
    </div>
  );

  const renderPartnerDashboard = () => (
    <div className="py-8">
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Espace Entreprise - {currentCompany?.companyName || 'Entreprise'}
            </h2>
            <p className="text-white/90">
              {currentCompany ? `Partenaire depuis le ${new Date().toLocaleDateString('fr-FR')}` : 'Statut partenaire en cours de vérification'}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              clearCurrentCompany();
            }}
            className="!bg-white !text-gray-900 hover:!bg-gray-100 !border-white !font-medium"
          >
            Changer d'entreprise
          </Button>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <div className="text-center p-6">
            <Briefcase className="w-16 h-16 text-white mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-3">Mes Offres</h3>
            <p className="text-white/80 mb-4">
              Publiez vos annonces d'emploi et gérez les candidatures reçues
            </p>
            <Button 
              onClick={() => setActiveTab('my-offers')}
              className="!bg-white !text-gray-900 hover:!bg-gray-100 !font-medium"
            >
              Gérer mes offres
            </Button>
          </div>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <div className="text-center p-6">
            <Users className="w-16 h-16 text-white mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-3">Mes Candidatures</h3>
            <p className="text-white/80 mb-4">
              Consultez les CV des électriciens qui postulent à vos offres
            </p>
            <Button 
              onClick={() => setActiveTab('my-applications')}
              className="!bg-white !text-gray-900 hover:!bg-gray-100 !font-medium"
            >
              Voir les candidatures
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderMyOffers = () => (
    <div className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Mes Offres d'Emploi</h2>
        <Button onClick={handleCreateJobOffer} className="flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle offre
        </Button>
      </div>

      <div className="space-y-4">
        {jobOffers.map((job) => (
          <Card key={job.id} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                <p className="text-gray-600">{job.description}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  job.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {job.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-2" />
                {job.wilaya}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Briefcase className="w-4 h-4 mr-2" />
                {job.contractType.toUpperCase()}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                {job.experienceRequired} ans
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Users className="w-4 h-4 mr-2" />
                {job.applications.length} candidatures
              </div>
            </div>

                          <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Publiée le {new Date(job.createdAt).toLocaleDateString('fr-FR')}
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setActiveTab('my-applications');
                      // Ici on pourrait filtrer les candidatures par offre
                    }}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Voir candidatures ({job.applications.length})
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="w-4 h-4 mr-2" />
                    Modifier
                  </Button>
                </div>
              </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderMyApplications = () => (
    <div className="py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Candidatures reçues</h2>
      
      <CompanyApplicationsSection
        applications={applications}
        jobOffers={jobOffers}
        onUpdateApplicationStatus={(applicationId, newStatus) => {
          setApplications(prev => 
            prev.map(app => 
              app.id === applicationId ? { ...app, status: newStatus } : app
            )
          );
        }}
      />
    </div>
  );

  const handleSubmitNewOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: any = {
        title: jobFormData.title,
        description: jobFormData.description,
        contractType: jobFormData.contractType,
        experienceRequired: parseInt(jobFormData.experienceRequired || '0'),
        wilaya: jobFormData.wilaya,
        salary: jobFormData.salaryMin || jobFormData.salaryMax ? {
          min: parseInt(jobFormData.salaryMin || '0'),
          max: parseInt(jobFormData.salaryMax || '0'),
          currency: 'DZD',
        } : undefined,
        isActive: true,
      };
      const created = await api.createOffer(payload);
      setJobOffers(prev => [created as any, ...prev]);
      setShowJobForm(false);
      setJobFormData({ title: '', description: '', contractType: '', experienceRequired: '', wilaya: '', salaryMin: '', salaryMax: '' });
    } catch (err) {
      alert((err as Error).message || "Erreur lors de la création de l'offre");
    }
  };

  const renderJobForm = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Nouvelle offre d'emploi</h3>
            <button 
              onClick={() => setShowJobForm(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <XCircle className="w-6 h-6" />
            </button>
          </div>

          <form className="space-y-4" onSubmit={handleSubmitNewOffer}>
            <Input
              label="Titre du poste"
              placeholder="Ex: Électricien Industriel"
              value={jobFormData.title}
              onChange={(value) => setJobFormData(prev => ({ ...prev, title: value }))}
              required
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description du poste
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                rows={4}
                placeholder="Décrivez le poste, les missions, l'environnement de travail..."
                value={jobFormData.description}
                onChange={(e) => setJobFormData(prev => ({ ...prev, description: e.target.value }))}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Type de contrat"
                value={jobFormData.contractType}
                onChange={(value) => setJobFormData(prev => ({ ...prev, contractType: value }))}
                options={[
                  { value: 'cdi', label: 'CDI' },
                  { value: 'cdd', label: 'CDD' },
                  { value: 'stage', label: 'Stage' },
                  { value: 'apprentissage', label: 'Apprentissage' },
                  { value: 'projet', label: 'Projet' }
                ]}
                required
              />
              <Input
                label="Expérience requise (années)"
                type="number"
                placeholder="5"
                value={jobFormData.experienceRequired}
                onChange={(value) => setJobFormData(prev => ({ ...prev, experienceRequired: value }))}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Wilaya"
                value={jobFormData.wilaya}
                onChange={(value) => setJobFormData(prev => ({ ...prev, wilaya: value }))}
                options={[
                  { value: 'alger', label: 'Alger' },
                  { value: 'oran', label: 'Oran' },
                  { value: 'constantine', label: 'Constantine' }
                ]}
                required
              />
              <Input
                label="Salaire minimum (DZD)"
                type="number"
                placeholder="80000"
                value={jobFormData.salaryMin}
                onChange={(value) => setJobFormData(prev => ({ ...prev, salaryMin: value }))}
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setShowJobForm(false)}
              >
                Annuler
              </Button>
              <Button type="submit">
                Publier l'offre
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );

  const renderCompanySearchModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Vérifier l'existence de votre entreprise</h3>
            <button 
              onClick={() => setShowCompanySearch(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <XCircle className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom de l'entreprise
              </label>
              <input
                type="text"
                value={searchCompanyName}
                onChange={(e) => setSearchCompanyName(e.target.value)}
                placeholder="Ex: Mono Electric"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe de l'entreprise
              </label>
              <input
                type="password"
                value={searchCompanyPassword}
                onChange={(e) => setSearchCompanyPassword(e.target.value)}
                placeholder="Ex: motdepasse2024"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div className="text-center">
              <Button onClick={handleSearchCompany} className="w-full">
                Vérifier l'existence
              </Button>
            </div>

            {searchError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600 text-sm">{searchError}</p>
              </div>
            )}

            {searchResult && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="text-center mb-4">
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-2" />
                  <h4 className="text-lg font-semibold text-green-800">Entreprise trouvée !</h4>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-green-700">Nom :</span>
                    <span className="font-medium">{searchResult.companyName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Contact :</span>
                    <span className="font-medium">{searchResult.contactName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Contact :</span>
                    <span className="font-medium">{searchResult.contactName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Wilaya :</span>
                    <span className="font-medium">{searchResult.wilaya}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Secteur :</span>
                    <span className="font-medium">{searchResult.secteur}</span>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <Button 
                    onClick={() => handleConfirmCompany(searchResult)}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    Confirmer que c'est mon entreprise
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={handleNewCompanyRequest}
                    className="flex-1"
                  >
                    Demander un nouveau partenariat
                  </Button>
                </div>
              </div>
            )}

            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-3">
                Votre entreprise n'est pas dans la liste ?
              </p>
              <Button 
                variant="outline"
                onClick={handleNewCompanyRequest}
                className="w-full"
              >
                Demander à devenir partenaire
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/entreprisebg.mp4" type="video/mp4" />
          Votre navigateur ne supporte pas la lecture de vidéos.
        </video>
        {/* Overlay pour améliorer la lisibilité */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Contenu principal avec z-index pour être au-dessus de la vidéo */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation tabs */}
        {isPartner && (
          <div className="border-b border-white/20 mb-8">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('my-offers')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'my-offers'
                    ? 'border-white text-white'
                    : 'border-transparent text-white/70 hover:text-white hover:border-white/50'
                }`}
              >
                Mes Offres
              </button>
              <button
                onClick={() => setActiveTab('my-applications')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'my-applications'
                    ? 'border-white text-white'
                    : 'border-transparent text-white/70 hover:text-white hover:border-white/50'
                }`}
              >
                Mes Candidatures
              </button>
            </nav>
          </div>
        )}

        {/* Content */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p className="text-white">Vérification de votre entreprise...</p>
            </div>
          </div>
        ) : !isPartner ? (
          renderPartnerRequest()
        ) : (
          <>
            {activeTab === 'my-offers' && renderMyOffers()}
            {activeTab === 'my-applications' && renderMyApplications()}
            {activeTab === 'partner-request' && renderPartnerDashboard()}
          </>
        )}

        {/* Modals */}
        {showJobForm && renderJobForm()}
        {showCompanySearch && renderCompanySearchModal()}
      </div>
    </div>
  );
};
