import Link from 'next/link';
import { ProductCard } from '@/components/ProductCard';

export default function Home() {
  // Sample featured products - will be replaced with actual data from Supabase
  const featuredProducts = [
    {
      id: '1',
      name: 'Wooden Puzzle Set',
      description: 'Educational wooden puzzle for kids',
      price: 29.99,
      stock_quantity: 50,
      category: 'puzzles',
      age_group: '3-5',
      image_url: 'https://placehold.co/300x300?text=Puzzle',
      is_visible: true,
      is_out_of_stock: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Building Blocks',
      description: 'Colorful building blocks for creative play',
      price: 39.99,
      stock_quantity: 30,
      category: 'building',
      age_group: '2-4',
      image_url: 'https://placehold.co/300x300?text=Blocks',
      is_visible: true,
      is_out_of_stock: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '3',
      name: 'Musical Instruments',
      description: 'Set of 5 musical instruments for kids',
      price: 34.99,
      stock_quantity: 25,
      category: 'music',
      age_group: '3-6',
      image_url: 'https://placehold.co/300x300?text=Music',
      is_visible: true,
      is_out_of_stock: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white border-b border-gray-50 py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-6xl font-light tracking-tight text-text-dark mb-6 uppercase">
            Pocopán Jugueteria®
          </h1>
          <p className="text-sm font-light uppercase tracking-widest text-text-gray mb-12">
            Desde 2002 • Curando Imaginación y Nostalgia
          </p>
          <Link
            href="/products"
            className="inline-block bg-text-dark text-white px-10 py-4 rounded-full font-medium hover:bg-primary transition-all shadow-lg shadow-gray-100 hover:-translate-y-1 text-xs uppercase tracking-widest"
          >
            Explorar Colección
          </Link>
        </div>
        
        {/* Subtle Decorative Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      </section>

      {/* Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Selección Especial</h2>
          <h3 className="text-3xl font-light tracking-tight text-text-dark text-center uppercase">Productos Destacados</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link href="/products" className="text-xs font-medium uppercase tracking-widest text-text-gray hover:text-primary border-b border-gray-200 pb-1 transition-all">
            Ver Todos los Productos →
          </Link>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-gray-50/50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Compromiso</h2>
            <h3 className="text-3xl font-light tracking-tight text-text-dark uppercase">¿Por Qué Elegir Pocopán?</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="group">
              <div className="text-3xl mb-8 grayscale group-hover:grayscale-0 transition-all duration-500">🎯</div>
              <h4 className="text-sm font-semibold mb-4 text-text-dark uppercase tracking-widest">Calidad Educativa</h4>
              <p className="text-sm text-text-gray font-light leading-relaxed">Cada juguete es seleccionado para inspirar el aprendizaje y el desarrollo cognitivo a través del juego.</p>
            </div>
            
            <div className="group">
              <div className="text-3xl mb-8 grayscale group-hover:grayscale-0 transition-all duration-500">🛡️</div>
              <h4 className="text-sm font-semibold mb-4 text-text-dark uppercase tracking-widest">Seguridad</h4>
              <p className="text-sm text-text-gray font-light leading-relaxed">Priorizamos la tranquilidad de la familia con productos que cumplen con los más altos estándares.</p>
            </div>
            
            <div className="group">
              <div className="text-3xl mb-8 grayscale group-hover:grayscale-0 transition-all duration-500">⚡</div>
              <h4 className="text-sm font-semibold mb-4 text-text-dark uppercase tracking-widest">Experiencia</h4>
              <p className="text-sm text-text-gray font-light leading-relaxed">Desde 2002 brindamos atención personalizada y envíos rápidos a todo el país.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
