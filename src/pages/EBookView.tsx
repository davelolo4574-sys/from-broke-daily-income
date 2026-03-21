import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Download, BookOpen, ChevronLeft, ChevronRight, Home, Printer, Lock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { ebookContent } from '../data/ebookContent';
import { getDocument } from '../services/firestore';
import { Order } from '../types';

const EBookView = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) {
        setError('Missing Order ID.');
        setLoading(false);
        return;
      }

      try {
        const orderData = await getDocument<Order>('orders', orderId);
        if (!orderData) {
          setError('Hindi mahanap ang iyong order. Pakicheck ang iyong order ID.');
        } else if (orderData.status !== 'completed' && orderData.status !== 'verifying') {
          setError(`Ang iyong order status ay "${orderData.status}". Pakihintay ang aming confirmation.`);
        } else {
          setOrder(orderData);
        }
      } catch (err: any) {
        console.error('Error fetching order:', err);
        const errorMessage = err?.message || 'Unknown error';
        setError(`Access Denied: ${errorMessage}`);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const currentChapter = ebookContent.chapters[currentChapterIndex];

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-zinc-500 font-bold">Inihahanda ang iyong eBook...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-12 text-center space-y-6 border border-zinc-100">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <Lock className="text-red-600" size={40} />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-zinc-900">Access Denied</h2>
            <p className="text-zinc-600">{error || 'Wala kang access sa file na ito.'}</p>
          </div>
          <Link 
            to="/"
            className="block w-full py-4 bg-zinc-900 text-white rounded-2xl font-bold hover:bg-zinc-800 transition-colors"
          >
            Bumalik sa Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100 px-4 py-4 print:hidden">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/" className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
              <Home size={20} className="text-zinc-600" />
            </Link>
            <div className="h-6 w-px bg-zinc-200"></div>
            <div>
              <h1 className="text-sm font-black text-zinc-900 truncate max-w-[200px] md:max-w-none">
                {ebookContent.title}
              </h1>
              <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
                Chapter {currentChapterIndex + 1} of {ebookContent.chapters.length}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={handlePrint}
              className="p-2 text-zinc-600 hover:bg-zinc-100 rounded-xl transition-all flex items-center space-x-2"
              title="Print to PDF"
            >
              <Printer size={18} />
              <span className="text-xs font-bold hidden md:block">Print PDF</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-3xl mx-auto w-full px-6 py-12 md:py-20">
        <article className="prose prose-zinc prose-emerald max-w-none">
          <motion.div
            key={currentChapterIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-3xl md:text-4xl font-black text-zinc-900 mb-8 leading-tight">
              {currentChapter.title}
            </h2>
            <div className="markdown-body text-zinc-700 leading-relaxed text-lg space-y-6">
              <ReactMarkdown>{currentChapter.content}</ReactMarkdown>
            </div>
          </motion.div>
        </article>
      </main>

      {/* Navigation Footer */}
      <footer className="sticky bottom-0 bg-white border-t border-zinc-100 p-4 print:hidden">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <button
            onClick={() => setCurrentChapterIndex(prev => Math.max(0, prev - 1))}
            disabled={currentChapterIndex === 0}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl font-bold text-sm text-zinc-600 hover:bg-zinc-100 disabled:opacity-30 transition-all"
          >
            <ChevronLeft size={20} />
            <span>Previous</span>
          </button>

          <div className="hidden md:flex items-center space-x-1">
            {ebookContent.chapters.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentChapterIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentChapterIndex ? 'bg-emerald-600 w-4' : 'bg-zinc-200 hover:bg-zinc-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentChapterIndex(prev => Math.min(ebookContent.chapters.length - 1, prev + 1))}
            disabled={currentChapterIndex === ebookContent.chapters.length - 1}
            className="flex items-center space-x-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold text-sm hover:bg-emerald-700 disabled:opacity-30 transition-all shadow-lg shadow-emerald-200"
          >
            <span>Next Chapter</span>
            <ChevronRight size={20} />
          </button>
        </div>
      </footer>

      {/* Print-only View (All Chapters) */}
      <div className="hidden print:block p-12">
        <div className="text-center mb-20">
          <h1 className="text-6xl font-black text-zinc-900 mb-4">{ebookContent.title}</h1>
          <p className="text-2xl text-zinc-600 mb-8">{ebookContent.subtitle}</p>
          <p className="text-xl font-bold text-emerald-600">By {ebookContent.author}</p>
        </div>
        {ebookContent.chapters.map((chapter, index) => (
          <div key={index} className="page-break-after-always mb-20">
            <h2 className="text-4xl font-black text-zinc-900 mb-8">{chapter.title}</h2>
            <div className="markdown-body text-zinc-700 leading-relaxed text-lg">
              <ReactMarkdown>{chapter.content}</ReactMarkdown>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EBookView;
