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
      name: 'Premium',
      price: 29.99,
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
      name: 'Professionnel',
      price: 79.99,
      duration: 3,
      features: [
        'Toutes les fonctionnalités Premium',
        'Accès aux missions exclusives',
        'Formation continue incluse',
        'Certification Garoui',
        'Accès à la communauté',
        'Mentorat personnalisé',
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
                  {plan.price === 0 ? 'Gratuit' : `${plan.price}€`}
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

        {/* Informations supplémentaires */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Sécurité garantie</h3>
                <p className="text-slate-600">Vos données personnelles et informations de paiement sont protégées par des protocoles de sécurité avancés.</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Support dédié</h3>
                <p className="text-slate-600">Une équipe d'experts est disponible pour vous accompagner dans votre parcours professionnel.</p>
              </div>
            </div>
          </Card>
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
              <div className="text-2xl font-bold text-accent">{selectedPlan.price}€</div>
              <div className="text-sm text-slate-600">
                pour {selectedPlan.duration === 1 ? '1 mois' : `${selectedPlan.duration} mois`}
              </div>
            </div>

            <form onSubmit={handlePayment} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Méthode de paiement
                </label>
                <div className="space-y-2">
                  {paymentMethods.map((method) => (
                    <label key={method.id} className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:border-accent">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.type}
                        checked={paymentData.paymentMethod === method.type}
                        onChange={(e) => setPaymentData(d => ({...d, paymentMethod: e.target.value as any}))}
                        className="text-accent"
                      />
                      <div className="flex items-center gap-2">
                        {method.type === 'card' && <CreditCardIcon className="w-5 h-5 text-slate-600" />}
                        {method.type === 'bank_transfer' && <Building2 className="w-5 h-5 text-slate-600" />}
                        {method.type === 'mobile_money' && <Smartphone className="w-5 h-5 text-slate-600" />}
                        <span className="font-medium">
                          {method.type === 'card' ? 'Carte bancaire' :
                           method.type === 'bank_transfer' ? 'Virement bancaire' :
                           'Mobile Money'}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {paymentData.paymentMethod === 'card' && (
                <div className="space-y-4">
                  <Input
                    label="Numéro de carte"
                    value={paymentData.cardNumber}
                    onChange={(v) => setPaymentData(d => ({...d, cardNumber: v}))}
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Titulaire"
                      value={paymentData.cardHolder}
                      onChange={(v) => setPaymentData(d => ({...d, cardHolder: v}))}
                      placeholder="NOM Prénom"
                      required
                    />
                    <Input
                      label="Date d'expiration"
                      value={paymentData.expiryDate}
                      onChange={(v) => setPaymentData(d => ({...d, expiryDate: v}))}
                      placeholder="MM/AA"
                      required
                    />
                  </div>
                  <Input
                    label="CVV"
                    value={paymentData.cvv}
                    onChange={(v) => setPaymentData(d => ({...d, cvv: v}))}
                    placeholder="123"
                    required
                  />
                </div>
              )}

              {error && <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</div>}

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowPayment(false)}
                >
                  Annuler
                </Button>
                <Button type="submit" variant="accent">
                  Payer {selectedPlan.price}€
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}; 