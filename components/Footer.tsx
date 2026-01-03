'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-50 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-text-dark mb-6">Pocopán Jugueteria®</h3>
            <p className="text-text-gray font-light leading-relaxed">Una selección de juguetes que conectan con la imaginación y la nostalgia.</p>
          </div>
          
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-text-dark mb-6">Navegación</h4>
            <ul className="space-y-4 text-text-gray font-light">
              <li><Link href="/products" className="hover:text-primary transition-colors">Productos</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">Acerca de</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contacto</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-text-dark mb-6">Social</h4>
            <div className="flex flex-col gap-4 text-text-gray font-light">
              <a 
                href="https://www.instagram.com/pocopanjugueteria/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Instagram
              </a>
              <a 
                href="https://wa.me/5492257660073" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-50 mt-16 pt-8 text-center">
          <p className="text-text-gray text-xs font-light tracking-widest uppercase tracking-tighter">&copy; 2025 Pocopán Jugueteria®. Todos los derechos reservados.</p>
          <Link href="/admin" className="text-[10px] mt-4 inline-block text-gray-300 hover:text-primary transition-colors uppercase tracking-widest">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
