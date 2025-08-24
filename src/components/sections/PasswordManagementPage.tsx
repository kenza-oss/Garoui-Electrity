import React, { useState, useEffect } from 'react';
import { Partner } from '../../types';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Card } from '../common/Card';

interface PasswordEntry {
  id: string;
  companyName: string;
  password: string;
  contactPerson: string;
  phone: string;
  wilaya: string;
  isVisible: boolean;
}

export const PasswordManagementPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwords, setPasswords] = useState<PasswordEntry[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterWilaya, setFilterWilaya] = useState('');

  // Données mockées des entreprises partenaires
  const mockPartners: Partner[] = [
    {
      id: '1',
      companyName: 'Mono Electric',
      contactName: 'Service Commercial',
      password: 'mono2024',
      phone: '+213 21 00 00 01',
      expertise: ['Appareillage', 'LED'],
      location: 'Alger',
      status: 'approved',
      documents: { kbis: 'available', insurance: 'available' },
      logoUrl: 'mono.png',
      secteur: 'Appareillage & LED',
      wilaya: 'Alger',
      description: 'Fabricant d\'appareillage électrique et solutions LED pour le résidentiel et le tertiaire.',
      site: 'https://monoelectric.com',
    },
    {
      id: '2',
      companyName: 'BMS Electric SARL',
      contactName: 'Service Client',
      password: 'bms2024',
      phone: '+213 21 00 00 02',
      expertise: ['Appareillage', 'Accessoires'],
      location: 'Oran',
      status: 'approved',
      documents: { kbis: 'available', insurance: 'available' },
      logoUrl: 'bms.jpg',
      secteur: 'Appareillage & accessoires',
      wilaya: 'Oran',
      description: 'Distributeur d\'appareillage, accessoires et solutions électriques pour professionnels.',
      site: 'https://bms-electric.com',
    },
    {
      id: '3',
      companyName: 'SAIEG (Sonelgaz)',
      contactName: 'Direction',
      password: 'saieg2024',
      phone: '+213 21 00 00 03',
      expertise: ['Équipements énergétiques'],
      location: 'Blida',
      status: 'approved',
      documents: { kbis: 'available', insurance: 'available' },
      logoUrl: 'sonalgaz.png',
      secteur: 'Équipements énergétiques',
      wilaya: 'Blida',
      description: 'Filiale Sonelgaz spécialisée dans les équipements et solutions énergétiques.',
      site: 'https://fr.wikipedia.org/wiki/SAIEG',
    },
    {
      id: '4',
      companyName: 'Schneider Electric Algérie',
      contactName: 'Service Pro',
      password: 'schneider2024',
      phone: '+213 21 00 00 04',
      expertise: ['Automatisme', 'Distribution'],
      location: 'Alger',
      status: 'approved',
      documents: { kbis: 'available', insurance: 'available' },
      logoUrl: 'schneider.jpg',
      secteur: 'Automatisme & distribution',
      wilaya: 'Alger',
      description: 'Leader mondial des solutions d\'automatisme et de distribution électrique.',
      site: 'https://www.se.com/dz/fr/',
    },
    {
      id: '5',
      companyName: 'Legrand Algérie',
      contactName: 'Service Commercial',
      password: 'legrand2024',
      phone: '+213 21 00 00 05',
      expertise: ['Appareillage', 'Domotique'],
      location: 'Alger',
      status: 'approved',
      documents: { kbis: 'available', insurance: 'available' },
      logoUrl: 'legrand.png',
      secteur: 'Appareillage & domotique',
      wilaya: 'Alger',
      description: 'Spécialiste des solutions d\'appareillage électrique et de domotique.',
      site: 'https://www.legrand.fr/',
    },
    {
      id: '6',
      companyName: 'Entreprise Électrique Plus',
      contactName: 'Ahmed Benali',
      password: 'entreprise2024',
      phone: '+213 123 456 789',
      expertise: ['Installation électrique', 'Maintenance'],
      location: 'Alger',
      status: 'approved',
      documents: { kbis: 'available', insurance: 'available' },
      logoUrl: undefined,
      secteur: 'Installation & maintenance',
      wilaya: 'Alger',
      description: 'Spécialisée dans l\'installation électrique industrielle et la maintenance.',
      site: 'www.entreprise-electrique.com',
    }
  ];

  const [formData, setFormData] = useState({
    companyName: '',
    password: '',
    contactPerson: '',
    phone: '',
    wilaya: ''
  });

  useEffect(() => {
    // Convertir les partenaires en entrées de mots de passe
    const passwordEntries: PasswordEntry[] = mockPartners.map(partner => ({
      id: partner.id,
      companyName: partner.companyName,
      password: partner.password,
      contactPerson: partner.contactName,
      phone: partner.phone,
      wilaya: partner.wilaya,
      isVisible: false
    }));
    setPasswords(passwordEntries);
  }, []);

  const handleAddPassword = () => {
    if (!formData.companyName || !formData.password) {
      alert('Veuillez remplir au moins le nom de l\'entreprise et le mot de passe');
      return;
    }

    const newPassword: PasswordEntry = {
      id: Date.now().toString(),
      ...formData,
      isVisible: false
    };

    setPasswords([...passwords, newPassword]);
    setFormData({
      companyName: '',
      password: '',
      contactPerson: '',
      phone: '',
      wilaya: ''
    });
    setShowAddForm(false);
  };

  const handleEditPassword = (id: string) => {
    const password = passwords.find(p => p.id === id);
    if (password) {
      setFormData({
        companyName: password.companyName,
        password: password.password,
        contactPerson: password.contactPerson,
        phone: password.phone,
        wilaya: password.wilaya
      });
      setEditingId(id);
      setShowAddForm(true);
    }
  };

  const handleUpdatePassword = () => {
    if (!editingId) return;

    setPasswords(passwords.map(p => 
      p.id === editingId 
        ? { ...p, ...formData }
        : p
    ));

    setFormData({
      companyName: '',
      password: '',
      contactPerson: '',
      phone: '',
      wilaya: ''
    });
    setEditingId(null);
    setShowAddForm(false);
  };

  const handleDeletePassword = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce mot de passe ?')) {
      setPasswords(passwords.filter(p => p.id !== id));
    }
  };

  const togglePasswordVisibility = (id: string) => {
    setPasswords(passwords.map(p => 
      p.id === id 
        ? { ...p, isVisible: !p.isVisible }
        : p
    ));
  };

  const filteredPasswords = passwords.filter(password => {
    const matchesSearch = password.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         password.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesWilaya = !filterWilaya || password.wilaya === filterWilaya;
    return matchesSearch && matchesWilaya;
  });

  const wilayas = Array.from(new Set(passwords.map(p => p.wilaya))).sort();

  const handleAdminLogin = () => {
    if (adminPassword === 'garaouii2024') {
      setIsAuthenticated(true);
      setPasswordError('');
      setAdminPassword('');
    } else {
      setPasswordError('Mot de passe incorrect');
      setAdminPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowAddForm(false);
    setEditingId(null);
    setSearchTerm('');
    setFilterWilaya('');
  };

  const resetForm = () => {
    setFormData({
      companyName: '',
      password: '',
      contactPerson: '',
      phone: '',
      wilaya: ''
    });
    setEditingId(null);
    setShowAddForm(false);
  };

  // Écran de connexion administrateur
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
        <div className="max-w-md w-full mx-auto px-4">
          <Card className="p-8">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                🔐 Accès Administrateur
              </h1>
              <p className="text-gray-600">
                Page de gestion des mots de passe
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe administrateur
                </label>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
                  placeholder="Entrez le mot de passe"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                {passwordError && (
                  <p className="text-red-600 text-sm mt-1">{passwordError}</p>
                )}
              </div>
              
              <Button
                onClick={handleAdminLogin}
                className="w-full bg-primary hover:bg-primary-dark text-white py-2 rounded-md"
              >
                Se connecter
              </Button>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                Accès réservé aux administrateurs Garoui
              </p>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Contenu principal de la page (après authentification)
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header avec bouton de déconnexion */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Gestion des mots de passe
            </h1>
            <p className="text-gray-600">
              Gérez les mots de passe des entreprises partenaires
            </p>
          </div>
          
          <Button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
          >
            Se déconnecter
          </Button>
        </div>

        {/* Contrôles */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            {/* Recherche */}
            <div className="flex-1 max-w-md">
              <Input
                label="Rechercher"
                placeholder="Nom de l'entreprise ou contact..."
                value={searchTerm}
                onChange={setSearchTerm}
              />
            </div>

            {/* Filtre par wilaya */}
            <div className="w-full sm:w-48">
              <select
                value={filterWilaya}
                onChange={(e) => setFilterWilaya(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Toutes les wilayas</option>
                {wilayas.map(wilaya => (
                  <option key={wilaya} value={wilaya}>{wilaya}</option>
                ))}
              </select>
            </div>
          </div>

          <Button
            onClick={() => setShowAddForm(true)}
            className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-md"
          >
            Ajouter un mot de passe
          </Button>
        </div>

        {/* Formulaire d'ajout/modification */}
        {showAddForm && (
          <Card className="mb-6">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                {editingId ? 'Modifier le mot de passe' : 'Ajouter un nouveau mot de passe'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Input
                  label="Nom de l'entreprise"
                  placeholder="Nom de l'entreprise"
                  value={formData.companyName}
                  onChange={(value) => setFormData(prev => ({ ...prev, companyName: value }))}
                  required
                />
                <Input
                  label="Mot de passe"
                  type="password"
                  placeholder="Mot de passe"
                  value={formData.password}
                  onChange={(value) => setFormData(prev => ({ ...prev, password: value }))}
                  required
                />
                <Input
                  label="Personne de contact"
                  placeholder="Nom du contact"
                  value={formData.contactPerson}
                  onChange={(value) => setFormData(prev => ({ ...prev, contactPerson: value }))}
                />
                <Input
                  label="Téléphone"
                  placeholder="+213 123 456 789"
                  value={formData.phone}
                  onChange={(value) => setFormData(prev => ({ ...prev, phone: value }))}
                />
                <Input
                  label="Wilaya"
                  placeholder="Wilaya"
                  value={formData.wilaya}
                  onChange={(value) => setFormData(prev => ({ ...prev, wilaya: value }))}
                />
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={editingId ? handleUpdatePassword : handleAddPassword}
                  className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md"
                >
                  {editingId ? 'Mettre à jour' : 'Ajouter'}
                </Button>
                <Button
                  onClick={resetForm}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
                >
                  Annuler
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Liste des mots de passe */}
        <div className="grid gap-4">
          {filteredPasswords.map(password => (
            <Card key={password.id} className="p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {password.companyName}
                    </h3>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {password.wilaya}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Contact :</span> {password.contactPerson}
                    </div>
                    <div>
                      <span className="font-medium">Téléphone :</span> {password.phone}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Mot de passe :</span>
                      <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                        {password.isVisible ? password.password : '••••••••'}
                      </span>
                      <button
                        onClick={() => togglePasswordVisibility(password.id)}
                        className="text-blue-600 hover:text-blue-800 text-xs"
                      >
                        {password.isVisible ? 'Masquer' : 'Voir'}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => handleEditPassword(password.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 text-sm rounded"
                  >
                    Modifier
                  </Button>
                  <Button
                    onClick={() => handleDeletePassword(password.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 text-sm rounded"
                  >
                    Supprimer
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Message si aucun résultat */}
        {filteredPasswords.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {searchTerm || filterWilaya 
                ? 'Aucun mot de passe trouvé avec ces critères'
                : 'Aucun mot de passe enregistré'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
