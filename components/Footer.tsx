'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-text-dark text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold text-primary mb-4">Pocopan Jugueteria®</h3>
            <p className="text-gray-400">La seleccion de Juguetes que te conecta con la imaginacion y la nostalgia.</p>
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
            <h4 className="text-lg font-semibold mb-4 text-white">Síguenos</h4>
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/pocopanjugueteria/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition"
              >
                Instagram
              </a>
              <a 
                href="https://wa.me/5492257660073" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-500">
          <p>&copy; 2025 Pocopan Jugueteria®. Todos los derechos reservados.</p>
          <Link href="/admin" className="text-xs mt-2 inline-block hover:text-gray-300">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
