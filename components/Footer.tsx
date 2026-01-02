'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-text-dark text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold text-primary mb-4">Pocopan Toys</h3>
            <p className="text-gray-400">Juguetes educativos premium para mentes curiosas</p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/products" className="hover:text-primary transition">Productos</Link></li>
              <li><Link href="/about" className="hover:text-primary transition">Acerca de</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition">Contacto</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/privacy" className="hover:text-primary transition">Privacidad</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition">Términos</Link></li>
              <li><Link href="/shipping" className="hover:text-primary transition">Envíos</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Síguenos</h4>
            <div className="space-y-2 text-gray-400">
              <p>Facebook | Instagram | WhatsApp</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-500">
          <p>&copy; 2025 Pocopan Toys. Todos los derechos reservados.</p>
          <Link href="/admin" className="text-xs mt-2 inline-block hover:text-gray-300">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
