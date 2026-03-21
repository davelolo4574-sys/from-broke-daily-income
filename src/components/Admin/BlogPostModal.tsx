import React from 'react';
import { X, Upload, Save, Sparkles } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { BlogPost } from '../../types';
import { createDocument, updateDocument } from '../../services/firestore';
import { generateBlogOutline, generateSEOKeywords } from '../../services/geminiService';

const blogPostSchema = z.object({
  title: z.string().min(5, 'Ang title ay dapat hindi bababa sa 5 characters'),
  excerpt: z.string().min(10, 'Ang excerpt ay dapat hindi bababa sa 10 characters'),
  content: z.string().min(50, 'Ang content ay dapat hindi bababa sa 50 characters'),
  category: z.string().min(1, 'Kailangan ng category'),
  imageUrl: z.string().url('Maling image URL format'),
  author: z.string().min(1, 'Kailangan ng author'),
  status: z.enum(['published', 'draft']),
  slug: z.string().min(3, 'Ang slug ay dapat hindi bababa sa 3 characters'),
  tags: z.string(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  seoKeywords: z.string().optional(),
});

type BlogPostFormData = z.infer<typeof blogPostSchema>;

interface BlogPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  post?: BlogPost | null;
  onSuccess: () => void;
}

const BlogPostModal: React.FC<BlogPostModalProps> = ({ isOpen, onClose, post, onSuccess }) => {
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, watch, setValue } = useForm<BlogPostFormData>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: post ? {
      ...post,
      tags: post.tags.join(', '),
    } : {
      title: '',
      excerpt: '',
      content: '',
      category: '',
      imageUrl: '',
      slug: '',
      status: 'draft',
      author: 'Dave Miñoza',
      tags: '',
    }
  });

  const watchedTitle = watch('title');

  React.useEffect(() => {
    if (post) {
      reset({
        ...post,
        tags: post.tags.join(', '),
      });
    } else {
      reset({
        title: '',
        excerpt: '',
        content: '',
        category: '',
        imageUrl: '',
        author: 'Dave Miñoza',
        status: 'draft',
        slug: '',
        tags: '',
      });
    }
  }, [post, reset]);

  const handleGenerateAI = async () => {
    if (!watchedTitle) {
      setError('Pakilagay muna ang title para makapag-generate ng outline.');
      return;
    }

    setIsGenerating(true);
    setError(null);
    try {
      const [outline, keywords] = await Promise.all([
        generateBlogOutline(watchedTitle),
        generateSEOKeywords(watchedTitle, 'Blog post about financial freedom and digital products')
      ]);

      if (outline) setValue('content', outline);
      if (keywords) setValue('seoKeywords', keywords);
      if (watchedTitle) setValue('seoTitle', `${watchedTitle} | From Broke To Daily Income Blog`);
      
    } catch (error) {
      console.error('AI Generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const onSubmit = async (data: BlogPostFormData) => {
    try {
      const transformedData = {
        ...data,
        tags: data.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
      };

      if (post) {
        await updateDocument('blogPosts', post.id, transformedData);
      } else {
        await createDocument('blogPosts', {
          ...transformedData,
          createdAt: new Date().toISOString(),
        });
      }
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error saving blog post:', error);
      setError('Hindi ma-save ang blog post. Pakisubukang muli.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-zinc-100 flex justify-between items-center bg-zinc-50">
          <h2 className="text-xl font-black text-zinc-900">{post ? 'I-edit ang Blog Post' : 'Magdagdag ng Bagong Blog Post'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-zinc-200 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 overflow-y-auto space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl text-sm font-bold flex items-center space-x-2">
              <X size={16} />
              <span>{error}</span>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Pamagat (Title)</label>
              <input 
                {...register('title')}
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                placeholder="Pamagat ng Post"
              />
              {errors.title && <p className="text-red-500 text-xs font-bold">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">URL Slug</label>
              <input 
                {...register('slug')}
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                placeholder="post-url-slug"
              />
              {errors.slug && <p className="text-red-500 text-xs font-bold">{errors.slug.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Kategorya</label>
              <input 
                {...register('category')}
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                placeholder="Hal. Financial Tips"
              />
              {errors.category && <p className="text-red-500 text-xs font-bold">{errors.category.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">May-akda (Author)</label>
              <input 
                {...register('author')}
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                placeholder="Pangalan ng Author"
              />
              {errors.author && <p className="text-red-500 text-xs font-bold">{errors.author.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Image URL</label>
            <div className="flex space-x-4">
              <input 
                {...register('imageUrl')}
                className="flex-grow px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                placeholder="https://..."
              />
              <div className="w-12 h-12 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center overflow-hidden">
                <Upload size={20} className="text-zinc-400" />
              </div>
            </div>
            {errors.imageUrl && <p className="text-red-500 text-xs font-bold">{errors.imageUrl.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Excerpt (Maikling Buod)</label>
            <textarea 
              {...register('excerpt')}
              rows={2}
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none"
              placeholder="Maikling summary ng post..."
            />
            {errors.excerpt && <p className="text-red-500 text-xs font-bold">{errors.excerpt.message}</p>}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Nilalaman (Content - Markdown)</label>
              <button
                type="button"
                onClick={handleGenerateAI}
                disabled={isGenerating}
                className="text-[10px] font-bold text-emerald-600 flex items-center space-x-1 hover:text-emerald-700 transition-colors disabled:opacity-50"
              >
                <Sparkles size={12} />
                <span>{isGenerating ? 'Generating...' : 'Generate Outline with AI'}</span>
              </button>
            </div>
            <textarea 
              {...register('content')}
              rows={10}
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none font-mono text-sm"
              placeholder="Buong nilalaman ng post sa Markdown..."
            />
            {errors.content && <p className="text-red-500 text-xs font-bold">{errors.content.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Tags (Hiwalay ng comma)</label>
              <input 
                {...register('tags')}
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                placeholder="Tag 1, Tag 2, Tag 3"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Status</label>
              <select 
                {...register('status')}
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all bg-white"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t border-zinc-100">
            <h3 className="text-sm font-black text-zinc-900 uppercase tracking-widest">SEO Settings</h3>
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">SEO Title</label>
              <input 
                {...register('seoTitle')}
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                placeholder="Meta Title"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">SEO Description</label>
              <textarea 
                {...register('seoDescription')}
                rows={2}
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none"
                placeholder="Meta Description"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">SEO Keywords</label>
              <input 
                {...register('seoKeywords')}
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                placeholder="keyword1, keyword2"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-zinc-100 flex justify-end space-x-4">
            <button 
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl text-sm font-bold text-zinc-500 hover:bg-zinc-100 transition-all"
            >
              I-cancel
            </button>
            <button 
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 transition-all flex items-center space-x-2 disabled:opacity-50"
            >
              <Save size={18} />
              <span>{isSubmitting ? 'Sinesave...' : 'I-save ang Post'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogPostModal;
