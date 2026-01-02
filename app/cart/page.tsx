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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8 text-text-dark">Carrito de Compras</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-2xl text-text-gray mb-4">Tu carrito está vacío</p>
          <Link href="/products" className="text-primary hover:text-orange-700 text-lg font-semibold">
            Continuar Comprando
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
              {cartItems.map((item) => {
                const product = products[item.product_id];
                if (!product) return null;

                return (
                  <div key={item.product_id} className="flex gap-4 mb-6 pb-6 border-b border-gray-200">
                    <div className="w-24 h-24 bg-bg-light rounded flex-shrink-0">
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-full h-full object-cover rounded"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-text-gray">
                          📦
                        </div>
                      )}
                    </div>

                    <div className="flex-grow">
                      <h3 className="font-bold text-lg text-text-dark">{product.name}</h3>
                      <p className="text-text-gray mb-2">${product.price.toFixed(2)} c/u</p>

                      <div className="flex items-center gap-4 mb-4">
                        <button
                          onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                          className="px-2 py-1 border border-gray-300 rounded hover:bg-bg-light text-text-dark font-semibold"
                        >
                          −
                        </button>
                        <span className="font-semibold text-text-dark">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                          className="px-2 py-1 border border-gray-300 rounded hover:bg-bg-light text-text-dark font-semibold"
                        >
                          +
                        </button>
                      </div>

                      <p className="font-bold text-lg mb-2 text-primary">
                        ${(product.price * item.quantity).toFixed(2)}
                      </p>

                      <button
                        onClick={() => removeItem(item.product_id)}
                        className="text-danger hover:text-red-700 font-semibold text-sm"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20 border border-gray-100">
              <h2 className="text-2xl font-bold mb-6 text-text-dark">Resumen del Pedido</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-text-dark">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-text-dark">
                  <span>Impuesto (10%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between text-lg font-bold text-text-dark">
                  <span>Total:</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleWhatsAppCheckout}
                className="block w-full bg-primary hover:bg-orange-700 text-white font-bold py-3 rounded-lg text-center transition mb-4"
              >
                Finalizar Compra por WhatsApp
              </button>

              <button
                onClick={clearCart}
                className="block w-full border border-danger text-danger hover:bg-red-50 font-bold py-3 rounded-lg transition mb-4"
              >
                Limpiar Carrito
              </button>

              <Link
                href="/products"
                className="block w-full text-center text-secondary hover:text-blue-700 font-semibold"
              >
                Continuar Comprando
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
