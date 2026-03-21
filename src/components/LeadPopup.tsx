import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, ArrowRight, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { createDocument } from '../services/firestore';

const leadSchema = z.object({
  email: z.string().email('Pakilagay ang valid na email address'),
  name: z.string().min(2, 'Ang pangalan ay dapat hindi bababa sa 2 characters'),
});

type LeadFormData = z.infer<typeof leadSchema>;

const LeadPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
  });

  useEffect(() => {
    // Show popup after 10 seconds
    const timer = setTimeout(() => {
      const hasSeenPopup = localStorage.getItem('hasSeenLeadPopup');
      if (!hasSeenPopup) {
        setIsOpen(true);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      localStorage.setItem('hasSeenLeadPopup', 'true');
    }, 300);
  };

  const onSubmit = async (data: LeadFormData) => {
    setError(null);
    try {
      // Submit to Firestore
      await createDocument('leads', {
        ...data,
        source: 'Popup',
        createdAt: new Date().toISOString(),
      });

      // Submit to Formspree
      await fetch('https://formspree.io/f/xojkbzbv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          formType: 'Lead Popup',
          ...data
        })
      });

      setIsSubmitted(true);
      setTimeout(() => {
        handleClose();
      }, 3000);
    } catch (err) {
      console.error('Error submitting lead:', err);
      setError('May mali. Pakisubukang muli.');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden relative"
        >
          <button 
            onClick={handleClose}
            className="absolute top-6 right-6 p-2 hover:bg-zinc-100 rounded-full transition-colors z-10"
          >
            <X size={20} className="text-zinc-400" />
          </button>

          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/5 bg-emerald-600 p-8 flex flex-col justify-center items-center text-center text-white">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <Mail size={32} />
              </div>
              <h3 className="text-xl font-black leading-tight mb-2">LIBRENG GABAY</h3>
              <p className="text-xs font-bold text-emerald-100 uppercase tracking-widest">Limited Time</p>
            </div>

            <div className="md:w-3/5 p-8 md:p-10">
              {!isSubmitted ? (
                <>
                  <h2 className="text-2xl font-black text-zinc-900 mb-4 leading-tight">
                    Kunin ang Aking "Daily Income" Roadmap
                  </h2>
                  <p className="text-zinc-500 text-sm mb-8">
                    Sumali sa 5,000+ Filipinos na nagtatayo ng kanilang digital wealth. No fluff, just results.
                  </p>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {error && (
                      <div className="bg-red-50 border border-red-100 text-red-600 p-3 rounded-xl text-[10px] font-bold flex items-center space-x-2">
                        <X size={12} />
                        <span>{error}</span>
                      </div>
                    )}
                    <div className="space-y-1">
                      <input 
                        {...register('name')}
                        type="text" 
                        placeholder="Pangalan Mo"
                        className="w-full px-5 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                      />
                      {errors.name && <p className="text-red-500 text-[10px] font-bold ml-2">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-1">
                      <input 
                        {...register('email')}
                        type="email" 
                        placeholder="Best Email Mo"
                        className="w-full px-5 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                      />
                      {errors.email && <p className="text-red-500 text-[10px] font-bold ml-2">{errors.email.message}</p>}
                    </div>
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-emerald-600 text-white py-4 rounded-2xl text-sm font-black hover:bg-emerald-700 transition-all flex items-center justify-center space-x-2 shadow-lg shadow-emerald-200 disabled:opacity-50"
                    >
                      <span>{isSubmitting ? 'SINISEND NA...' : 'KUNIN ANG ACCESS NGAYON'}</span>
                      {!isSubmitting && <ArrowRight size={18} />}
                    </button>
                    <p className="text-[10px] text-center text-zinc-400 font-medium">
                      Ayaw din namin ng spam. Ang data mo ay 100% secure.
                    </p>
                  </form>
                </>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center py-10">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle size={32} />
                  </div>
                  <h2 className="text-2xl font-black text-zinc-900 mb-2">Pasok Ka Na!</h2>
                  <p className="text-zinc-500 text-sm">
                    I-check ang iyong email. Ang roadmap mo ay parating na.
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default LeadPopup;
