import React, { useEffect, useState } from 'react';
import Building from 'lucide-react/dist/esm/icons/building';
import MapPin from 'lucide-react/dist/esm/icons/map-pin';
import Search from 'lucide-react/dist/esm/icons/search';
import Filter from 'lucide-react/dist/esm/icons/filter';
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';
import Clock from 'lucide-react/dist/esm/icons/clock';
import XCircle from 'lucide-react/dist/esm/icons/x-circle';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Card } from '../common/Card';
import { Partner } from '../../types';
import { api } from '../../lib/api';


interface SubcontractingPageProps {
  onNavigate: (section: string) => void;
  showPartnersDefault?: boolean;
}

export const SubcontractingPage: React.FC<SubcontractingPageProps> = ({ onNavigate, showPartnersDefault }) => {
  const [showPartners, setShowPartners] = useState(showPartnersDefault ?? false);
  const [step, setStep] = useState(1);
  const [partnerData, setPartnerData] = useState({
    companyName: '',
    rcNumber: '',
    wilaya: '',
    experience: '',
    specialties: [] as string[],
    charter: false,
    registre: null as File | null,
    attestation: null as File | null,
    references: null as File | null,
  });
  const [filePreviews, setFilePreviews] = useState<{registre?: string; attestation?: string; references?: string}>({});
  const [uploadError, setUploadError] = useState('');
  const maxFileSize = 10 * 1024 * 1024; // 10 Mo
  const [searchTerm, setSearchTerm] = useState('');
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loadingPartners, setLoadingPartners] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoadingPartners(true);
      try {
        const list = await api.listPartners();
        setPartners(Array.isArray(list) ? list : (list?.items || []));
      } catch {
        setPartners([]);
      } finally {
        setLoadingPartners(false);
      }
    };
    if (showPartners) load();
  }, [showPartners]);

  // Liste des partenaires chargée depuis l'API

  // Ajout d'un logo placeholder pour chaque partenaire
  const getLogoUrl = (companyName: string) => `https://ui-avatars.com/api/?name=${encodeURIComponent(companyName)}&background=002B45&color=fff&size=128&rounded=true`;

  // Ajout du filtrage secteur/wilaya
  const sectorOptions = [
    { value: '', label: 'Tous les secteurs' },
    ...Array.from(new Set(partners.flatMap(p => p.expertise))).map(sector => ({ value: sector, label: sector }))
  ];
  const wilayaOptionsFilter = [
    { value: '', label: 'Toutes les wilayas' },
    ...Array.from(new Set(partners.map(p => p.location))).map(wilaya => ({ value: wilaya, label: wilaya }))
  ];

  const [sectorFilter, setSectorFilter] = useState('');
  const [wilayaFilter, setWilayaFilter] = useState('');

  const filteredPartners = partners.filter(partner => {
    const matchesSearch = partner.companyName.toLowerCase().includes(searchTerm?.toLowerCase?.() ?? '') ||
      partner.expertise.some(exp => exp.toLowerCase().includes(searchTerm?.toLowerCase?.() ?? ''));
    const matchesSector = !sectorFilter || partner.expertise.includes(sectorFilter);
    const matchesWilaya = !wilayaFilter || partner.location === wilayaFilter;
    return matchesSearch && matchesSector && matchesWilaya;
  });

  const wilayaOptions = [
    { value: 'Adrar', label: 'Adrar' },
    { value: 'Chlef', label: 'Chlef' },
    { value: 'Laghouat', label: 'Laghouat' },
    { value: 'Oum El Bouaghi', label: 'Oum El Bouaghi' },
    { value: 'Batna', label: 'Batna' },
    { value: 'Béjaïa', label: 'Béjaïa' },
    { value: 'Biskra', label: 'Biskra' },
    { value: 'Béchar', label: 'Béchar' },
    { value: 'Blida', label: 'Blida' },
    { value: 'Bouira', label: 'Bouira' },
    { value: 'Tamanrasset', label: 'Tamanrasset' },
    { value: 'Tébessa', label: 'Tébessa' },
    { value: 'Tlemcen', label: 'Tlemcen' },
    { value: 'Tiaret', label: 'Tiaret' },
    { value: 'Tizi Ouzou', label: 'Tizi Ouzou' },
    { value: 'Alger', label: 'Alger' },
    { value: 'Djelfa', label: 'Djelfa' },
    { value: 'Jijel', label: 'Jijel' },
    { value: 'Sétif', label: 'Sétif' },
    { value: 'Saïda', label: 'Saïda' },
    { value: 'Skikda', label: 'Skikda' },
    { value: 'Sidi Bel Abbès', label: 'Sidi Bel Abbès' },
    { value: 'Annaba', label: 'Annaba' },
    { value: 'Guelma', label: 'Guelma' },
    { value: 'Constantine', label: 'Constantine' },
    { value: 'Médéa', label: 'Médéa' },
    { value: 'Mostaganem', label: 'Mostaganem' },
    { value: "M'Sila", label: "M'Sila" },
    { value: 'Mascara', label: 'Mascara' },
    { value: 'Ouargla', label: 'Ouargla' },
    { value: 'Oran', label: 'Oran' },
    { value: 'El Bayadh', label: 'El Bayadh' },
    { value: 'Illizi', label: 'Illizi' },
    { value: 'Bordj Bou Arreridj', label: 'Bordj Bou Arreridj' },
    { value: 'Boumerdès', label: 'Boumerdès' },
    { value: 'El Tarf', label: 'El Tarf' },
    { value: 'Tindouf', label: 'Tindouf' },
    { value: 'Tissemsilt', label: 'Tissemsilt' },
    { value: 'El Oued', label: 'El Oued' },
    { value: 'Khenchela', label: 'Khenchela' },
    { value: 'Souk Ahras', label: 'Souk Ahras' },
    { value: 'Tipaza', label: 'Tipaza' },
    { value: 'Mila', label: 'Mila' },
    { value: 'Aïn Defla', label: 'Aïn Defla' },
    { value: 'Naâma', label: 'Naâma' },
    { value: 'Aïn Témouchent', label: 'Aïn Témouchent' },
    { value: 'Ghardaïa', label: 'Ghardaïa' },
    { value: 'Relizane', label: 'Relizane' },
    { value: 'Timimoun', label: 'Timimoun' },
    { value: 'Bordj Badji Mokhtar', label: 'Bordj Badji Mokhtar' },
    { value: 'Ouled Djellal', label: 'Ouled Djellal' },
    { value: 'Béni Abbès', label: 'Béni Abbès' },
    { value: 'In Salah', label: 'In Salah' },
    { value: 'In Guezzam', label: 'In Guezzam' },
    { value: 'Touggourt', label: 'Touggourt' },
    { value: 'Djanet', label: 'Djanet' },
    { value: "El M'Ghair", label: "El M'Ghair" },
    { value: 'El Meniaa', label: 'El Meniaa' }
  ];
  const specialtiesOptions = [
    'Installation résidentielle', 'Installation commerciale', 'Installation industrielle',
    'Maintenance préventive', 'Dépannage d"urgence', 'Éclairage public',
    'Éclairage architectural', 'Domotique', 'Systèmes de sécurité', 'Bornes de recharge',
  ];

  const handleSpecialtyChange = (spec: string) => {
    setPartnerData(data => ({
      ...data,
      specialties: data.specialties.includes(spec)
        ? data.specialties.filter(s => s !== spec)
        : [...data.specialties, spec]
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'registre' | 'attestation' | 'references') => {
    const files = e.target.files;
    if (!files) return;
    const file = files[0];
    if (file && file.size <= maxFileSize) {
      setPartnerData(data => ({...data, [type]: file}));
      setFilePreviews(pre => ({...pre, [type]: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined}));
    } else {
      setUploadError('Fichier trop volumineux (max 10 Mo)');
    }
  };

  

  const handleMultiStepSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    if (step < 3) {
      setStep(step + 1);
      return;
    }
    try {
      const form = new FormData();
      form.append('raison_sociale', partnerData.companyName);
      form.append('wilaya', partnerData.wilaya);
      form.append('numero_registre_commerce', partnerData.rcNumber);
      form.append('annees_experience', partnerData.experience);
      form.append('specialites', JSON.stringify(partnerData.specialties));
      if (partnerData.registre) form.append('registre', partnerData.registre);
      if (partnerData.attestation) form.append('attestation', partnerData.attestation);
      if (partnerData.references) form.append('references', partnerData.references);
      await api.createCompany(form as unknown as any);
      alert('Demande de partenariat envoyée !');
      setStep(1);
      setPartnerData({companyName: '', rcNumber: '', wilaya: '', experience: '', specialties: [], charter: false, registre: null, attestation: null, references: null});
      setFilePreviews({});
    } catch (err) {
      setSubmitError((err as Error).message || 'Erreur lors de la soumission');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending': return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'rejected': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return null;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'approved': return 'Validé';
      case 'pending': return 'En attente';
      case 'rejected': return 'Refusé';
      default: return status;
    }
  };



  if (showPartners) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 bg-cover bg-center"
    style={{ backgroundImage: "url('/partenaire.jpg')" }} >
    <div className="max-w-2xl w-full bg-white/80 rounded-xl shadow-lg p-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-primary">Partenaires validés</h1>
            <p className="text-slate-700 mt-2">Réseau de sous-traitants qualifiés et certifiés</p>
          </div>
          <Button onClick={() => setShowPartners(false)} variant="outline">
            Devenir partenaire
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              placeholder="Rechercher par nom..."
              value={searchTerm}
              onChange={setSearchTerm}
            />
            <Select
              value={sectorFilter}
              onChange={setSectorFilter}
              options={[{ value: '', label: 'Tous les secteurs' }, ...Array.from(new Set(partners.map(p => p.secteur).filter((s): s is string => !!s))).map(s => ({ value: s, label: s }))]}
              placeholder={'Secteur'}
            />
            <Select
              value={wilayaFilter}
              onChange={setWilayaFilter}
              options={[{ value: '', label: 'Toutes les wilayas' }, ...Array.from(new Set(partners.map(p => p.wilaya).filter((w): w is string => !!w))).map(w => ({ value: w, label: w }))]}
              placeholder="Wilaya"
            />
          </div>
        </Card>

        {/* Partners Grid */}
        {loadingPartners && <div className="text-center text-slate-600 mt-6">Chargement des partenaires…</div>}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredPartners.map((partner) => (
            <Card
              key={partner.id}
              hover
              className="flex flex-col items-center text-center p-6 transition-transform duration-300 ease-out transform hover:-translate-y-1 hover:shadow-xl opacity-0 animate-fade-in-up"
            >
              <img
                src={partner.logoUrl || getLogoUrl(partner.companyName)}
                alt={partner.companyName}
                className="w-20 h-20 rounded-full mb-4 border-4 border-primary bg-white object-cover"
              />
              <h3 className="font-semibold text-primary text-lg mb-1">{partner.companyName}</h3>
              <div className="text-xs text-slate-500 mb-1">{partner.secteur}</div>
              <div className="text-xs text-slate-400 mb-2">{partner.wilaya}</div>
              <p className="text-sm text-slate-600 line-clamp-3 mb-2">{partner.description}</p>
              {partner.site && (
                <a href={partner.site} target="_blank" rel="noopener noreferrer" className="text-accent text-xs underline mb-2">Site web</a>
              )}
            </Card>
          ))}
        </div>
        {!loadingPartners && filteredPartners.length === 0 && (
          <div className="text-center text-slate-600 mt-6">Aucun partenaire trouvé.</div>
        )}
       </div>
       </div>
    );
  }

  if (!showPartners) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 bg-cover bg-center"
    style={{ backgroundImage: "url('/sous-traitance.jpg')" }} >
    <div className="max-w-2xl w-full bg-white/80 rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Devenir partenaire Garoui</h1>
        <p className="mb-8 text-slate-700">Inscrivez votre entreprise pour rejoindre notre réseau de sous-traitants qualifiés. Nous collaborons sur des projets Sonelgaz dans toute l"Algérie.</p>
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
        <form onSubmit={handleMultiStepSubmit} className="space-y-6" encType="multipart/form-data">
          {step === 1 && (
            <div className="space-y-4">
              <Input label="Raison sociale" value={partnerData.companyName} onChange={v => setPartnerData(d => ({...d, companyName: v}))} required />
              <div className="grid md:grid-cols-2 gap-4">
                <Input label="N° Registre Commerce" value={partnerData.rcNumber} onChange={v => setPartnerData(d => ({...d, rcNumber: v}))} required />
                <Select label="Wilaya" value={partnerData.wilaya} onChange={v => setPartnerData(d => ({...d, wilaya: v}))} options={wilayaOptions} required />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <Input label={'Années d\'expérience'} type="number" value={partnerData.experience} onChange={v => setPartnerData(d => ({...d, experience: v}))} required />
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Spécialités <span className="text-red-500">*</span></label>
                  <div className="flex flex-wrap gap-2">
                    {specialtiesOptions.map((spec, i) => (
                      <label key={i} className="flex items-center gap-2 text-sm">
                        <input type="checkbox" checked={partnerData.specialties.includes(spec)} onChange={() => handleSpecialtyChange(spec)} className="accent-accent" />
                        {spec}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <input type="checkbox" checked={partnerData.charter} onChange={e => setPartnerData(d => ({...d, charter: e.target.checked}))} className="accent-accent" required />
                <span className="text-sm">J'accepte la charte qualité Garoui</span>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Registre Commerce (.pdf, .jpg, .png) <span className="text-red-500">*</span></label>
                <input type="file" accept=".pdf,.jpg,.jpeg,.png" required onChange={e => handleFileChange(e, 'registre')} className="block w-full text-sm text-slate-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-white hover:file:bg-accent/80" />
                {filePreviews.registre && <a href={filePreviews.registre} target="_blank" rel="noopener noreferrer" className="text-accent underline text-sm mt-1 inline-block">Prévisualiser</a>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Attestation fiscale (.pdf, .jpg, .png) <span className="text-red-500">*</span></label>
                <input type="file" accept=".pdf,.jpg,.jpeg,.png" required onChange={e => handleFileChange(e, 'attestation')} className="block w-full text-sm text-slate-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-white hover:file:bg-accent/80" />
                {filePreviews.attestation && <a href={filePreviews.attestation} target="_blank" rel="noopener noreferrer" className="text-accent underline text-sm mt-1 inline-block">Prévisualiser</a>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Références chantiers (.pdf, .jpg, .png)</label>
                <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={e => handleFileChange(e, 'references')} className="block w-full text-sm text-slate-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-white hover:file:bg-accent/80" />
                {filePreviews.references && <a href={filePreviews.references} target="_blank" rel="noopener noreferrer" className="text-accent underline text-sm mt-1 inline-block">Prévisualiser</a>}
              </div>
              {uploadError && <div className="text-red-600 text-sm">{uploadError}</div>}
            </div>
          )}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary">Récapitulatif</h3>
              <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                <div><strong>Raison sociale :</strong> {partnerData.companyName}</div>
                <div><strong>N° RC :</strong> {partnerData.rcNumber}</div>
                <div><strong>Wilaya :</strong> {partnerData.wilaya}</div>
                <div><strong>Expérience :</strong> {partnerData.experience} ans</div>
                <div><strong>Spécialités :</strong> {partnerData.specialties.join(', ')}</div>
                <div><strong>Charte qualité :</strong> {partnerData.charter ? 'Acceptée' : 'Non acceptée'}</div>
                <div><strong>Registre Commerce :</strong> {partnerData.registre ? partnerData.registre.name : 'Non fourni'}</div>
                <div><strong>Attestation fiscale :</strong> {partnerData.attestation ? partnerData.attestation.name : 'Non fourni'}</div>
                <div><strong>Références chantiers :</strong> {partnerData.references ? partnerData.references.name : 'Non fourni'}</div>
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
              {step === 3 ? 'Envoyer la demande' : 'Suivant'}
            </Button>
          </div>
        </form>
      </div>
      </div>
    );
  }
};
