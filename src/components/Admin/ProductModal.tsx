import React from 'react';
import { X, Upload, Save, Sparkles } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Product } from '../../types';
import { createDocument, updateDocument } from '../../services/firestore';
import { generateProductDescription, generateSEOKeywords } from '../../services/geminiService';

const productSchema = z.object({
  title: z.string().min(3, 'Ang title ay dapat hindi bababa sa 3 characters'),
  description: z.string().min(10, 'Ang description ay dapat hindi bababa sa 10 characters'),
  price: z.number().min(0, 'Ang presyo ay dapat positive'),
  category: z.string().min(1, 'Kailangan ng category'),
  imageUrl: z.string().url('Maling image URL format'),
  status: z.enum(['active', 'draft']),
  features: z.string(),
  slug: z.string().min(3, 'Ang slug ay dapat hindi bababa sa 3 characters'),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  seoKeywords: z.string().optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
  onSuccess: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, product, onSuccess }) => {
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, watch, setValue } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: product ? {
      ...product,
      features: product.features.join('\n'),
    } : {
      title: '',
      description: '',
      category: '',
      imageUrl: '',
      slug: '',
      status: 'draft',
      price: 0,
      features: '',
    }
  });

  const watchedTitle = watch('title');
  const watchedFeatures = watch('features');

  React.useEffect(() => {
    if (product) {
      reset({
        ...product,
        features: product.features.join('\n'),
      });
    } else {
      reset({
        title: '',
        description: '',
        price: 0,
        category: '',
        imageUrl: '',
        status: 'draft',
        features: '',
        slug: '',
      });
    }
  }, [product, reset]);

  const handleGenerateAI = async () => {
    if (!watchedTitle) {
      setError('Pakilagay muna ang title para makapag-generate ng description.');
      return;
    }

    setIsGenerating(true);
    setError(null);
    try {
      const featuresList = typeof watchedFeatures === 'string' 
        ? watchedFeatures.split('\n').filter(f => f.trim())
        : [];
      
      const [description, keywords] = await Promise.all([
        generateProductDescription(watchedTitle, featuresList),
        generateSEOKeywords(watchedTitle, 'Digital product for financial freedom')
      ]);

      if (description) setValue('description', description);
      if (keywords) setValue('seoKeywords', keywords);
      if (watchedTitle) setValue('seoTitle', `${watchedTitle} | From Broke To Daily Income`);
      
    } catch (error) {
      console.error('AI Generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const onSubmit = async (data: ProductFormData) => {
    try {
      const transformedData = {
        ...data,
        features: data.features.split('\n').filter(line => line.trim() !== '')
      };

      if (product) {
        await updateDocument('products', product.id, transformedData);
      } else {
        await createDocument('products', {
          ...transformedData,
          createdAt: new Date().toISOString(),
        });
      }
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error saving product:', error);
      setError('Hindi ma-save ang product. Pakisubukang muli.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-zinc-100 flex justify-between items-center bg-zinc-50">
          <h2 className="text-xl font-black text-zinc-900">{product ? 'I-edit ang Product' : 'Magdagdag ng Bagong Product'}</h2>
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
                placeholder="Hal. From Broke Into Daily Income"
              />
              {errors.title && <p className="text-red-500 text-xs font-bold">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">URL Slug</label>
              <input 
                {...register('slug')}
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                placeholder="product-url-slug"
              />
              {errors.slug && <p className="text-red-500 text-xs font-bold">{errors.slug.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Kategorya</label>
              <input 
                {...register('category')}
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                placeholder="Hal. Digital Course, eBook"
              />
              {errors.category && <p className="text-red-500 text-xs font-bold">{errors.category.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Presyo (₱)</label>
              <input 
                type="number"
                {...register('price', { valueAsNumber: true })}
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                placeholder="0.00"
              />
              {errors.price && <p className="text-red-500 text-xs font-bold">{errors.price.message}</p>}
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
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Deskripsyon</label>
              <button
                type="button"
                onClick={handleGenerateAI}
                disabled={isGenerating}
                className="text-[10px] font-bold text-emerald-600 flex items-center space-x-1 hover:text-emerald-700 transition-colors disabled:opacity-50"
              >
                <Sparkles size={12} />
                <span>{isGenerating ? 'Generating...' : 'Generate with AI'}</span>
              </button>
            </div>
            <textarea 
              {...register('description')}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none"
              placeholder="I-describe ang product sa Taglish..."
            />
            {errors.description && <p className="text-red-500 text-xs font-bold">{errors.description.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Features (Isa bawat linya)</label>
            <textarea 
              {...register('features')}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none"
              placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Status</label>
            <select 
              {...register('status')}
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all bg-white"
            >
              <option value="draft">Draft</option>
              <option value="active">Active</option>
            </select>
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
              <span>{isSubmitting ? 'Sinesave...' : 'I-save ang Product'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
