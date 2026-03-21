import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group bg-white rounded-2xl border border-black/5 overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 flex flex-col h-full">
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={product.imageUrl || `https://picsum.photos/seed/${product.id}/800/450`} 
          alt={product.title}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm text-emerald-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
            {product.category}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-600 transition-colors">
          {product.title}
        </h3>
        <p className="text-zinc-500 text-sm line-clamp-2 mb-4 flex-grow">
          {product.description}
        </p>
        
        <div className="space-y-2 mb-6">
          {product.features.slice(0, 3).map((feature, i) => (
            <div key={i} className="flex items-start space-x-2 text-xs text-zinc-600">
              <CheckCircle2 size={14} className="text-emerald-500 mt-0.5 flex-shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-black/5">
          {product.id === '1' ? (
            <>
              <div className="flex flex-col">
                {product.originalPrice && (
                  <span className="text-xs text-zinc-400 line-through">₱{product.originalPrice.toLocaleString()}</span>
                )}
                <span className="text-2xl font-black text-zinc-900">₱{product.price.toLocaleString()}</span>
              </div>
              <Link 
                to={`/shop/${product.id}`}
                className="bg-zinc-900 text-white p-3 rounded-xl hover:bg-emerald-600 transition-colors shadow-md"
              >
                <ShoppingCart size={20} />
              </Link>
            </>
          ) : (
            <div className="w-full">
              <span className="inline-block w-full text-center py-2 bg-zinc-100 text-zinc-400 text-sm font-black uppercase tracking-widest rounded-lg">
                Coming Soon
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
