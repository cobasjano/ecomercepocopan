'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Product, CartItem } from '@/lib/types';

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<{ [key: string]: Product }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      setLoading(true);
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartItems(cart);

      // Fetch product details
      const productMap: { [key: string]: Product } = {};
      for (const item of cart) {
        if (!productMap[item.product_id]) {
          const response = await fetch(`/api/products/${item.product_id}`);
          if (response.ok) {
            const product = await response.json();
            productMap[item.product_id] = product;
          }
        }
      }
      setProducts(productMap);
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    const updated = cartItems.map((item) =>
      item.product_id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const removeItem = (productId: string) => {
    const updated = cartItems.filter((item) => item.product_id !== productId);
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  const subtotal = cartItems.reduce((sum, item) => {
    const product = products[item.product_id];
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  const tax = subtotal * 0.10;
  const total = subtotal + tax;

  const handleWhatsAppCheckout = () => {
    const message = `Hola! Quisiera los siguientes productos:\n\n` +
      cartItems.map(item => {
        const p = products[item.product_id];
        if (!p) return '';
        return `- ${p.name} x ${item.quantity} - $${(p.price * item.quantity).toFixed(2)}`;
      }).filter(Boolean).join('\n') +
      `\n\nTotal: $${total.toFixed(2)}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5492257660073?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <p className="text-text-gray">Cargando carrito...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h1 className="text-4xl font-light tracking-tight mb-16 text-text-dark">Tu Selección</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-xl text-text-gray font-light mb-8">Tu carrito está vacío</p>
          <Link href="/products" className="inline-block text-text-dark border-b border-text-dark pb-1 hover:text-primary hover:border-primary transition-all font-medium">
            Ver Productos
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            <div className="space-y-10">
              {cartItems.map((item) => {
                const product = products[item.product_id];
                if (!product) return null;

                return (
                  <div key={item.product_id} className="flex gap-8 items-center border-b border-gray-50 pb-10">
                    <div className="w-32 h-32 bg-gray-50 flex-shrink-0 overflow-hidden">
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-300 font-light text-sm uppercase tracking-widest">
                          Sin imagen
                        </div>
                      )}
                    </div>

                    <div className="flex-grow flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-lg text-text-dark uppercase tracking-tight mb-1">{product.name}</h3>
                        <p className="text-text-gray font-light mb-4">${product.price.toFixed(0)}</p>
                        
                        <div className="flex items-center gap-6">
                          <div className="flex items-center border border-gray-100 rounded-full px-4 py-1">
                            <button
                              onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                              className="text-text-dark hover:text-primary transition-colors p-1"
                            >
                              -
                            </button>
                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                              className="text-text-dark hover:text-primary transition-colors p-1"
                            >
                              +
                            </button>
                          </div>
                          
                          <button
                            onClick={() => removeItem(item.product_id)}
                            className="text-xs uppercase tracking-widest text-gray-300 hover:text-danger transition-colors font-medium"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                      
                      <p className="font-medium text-lg text-text-dark">
                        ${(product.price * item.quantity).toFixed(0)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-4">
            <div className="bg-gray-50 p-10 rounded-2xl sticky top-24">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-text-dark mb-10">Resumen</h2>

              <div className="space-y-4 mb-10 text-sm font-light">
                <div className="flex justify-between text-text-gray">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-text-gray">
                  <span>Impuestos</span>
                  <span>${tax.toFixed(0)}</span>
                </div>
                <div className="pt-6 flex justify-between text-lg font-medium text-text-dark border-t border-gray-200">
                  <span>Total</span>
                  <span>${total.toFixed(0)}</span>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full bg-primary text-white font-medium py-4 rounded-full hover:bg-orange-600 transition-all shadow-lg shadow-orange-100"
                >
                  Finalizar por WhatsApp
                </button>

                <button
                  onClick={clearCart}
                  className="w-full text-xs uppercase tracking-widest text-gray-400 hover:text-danger transition-colors font-medium pt-4"
                >
                  Limpiar Carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
