import React from 'react';
import { motion } from 'motion/react';
import { Search, Filter, ShoppingBag } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import SEO from '../components/SEO';
import { Product } from '../types';

const Shop = () => {
  const [activeCategory, setActiveCategory] = React.useState('All');
  
  const categories = ['All', 'E-Book', 'Course', 'Masterclass', 'Coaching'];

  const products: Product[] = [
    {
      id: '1',
      title: 'From Broke Into Daily Income (E-Book)',
      description: 'Ang 8-step system para magkaroon ng consistent daily income gamit ang digital products. No complicated tech needed.',
      price: 297,
      originalPrice: 6294,
      imageUrl: 'https://storage.googleapis.com/static-content-prod/media/6iktdlysdjjpzvp3utzlc4/737392410601/r_1742533815049_ebook-cover.jpg',
      category: 'E-Book',
      features: ['8-Step Success System', 'Digital Product Ideas', 'Sales Funnel Guide', 'Lifetime Access'],
      ctaText: 'Kunin ang E-Book',
      status: 'active',
      createdAt: new Date().toISOString(),
      slug: 'from-broke-into-daily-income'
    },
    {
      id: '2',
      title: 'Digital Product Masterclass',
      description: 'Matutunan kung paano gumawa ng sarili mong digital products na bebenta kahit natutulog ka.',
      price: 1999,
      originalPrice: 4999,
      imageUrl: 'https://picsum.photos/seed/masterclass/800/450',
      category: 'Course',
      features: ['Niche Selection', 'Product Creation', 'Pricing Strategy', 'Marketing Secrets'],
      ctaText: 'Mag-enroll Na',
      status: 'active',
      createdAt: new Date().toISOString(),
      slug: 'digital-product-masterclass'
    },
    {
      id: '3',
      title: 'Sales Funnel Blueprint',
      description: 'I-automate ang iyong sales process gamit ang proven funnel templates na ginagamit ng mga top earners.',
      price: 999,
      originalPrice: 2499,
      imageUrl: 'https://picsum.photos/seed/funnel/800/450',
      category: 'Masterclass',
      features: ['Landing Page Templates', 'Email Automation', 'Payment Integration', 'Analytics Guide'],
      ctaText: 'Simulan ang Pagbuo',
      status: 'active',
      createdAt: new Date().toISOString(),
      slug: 'sales-funnel-blueprint'
    },
    {
      id: '4',
      title: 'Facebook Ads for Filipinos',
      description: 'Paano mag-drive ng targeted traffic sa iyong products gamit ang low-cost Facebook Ads.',
      price: 1499,
      originalPrice: 3499,
      imageUrl: 'https://picsum.photos/seed/ads/800/450',
      category: 'Course',
      features: ['Ad Copywriting', 'Targeting Strategies', 'Budget Optimization', 'Scaling Ads'],
      ctaText: 'Matuto ng Ads Ngayon',
      status: 'active',
      createdAt: new Date().toISOString(),
      slug: 'facebook-ads-for-filipinos'
    },
    {
      id: '5',
      title: '1-on-1 Scaling Strategy',
      description: 'Personalized coaching session para i-scale ang iyong digital business to 6-figures and beyond.',
      price: 4999,
      originalPrice: 9999,
      imageUrl: 'https://picsum.photos/seed/coaching/800/450',
      category: 'Coaching',
      features: ['60-minute Deep Dive', 'Custom Scaling Plan', '30-day Support', 'Resource Bundle'],
      ctaText: 'I-book ang Iyong Session',
      status: 'active',
      createdAt: new Date().toISOString(),
      slug: '1-on-1-scaling-strategy'
    }
  ];

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="bg-white min-h-screen pb-24">
      <SEO 
        title="Shop Programs | From Broke Into Daily Income"
        description="I-browse ang aming koleksyon ng high-impact financial programs, e-books, at masterclasses na dinisenyo para tulungan ang mga Pinoy na makamit ang financial freedom."
        keywords="online courses ph, digital products, financial guides, passive income guides, taglish financial education"
      />
      {/* Header */}
      <section className="bg-zinc-50 border-b border-black/5 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <h1 className="text-4xl lg:text-6xl font-black tracking-tight text-zinc-900 mb-6">
                Digital Assets & <span className="text-emerald-600">Income Guides</span>
              </h1>
              <p className="text-lg text-zinc-600">
                Lahat ng kailangan mo para simulan, palaguin, at i-scale ang iyong income streams dito sa Pilipinas.
              </p>
            </div>
            <div className="flex items-center space-x-2 text-sm font-bold text-zinc-400 uppercase tracking-widest">
              <ShoppingBag size={16} />
              <span>{products.length} Programs na Available</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="sticky top-16 z-40 bg-white/80 backdrop-blur-md border-b border-black/5 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                    activeCategory === cat 
                      ? 'bg-emerald-600 text-white shadow-md' 
                      : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                  }`}
                >
                  {cat === 'All' ? 'Lahat' : cat}
                </button>
              ))}
            </div>
            
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <input 
                type="text" 
                placeholder="Maghanap ng programs..." 
                className="w-full pl-10 pr-4 py-2 bg-zinc-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProducts.map(product => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                key={product.id}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-24">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-zinc-100 rounded-full text-zinc-400 mb-6">
                <Filter size={32} />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-2">Walang nahanap na program</h3>
              <p className="text-zinc-500">Subukang i-adjust ang iyong filters o search query.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Shop;
