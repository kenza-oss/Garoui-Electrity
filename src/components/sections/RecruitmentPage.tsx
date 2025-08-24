import React, { useState, useEffect } from 'react';
import { Upload, FileText, Eye, Download, Trash2, Search, Filter, Plus, Briefcase, Calendar, MapPin, Users, Lock, Crown, AlertCircle } from 'lucide-react';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Card } from '../common/Card';
import { Candidate, JobOffer, User, CompanyJobOffer } from '../../types';
import { JobOffersSection } from './JobOffersSection';
import { CompanyJobOffersSection } from './CompanyJobOffersSection';

interface RecruitmentPageProps {
  onNavigate: (section: string) => void;
}

export const RecruitmentPage: React.FC<RecruitmentPageProps> = ({ onNavigate }) => {
  const [showDashboard, setShowDashboard] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showJobOffers, setShowJobOffers] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [step, setStep] = useState(1);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showSubscriptionRequired, setShowSubscriptionRequired] = useState(false);
  const [candidateData, setCandidateData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    experience: '',
    position: '',
    motivation: '',
    cv: null as File | null,
    diploma: null as File | null,
    photos: [] as File[],
  });
  const [filePreviews, setFilePreviews] = useState<{cv?: string; diploma?: string; photos: string[]}>({photos: []});
  const [uploadError, setUploadError] = useState('');
  const maxFileSize = 10 * 1024 * 1024; // 10 Mo
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // États pour la gestion des offres d'emploi
  const [jobOfferData, setJobOfferData] = useState({
    title: '',
    description: '',
    contractType: '',
    experienceRequired: '',
    wilaya: '',
  });

  // Mock data for job offers
  const [jobOffers, setJobOffers] = useState<JobOffer[]>(() => {
    // Récupérer les données du localStorage ou utiliser les données par défaut
    const savedOffers = localStorage.getItem('garoui-job-offers');
    if (savedOffers) {
      return JSON.parse(savedOffers);
    }
    return [
      {
        id: '1',
        title: 'Technicien branchement complexe',
        description: 'Nous recherchons un technicien spécialisé dans les branchements électriques complexes. Missions : installation de compteurs, raccordements haute tension, diagnostics techniques.',
        contractType: 'cdi',
        experienceRequired: 3,
        wilaya: 'Alger',
        createdAt: '2024-01-15',
        isActive: true,
      },
      {
        id: '2',
        title: 'Intervention coupure électricité',
        description: 'Poste d\'intervention rapide pour les coupures électriques. Gestion des pannes, diagnostic, réparation et rétablissement du service client.',
        contractType: 'cdd',
        experienceRequired: 2,
        wilaya: 'Oran',
        createdAt: '2024-01-10',
        isActive: true,
      },
      {
        id: '3',
        title: 'Technicien rétablissement réseau',
        description: 'Spécialiste en rétablissement du réseau électrique après incidents. Travaux de maintenance préventive et curative sur les installations.',
        contractType: 'cdi',
        experienceRequired: 4,
        wilaya: 'Constantine',
        createdAt: '2024-01-05',
        isActive: true,
      }
    ];
  });

  // Mock data for company job offers
  const [companyJobOffers] = useState<CompanyJobOffer[]>([
    {
      id: '1',
      companyId: '1',
      companyName: 'Entreprise Électrique Plus',
      title: 'Électricien Industriel',
      description: 'Nous recherchons un électricien expérimenté pour nos projets industriels. Missions : installation électrique, maintenance préventive, diagnostic et réparation.',
      requirements: ['Bac+2 en électricité', '5 ans d\'expérience', 'Permis de conduire'],
      contractType: 'cdi',
      experienceRequired: 5,
      wilaya: 'Alger',
      salary: { min: 80000, max: 120000, currency: 'DZD' },
      isActive: true,
      createdAt: '2024-01-20',
      applications: []
    },
    {
      id: '2',
      companyId: '2',
      companyName: 'Électro Solutions',
      title: 'Technicien Maintenance',
      description: 'Poste de technicien maintenance électrique pour nos installations commerciales. Responsable de la maintenance préventive et curative.',
      requirements: ['Bac en électricité', '3 ans d\'expérience', 'Autonome'],
      contractType: 'cdd',
      experienceRequired: 3,
      wilaya: 'Oran',
      salary: { min: 60000, max: 90000, currency: 'DZD' },
      isActive: true,
      createdAt: '2024-01-18',
      applications: []
    }
  ]);

  // Mock data for demonstration
  const candidates: Candidate[] = [
    {
      id: '1',
      firstName: 'Marie',
      lastName: 'Dubois',
      email: 'marie.dubois@email.com',
      phone: '06 12 34 56 78',
      position: 'Électricien',
      applicationDate: '2024-01-15',
      status: 'nouveau',
    },
    {
      id: '2',
      firstName: 'Pierre',
      lastName: 'Martin',
      email: 'pierre.martin@email.com',
      phone: '06 87 65 43 21',
      position: 'Chef de chantier',
      applicationDate: '2024-01-12',
      status: 'en_cours',
    },
    {
      id: '3',
      firstName: 'Sophie',
      lastName: 'Leroy',
      email: 'sophie.leroy@email.com',
      phone: '06 55 44 33 22',
      position: 'Stagiaire',
      applicationDate: '2024-01-10',
      status: 'accepte',
    }
  ];

  const applicationTypes = [
    { value: 'cdi', label: 'CDI - Contrat à durée indéterminée' },
    { value: 'cdd', label: 'CDD - Contrat à durée déterminée' },
    { value: 'stage', label: 'Stage' },
    { value: 'apprentissage', label: 'Apprentissage' },
  ];

  const contractTypeOptions = [
    { value: 'cdi', label: 'CDI - Contrat à durée indéterminée' },
    { value: 'cdd', label: 'CDD - Contrat à durée déterminée' },
    { value: 'stage', label: 'Stage' },
    { value: 'apprentissage', label: 'Apprentissage' },
  ];

  const wilayaOptions = [
    { value: 'Alger', label: 'Alger' },
    { value: 'Oran', label: 'Oran' },
    { value: 'Constantine', label: 'Constantine' },
    { value: 'Annaba', label: 'Annaba' },
    { value: 'Batna', label: 'Batna' },
    { value: 'Blida', label: 'Blida' },
    { value: 'Setif', label: 'Setif' },
    { value: 'Tlemcen', label: 'Tlemcen' },
    { value: 'Ghardaia', label: 'Ghardaia' },
    { value: 'El Oued', label: 'El Oued' },
  ];

  const statusOptions = [
    { value: '', label: 'Tous les statuts' },
    { value: 'nouveau', label: 'Nouveau' },
    { value: 'en_cours', label: 'En cours' },
    { value: 'accepte', label: 'Accepté' },
    { value: 'refuse', label: 'Refusé' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'nouveau': return 'bg-blue-100 text-blue-800';
      case 'en_cours': return 'bg-yellow-100 text-yellow-800';
      case 'accepte': return 'bg-green-100 text-green-800';
      case 'refuse': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'nouveau': return 'Nouveau';
      case 'en_cours': return 'En cours';
      case 'accepte': return 'Accepté';
      case 'refuse': return 'Refusé';
      default: return status;
    }
  };

  // Gestion des uploads et prévisualisation
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'cv' | 'diploma' | 'photos') => {
    const files = e.target.files;
    if (!files) return;
    if (type === 'photos') {
      const validFiles = Array.from(files).filter(f => f.size <= maxFileSize && (f.type.startsWith('image/')));
      setCandidateData(data => ({...data, photos: validFiles}));
      setFilePreviews(pre => ({...pre, photos: validFiles.map(f => URL.createObjectURL(f))}));
    } else {
      const file = files[0];
      if (file && file.size <= maxFileSize) {
        setCandidateData(data => ({...data, [type]: file}));
        setFilePreviews(pre => ({...pre, [type]: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined}));
      } else {
        setUploadError('Fichier trop volumineux (max 10 Mo)');
      }
    }
  };

  const handleMultiStepSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) setStep(step + 1);
    else {
      // Soumission finale
      alert('Candidature envoyée !');
      setStep(1);
      setCandidateData({firstName: '', lastName: '', email: '', phone: '', experience: '', position: '', motivation: '', cv: null, diploma: null, photos: []});
      setFilePreviews({photos: []});
    }
  };

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); } // placeholder

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || candidate.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Fonctions pour la gestion des offres d'emploi
  const handleJobOfferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newJobOffer: JobOffer = {
      id: Date.now().toString(),
      title: jobOfferData.title,
      description: jobOfferData.description,
      contractType: jobOfferData.contractType as 'cdi' | 'cdd' | 'stage' | 'apprentissage',
      experienceRequired: parseInt(jobOfferData.experienceRequired),
      wilaya: jobOfferData.wilaya,
      createdAt: new Date().toISOString().split('T')[0],
      isActive: true,
    };
    const updatedOffers = [newJobOffer, ...jobOffers];
    setJobOffers(updatedOffers);
    localStorage.setItem('garoui-job-offers', JSON.stringify(updatedOffers));
    setJobOfferData({ title: '', description: '', contractType: '', experienceRequired: '', wilaya: '' });
    setShowJobOffers(false);
  };

  const toggleJobOfferStatus = (id: string) => {
    const updatedOffers = jobOffers.map(offer => 
      offer.id === id ? { ...offer, isActive: !offer.isActive } : offer
    );
    setJobOffers(updatedOffers);
    localStorage.setItem('garoui-job-offers', JSON.stringify(updatedOffers));
  };

  const deleteJobOffer = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette offre d\'emploi ?')) {
      const updatedOffers = jobOffers.filter(offer => offer.id !== id);
      setJobOffers(updatedOffers);
      localStorage.setItem('garoui-job-offers', JSON.stringify(updatedOffers));
    }
  };

  const getContractTypeLabel = (type: string) => {
    switch (type) {
      case 'cdi': return 'CDI';
      case 'cdd': return 'CDD';
      case 'stage': return 'Stage';
      case 'apprentissage': return 'Apprentissage';
      default: return type;
    }
  };

  // Vérifier l'authentification et l'abonnement
  useEffect(() => {
    const savedUser = localStorage.getItem('garoui-user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      setIsAuthenticated(true);
    }
  }, []);

  const checkSubscriptionAccess = () => {
    if (!currentUser) {
      setShowSubscriptionRequired(true);
      return false;
    }
    
    if (currentUser.subscriptionStatus === 'free') {
      setShowSubscriptionRequired(true);
      return false;
    }
    
    return true;
  };

  const handleNavigateToSubscription = () => {
    onNavigate('subscription');
  };

  // Fonctions d'authentification admin
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mot de passe simple pour la démo - en production, utiliser une authentification sécurisée
    if (adminPassword === 'garoui2024') {
      setIsAuthenticated(true);
      setShowLoginModal(false);
      setShowAdmin(true);
      setAdminPassword('');
      setLoginError('');
    } else {
      setLoginError('Mot de passe incorrect');
    }
  };

  const handleAdminLogout = () => {
    setIsAuthenticated(false);
    setShowAdmin(false);
    setShowJobOffers(false);
  };

  const handleAdminButtonClick = () => {
    if (isAuthenticated) {
      setShowAdmin(true);
    } else {
      setShowLoginModal(true);
    }
  };

  if (showDashboard) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Dashboard Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Tableau de bord RH</h1>
            <p className="text-slate-600 mt-2">Gestion des candidatures et recrutement</p>
          </div>
          <Button onClick={() => setShowDashboard(false)} variant="outline">
            Retour aux candidatures
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Rechercher par nom ou poste..."
                value={searchTerm}
                onChange={setSearchTerm}
                className="w-full"
              />
            </div>
            <div className="sm:w-48">
              <Select
                value={statusFilter}
                onChange={setStatusFilter}
                options={statusOptions}
                placeholder="Filtrer par statut"
              />
            </div>
          </div>
        </Card>

        {/* Candidates Table */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 font-semibold text-slate-900">Candidat</th>
                  <th className="text-left py-3 font-semibold text-slate-900">Poste</th>
                  <th className="text-left py-3 font-semibold text-slate-900">Date</th>
                  <th className="text-left py-3 font-semibold text-slate-900">Statut</th>
                  <th className="text-left py-3 font-semibold text-slate-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCandidates.map((candidate) => (
                  <tr key={candidate.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-4">
                      <div>
                        <div className="font-medium text-slate-900">
                          {candidate.firstName} {candidate.lastName}
                        </div>
                        <div className="text-sm text-slate-600">{candidate.email}</div>
                      </div>
                    </td>
                    <td className="py-4 text-slate-900">{candidate.position}</td>
                    <td className="py-4 text-slate-600">
                      {new Date(candidate.applicationDate).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(candidate.status)}`}>
                        {getStatusLabel(candidate.status)}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex space-x-2">
                        <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    );
  }

  // Interface Admin pour la gestion des offres d'emploi
  if (showAdmin) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Admin Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-primary">Administration RH</h1>
            <p className="text-slate-600 mt-2">Gestion des offres d'emploi et recrutement</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => setShowJobOffers(true)} variant="accent" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Nouvelle offre
            </Button>
            <Button onClick={handleAdminLogout} variant="outline">
              Déconnexion
            </Button>
          </div>
        </div>

        {/* Job Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobOffers.map((offer) => (
            <Card key={offer.id} className={`p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col bg-gradient-to-br from-white to-slate-50 border border-slate-200 hover:border-primary/20 group ${!offer.isActive ? 'opacity-60' : ''}`}>
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
              {/* Boutons d'action admin */}
              <div className="flex justify-center gap-3 mt-4 pt-4 border-t border-slate-200">
                <button
                  onClick={() => toggleJobOfferStatus(offer.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    offer.isActive 
                      ? 'bg-green-100 text-green-800 hover:bg-green-200 border border-green-200' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-200'
                  }`}
                >
                  {offer.isActive ? '✅ Active' : '⏸️ Inactive'}
                </button>
                <button
                  onClick={() => deleteJobOffer(offer.id)}
                  className="px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors border border-red-200 hover:border-red-300"
                  title="Supprimer l'offre"
                >
                  🗑️ Supprimer
                </button>
              </div>
            </Card>
          ))}
        </div>

        {/* Modal pour nouvelle offre */}
        {showJobOffers && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-primary">Nouvelle offre d'emploi</h2>
                <button
                  onClick={() => setShowJobOffers(false)}
                  className="text-slate-500 hover:text-slate-700"
                >
                  ✕
                </button>
              </div>
              <form onSubmit={handleJobOfferSubmit} className="space-y-4">
                <Input
                  label="Titre du poste"
                  value={jobOfferData.title}
                  onChange={v => setJobOfferData(d => ({...d, title: v}))}
                  required
                />
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Description du poste <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={jobOfferData.description}
                    onChange={e => setJobOfferData(d => ({...d, description: e.target.value}))}
                    rows={4}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-colors"
                    required
                    placeholder="Décrivez le poste, les missions, les compétences requises..."
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <Select
                    label="Type de contrat"
                    value={jobOfferData.contractType}
                    onChange={v => setJobOfferData(d => ({...d, contractType: v}))}
                    options={contractTypeOptions}
                    required
                  />
                  <Select
                    label="Années d'expérience requises"
                    value={jobOfferData.experienceRequired}
                    onChange={v => setJobOfferData(d => ({...d, experienceRequired: v}))}
                    options={Array.from({length: 21}, (_, i) => ({value: i.toString(), label: i === 0 ? 'Débutant' : i + ' ans'}))}
                    required
                  />
                </div>
                <Select
                  label="Wilaya"
                  value={jobOfferData.wilaya}
                  onChange={v => setJobOfferData(d => ({...d, wilaya: v}))}
                  options={wilayaOptions}
                  required
                />
                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowJobOffers(false)}
                  >
                    Annuler
                  </Button>
                  <Button type="submit" variant="accent">
                    Publier l'offre
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Modal d'abonnement requis
  if (showSubscriptionRequired) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary to-accent">
        <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <Crown className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-primary mb-4">Abonnement Requis</h1>
          <p className="text-slate-600 mb-6">
            Pour accéder aux offres d'emploi et postuler aux missions, vous devez souscrire à un abonnement premium.
          </p>
          <div className="bg-slate-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-slate-900 mb-2">Fonctionnalités Premium :</h3>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>• Postuler aux offres d'emploi</li>
              <li>• Accès complet aux missions</li>
              <li>• Notifications en temps réel</li>
              <li>• Support prioritaire</li>
              <li>• Profil mis en avant</li>
            </ul>
          </div>
          <div className="flex gap-3">
            <Button onClick={handleNavigateToSubscription} variant="accent" className="flex-1">
              Voir les abonnements
            </Button>
            <Button onClick={() => setShowSubscriptionRequired(false)} variant="outline">
              Retour
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
    className="min-h-screen flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 bg-cover bg-center"
    style={{ backgroundImage: "url('recrutement.jpg')" }}
  >
    <div className="max-w-2xl w-full bg-white/80 rounded-xl shadow-lg p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">Rejoignez Garoui Électricité</h1>
          <p className="text-slate-700">Déposez votre candidature pour un poste ou un stage. Nous recrutons des techniciens, ingénieurs, stagiaires, etc. Toutes les candidatures sont étudiées avec attention.</p>
        </div>
        <div className="flex gap-2">
          {currentUser && (
            <div className="text-right mr-4">
              <div className="text-sm text-slate-600">Connecté : {currentUser.firstName}</div>
              <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                currentUser.subscriptionStatus === 'premium' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {currentUser.subscriptionStatus === 'premium' ? 'Premium' : 'Gratuit'}
              </div>
            </div>
          )}
          <Button onClick={handleAdminButtonClick} variant="outline" className="flex items-center gap-2">
            <Lock className="w-4 h-4" />
            Admin RH
          </Button>
        </div>
      </div>

      {/* Offres d'emploi actives */}
      <JobOffersSection 
        jobOffers={jobOffers}
        currentUser={currentUser}
        onNavigateToSubscription={handleNavigateToSubscription}
      />

      {/* Offres d'emploi des entreprises partenaires */}
      <CompanyJobOffersSection 
        companyJobOffers={companyJobOffers}
        currentUser={currentUser}
        onNavigateToSubscription={handleNavigateToSubscription}
      />

      <div className="mb-8">
        <div className="flex justify-between mb-2 text-sm font-medium text-slate-700">
          <span>Informations</span>
          <span>Pièces jointes</span>
          <span>Confirmation</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div className="bg-accent h-2 rounded-full transition-all duration-300" style={{ width: `${(step / 3) * 100}%` }}></div>
        </div>
      </div>
      {!isAuthenticated ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-slate-900 mb-2">Connexion Requise</h2>
          <p className="text-slate-600 mb-6">Vous devez vous connecter pour accéder aux fonctionnalités de recrutement.</p>
          <Button onClick={handleNavigateToSubscription} variant="accent">
            Se connecter / S'inscrire
          </Button>
        </div>
      ) : currentUser?.subscriptionStatus === 'free' ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Crown className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-slate-900 mb-2">Abonnement Premium Requis</h2>
          <p className="text-slate-600 mb-6">Pour postuler aux offres d'emploi, vous devez souscrire à un abonnement premium.</p>
          <Button onClick={handleNavigateToSubscription} variant="accent">
            Voir les abonnements
          </Button>
        </div>
      ) : (
        <form onSubmit={handleMultiStepSubmit} className="space-y-6" encType="multipart/form-data">
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Input label="Nom" value={candidateData.lastName} onChange={v => setCandidateData(d => ({...d, lastName: v}))} required />
                <Input label="Prénom" value={candidateData.firstName} onChange={v => setCandidateData(d => ({...d, firstName: v}))} required />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <Input label="Email" type="email" value={candidateData.email} onChange={v => setCandidateData(d => ({...d, email: v}))} required />
                <Input label="Téléphone" type="tel" value={candidateData.phone} onChange={v => setCandidateData(d => ({...d, phone: v}))} required />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <Select label="Années d'expérience" value={candidateData.experience} onChange={v => setCandidateData(d => ({...d, experience: v}))} options={Array.from({length: 41}, (_, i) => ({value: i.toString(), label: i === 0 ? 'Débutant' : i + ' ans'}))} required />
                <Input label="Poste souhaité" value={candidateData.position} onChange={v => setCandidateData(d => ({...d, position: v}))} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Motivation <span className="text-red-500">*</span></label>
                <textarea value={candidateData.motivation} onChange={e => setCandidateData(d => ({...d, motivation: e.target.value}))} rows={4} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-colors" required placeholder="Expliquez pourquoi vous souhaitez rejoindre Garoui..." />
              </div>
            </div>
          )}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">CV (.pdf, .doc) <span className="text-red-500">*</span></label>
              <input type="file" accept=".pdf,.doc,.docx" required onChange={e => handleFileChange(e, 'cv')} className="block w-full text-sm text-slate-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-white hover:file:bg-accent/80" />
              {filePreviews.cv && <a href={filePreviews.cv} target="_blank" rel="noopener noreferrer" className="text-accent underline text-sm mt-1 inline-block">Prévisualiser</a>}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Diplôme ou Attestation <span className="text-red-500">*</span></label>
              <input type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" required onChange={e => handleFileChange(e, 'diploma')} className="block w-full text-sm text-slate-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-white hover:file:bg-accent/80" />
              {filePreviews.diploma && <a href={filePreviews.diploma} target="_blank" rel="noopener noreferrer" className="text-accent underline text-sm mt-1 inline-block">Prévisualiser</a>}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Photos de réalisations (.jpg, .png, max 10 Mo/fichier)</label>
              <input type="file" accept=".jpg,.jpeg,.png" multiple onChange={e => handleFileChange(e, 'photos')} className="block w-full text-sm text-slate-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-white hover:file:bg-accent/80" />
              <div className="flex flex-wrap gap-2 mt-2">
                {filePreviews.photos && filePreviews.photos.map((url, i) => (
                  <img key={i} src={url} alt={`Réalisation ${i+1}`} className="w-16 h-16 object-cover rounded-lg border" />
                ))}
              </div>
            </div>
            {uploadError && <div className="text-red-600 text-sm">{uploadError}</div>}
          </div>
        )}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Récapitulatif</h3>
            <div className="bg-slate-50 rounded-lg p-4 space-y-2">
              <div><strong>Nom :</strong> {candidateData.lastName}</div>
              <div><strong>Prénom :</strong> {candidateData.firstName}</div>
              <div><strong>Email :</strong> {candidateData.email}</div>
              <div><strong>Téléphone :</strong> {candidateData.phone}</div>
              <div><strong>Expérience :</strong> {candidateData.experience} ans</div>
              <div><strong>Poste :</strong> {candidateData.position}</div>
              <div><strong>Motivation :</strong> {candidateData.motivation}</div>
              <div><strong>CV :</strong> {candidateData.cv ? candidateData.cv.name : 'Non fourni'}</div>
              <div><strong>Diplôme :</strong> {candidateData.diploma ? candidateData.diploma.name : 'Non fourni'}</div>
              <div><strong>Photos :</strong> {candidateData.photos.length} fichier(s)</div>
            </div>
          </div>
        )}
        <div className="flex justify-between pt-6">
          {step > 1 && (
            <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
              Précédent
            </Button>
          )}
          <Button type="submit" variant="accent" className={step === 1 ? 'ml-auto' : ''}>
            {step === 3 ? 'Envoyer la candidature' : 'Suivant'}
          </Button>
        </div>
      </form>
      )}

      {/* Modal de connexion admin */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-primary">Connexion Admin</h2>
              <button
                onClick={() => {
                  setShowLoginModal(false);
                  setAdminPassword('');
                  setLoginError('');
                }}
                className="text-slate-500 hover:text-slate-700"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Mot de passe administrateur <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-colors"
                  required
                  placeholder="Entrez le mot de passe"
                />
              </div>
              {loginError && (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                  {loginError}
                </div>
              )}
              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowLoginModal(false);
                    setAdminPassword('');
                    setLoginError('');
                  }}
                >
                  Annuler
                </Button>
                <Button type="submit" variant="accent">
                  Se connecter
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
       </div>
    </div>
  );
};