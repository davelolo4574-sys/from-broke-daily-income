import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Search, Tag } from 'lucide-react';
import SEO from '../components/SEO';
import { BlogPost } from '../types';

const Blog = () => {
  const posts: BlogPost[] = [
    {
      id: '1',
      title: 'Paano Kumita ng Extra Income sa Pilipinas (2026 Guide)',
      slug: 'paano-kumita-ng-extra-income-pilipinas',
      excerpt: 'Alamin ang top 10 side hustles na talagang gumagana para sa mga Pinoy ngayong taon. Mula sa freelancing hanggang sa digital products.',
      content: '',
      author: 'Dave Miñoza',
      imageUrl: 'https://picsum.photos/seed/blog1/800/450',
      category: 'Side Hustles',
      status: 'published',
      createdAt: '2026-03-15T10:00:00Z',
      tags: ['Side Hustle', 'Income']
    },
    {
      id: '2',
      title: '5 Money Habits na Dahilan Kung Bakit Ka Laging Broke',
      slug: 'money-habits-dahilan-kung-bakit-ka-broke',
      excerpt: 'Ginagawa mo ba ang mga common financial mistakes na ito? Alamin kung paano putulin ang cycle at magsimulang mag-ipon.',
      content: '',
      author: 'Dave Miñoza',
      imageUrl: 'https://picsum.photos/seed/blog2/800/450',
      category: 'Financial Tips',
      status: 'published',
      createdAt: '2026-03-10T14:30:00Z',
      tags: ['Money Habits', 'Savings']
    },
    {
      id: '3',
      title: 'Bakit Digital Products ang Best Passive Income Stream',
      slug: 'bakit-digital-products-best-passive-income',
      excerpt: 'Alamin kung bakit mas profitable ang pagbebenta ng kaalaman kaysa sa traditional business models sa digital age.',
      content: '',
      author: 'Dave Miñoza',
      imageUrl: 'https://picsum.photos/seed/blog3/800/450',
      category: 'Digital Business',
      status: 'published',
      createdAt: '2026-03-05T09:15:00Z',
      tags: ['Digital Products', 'Passive Income']
    }
  ];

  return (
    <div className="bg-white min-h-screen pb-24">
      <SEO 
        title="Blog & Resources | From Broke Into Daily Income"
        description="Libreng guides, tips, at resources para matulungan ang mga Pinoy na kumita ng extra income, mag-manage ng pera, at mag-build ng digital business."
        keywords="financial blog ph, side hustle tips, money management philippines, digital business blog"
      />
      {/* Header */}
      <section className="bg-emerald-600 py-24 lg:py-32 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:20px_20px] opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-7xl font-black tracking-tight mb-8">
              Knowledge is <span className="text-zinc-900">Power</span>.
            </h1>
            <p className="text-xl text-emerald-50 leading-relaxed">
              Libreng resources, guides, at tips para matulungan ka sa iyong journey from broke to daily income.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Categories */}
      <section className="py-12 border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8 justify-between items-center">
            <div className="flex items-center space-x-6 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide">
              {['Lahat', 'Side Hustles', 'Money Tips', 'Digital Business', 'Success Stories'].map(cat => (
                <button key={cat} className="text-sm font-bold text-zinc-500 hover:text-emerald-600 transition-colors whitespace-nowrap uppercase tracking-widest">
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <input 
                type="text" 
                placeholder="Search articles..." 
                className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Feed */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {posts.map((post, i) => (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <Link to={`/blog/${post.slug}`}>
                  <div className="relative aspect-[16/10] rounded-3xl overflow-hidden mb-6 shadow-lg">
                    <img 
                      src={post.imageUrl} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-emerald-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-xs text-zinc-400 font-bold uppercase tracking-widest mb-4">
                    <div className="flex items-center space-x-1">
                      <Calendar size={14} />
                      <span>{new Date(post.createdAt).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <User size={14} />
                      <span>{post.author}</span>
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-black text-zinc-900 mb-4 group-hover:text-emerald-600 transition-colors leading-tight">
                    {post.title}
                  </h2>
                  <p className="text-zinc-500 text-sm leading-relaxed mb-6 line-clamp-2">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center space-x-2 text-emerald-600 font-bold text-sm">
                    <span>Basahin ang Article</span>
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
          
          <div className="mt-24 text-center">
            <button className="bg-zinc-100 text-zinc-900 px-10 py-4 rounded-2xl font-bold hover:bg-zinc-200 transition-all">
              Mag-load pa ng Articles
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
