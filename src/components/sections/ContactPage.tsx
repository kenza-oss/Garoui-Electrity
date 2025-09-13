import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import Mail from 'lucide-react/dist/esm/icons/mail';
import Phone from 'lucide-react/dist/esm/icons/phone';
import MapPin from 'lucide-react/dist/esm/icons/map-pin';

export const ContactPage: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm(f => ({ ...f, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div
    className="min-h-screen flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 bg-cover bg-center"
    style={{ backgroundImage: "url('/contacter.jpg')" }}
  >
    <div className="max-w-2xl w-full bg-white/80 rounded-xl shadow-lg p-8">
      <h1 className="text-3xl font-bold text-primary mb-2">Contactez Garoui Électricité</h1>
      <p className="mb-8 text-slate-700">Une question, un projet ? Notre équipe vous répond rapidement.</p>
      <Card className="p-8 mb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <Input label="Nom" value={form.name} onChange={v => handleChange('name', v)} required />
            <Input label="Email" type="email" value={form.email} onChange={v => handleChange('email', v)} required />
          </div>
          <Input label="Téléphone" type="tel" value={form.phone} onChange={v => handleChange('phone', v)} required />
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Message <span className="text-red-500">*</span></label>
            <textarea value={form.message} onChange={e => handleChange('message', e.target.value)} rows={4} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-colors" required placeholder="Votre message..." />
          </div>
          <Button type="submit" variant="accent" size="lg" className="w-full">Envoyer</Button>
          {sent && <div className="text-green-600 text-center mt-2">Message envoyé !</div>}
        </form>
      </Card>
      <Card className="p-6 flex flex-col gap-4">
        <div className="flex items-center gap-2 text-slate-700">
          <Mail className="w-5 h-5" /> garoui.electricity@gmail.com
        </div>
        <div className="flex items-center gap-2 text-slate-700">
          <Phone className="w-5 h-5" /> +213 540 83 63 21
        </div>
        <div className="flex items-center gap-2 text-slate-700">
          <MapPin className="w-5 h-5" /> Tizi ghennif, Tizi Ouzou, Algérie
        </div>
      </Card>
    </div>
    </div>
  );
}; 
