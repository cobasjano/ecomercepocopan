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
        <h1 className="text-2xl font-light mb-4 uppercase tracking-widest text-text-dark">Producto no encontrado</h1>
        <Link href="/products" className="text-primary hover:text-orange-700 transition-colors font-medium">
          Volver a Productos
        </Link>
      </div>
    );
  }

  const inStock = product.stock_quantity > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Breadcrumb */}
      <div className="mb-12 flex items-center gap-2 text-xs uppercase tracking-widest text-text-gray font-light">
        <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-primary transition-colors">Productos</Link>
        <span>/</span>
        <span className="text-text-dark font-medium">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
        {/* Image */}
        <div className="aspect-square bg-gray-50 overflow-hidden">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://placehold.co/1200x1200?text=${encodeURIComponent(product.name)}`;
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300 font-light uppercase tracking-widest">
              Sin imagen
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <h1 className="text-4xl font-light tracking-tight text-text-dark mb-6 uppercase tracking-tighter">{product.name}</h1>

          <p className="text-3xl font-light text-text-dark mb-8">
            ${product.price.toFixed(0)}
          </p>

          <div className="prose prose-sm max-w-none text-text-gray font-light leading-relaxed mb-10 pb-10 border-b border-gray-50">
            <p>{product.description}</p>
          </div>

          <div className="space-y-6 mb-12">
            {product.age_group && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-text-gray font-light uppercase tracking-widest text-xs">Edad recomendada</span>
                <span className="text-text-dark font-medium">{product.age_group}</span>
              </div>
            )}
            <div className="flex justify-between items-center text-sm">
              <span className="text-text-gray font-light uppercase tracking-widest text-xs">Categoría</span>
              <span className="text-text-dark font-medium">{product.category}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-text-gray font-light uppercase tracking-widest text-xs">Disponibilidad</span>
              <span className={`font-medium ${inStock ? 'text-success' : 'text-danger'}`}>
                {inStock ? 'En Stock' : 'Sin Stock'}
              </span>
            </div>
          </div>

          {inStock && (
            <div className="mb-10">
              <label className="block text-xs font-semibold uppercase tracking-widest text-text-gray mb-4">Cantidad</label>
              <div className="flex items-center border border-gray-100 rounded-full w-fit px-6 py-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-text-dark hover:text-primary transition-colors p-2"
                >
                  -
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                  className="text-text-dark hover:text-primary transition-colors p-2"
                >
                  +
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-4">
            <button
              onClick={handleAddToCart}
              disabled={!inStock}
              className={`w-full py-4 rounded-full font-medium transition-all shadow-lg ${
                inStock
                  ? 'bg-primary text-white hover:bg-orange-600 shadow-orange-100 hover:-translate-y-1'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              {inStock ? 'Añadir al Carrito' : 'Sin Stock'}
            </button>
            <Link
              href="/products"
              className="w-full py-4 text-center border border-gray-100 rounded-full text-text-gray hover:bg-gray-50 transition-all font-medium text-sm uppercase tracking-widest"
            >
              Volver a la tienda
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
