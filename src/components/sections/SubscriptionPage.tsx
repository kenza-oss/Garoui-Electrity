import React, { useState, useEffect } from 'react';
import { CreditCard, Check, Shield, Users, Calendar, Star, Lock, Eye, EyeOff, CreditCard as CreditCardIcon, Building2, Smartphone } from 'lucide-react';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Card } from '../common/Card';
import { User, SubscriptionPlan, PaymentMethod } from '../../types';

interface SubscriptionPageProps {
  onNavigate: (section: string) => void;
}

export const SubscriptionPage: React.FC<SubscriptionPageProps> = ({ onNavigate }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [step, setStep] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // États pour l'inscription/connexion
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    profession: '',
    experience: '',
    password: '',
    confirmPassword: '',
  });

  // États pour le paiement
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    paymentMethod: 'card' as 'card' | 'bank_transfer' | 'mobile_money',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Plans d'abonnement
  const subscriptionPlans: SubscriptionPlan[] = [
    {
      id: 'basic',
      name: 'Accès Basique',
      price: 0,
      duration: 0,
      features: [
        'Voir les offres d\'emploi',
        'Profil de base',
        'Accès limité aux missions',
      ],
    },
    {
      id: 'premium',
      name: 'Premium 1 Mois',
      price: 1500,
      duration: 1,
      features: [
        'Toutes les fonctionnalités basiques',
        'Postuler aux offres d\'emploi',
        'Accès complet aux missions',
        'Notifications en temps réel',
        'Support prioritaire',
        'Profil mis en avant',
      ],
      isPopular: true,
    },
    {
      id: 'pro',
      name: 'Premium 3 Mois',
      price: 4000,
      duration: 3,
      features: [
        'Toutes les fonctionnalités Premium',
        'Accès aux missions exclusives',
        'Formation continue incluse',
        'Certification Garoui',
        'Accès à la communauté',
        'Mentorat personnalisé',
        'Prix avantageux !',
      ],
    },
  ];

  // Méthodes de paiement
  const paymentMethods: PaymentMethod[] = [
    {
      id: 'card',
      type: 'card',
      brand: 'Visa/Mastercard',
      isDefault: true,
    },
    {
      id: 'bank',
      type: 'bank_transfer',
      isDefault: false,
    },
    {
      id: 'mobile',
      type: 'mobile_money',
      isDefault: false,
    },
  ];

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    const savedUser = localStorage.getItem('garoui-user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      setIsAuthenticated(true);
    } else {
      // Créer un utilisateur de test par défaut
      const testUser: User = {
        id: 'test-user',
        firstName: 'Test',
        lastName: 'User',
        email: 'test@garoui.com',
        phone: '06 12 34 56 78',
        profession: 'Électricien',
        experience: 5,
        subscriptionStatus: 'free',
        createdAt: new Date().toISOString(),
      };
      setCurrentUser(testUser);
      setIsAuthenticated(true);
      localStorage.setItem('garoui-user', JSON.stringify(testUser));
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Simulation de connexion
    const savedUsers = localStorage.getItem('garoui-users');
    const users = savedUsers ? JSON.parse(savedUsers) : [];
    
    const user = users.find((u: User) => u.email === loginData.email);
    
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      setShowLogin(false);
      setLoginData({ email: '', password: '' });
      localStorage.setItem('garoui-user', JSON.stringify(user));
    } else {
      setError('Email ou mot de passe incorrect');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (registerData.password !== registerData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (registerData.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    const newUser: User = {
      id: Date.now().toString(),
      firstName: registerData.firstName,
      lastName: registerData.lastName,
      email: registerData.email,
      phone: registerData.phone,
      profession: registerData.profession,
      experience: parseInt(registerData.experience),
      subscriptionStatus: 'free',
      createdAt: new Date().toISOString(),
    };

    // Sauvegarder l'utilisateur
    const savedUsers = localStorage.getItem('garoui-users');
    const users = savedUsers ? JSON.parse(savedUsers) : [];
    users.push(newUser);
    localStorage.setItem('garoui-users', JSON.stringify(users));
    localStorage.setItem('garoui-user', JSON.stringify(newUser));

    setCurrentUser(newUser);
    setIsAuthenticated(true);
    setShowRegister(false);
    setRegisterData({
      firstName: '', lastName: '', email: '', phone: '', profession: '', experience: '', password: '', confirmPassword: ''
    });
    setSuccess('Compte créé avec succès !');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('garoui-user');
    setStep(1);
  };

  const handleSelectPlan = (plan: SubscriptionPlan) => {
    if (!isAuthenticated) {
      setShowLogin(true);
      return;
    }
    
    setSelectedPlan(plan);
    setShowPayment(true);
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Simulation de paiement
    if (!selectedPlan || !currentUser) return;

    // Vérifier les données de paiement
    if (paymentData.paymentMethod === 'card') {
      if (!paymentData.cardNumber || !paymentData.cardHolder || !paymentData.expiryDate || !paymentData.cvv) {
        setError('Veuillez remplir tous les champs de paiement');
        return;
      }
    }

    // Simuler le traitement du paiement
    setTimeout(() => {
      const updatedUser = {
        ...currentUser,
        subscriptionStatus: 'premium' as const,
        subscriptionEndDate: new Date(Date.now() + selectedPlan.duration * 30 * 24 * 60 * 60 * 1000).toISOString(),
      };

      // Mettre à jour l'utilisateur
      const savedUsers = localStorage.getItem('garoui-users');
      const users = savedUsers ? JSON.parse(savedUsers) : [];
      const updatedUsers = users.map((u: User) => 
        u.id === currentUser.id ? updatedUser : u
      );
      
      localStorage.setItem('garoui-users', JSON.stringify(updatedUsers));
      localStorage.setItem('garoui-user', JSON.stringify(updatedUser));
      
      setCurrentUser(updatedUser);
      setShowPayment(false);
      setPaymentData({
        cardNumber: '', cardHolder: '', expiryDate: '', cvv: '', paymentMethod: 'card'
      });
      setSuccess('Abonnement activé avec succès !');
      
      // Rediriger vers la page de recrutement
      setTimeout(() => {
        onNavigate('recrutement');
      }, 2000);
    }, 2000);
  };

  const getSubscriptionStatusColor = (status: string) => {
    switch (status) {
      case 'premium': return 'bg-green-100 text-green-800';
      case 'free': return 'bg-blue-100 text-blue-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSubscriptionStatusLabel = (status: string) => {
    switch (status) {
      case 'premium': return 'Premium';
      case 'free': return 'Gratuit';
      case 'expired': return 'Expiré';
      default: return status;
    }
  };

  // Si l'utilisateur n'est pas connecté, afficher la page de connexion/inscription
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary to-accent">
        <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-primary mb-2">Espace Recrutement</h1>
            <p className="text-slate-600">Connectez-vous pour accéder aux offres d'emploi et missions</p>
          </div>

          {showLogin ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <h2 className="text-2xl font-bold text-center text-primary mb-6">Connexion</h2>
              
              <Input
                label="Email"
                type="email"
                value={loginData.email}
                onChange={(v) => setLoginData(d => ({...d, email: v}))}
                required
              />
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Mot de passe <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginData.password}
                    onChange={(e) => setLoginData(d => ({...d, password: e.target.value}))}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</div>}

              <Button type="submit" variant="accent" className="w-full">
                Se connecter
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setShowLogin(false);
                    setShowRegister(true);
                    setError('');
                  }}
                  className="text-accent hover:text-accent/80 text-sm"
                >
                  Pas encore de compte ? S'inscrire
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <h2 className="text-2xl font-bold text-center text-primary mb-6">Inscription</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Prénom"
                  value={registerData.firstName}
                  onChange={(v) => setRegisterData(d => ({...d, firstName: v}))}
                  required
                />
                <Input
                  label="Nom"
                  value={registerData.lastName}
                  onChange={(v) => setRegisterData(d => ({...d, lastName: v}))}
                  required
                />
              </div>

              <Input
                label="Email"
                type="email"
                value={registerData.email}
                onChange={(v) => setRegisterData(d => ({...d, email: v}))}
                required
              />

              <Input
                label="Téléphone"
                type="tel"
                value={registerData.phone}
                onChange={(v) => setRegisterData(d => ({...d, phone: v}))}
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Profession"
                  value={registerData.profession}
                  onChange={(v) => setRegisterData(d => ({...d, profession: v}))}
                  required
                />
                <Select
                  label="Expérience (années)"
                  value={registerData.experience}
                  onChange={(v) => setRegisterData(d => ({...d, experience: v}))}
                  options={Array.from({length: 41}, (_, i) => ({value: i.toString(), label: i === 0 ? 'Débutant' : i + ' ans'}))}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Mot de passe <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={registerData.password}
                    onChange={(e) => setRegisterData(d => ({...d, password: e.target.value}))}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Confirmer le mot de passe <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={registerData.confirmPassword}
                    onChange={(e) => setRegisterData(d => ({...d, confirmPassword: e.target.value}))}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</div>}

              <Button type="submit" variant="accent" className="w-full">
                S'inscrire
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setShowRegister(false);
                    setShowLogin(true);
                    setError('');
                  }}
                  className="text-accent hover:text-accent/80 text-sm"
                >
                  Déjà un compte ? Se connecter
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  }

  // Page principale pour les utilisateurs connectés
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-2">Espace Recrutement</h1>
            <p className="text-slate-600">Choisissez votre plan d'abonnement pour accéder aux offres d'emploi</p>
          </div>
          <div className="flex items-center gap-4">
            {currentUser && (
              <div className="text-right">
                <div className="text-sm text-slate-600">Connecté en tant que</div>
                <div className="font-medium text-slate-900">{currentUser.firstName} {currentUser.lastName}</div>
                <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getSubscriptionStatusColor(currentUser.subscriptionStatus)}`}>
                  {getSubscriptionStatusLabel(currentUser.subscriptionStatus)}
                </div>
              </div>
            )}
            <Button onClick={handleLogout} variant="outline">
              Déconnexion
            </Button>
          </div>
        </div>

        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-green-800">
              <Check className="w-5 h-5" />
              {success}
            </div>
          </div>
        )}

        {/* Plans d'abonnement */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {subscriptionPlans.map((plan) => (
            <Card key={plan.id} className={`relative p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ${
              plan.isPopular ? 'ring-2 ring-accent shadow-lg' : ''
            }`}>
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-accent text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    Populaire
                  </div>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-primary mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold text-accent mb-1">
                  {plan.price === 0 ? 'Gratuit' : `${plan.price.toLocaleString()} DA`}
                </div>
                {plan.price > 0 && (
                  <div className="text-sm text-slate-600">
                    par {plan.duration === 1 ? 'mois' : `${plan.duration} mois`}
                  </div>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => handleSelectPlan(plan)}
                variant={plan.isPopular ? 'accent' : 'outline'}
                className="w-full"
                disabled={currentUser?.subscriptionStatus === 'premium'}
              >
                {currentUser?.subscriptionStatus === 'premium' ? 'Abonnement actif' : 
                 plan.price === 0 ? 'Commencer gratuitement' : 'Choisir ce plan'}
              </Button>
            </Card>
          ))}
        </div>


      </div>

      {/* Modal de paiement */}
      {showPayment && selectedPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-primary">Paiement</h2>
              <button
                onClick={() => setShowPayment(false)}
                className="text-slate-500 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <div className="mb-6 p-4 bg-slate-50 rounded-lg">
              <h3 className="font-semibold text-slate-900 mb-2">{selectedPlan.name}</h3>
              <div className="text-2xl font-bold text-accent">{selectedPlan.price.toLocaleString()} DA</div>
              <div className="text-sm text-slate-600">
                pour {selectedPlan.duration === 1 ? '1 mois' : `${selectedPlan.duration} mois`}
              </div>
            </div>

            <div className="space-y-6">
              {/* Méthodes de paiement */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Méthodes de paiement</h3>
                
                {/* Paiement Chargily */}
                <div className="mb-4">
                  <Button
                    onClick={() => {
                      // Simulation de redirection vers Chargily
                      alert('Redirection vers Chargily pour le paiement sécurisé...');
                    }}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-medium"
                  >
                    💳 Payer par CIB / Dahabia
                  </Button>
                  <p className="text-sm text-slate-600 mt-2 text-center">
                    Paiement 100% sécurisé via Chargily
                  </p>
                </div>

                {/* Virement CPA (Facultatif) */}
                <div className="border-t pt-4">
                  <h4 className="font-medium text-slate-900 mb-3">Paiement par virement CPA (Facultatif)</h4>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <div className="text-sm text-slate-700 space-y-2">
                      <div><strong>Banque :</strong> CPA</div>
                      <div><strong>RIB :</strong> 4100231142-69 </div>
                      <div><strong>Bénéficiaire :</strong> GAROUÏ ÉLECTRICITÉ</div>
                      <div><strong>Montant :</strong> {selectedPlan.price.toLocaleString()} DA</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Informations légales */}
              <div className="border-t pt-4">
                <h4 className="font-medium text-slate-900 mb-3">Informations légales</h4>
                <div className="flex items-center gap-4 mb-3">
                  <div className="text-lg font-bold text-primary">GAROUÏ ÉLECTRICITÉ</div>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded flex items-center justify-center text-xs font-bold">CPA</div>
                    <div className="w-8 h-8 bg-green-600 text-white rounded flex items-center justify-center text-xs font-bold">CH</div>
                  </div>
                </div>
              </div>

              {/* Texte rassurant */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-800 text-center">
                  <strong>Paiement 100% sécurisé</strong> via Chargily et la Banque CPA.<br />
                  Vos informations bancaires ne sont jamais stockées sur notre site.
                </p>
              </div>

              {/* Étapes d'achat */}
              <div className="border-t pt-4">
                <h4 className="font-medium text-slate-900 mb-3">Étapes d'achat</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                    <span className="text-sm text-slate-700">Choisir l'abonnement ({selectedPlan.duration === 1 ? '1 mois' : '3 mois'})</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                    <span className="text-sm text-slate-700">Cliquer sur "Payer" → redirection vers Chargily</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                    <span className="text-sm text-slate-700">Recevoir la confirmation et pouvoir postuler aux offres</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowPayment(false)}
                >
                  Fermer
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 
