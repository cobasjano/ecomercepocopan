'use client';

import Link from 'next/link';
import { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const inStock = product.stock_quantity > 0;

  return (
    <Link href={`/products/${product.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer h-full border border-gray-100">
        {/* Image */}
        <div className="relative bg-bg-light h-64 flex items-center justify-center">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://placehold.co/300x300?text=${encodeURIComponent(product.name)}`;
              }}
            />
          ) : (
            <div className="text-text-gray text-center">
              <div className="text-4xl mb-2">📦</div>
              <p>No image</p>
            </div>
          )}
          {!inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="bg-danger text-white px-4 py-2 rounded font-bold">Sin Stock</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-bold text-text-dark mb-2 line-clamp-2">
            {product.name}
          </h3>

          {product.age_group && (
            <p className="text-sm text-text-gray mb-2">Edad: {product.age_group}</p>
          )}

          <p className="text-text-gray text-sm mb-4 line-clamp-2">
            {product.description}
          </p>

          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-primary">
              ${product.price.toFixed(2)}
            </span>
            {inStock ? (
              <span className="badge-success text-xs">En Stock</span>
            ) : (
              <span className="badge-danger text-xs">Sin Stock</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
