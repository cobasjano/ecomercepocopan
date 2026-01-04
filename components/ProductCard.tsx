'use client';

import Link from 'next/link';
import { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const inStock = !product.is_out_of_stock;

  return (
    <Link href={`/products/${product.id}`} className="group h-full flex flex-col">
      <div className="relative aspect-square overflow-hidden bg-gray-50 mb-6">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://placehold.co/600x600?text=${encodeURIComponent(product.name)}`;
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 font-light">
            Sin imagen
          </div>
        )}
        {!inStock && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center">
            <span className="text-text-dark font-medium tracking-widest uppercase text-xs border border-text-dark px-4 py-2">Sin Stock</span>
          </div>
        )}
      </div>

      <div className="flex-grow">
        <div className="flex justify-between items-start gap-4 mb-2">
          <h3 className="text-base font-medium text-text-dark line-clamp-1 uppercase tracking-tight">
            {product.name}
          </h3>
          <span className="text-base font-light text-text-dark">
            ${product.price.toFixed(0)}
          </span>
        </div>

        {product.age_group && (
          <p className="text-xs text-text-gray font-light uppercase tracking-widest mb-2">{product.age_group}</p>
        )}

        <p className="text-sm text-text-gray font-light line-clamp-2 leading-relaxed">
          {product.description}
        </p>
      </div>
    </Link>
  );
}
