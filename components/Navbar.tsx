'use client';

import Link from 'next/link';
import { useState } from 'react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="text-xl font-light tracking-widest uppercase text-text-dark">
            Pocopan Jugueteria®
          </Link>
          
          <div className="hidden md:flex space-x-12">
            <Link href="/" className="text-xs uppercase tracking-widest text-text-dark hover:text-primary transition-colors font-medium">Inicio</Link>
            <Link href="/products" className="text-xs uppercase tracking-widest text-text-dark hover:text-primary transition-colors font-medium">Productos</Link>
            <Link href="/cart" className="text-xs uppercase tracking-widest text-text-dark hover:text-primary transition-colors font-medium">Carrito</Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-text-dark"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/" className="block text-text-dark hover:text-primary transition font-medium">Inicio</Link>
            <Link href="/products" className="block text-text-dark hover:text-primary transition font-medium">Productos</Link>
            <Link href="/cart" className="block text-text-dark hover:text-primary transition font-medium">Carrito</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
