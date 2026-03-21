import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Calendar, User, ArrowLeft, Clock, Share2 } from 'lucide-react';
import SEO from '../components/SEO';
import { BlogPost as BlogPostType } from '../types';

const BlogPost = () => {
  const { slug } = useParams();

  // Mock post data (in real app, fetch from Firestore by slug)
  const posts: Record<string, BlogPostType> = {
    'paano-kumita-ng-extra-income-pilipinas': {
      id: '1',
      title: 'Paano Kumita ng Extra Income sa Pilipinas (2026 Guide)',
      slug: 'paano-kumita-ng-extra-income-pilipinas',
      excerpt: 'Alamin ang top 10 side hustles na talagang gumagana para sa mga Pinoy ngayong taon. Mula sa freelancing hanggang sa digital products.',
      content: `
        <p>Ang landscape ng pag-earn ng income sa Pilipinas ay nagbago na nang husto nitong mga nakaraang taon. Dahil sa pag-usbong ng digital economy, mas maraming Pinoy na ang nakakahanap ng paraan para kumita ng extra money labas sa kanilang traditional 9-5 jobs.</p>
        
        <h2>1. Freelancing</h2>
        <p>Ang mga platforms tulad ng Upwork, Fiverr, at OnlineJobs.ph ay patuloy na nagiging goldmines para sa mga skilled Filipinos. Kung ikaw ay isang writer, graphic designer, o virtual assistant, may global market na naghihintay sa iyo.</p>
        
        <h2>2. Digital Products</h2>
        <p>Ito ang aking personal favorite. Ang paggawa ng e-book o isang short course nang isang beses at pagbebenta nito nang paulit-ulit ay ang ultimate passive income stream. Hindi mo kailangang mag-alala tungkol sa inventory o shipping.</p>
        
        <h2>3. Content Creation</h2>
        <p>Bagama't kailangan ng panahon para makabuo ng audience, ang mga platforms tulad ng TikTok at YouTube ay nag-aalok ng significant monetization opportunities sa pamamagitan ng brand deals at ad revenue.</p>
        
        <p>Ang susi sa tagumpay sa alinman sa mga side hustles na ito ay consistency at ang kagustuhang matuto. Huwag matakot magsimula nang maliit at i-scale habang nakakakuha ka ng karanasan.</p>
      `,
      author: 'Dave Miñoza',
      imageUrl: 'https://picsum.photos/seed/blog1/1200/600',
      category: 'Side Hustles',
      status: 'published',
      createdAt: '2026-03-15T10:00:00Z',
      tags: ['Side Hustle', 'Income']
    }
  };

  const post = posts[slug || 'paano-kumita-ng-extra-income-pilipinas'] || posts['paano-kumita-ng-extra-income-pilipinas'];

  return (
    <div className="bg-white min-h-screen pb-24">
      <SEO 
        title={`${post.title} | From Broke Into Daily Income`}
        description={post.excerpt}
        image={post.imageUrl}
        type="article"
      />
      
      {/* Article Header */}
      <header className="pt-32 pb-16 bg-zinc-50 border-b border-black/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to="/blog" 
            className="inline-flex items-center space-x-2 text-zinc-400 hover:text-emerald-600 font-bold uppercase tracking-widest text-xs mb-8 transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Bumalik sa Blog</span>
          </Link>
          
          <div className="flex items-center space-x-2 mb-6">
            <span className="bg-emerald-100 text-emerald-700 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
              {post.category}
            </span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-zinc-900 mb-8 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-500 font-bold uppercase tracking-widest">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white text-[10px] font-black">
                DM
              </div>
              <span>{post.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar size={16} className="text-emerald-600" />
              <span>{new Date(post.createdAt).toLocaleDateString('en-PH', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock size={16} className="text-emerald-600" />
              <span>8 min basahin</span>
            </div>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="aspect-video rounded-[3rem] overflow-hidden shadow-2xl mb-16 border border-black/5"
          >
            <img 
              src={post.imageUrl} 
              alt={post.title} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          
          <div 
            className="prose prose-lg prose-emerald max-w-none prose-headings:font-black prose-headings:tracking-tight prose-p:text-zinc-600 prose-p:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          <div className="mt-16 pt-8 border-t border-black/5 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-bold text-zinc-400 uppercase tracking-widest">I-share ito:</span>
              <div className="flex items-center space-x-2">
                <button className="p-2 rounded-full bg-zinc-100 text-zinc-600 hover:bg-emerald-600 hover:text-white transition-all">
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
