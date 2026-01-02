import Link from 'next/link';

export default function Home() {
  const whatsappMessage = encodeURIComponent("Quisiera recibir asesoramiento para elegir un producto!");
  const whatsappNumber = "5492257660073"; // Store number

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
            <a
              href="https://maps.app.goo.gl/7Ub1zE6dxBUtt6q58"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition group"
            >
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">🏖️</div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition">Costa del Este</h3>
              <p className="text-text-gray">Las Camelias 93</p>
              <p className="text-primary text-sm mt-4 font-semibold opacity-0 group-hover:opacity-100 transition">Ver en Maps →</p>
            </a>
            <a
              href="https://maps.app.goo.gl/AQwasqMQtLsQwsFx7"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition group"
            >
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">🌲</div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition">Mar de las Pampas</h3>
              <p className="text-text-gray">Miguel Cané 30</p>
              <p className="text-primary text-sm mt-4 font-semibold opacity-0 group-hover:opacity-100 transition">Ver en Maps →</p>
            </a>
            <a
              href="https://maps.app.goo.gl/dDxvRG8rh5iVAy41A"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition group"
            >
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">🏠</div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition">Costa Esmeralda</h3>
              <p className="text-text-gray">Paseo Comercial, Local 33</p>
              <p className="text-primary text-sm mt-4 font-semibold opacity-0 group-hover:opacity-100 transition">Ver en Maps →</p>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
