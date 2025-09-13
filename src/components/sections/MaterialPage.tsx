import React, { useEffect, useState } from 'react';
import Search from 'lucide-react/dist/esm/icons/search';
import Filter from 'lucide-react/dist/esm/icons/filter';
import Grid from 'lucide-react/dist/esm/icons/grid';
import List from 'lucide-react/dist/esm/icons/list';
import Eye from 'lucide-react/dist/esm/icons/eye';
import ShoppingCart from 'lucide-react/dist/esm/icons/shopping-cart';
import X from 'lucide-react/dist/esm/icons/x';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Card } from '../common/Card';
import { Product } from '../../types';
import { api } from '../../lib/api';
import { motion } from 'framer-motion';

interface MaterialPageProps {
  onNavigate: (section: string) => void;
}

export const MaterialPage: React.FC<MaterialPageProps> = ({ onNavigate }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [voltageFilter, setVoltageFilter] = useState('');
  const [priceRange, setPriceRange] = useState('');

  // Mock products data
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const load = async () => {
      try {
        const list = await api.listProducts();
        setProducts(Array.isArray(list) ? list : (list?.items || []));
      } catch {
        setProducts([]);
      }
    };
    load();
  }, []);
  /* Mock removed: products now loaded from API
  const products: Product[] = [
    {
      id: '1',
      name: 'Câble BT H07V-U 2.5mm²',
      category: 'Câbles BT/MT',
      voltage: '750V',
      price: 2.50,
      image: 'https://images.pexels.com/photos/5691659/pexels-photo-5691659.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Câble rigide mono-conducteur pour installation basse tension, vendu au mètre',
      specifications: {
        'Section': '2.5mm²',
        'Type': 'H07V-U',
        'Tension nominale': '750V',
        'Conducteur': 'Cuivre rigide',
        'Couleur': 'Bleu, Rouge, Vert/Jaune'
      }
    },
    {
      id: '2',
      name: 'Disjoncteur modulaire 16A',
      category: 'Disjoncteurs & Différentiels',
      voltage: '230V',
      price: 15.99,
      image: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Disjoncteur modulaire uni+neutre 16A courbe C, conforme NF',
      specifications: {
        'Courant nominal': '16A',
        'Tension': '230V',
        'Pouvoir de coupure': '4500A',
        'Courbe': 'C',
        'Nombre de pôles': '1P+N'
      }
    },
    {
      id: '3',
      name: 'Transformateur 100kVA',
      category: 'Transformateurs',
      voltage: '400V',
      price: 1200.00,
      image: 'https://images.pexels.com/photos/256301/pexels-photo-256301.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Transformateur triphasé 100kVA pour réseaux industriels',
      specifications: {
        'Puissance': '100kVA',
        'Tension primaire': '20kV',
        'Tension secondaire': '400V',
        'Refroidissement': 'Huile',
        'Poids': '350kg'
      }
    },
    {
      id: '4',
      name: 'Armoire électrique 24 modules',
      category: 'Armoires & Tableaux',
      voltage: '230V',
      price: 89.99,
      image: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Armoire de distribution pour installation résidentielle ou tertiaire',
      specifications: {
        'Nombre de modules': '24',
        'Indice IP': 'IP40',
        'Matière': 'Plastique',
        'Couleur': 'Blanc',
        'Fixation': 'Murale'
      }
    },
    {
      id: '5',
      name: 'Projecteur LED 50W',
      category: 'Lampes LED / Projecteurs',
      voltage: '230V',
      price: 49.99,
      image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Projecteur LED haute performance, étanche IP65, lumière blanc neutre',
      specifications: {
        'Puissance': '50W',
        'Luminosité': '5000 lumens',
        'Température couleur': '4000K',
        'Indice IP': 'IP65',
        'Angle éclairage': '120°'
      }
    },
    {
      id: '6',
      name: 'Goulotte PVC 40x60',
      category: 'Accessoires',
      voltage: '230V',
      price: 6.99,
      image: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Goulotte pour passage de câbles, auto-adhésive, blanc',
      specifications: {
        'Dimensions': '40x60mm',
        'Matière': 'PVC',
        'Couleur': 'Blanc',
        'Longueur': '2m',
        'Fixation': 'Adhésif'
      }
    },
    {
      id: '7',
      name: 'Compteur électronique monophasé',
      category: 'Compteurs & Modules',
      voltage: '230V',
      price: 79.99,
      image: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Compteur d\'énergie monophasé, affichage digital, rail DIN',
      specifications: {
        'Type': 'Monophasé',
        'Affichage': 'Digital',
        'Montage': 'Rail DIN',
        'Tension': '230V',
        'Classe': '1'
      }
    },
  ];*/

  const categoryOptions = [
    { value: '', label: 'Toutes les catégories' },
    ...Array.from(new Set(products.map(p => p.category).filter(Boolean))).map((c:any) => ({ value: String(c), label: String(c) }))
  ];

  const voltageOptions = [
    { value: '', label: 'Toutes les tensions' },
    ...Array.from(new Set(products.map(p => p.voltage).filter(Boolean))).map((v:any) => ({ value: String(v), label: String(v) }))
  ];

  const priceRangeOptions = [
    { value: '', label: 'Tous les prix' },
    { value: '0-10', label: 'Moins de 10€' },
    { value: '10-50', label: '10€ - 50€' },
    { value: '50-100', label: '50€ - 100€' },
    { value: '100+', label: 'Plus de 100€' },
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || product.category === categoryFilter;
    const matchesVoltage = !voltageFilter || product.voltage === voltageFilter;
    
    let matchesPrice = true;
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(p => p.replace('+', ''));
      const price = product.price;
      if (max) {
        matchesPrice = price >= parseFloat(min) && price <= parseFloat(max);
      } else {
        matchesPrice = price >= parseFloat(min);
      }
    }

    return matchesSearch && matchesCategory && matchesVoltage && matchesPrice;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-slate-900">Catalogue matériel</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Découvrez notre gamme complète de matériel électrique professionnel, 
          sélectionné pour sa qualité et sa conformité aux normes.
        </p>
      </div>

      {/* Filters */}
      <Card>
        <div className="space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 flex items-center gap-2">
              <span className="text-slate-400 pl-2">
                <Search className="w-5 h-5" />
              </span>
              <Input
                placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={setSearchTerm}
                className="w-full lg:w-80 bg-slate-50 shadow-sm border border-slate-300 focus:ring-accent"
              />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:w-auto">
              <Select
                value={categoryFilter}
                onChange={setCategoryFilter}
                options={categoryOptions}
              />
              <Select
                value={voltageFilter}
                onChange={setVoltageFilter}
                options={voltageOptions}
              />
              <Select
                value={priceRange}
                onChange={setPriceRange}
                options={priceRangeOptions}
              />
              <div className="flex">
                <Button
                  variant={viewMode === 'grid' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          <div className="text-sm text-slate-600">
            {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
          </div>
        </div>
      </Card>

      {/* Products Grid/List */}
      <motion.div
        className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08 } }
        }}
      >
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.05 } }
            }}
          >
            <Card key={product.id} hover className={`${viewMode === 'list' ? 'flex items-center space-x-4' : ''} shadow-lg rounded-2xl border border-slate-100 transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-accent bg-white animate-fade-in-up`}>
              {viewMode === 'grid' ? (
                <div className="space-y-4">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-slate-900 line-clamp-2">{product.name}</h3>
                      <span className="text-sm text-slate-500">{product.category}</span>
                    </div>
                    <p className="text-sm text-slate-600 line-clamp-2">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-slate-900">{product.price.toLocaleString('fr-DZ', { style: 'currency', currency: 'DZD' })}</span>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedProduct(product)}
                          className="rounded-full px-4 py-2 font-semibold transition-all duration-300 hover:bg-accent/10 hover:text-accent"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-slate-900">{product.name}</h3>
                      <span className="text-lg font-bold text-slate-900">{product.price.toLocaleString('fr-DZ', { style: 'currency', currency: 'DZD' })}</span>
                    </div>
                    <p className="text-sm text-slate-600">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-4 text-sm text-slate-500">
                        <span>{product.category}</span>
                        <span>{product.voltage}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedProduct(product)}
                          className="rounded-full px-4 py-2 font-semibold transition-all duration-300 hover:bg-accent/10 hover:text-accent"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Détails du produit</h2>
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name}
                    className="w-full h-80 object-cover rounded-lg mb-4"
                  />
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{selectedProduct.name}</h3>
                    <p className="text-slate-600 mb-4">{selectedProduct.description}</p>
                    <div className="flex items-center space-x-4">
                      <span className="text-3xl font-bold text-slate-900">{selectedProduct.price.toLocaleString('fr-DZ', { style: 'currency', currency: 'DZD' })}</span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {selectedProduct.category}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 mb-3">Caractéristiques techniques</h4>
                    <div className="space-y-2">
                      {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-2 border-b border-slate-100">
                          <span className="text-slate-600">{key}</span>
                          <span className="font-medium text-slate-900">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button variant="outline" size="lg" onClick={() => onNavigate('services')}>
                      Demander un devis
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
