import Link from 'next/link';
import { ProductCard } from '@/components/ProductCard';

export default function Home() {
  const whatsappMessage = encodeURIComponent("Quisiera recibir asesoramiento para elegir un producto!");
  const whatsappNumber = "5491112345678"; // Placeholder

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-orange-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Bienvenido a Pocopan Jugueteria®</h1>
          <p className="text-xl mb-8">Descubre juguetes educativos premium que inspiran el aprendizaje y la creatividad</p>
          <Link
            href="/products"
            className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
          >
            Comprar Ahora
          </Link>
        </div>
      </section>

      {/* Asesoramiento Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-orange-50 rounded-2xl p-10 border border-orange-100 shadow-sm">
            <h2 className="text-3xl font-bold mb-4 text-text-dark">Recibí asesoramiento directo por parte de sus dueños</h2>
            <p className="text-text-gray mb-8 text-lg">Estamos para ayudarte a elegir el juguete perfecto para cada etapa del desarrollo.</p>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-bold text-xl transition transform hover:scale-105 shadow-lg"
            >
              <span>Quisiera recibir asesoramiento para elegir un producto!</span>
            </a>
          </div>
        </div>
      </section>

      {/* Puntos de Venta Section */}
      <section className="bg-bg-light py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center text-text-dark">Nuestros Puntos de Venta</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="text-3xl mb-4">🏖️</div>
              <h3 className="text-xl font-bold mb-2">Costa del Este</h3>
              <p className="text-text-gray">Las Camelias 93</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="text-3xl mb-4">🌲</div>
              <h3 className="text-xl font-bold mb-2">Mar de las Pampas</h3>
              <p className="text-text-gray">Miguel Cané 30</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="text-3xl mb-4">🏠</div>
              <h3 className="text-xl font-bold mb-2">Costa Esmeralda</h3>
              <p className="text-text-gray">Paseo Comercial, Local 33</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
