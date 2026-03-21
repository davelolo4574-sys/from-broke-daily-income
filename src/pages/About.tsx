import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Award, Users, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const About = () => {
  return (
    <div className="bg-[#f5f5f0] text-[#1a1a1a]">
      <SEO 
        title="Ang Kwento ni Dave Miñoza | From Broke Into Daily Income"
        description="Alamin kung paano nagbago ang buhay ni Dave Miñoza mula sa financial struggle papunta sa consistent daily income."
      />
      
      {/* Hero Section - Recipe 12: Luxury/Prestige */}
      <section className="relative py-24 lg:py-48 bg-[#1a1a1a] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,#3a1510_0%,transparent_60%)] opacity-40"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="vertical-text absolute -left-12 top-0 text-zinc-700 hidden xl:block">
                DAVE MIÑOZA • FOUNDER • MENTOR
              </span>
              <h1 className="serif text-5xl sm:text-6xl lg:text-8xl font-light mb-8 lg:mb-12 leading-tight italic">
                Mula sa <span className="text-emerald-500">Broke</span> <br />
                Patungo sa <br />
                Financial Freedom.
              </h1>
              <p className="text-lg md:text-xl text-zinc-400 leading-relaxed mb-12 lg:mb-16 font-light max-w-xl">
                Ang aming mission ay i-empower ang bawat Pilipino gamit ang tamang tools, knowledge, at systems para makagawa ng consistent daily income.
              </p>
              <div className="nav-grid">
                <div className="nav-item">
                  <span className="block text-2xl md:text-3xl font-light serif italic mb-1">5,000+</span>
                  <span className="small-caps">Estudyante</span>
                </div>
                <div className="nav-item">
                  <span className="block text-2xl md:text-3xl font-light serif italic mb-1">₱10M+</span>
                  <span className="small-caps">Total Earnings</span>
                </div>
              </div>
            </motion.div>
            <div className="relative">
              <div className="oval-mask aspect-[3/4] overflow-hidden border border-zinc-800 shadow-2xl max-w-md mx-auto lg:max-w-none">
                <img 
                  src="https://picsum.photos/seed/dave/800/1200?grayscale" 
                  alt="Dave Miñoza" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Origin Story - Recipe 6: Warm Organic */}
      <section className="py-20 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 lg:mb-24">
            <h2 className="serif text-4xl sm:text-5xl lg:text-6xl font-light italic mb-8">Ang Kwento ni Dave Miñoza</h2>
            <div className="w-24 h-px bg-emerald-600 mx-auto"></div>
          </div>
          
          <div className="space-y-8 md:space-y-12 text-lg md:text-xl serif leading-relaxed text-zinc-700">
            <p className="first-letter:text-6xl md:first-letter:text-7xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:text-emerald-600">
              Naniniwala ako na ang bawat Pilipino ay may kakayahang umasenso, kailangan lang ng tamang gabay at sistema. Nagsimula ang "From Broke Into Daily Income" sa isang simpleng pangarap: ang makatulong sa mga kapwa ko Pilipino na pagod na sa kakarampot na sahod at laging kulang na budget.
            </p>
            <p>
              Dumaan din ako sa hirap—yung tipong ₱50 na lang ang laman ng wallet mo at tatlong araw pa bago ang sahod. Alam ko ang pakiramdam ng "petsa de peligro" at walang katiyakan sa kinabukasan.
            </p>
            <blockquote className="py-8 md:py-12 border-y border-zinc-200 text-2xl md:text-3xl lg:text-4xl italic font-light text-zinc-900 text-center">
              "Income follows value. Value comes from solving problems."
            </blockquote>
            <p>
              Matapos ang maraming pagkakamali at pagsubok, natuklasan ko ang mga sistema na nagbigay sa akin ng "Daily Income." Hindi ito "get-rich-quick" scheme, kundi mga totoong digital skills at financial programs na gumagana sa ating bansa.
            </p>
          </div>
        </div>
      </section>

      {/* 8-Step System - Recipe 9: Oversized Typographic */}
      <section className="py-20 lg:py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 lg:mb-32">
            <h2 className="text-5xl sm:text-6xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.8] mb-8">
              The <br />
              <span className="text-emerald-600">8-Step</span> <br />
              System
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-y-16 md:gap-y-32 gap-x-16">
            {[
              { step: '01', title: 'Mindset Shift', desc: 'Ayusin ang pananaw sa pera at negosyo para maging ready sa success.' },
              { step: '02', title: 'Profitable Idea', desc: 'Humanap ng eBook idea na may demand sa Philippine market.' },
              { step: '03', title: 'Planning', desc: 'I-structure ang eBook para maging valuable at madaling basahin.' },
              { step: '04', title: 'Writing/Design', desc: 'Magsulat nang mabilis at gumawa ng professional na cover design.' },
              { step: '05', title: 'Setup', desc: 'I-set up ang eBook bilang sellable product gamit ang tamang platforms.' },
              { step: '06', title: 'Facebook Ads', desc: 'I-market ang eBook sa tamang audience gamit ang low-cost ads.' },
              { step: '07', title: 'Action', desc: 'Simulan ang journey bago ka pa maging ready. Huwag mag-overthink.' },
              { step: '08', title: 'Mastering', desc: 'I-master ang selling at continuous learning para lumaki ang kita.' }
            ].map((item, i) => (
              <div key={i} className="section group relative">
                <span className="oversized-number text-zinc-50 group-hover:text-emerald-50 transition-colors text-6xl md:text-[120px]">{item.step}</span>
                <div className="relative z-20 pl-16 md:pl-24 pt-8 md:pt-12">
                  <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-4">{item.title}</h3>
                  <p className="text-zinc-500 text-base md:text-lg leading-relaxed max-w-md">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Recipe 10: Bold Background */}
      <section className="py-20 lg:py-32 bg-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="serif text-4xl sm:text-5xl lg:text-7xl font-light italic mb-8 lg:mb-12">Ready ka na bang isulat ang sarili mong success story?</h2>
          <Link 
            to="/shop" 
            className="olive-button inline-flex items-center space-x-4 text-lg md:text-xl font-bold bg-[#1a1a1a] hover:bg-black transition-all px-8 py-4 rounded-full"
          >
            <span>Simulan ang Iyong Journey</span>
            <ArrowRight size={24} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
