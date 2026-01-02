'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/lib/types';
import Link from 'next/link';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/products/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  const handleAddToCart = () => {
    if (product) {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingItem = cart.find((item: any) => item.product_id === product.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.push({ product_id: product.id, quantity });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      alert('Product added to cart!');
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <p className="text-lg text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <Link href="/products" className="text-blue-600 hover:text-blue-800">
          Back to Products
        </Link>
      </div>
    );
  }

  const inStock = product.stock_quantity > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <div className="mb-8">
        <Link href="/" className="text-blue-600 hover:text-blue-800">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="text-blue-600 hover:text-blue-800">Products</Link>
        <span className="mx-2">/</span>
        <span>{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image */}
        <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://placehold.co/600x600?text=${encodeURIComponent(product.name)}`;
              }}
            />
          ) : (
            <div className="text-gray-400 text-center">
              <div className="text-6xl mb-2">📦</div>
              <p>No image available</p>
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

          {product.age_group && (
            <p className="text-lg text-gray-600 mb-4">Age Group: {product.age_group}</p>
          )}

          <p className="text-3xl font-bold text-secondary mb-4">
            ${product.price.toFixed(2)}
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            {product.description}
          </p>

          <div className="mb-6">
            <p className="text-lg font-semibold mb-2">Category: {product.category}</p>
            <p className={`text-lg font-semibold ${inStock ? 'text-green-600' : 'text-red-600'}`}>
              {inStock ? `In Stock (${product.stock_quantity} available)` : 'Out of Stock'}
            </p>
          </div>

          {inStock && (
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Quantity:</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                >
                  -
                </button>
                <span className="text-xl font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              disabled={!inStock}
              className={`flex-grow px-8 py-3 rounded-lg font-bold text-white transition ${
                inStock
                  ? 'bg-secondary hover:bg-yellow-600'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              {inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
            <Link
              href="/products"
              className="px-8 py-3 border border-primary text-primary rounded-lg font-bold hover:bg-gray-100 transition"
            >
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
