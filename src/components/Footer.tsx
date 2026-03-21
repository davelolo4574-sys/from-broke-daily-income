import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Facebook, Instagram, Youtube, Mail, CheckCircle2 } from 'lucide-react';
import { createDocument } from '../services/firestore';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      // Submit to Firestore
      await createDocument('leads', {
        email,
        source: 'Footer Newsletter',
        createdAt: new Date().toISOString()
      });

      // Submit to Formspree
      await fetch('https://formspree.io/f/xojkbzbv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          formType: 'Footer Newsletter',
          email
        })
      });

      setIsSuccess(true);
      setEmail('');
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting newsletter:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-zinc-950 text-zinc-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 text-white mb-6">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-white w-5 h-5" />
              </div>
              <span className="font-sans font-bold text-xl tracking-tight">
                From Broke Into Daily Income
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              Tinutulungan ang mga Pinoy na makalaya sa financial struggle sa pamamagitan ng digital income streams at proven financial programs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-emerald-500 transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-emerald-500 transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-emerald-500 transition-colors"><Youtube size={20} /></a>
              <a href="#" className="hover:text-emerald-500 transition-colors"><Mail size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/" className="hover:text-emerald-500 transition-colors">Home</Link></li>
              <li><Link to="/shop" className="hover:text-emerald-500 transition-colors">Mga Produkto</Link></li>
              <li><Link to="/blog" className="hover:text-emerald-500 transition-colors">Blog & Resources</Link></li>
              <li><Link to="/about" className="hover:text-emerald-500 transition-colors">Ang Aming Kwento</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Support</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/contact" className="hover:text-emerald-500 transition-colors">Kontakin Kami</Link></li>
              <li><Link to="/faq" className="hover:text-emerald-500 transition-colors">FAQs</Link></li>
              <li><Link to="/privacy" className="hover:text-emerald-500 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-emerald-500 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Newsletter</h4>
            <p className="text-sm mb-4">Makakuha ng weekly income tips diretso sa iyong inbox.</p>
            {isSuccess ? (
              <div className="flex items-center space-x-2 text-emerald-500 font-bold text-sm py-2">
                <CheckCircle2 size={16} />
                <span>Salamat sa pag-join!</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Iyong email" 
                  required
                  className="bg-zinc-900 border border-zinc-800 rounded-l-lg px-4 py-2 text-sm w-full focus:outline-none focus:border-emerald-600"
                />
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-emerald-600 text-white px-4 py-2 rounded-r-lg text-sm font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? '...' : 'Sumali'}
                </button>
              </form>
            )}
          </div>
        </div>
        
        <div className="border-t border-zinc-900 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>© 2026 From Broke Into Daily Income. All rights reserved.</p>
          <p className="mt-4 md:mt-0">Earnings Disclaimer: Ang mga resulta ay hindi guaranteed at nakadepende sa iyong sariling effort.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
