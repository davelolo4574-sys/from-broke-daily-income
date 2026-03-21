import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { createDocument } from '../services/firestore';

const contactSchema = z.object({
  name: z.string().min(2, 'Masyadong maikli ang pangalan'),
  email: z.string().email('Hindi valid ang email address'),
  phone: z.string().optional(),
  subject: z.string().min(5, 'Masyadong maikli ang subject'),
  message: z.string().min(10, 'Masyadong maikli ang mensahe'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      // Submit to Firestore
      await createDocument('leads', {
        ...data,
        source: 'Contact Form',
        createdAt: new Date().toISOString()
      });

      // Submit to Formspree
      await fetch('https://formspree.io/f/xojkbzbv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          formType: 'Contact Form',
          ...data
        })
      });

      setIsSuccess(true);
      reset();
    } catch (error) {
      console.error('Error submitting contact form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Header */}
      <section className="bg-zinc-950 py-24 lg:py-32 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:24px_24px] opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-7xl font-black tracking-tight mb-8">
              Let's <span className="text-emerald-500">Talk</span>.
            </h1>
            <p className="text-xl text-zinc-400 leading-relaxed">
              May mga tanong ka ba tungkol sa aming programs? Kailangan mo ba ng tulong sa iyong purchase? Narito kami para suportahan ang iyong journey.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-12">
              <div>
                <h3 className="text-2xl font-black text-zinc-900 mb-8">Contact Info</h3>
                <div className="space-y-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 flex-shrink-0">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-zinc-900">Email Us</h4>
                      <p className="text-zinc-500 text-sm">support@frombroketodailyincome.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 flex-shrink-0">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-zinc-900">Call/Viber</h4>
                      <p className="text-zinc-500 text-sm">+63 917 123 4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 flex-shrink-0">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-zinc-900">Office</h4>
                      <p className="text-zinc-500 text-sm">BGC, Taguig City, Metro Manila, Philippines</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-zinc-50 p-8 rounded-3xl border border-black/5">
                <h4 className="font-bold text-zinc-900 mb-4">Support Hours</h4>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  Monday – Friday: 9:00 AM – 6:00 PM<br />
                  Saturday: 10:00 AM – 2:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 lg:p-12 rounded-[3rem] border border-black/5 shadow-xl">
                {isSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto mb-8">
                      <CheckCircle2 size={48} />
                    </div>
                    <h3 className="text-3xl font-black text-zinc-900 mb-4">Message Sent!</h3>
                    <p className="text-lg text-zinc-500 mb-8">
                      Salamat sa pag-reach out. Magre-reply kami sa loob ng 24-48 hours.
                    </p>
                    <button 
                      onClick={() => setIsSuccess(false)}
                      className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 px-1">Full Name</label>
                        <input 
                          {...register('name')}
                          className={`w-full px-6 py-4 bg-zinc-50 border ${errors.name ? 'border-red-500' : 'border-zinc-200'} rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all`}
                          placeholder="Juan Dela Cruz"
                        />
                        {errors.name && <p className="text-xs text-red-500 px-1">{errors.name.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 px-1">Email Address</label>
                        <input 
                          {...register('email')}
                          className={`w-full px-6 py-4 bg-zinc-50 border ${errors.email ? 'border-red-500' : 'border-zinc-200'} rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all`}
                          placeholder="juan@example.com"
                        />
                        {errors.email && <p className="text-xs text-red-500 px-1">{errors.email.message}</p>}
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 px-1">Phone Number (Optional)</label>
                        <input 
                          {...register('phone')}
                          className="w-full px-6 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                          placeholder="+63 9XX XXX XXXX"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 px-1">Subject</label>
                        <input 
                          {...register('subject')}
                          className={`w-full px-6 py-4 bg-zinc-50 border ${errors.subject ? 'border-red-500' : 'border-zinc-200'} rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all`}
                          placeholder="Paano kami makakatulong?"
                        />
                        {errors.subject && <p className="text-xs text-red-500 px-1">{errors.subject.message}</p>}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 px-1">Message</label>
                      <textarea 
                        {...register('message')}
                        rows={6}
                        className={`w-full px-6 py-4 bg-zinc-50 border ${errors.message ? 'border-red-500' : 'border-zinc-200'} rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none`}
                        placeholder="Sabihin mo sa amin ang iyong concern..."
                      ></textarea>
                      {errors.message && <p className="text-xs text-red-500 px-1">{errors.message.message}</p>}
                    </div>
                    
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send size={20} />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
