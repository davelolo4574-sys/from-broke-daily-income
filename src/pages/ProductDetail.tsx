import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  CheckCircle2, 
  ShoppingCart, 
  ShieldCheck, 
  Clock, 
  Globe,
  Star,
  Zap,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';
import SEO from '../components/SEO';
import { Product } from '../types';

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  // Mock product data (in real app, fetch from Firestore)
  const products: Record<string, Product> = {
    '1': {
      id: '1',
      title: 'From Broke Into Daily Income (E-Book)',
      description: 'Ang 8-step system para magkaroon ng consistent daily income gamit ang digital products. No complicated tech needed. Perfect para sa mga beginners, employees na gustong mag-sideline, at kahit sino na gustong kumita gamit ang internet.',
      price: 297,
      originalPrice: 6294,
      imageUrl: 'https://storage.googleapis.com/static-content-prod/media/6iktdlysdjjpzvp3utzlc4/737392410601/r_1742533815049_ebook-cover.jpg',
      category: 'E-Book',
      features: [
        '8-Step Success System',
        'Digital Product Ideas for Filipinos',
        'Sales Funnel Blueprint',
        'Facebook Ads Basics',
        'Email Marketing Automation',
        'Lifetime Access & Updates'
      ],
      ctaText: 'Kunin ang E-Book Ngayon',
      status: 'active',
      createdAt: new Date().toISOString(),
      slug: 'from-broke-into-daily-income'
    },
    '2': {
      id: '2',
      title: 'Digital Product Masterclass',
      description: 'Matutunan kung paano gumawa ng sarili mong digital products na bebenta kahit natutulog ka. Mula sa niche selection hanggang sa product creation at marketing.',
      price: 1999,
      originalPrice: 4999,
      imageUrl: 'https://picsum.photos/seed/masterclass/1200/600',
      category: 'Course',
      features: [
        'Step-by-step video tutorials',
        'Product creation templates',
        'Pricing & positioning strategy',
        'Marketing automation setup',
        'Private student community',
        'Certificate of completion'
      ],
      ctaText: 'Enroll sa Masterclass',
      status: 'active',
      createdAt: new Date().toISOString(),
      slug: 'digital-product-masterclass'
    }
  };

  const product = products[productId || '1'] || products['1'];

  const benefits = [
    { title: 'Mababago ang Tingin Mo sa Pera', desc: 'Hindi lang ito tungkol sa pagkita, kundi tungkol sa tamang mindset para sa long-term success.' },
    { title: 'Makakahanap Ka ng eBook Idea', desc: 'Tutulungan ka naming mag-isip ng ideas na siguradong may bibili sa Philippine market.' },
    { title: 'Makakagawa Ka ng eBook Kahit Wala Kang Background', desc: 'No tech skills? No problem. Step-by-step ang guide namin para sa iyo.' },
    { title: 'Malalaman Mo Kung Magkano I-presyo', desc: 'Huwag mag-underprice. Alamin ang tamang presyo para sa iyong hard work.' },
    { title: 'Mase-set Up Mo ang Selling System', desc: 'I-automate ang iyong sales para kumita ka kahit natutulog ka o kasama ang pamilya.' },
    { title: 'Facebook Ads Mastery', desc: 'Matutunan ang low-cost ads strategy na nagbibigay ng high returns.' }
  ];

  return (
    <div className="bg-[#050505] text-white min-h-screen pb-24">
      <SEO 
        title={`${product.title} | From Broke Into Daily Income`}
        description={product.description}
        image={product.imageUrl}
        type="product"
      />
      
      {/* Hero Section - Recipe 2: Editorial */}
      <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-48 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#10b98115_0%,transparent_70%)] opacity-40"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-24 items-center">
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="meta-label mb-8 inline-block text-emerald-500">
                  Isang Beses na Bayad. Kaalaman na Panghabambuhay.
                </span>
                <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black leading-[0.9] tracking-[-0.04em] uppercase mb-12 transform -skew-x-6">
                  {product.title.split(' ').map((word, i) => (
                    <span key={i} className={i % 2 === 0 ? 'text-white' : 'text-emerald-500'}>
                      {word}{' '}
                    </span>
                  ))}
                </h1>
                <p className="text-xl text-zinc-400 mb-12 leading-relaxed font-medium">
                  {product.description}
                </p>
                
                <div className="flex items-center space-x-8 mb-12">
                  <div className="flex items-center space-x-2">
                    <div className="flex text-orange-400">
                      {[1,2,3,4,5].map(i => <Star key={i} size={16} className="fill-orange-400" />)}
                    </div>
                    <span className="text-sm font-bold text-zinc-500">1,240+ Reviews</span>
                  </div>
                  <div className="flex items-center space-x-2 text-emerald-500">
                    <Zap size={16} className="fill-emerald-500" />
                    <span className="text-sm font-bold uppercase tracking-widest">Bestseller</span>
                  </div>
                </div>

                <div className="bg-zinc-900/50 backdrop-blur-xl p-10 rounded-[3rem] border border-zinc-800 shadow-2xl">
                  {product.id === '1' ? (
                    <>
                      <div className="flex items-end space-x-6 mb-10">
                        <span className="text-6xl font-black text-white">₱{product.price.toLocaleString()}</span>
                        {product.originalPrice && (
                          <span className="text-2xl text-zinc-600 line-through mb-2">₱{product.originalPrice.toLocaleString()}</span>
                        )}
                      </div>
                      <Link 
                        to={`/checkout/${product.id}`}
                        className="w-full bg-emerald-600 text-white py-8 rounded-full font-black text-2xl hover:bg-emerald-500 transition-all shadow-[0_0_50px_rgba(16,185,129,0.2)] flex items-center justify-center space-x-4 uppercase tracking-widest"
                      >
                        <ShoppingCart size={28} />
                        <span>Kunin ang eBook Ngayon</span>
                      </Link>
                      <div className="mt-8 flex items-center justify-center space-x-8 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">
                        <div className="flex items-center space-x-2">
                          <ShieldCheck size={14} className="text-emerald-500" />
                          <span>Secure Checkout</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock size={14} className="text-emerald-500" />
                          <span>Instant PDF Access</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <div className="inline-flex items-center justify-center w-20 h-20 bg-zinc-800 rounded-full text-zinc-500 mb-6">
                        <Clock size={40} />
                      </div>
                      <h2 className="text-4xl font-black uppercase tracking-tighter mb-4 text-zinc-400">Coming Soon</h2>
                      <p className="text-zinc-500 font-medium max-w-xs mx-auto">
                        Kasalukuyan naming inihahanda ang program na ito. Abangan ang aming announcement sa email o social media.
                      </p>
                      <button 
                        disabled
                        className="mt-10 w-full bg-zinc-800 text-zinc-500 py-6 rounded-full font-black text-xl uppercase tracking-widest cursor-not-allowed"
                      >
                        Not Available Yet
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            <div className="lg:w-1/2 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="relative z-10"
              >
                <div className="aspect-[4/5] rounded-[4rem] overflow-hidden border border-zinc-800 shadow-[0_0_100px_rgba(16,185,129,0.1)]">
                  <img 
                    src={product.imageUrl} 
                    alt={product.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                {/* Floating Badges */}
                <div className="absolute -top-8 -right-8 bg-emerald-600 w-32 h-32 rounded-full flex items-center justify-center text-center p-4 shadow-2xl transform rotate-12">
                  <span className="text-xs font-black uppercase tracking-widest leading-tight">Limited Offer 70% OFF</span>
                </div>
              </motion.div>
              <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-emerald-500/20 rounded-full blur-[120px] -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits - Recipe 1: Technical Grid */}
      <section className="py-20 lg:py-32 bg-zinc-900 border-y border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 lg:mb-24">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight mb-8">Ano ang <span className="text-emerald-500">Matututunan Mo?</span></h2>
            <p className="text-lg md:text-xl text-zinc-500 max-w-2xl mx-auto">Isang malinaw na sistema para sa iyong financial transformation.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-1">
            {benefits.map((benefit, i) => (
              <div key={i} className="data-row group p-8 md:p-12 bg-zinc-950 border border-zinc-900 hover:bg-emerald-600 hover:text-white transition-all">
                <span className="text-emerald-500 font-mono text-sm mb-8 block group-hover:text-white">0{i + 1}</span>
                <h3 className="text-2xl font-black mb-6 uppercase tracking-tight leading-none">{benefit.title}</h3>
                <p className="text-zinc-500 font-medium leading-relaxed group-hover:text-white/80">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof - Recipe 7: Atmospheric */}
      <section className="py-32 relative overflow-hidden">
        <div className="atmosphere absolute inset-0 -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-5xl font-black tracking-tight mb-6">Mga Pilipino na Nagbago Na ang Buhay</h2>
            <p className="text-xl text-zinc-400">Hindi lang ito basta libro. Ito ay blueprint para sa iyong kinabukasan.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { name: 'Maria C.', role: 'OFW', text: 'Dati, lagi akong nag-aalala kung sapat ba ang padala ko. Ngayon, may extra income na ako kahit nasa abroad.' },
              { name: 'Robert S.', role: 'Student', text: 'Nagawa kong kumita ng ₱10k sa unang buwan ko pa lang. Sobrang laking tulong para sa tuition ko.' },
              { name: 'Liza M.', role: 'Full-time Mom', text: 'Akala ko kailangan ng tech skills. Pero step-by-step ang turo ni Dave, kaya nagawa ko rin!' }
            ].map((t, i) => (
              <div key={i} className="player-chrome p-12 hover:scale-105 transition-all">
                <div className="flex items-center space-x-1 text-orange-400 mb-8">
                  {[1,2,3,4,5].map(star => <Star key={star} size={16} className="fill-orange-400" />)}
                </div>
                <p className="lyric-content mb-12 italic">"{t.text}"</p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-800 border border-zinc-700"></div>
                  <div>
                    <h4 className="font-bold text-white">{t.name}</h4>
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Recipe 11: SaaS Split */}
      <section className="py-20 lg:py-32 bg-white text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <h2 className="text-5xl sm:text-7xl lg:text-9xl font-black tracking-tighter leading-[0.85] uppercase mb-12">
                Your <br />
                <span className="text-emerald-600">Future</span> <br />
                Starts <br />
                Now.
              </h2>
              <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-8 gap-8 sm:gap-0">
                <div className="cta-circle group cursor-pointer hover:bg-black hover:text-white transition-all w-32 h-32">
                  <Link to={`/checkout/${product.id}`} className="text-center font-black">Join Now</Link>
                </div>
                <p className="text-lg md:text-xl font-bold text-zinc-400 uppercase tracking-widest">Limited Slots Available</p>
              </div>
            </div>
            <div className="space-y-8 md:space-y-12">
              <div className="feature-bubble">
                <h4 className="text-2xl font-black mb-4 uppercase tracking-tight">Instant Access</h4>
                <p className="text-zinc-600 font-medium">Download the PDF immediately after payment and start your journey.</p>
              </div>
              <div className="feature-bubble transform rotate-3">
                <h4 className="text-2xl font-black mb-4 uppercase tracking-tight">Lifetime Updates</h4>
                <p className="text-zinc-600 font-medium">Get all future versions of the eBook for free as we update the system.</p>
              </div>
              <div className="feature-bubble transform -rotate-2">
                <h4 className="text-2xl font-black mb-4 uppercase tracking-tight">Exclusive Community</h4>
                <p className="text-zinc-600 font-medium">Join our private group of digital entrepreneurs for support and networking.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
