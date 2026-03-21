import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  TrendingUp, 
  Users, 
  ShieldCheck, 
  CheckCircle2, 
  PlayCircle,
  Star,
  Zap,
  Plus,
  Minus,
  HelpCircle,
  Gift,
  Clock,
  Globe,
  Layout,
  Brain,
  Lightbulb,
  Layers,
  PenTool,
  Package,
  Megaphone,
  Rocket,
  Trophy
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import SEO from '../components/SEO';
import { Product } from '../types';

const Home = () => {
  // Mock products based on eBook
  const featuredProducts: Product[] = [
    {
      id: '1',
      title: 'From Broke Into Daily Income (eBook)',
      description: 'Ang 8-step system para makabuo ng consistent online income gamit ang digital products. Perfect para sa mga nagsisimula.',
      price: 297,
      originalPrice: 6294,
      imageUrl: 'https://storage.googleapis.com/static-content-prod/media/6iktdlysdjjpzvp3utzlc4/737392410601/r_1742533815049_ebook-cover.jpg',
      category: 'Digital Product',
      features: ['8-Step Financial System', 'Facebook Ads Guide', 'Mindset Mastery', 'Actionable Roadmap'],
      ctaText: 'Kunin ang eBook Ngayon',
      status: 'active',
      createdAt: new Date().toISOString(),
      slug: 'from-broke-into-daily-income'
    }
  ];

  const learnItems = [
    { 
      title: 'Money Mindset', 
      desc: 'Aayusin natin ang mindset mo tungkol sa pera at negosyo para sa tagumpay.',
      icon: <Brain className="text-emerald-500" size={24} />
    },
    { 
      title: 'Profitable Ideas', 
      desc: 'Tutulungan kitang maghanap ng eBook idea na may totoong demand sa Pilipinas.',
      icon: <Lightbulb className="text-emerald-500" size={24} />
    },
    { 
      title: 'High-Value Structure', 
      desc: 'Matututunan mo kung paano i-plano ang content na talagang makakatulong sa readers.',
      icon: <Layers className="text-emerald-500" size={24} />
    },
    { 
      title: 'Professional Design', 
      desc: 'Magsulat at mag-design ng eBook nang mabilis gamit ang mga tamang tools.',
      icon: <PenTool className="text-emerald-500" size={24} />
    },
    { 
      title: 'Sellable Product', 
      desc: 'I-set up ang iyong eBook bilang isang digital product na handa nang ibenta.',
      icon: <Package className="text-emerald-500" size={24} />
    },
    { 
      title: 'Facebook Ads Mastery', 
      desc: 'Malalaman mo kung paano mag-run ng ads na kumikita at nakakakuha ng buyers.',
      icon: <Megaphone className="text-emerald-500" size={24} />
    },
    { 
      title: 'Execution Strategy', 
      desc: 'I-move ka mula sa planning papunta sa execution—simulan ang iyong journey.',
      icon: <Rocket className="text-emerald-500" size={24} />
    },
    { 
      title: 'Mastering Sales', 
      desc: 'Matutunan ang sining ng pagbebenta at ang kahalagahan ng continuous learning.',
      icon: <Trophy className="text-emerald-500" size={24} />
    }
  ];

  const benefits = [
    { 
      title: 'Passive Income', 
      desc: 'Matutunan kung paano kumita kahit tulog ka o kasama ang pamilya.',
      icon: <Clock className="text-emerald-500" size={32} />
    },
    { 
      title: 'Global Reach', 
      desc: 'Hindi lang sa Pilipinas, pwede mong ibenta ang digital products mo sa buong mundo.',
      icon: <Globe className="text-emerald-500" size={32} />
    },
    { 
      title: 'Low Overhead', 
      desc: 'Walang inventory, walang shipping, at walang physical store na kailangan.',
      icon: <Layout className="text-emerald-500" size={32} />
    },
    { 
      title: 'Financial Freedom', 
      desc: 'Ang unang hakbang para hindi na umasa sa iisang sweldo lang.',
      icon: <ShieldCheck className="text-emerald-500" size={32} />
    }
  ];

  const valueStack = [
    { item: '"From Broke Into Daily Income" Full eBook', value: 499 },
    { item: 'The 8-Step Financial Transformation System', value: 1499 },
    { item: 'High-Demand eBook Idea Discovery Framework', value: 799 },
    { item: 'Professional Writing & Design Blueprint', value: 499 },
    { item: 'Automated "Sleep-Income" Payment System', value: 1499 },
    { item: 'High-Conversion Selling & Marketing Strategy', value: 1499 },
  ];

  const faqs = [
    {
      q: "Para ba ito sa mga beginners?",
      a: "Yes! Ang eBook na ito ay ginawa specifically para sa mga walang technical background. Step-by-step ang turo, mula sa pag-iisip ng idea hanggang sa pag-benta."
    },
    {
      q: "Kailangan ba ng malaking puhunan?",
      a: "Hindi. Ang digital products ay isa sa mga business na may pinakamababang startup cost. Pwede kang magsimula gamit lang ang iyong laptop o kahit smartphone."
    },
    {
      q: "Paano ko matatanggap ang eBook?",
      a: "Pagkatapos ng payment, makakatanggap ka ng email na may download link. Instant access ito kaya pwede mo nang simulan agad ang pagbabasa."
    },
    {
      q: "May support ba kung may tanong ako?",
      a: "Yes, kasama sa purchase mo ang access sa ating private community kung saan pwede kang magtanong at makipag-connect sa ibang students."
    }
  ];

  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

  const painPoints = [
    { icon: <TrendingUp size={24} />, text: 'Lagi kang sweldo-to-sweldo at walang natitira.' },
    { icon: <Users size={24} />, text: 'Isa lang ang pinagkukuhaan mo ng pera (Single income stream).' },
    { icon: <ShieldCheck size={24} />, text: 'Nalilito ka sa sobrang daming advice online na hindi gumagana.' },
    { icon: <Zap size={24} />, text: 'Ini-isip mong "wala akong maibebenta" o "hindi ako expert".' }
  ];

  return (
    <div className="overflow-hidden bg-[#050505] text-white">
      <SEO 
        title="From Broke Into Daily Income | Financial Freedom para sa mga Pinoy"
        description="Pagod ka na bang tiis nang tiis? Matutunan ang 8-step system para kumita ng daily income gamit ang digital products."
        keywords="daily income, financial freedom ph, digital products philippines, passive income guide, taglish financial education"
      />
      
      {/* Hero Section - Recipe 2: Editorial/Magazine Hero */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-32 lg:pt-32 lg:pb-48 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#10b98120_0%,transparent_70%)] opacity-40"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="meta-label mb-8 inline-block text-emerald-500">
              Pagod ka na bang tiis nang tiis?
            </span>
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[10vw] font-black leading-[0.9] tracking-[-0.04em] uppercase mb-12 transform -skew-x-6">
              From <span className="text-zinc-500">Broke</span><br />
              Into <span className="text-emerald-500">Daily Income</span>
            </h1>
            <p className="text-xl lg:text-2xl text-zinc-400 mb-16 max-w-3xl mx-auto font-medium leading-relaxed">
              Masipag ka. Nagtatrabaho ka. Pero bakit laging kulang pa rin? <br className="hidden md:block" />
              Alamin ang <span className="text-white font-bold">Isang Malinaw na Sistema</span> na may totoong resulta.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
              <Link 
                to="/shop/1" 
                className="w-full sm:w-auto bg-emerald-600 text-white px-12 py-6 rounded-full text-xl font-black hover:bg-emerald-500 transition-all shadow-[0_0_40px_rgba(16,185,129,0.3)] hover:scale-105 uppercase tracking-widest"
              >
                Kunin ang eBook Ngayon
              </Link>
              <Link 
                to="/about" 
                className="w-full sm:w-auto border border-zinc-700 text-zinc-400 px-12 py-6 rounded-full text-xl font-bold hover:bg-zinc-900 transition-all uppercase tracking-widest"
              >
                Basahin ang Story Ko
              </Link>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative max-w-lg mx-auto"
            >
              <div className="absolute -inset-4 bg-emerald-500/20 blur-3xl rounded-full"></div>
              <img 
                src="https://storage.googleapis.com/static-content-prod/media/6iktdlysdjjpzvp3utzlc4/737392410601/r_1742533815049_ebook-cover.jpg" 
                alt="From Broke Into Daily Income eBook Cover" 
                className="relative z-10 w-full h-auto rounded-[2rem] shadow-2xl border border-white/10 transform -rotate-2 hover:rotate-0 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pain Points - Recipe 1: Technical Grid */}
      <section className="py-20 lg:py-32 bg-zinc-900 border-y border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-12 leading-tight">
                Bakit laging <span className="text-zinc-500">kulang</span> pa rin?
              </h2>
              <div className="space-y-1">
                {painPoints.map((point, i) => (
                  <div key={i} className="data-row group">
                    <div className="flex items-center space-x-6">
                      <div className="text-emerald-500 group-hover:text-white transition-colors">
                        {point.icon}
                      </div>
                      <span className="text-lg font-bold uppercase tracking-wider text-zinc-400 group-hover:text-white transition-colors">
                        {point.text}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative group">
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border border-zinc-800 shadow-2xl transition-transform duration-700 group-hover:scale-105">
                <img 
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&h=1000&auto=format&fit=crop&sat=-100" 
                  alt="Stressed person with bills and calculator" 
                  className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-60"></div>
              </div>
              <div className="absolute -bottom-12 -right-12 bg-emerald-600 p-12 rounded-[3rem] shadow-2xl max-w-sm hidden lg:block transform group-hover:-translate-y-4 transition-transform duration-700">
                <p className="text-2xl font-black leading-tight mb-4 italic">"Ito ang exact na pinagdaanan ko dati."</p>
                <p className="text-sm font-bold uppercase tracking-widest opacity-80">— Dave Miñoza</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn - Recipe 8: Clean Utility / Minimal */}
      <section className="py-24 lg:py-32 bg-white text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 lg:mb-24 gap-6">
            <div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase leading-none mb-4">
                8 Hakbang Patungo sa <br />
                <span className="text-emerald-600">Tagumpay</span>
              </h2>
              <p className="text-lg text-zinc-500 max-w-xl">
                Isang komprehensibong sistema na gagabay sa iyo mula sa pag-iisip ng idea hanggang sa pagtanggap ng iyong unang kita.
              </p>
            </div>
            <div className="hidden md:block">
              <span className="text-8xl font-black text-zinc-50 opacity-50 select-none">CHAPTERS</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-200 border border-zinc-200 rounded-3xl overflow-hidden shadow-sm">
            {learnItems.map((item, i) => (
              <div key={i} className="p-10 bg-white hover:bg-zinc-50 transition-colors group">
                <div className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  {item.icon}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-4 block">Step 0{i + 1}</span>
                <h3 className="text-xl font-black mb-4 uppercase tracking-tight leading-tight group-hover:text-emerald-600 transition-colors">{item.title}</h3>
                <p className="text-zinc-500 leading-relaxed text-sm font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section - Recipe 8: Clean Utility */}
      <section className="py-20 lg:py-32 bg-zinc-50 text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 lg:mb-24">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6">Bakit Ito ang <span className="text-emerald-600">Tamang Desisyon</span>?</h2>
            <p className="text-lg text-zinc-500 max-w-2xl mx-auto">Hindi lang ito basta impormasyon. Ito ay transformation para sa iyong lifestyle.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, i) => (
              <div key={i} className="card p-8 bg-white hover:shadow-xl transition-all border border-zinc-100">
                <div className="mb-6">{benefit.icon}</div>
                <h3 className="text-xl font-black mb-4 uppercase tracking-tight">{benefit.title}</h3>
                <p className="text-zinc-600 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chapters - Recipe 12: Luxury/Prestige */}
      <section className="py-20 lg:py-32 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="vertical-text absolute left-8 top-1/2 -translate-y-1/2 text-zinc-800 hidden xl:block">
            8 Chapters • Isang Kompletong Sistema
          </span>
          <h2 className="serif text-4xl sm:text-5xl lg:text-7xl font-light mb-12 lg:mb-16 italic text-zinc-300">
            Isang Kompletong Sistema
          </h2>
          <div className="space-y-4 md:space-y-8">
            {[
              'Ang Mindset Shift: Mula Broke to Abundant',
              'Paghahanap ng Iyong Million-Peso eBook Idea',
              'Paggawa ng Iyong Unang Digital Product',
              'Pricing for Profit: Magkano ang Iyong Oras?',
              'Ang Selling Machine: Automation Setup',
              'Facebook Ads Basics para sa mga Pinoy',
              'Scaling to Daily Income',
              'The Next Step: Financial Freedom'
            ].map((chapter, i) => (
              <div key={i} className="flex items-center justify-between py-4 md:py-6 border-b border-zinc-800 group hover:border-emerald-500 transition-colors">
                <span className="text-zinc-600 font-mono text-xs md:text-sm">0{i + 1}</span>
                <span className="text-lg md:text-2xl font-bold text-zinc-400 group-hover:text-white transition-colors text-left px-4">{chapter}</span>
                <div className="w-2 h-2 rounded-full bg-zinc-800 group-hover:bg-emerald-500 transition-colors flex-shrink-0"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof - Recipe 8: Clean Utility */}
      <section className="py-20 lg:py-32 bg-zinc-50 text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 lg:mb-24">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">Mga Pilipino na Nagbago Na ang Buhay</h2>
            <p className="text-lg text-zinc-500 max-w-2xl mx-auto">Hindi lang ito basta libro. Ito ay blueprint para sa iyong kinabukasan.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              { name: 'Maria C.', role: 'OFW', text: 'Dati, lagi akong nag-aalala kung sapat ba ang padala ko. Ngayon, may extra income na ako kahit nasa abroad.' },
              { name: 'Robert S.', role: 'Student', text: 'Nagawa kong kumita ng ₱10k sa unang buwan ko pa lang. Sobrang laking tulong para sa tuition ko.' },
              { name: 'Liza M.', role: 'Full-time Mom', text: 'Akala ko kailangan ng tech skills. Pero step-by-step ang turo ni Dave, kaya nagawa ko rin!' }
            ].map((t, i) => (
              <div key={i} className="card p-12 hover:shadow-2xl transition-all">
                <div className="flex items-center space-x-1 text-orange-400 mb-8">
                  {[1,2,3,4,5].map(star => <Star key={star} size={16} className="fill-orange-400" />)}
                </div>
                <p className="text-xl font-medium leading-relaxed mb-12 text-zinc-700 italic">"{t.text}"</p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-200"></div>
                  <div>
                    <h4 className="font-bold text-zinc-900">{t.name}</h4>
                    <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section - Recipe 8: Clean Utility */}
      <section className="py-20 lg:py-32 bg-white text-black border-t border-zinc-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black tracking-tight mb-4">Frequently Asked Questions</h2>
            <p className="text-zinc-500">May mga katanungan ka pa ba? Narito ang mga sagot.</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-zinc-200 rounded-2xl overflow-hidden">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-zinc-50 transition-colors"
                >
                  <span className="font-bold text-lg">{faq.q}</span>
                  {openFaq === i ? <Minus size={20} /> : <Plus size={20} />}
                </button>
                {openFaq === i && (
                  <div className="p-6 pt-0 text-zinc-600 leading-relaxed border-t border-zinc-100 bg-zinc-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Stack - Recipe 1: Technical Grid */}
      <section className="py-20 lg:py-32 bg-[#050505] text-white border-y border-zinc-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-zinc-900 rounded-[3rem] p-8 md:p-16 border border-zinc-800 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Gift size={120} />
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-black mb-12 uppercase tracking-tighter leading-none">
                Lahat ng <span className="text-emerald-500">Makukuha Mo</span> Ngayon
              </h2>
              <div className="space-y-4 mb-12">
                {valueStack.map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-4 border-b border-zinc-800">
                    <div className="flex items-center space-x-4">
                      <CheckCircle2 size={20} className="text-emerald-500" />
                      <span className="font-bold text-zinc-300">{item.item}</span>
                    </div>
                    <span className="font-mono text-zinc-500">₱{item.value.toLocaleString()}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between py-6">
                  <span className="text-xl font-black uppercase tracking-widest">Total Value:</span>
                  <span className="text-xl font-mono text-zinc-400 line-through">₱6,294</span>
                </div>
              </div>
              <div className="bg-emerald-600/10 border border-emerald-500/20 rounded-2xl p-8 text-center">
                <p className="text-emerald-500 font-bold uppercase tracking-widest mb-2">Special Offer Price</p>
                <div className="text-5xl md:text-7xl font-black mb-4">₱297</div>
                <p className="text-zinc-400 text-sm mb-10">One-time payment. Lifetime access.</p>
                <Link 
                  to="/shop/1" 
                  className="inline-block w-full bg-emerald-600 text-white py-6 rounded-full font-black text-xl hover:bg-emerald-500 transition-all shadow-lg uppercase tracking-widest"
                >
                  Kunin ang eBook Ngayon
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Recipe 10: Bold Background */}
      <section className="py-20 lg:py-32 bg-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black tracking-tighter mb-12 uppercase leading-[0.9]">
            Handa Ka Na Bang <br />
            <span className="text-zinc-900">Simulan ang Pagbabago?</span>
          </h2>
          <p className="text-xl md:text-2xl font-medium mb-12 md:mb-16 max-w-3xl mx-auto opacity-90">
            Isang beses na bayad. Kaalaman na panghabambuhay. <br />
            Simulan ang iyong journey from broke into daily income ngayon.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8">
            <Link 
              to="/shop/1" 
              className="w-full sm:w-auto bg-zinc-900 text-white px-10 md:px-16 py-6 md:py-8 rounded-full text-xl md:text-2xl font-black hover:bg-black transition-all shadow-2xl uppercase tracking-widest"
            >
              Kunin ang eBook - ₱297 Lang
            </Link>
          </div>
          <p className="mt-12 text-xs md:text-sm font-bold uppercase tracking-widest opacity-60">
            Instant Access • PDF Format • Lifetime Updates
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
