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
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-orange-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Bienvenido a Pocopan Toys</h1>
          <p className="text-xl mb-8">Descubre juguetes educativos premium que inspiran el aprendizaje y la creatividad</p>
          <Link
            href="/products"
            className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
          >
            Comprar Ahora
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold mb-12 text-center text-text-dark">Productos Destacados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-bg-light py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center text-text-dark">¿Por Qué Elegir Pocopan Toys?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-2 text-text-dark">Calidad Educativa</h3>
              <p className="text-text-gray">Todos nuestros juguetes están diseñados para mejorar el aprendizaje y desarrollo cognitivo</p>
            </div>
            <div className="text-center p-8 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold mb-2 text-text-dark">Seguridad Primero</h3>
              <p className="text-text-gray">Cada producto cumple con estándares internacionales de seguridad</p>
            </div>
            <div className="text-center p-8 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-2 text-text-dark">Envío Rápido</h3>
              <p className="text-text-gray">Entrega rápida a través de Mercado Libre o retiro local</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Suscríbete a Nuestro Boletín</h2>
          <p className="mb-6">Recibe actualizaciones sobre nuevos productos y ofertas especiales</p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Ingresa tu email"
              className="flex-grow px-4 py-2 rounded text-text-dark"
            />
            <button
              type="submit"
              className="bg-secondary hover:bg-blue-700 text-white px-6 py-2 rounded font-bold transition"
            >
              Suscribirse
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
