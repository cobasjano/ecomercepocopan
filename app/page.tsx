import Link from 'next/link';

export default function Home() {
  const whatsappMessage = encodeURIComponent("Quisiera recibir asesoramiento para elegir un producto!");
  const whatsappNumber = "5492257660073"; // Store number

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-white text-text-dark py-32 border-b border-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-6xl font-light tracking-tight mb-6">Bienvenido a Pocopan Jugueteria®</h1>
          <p className="text-xl text-text-gray mb-10 max-w-2xl mx-auto font-light">Descubrí una selección de juguetes premium diseñados para inspirar el aprendizaje y la creatividad en cada etapa.</p>
          <Link
            href="/products"
            className="inline-block bg-primary text-white px-10 py-4 rounded-full font-medium hover:bg-orange-600 transition-all shadow-lg shadow-orange-200 hover:-translate-y-1"
          >
            Explorar Colección
          </Link>
        </div>
      </section>

      {/* Asesoramiento Section */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="border-t border-b border-gray-100 py-12 px-6">
            <h2 className="text-2xl font-light tracking-wide mb-3 text-text-dark uppercase">Asesoramiento Personalizado</h2>
            <p className="text-text-gray mb-8 font-light">Estamos para ayudarte a elegir el juguete perfecto. Conversá directamente con sus dueños.</p>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-primary font-medium border-b border-primary pb-1 hover:text-orange-600 hover:border-orange-600 transition-all"
            >
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Puntos de Venta Section */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-light tracking-tight mb-16 text-center text-text-dark">Nuestros Puntos de Venta</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <a
              href="https://maps.app.goo.gl/7Ub1zE6dxBUtt6q58"
              target="_blank"
              rel="noopener noreferrer"
              className="group text-center"
            >
              <h3 className="text-xl font-medium mb-2 group-hover:text-primary transition-colors">Costa del Este</h3>
              <p className="text-text-gray font-light">Las Camelias 93</p>
              <p className="text-primary text-xs mt-4 font-medium opacity-0 group-hover:opacity-100 transition-all">Ver ubicación</p>
            </a>
            <a
              href="https://maps.app.goo.gl/AQwasqMQtLsQwsFx7"
              target="_blank"
              rel="noopener noreferrer"
              className="group text-center"
            >
              <h3 className="text-xl font-medium mb-2 group-hover:text-primary transition-colors">Mar de las Pampas</h3>
              <p className="text-text-gray font-light">Miguel Cané 30</p>
              <p className="text-primary text-xs mt-4 font-medium opacity-0 group-hover:opacity-100 transition-all">Ver ubicación</p>
            </a>
            <a
              href="https://maps.app.goo.gl/dDxvRG8rh5iVAy41A"
              target="_blank"
              rel="noopener noreferrer"
              className="group text-center"
            >
              <h3 className="text-xl font-medium mb-2 group-hover:text-primary transition-colors">Costa Esmeralda</h3>
              <p className="text-text-gray font-light">Paseo Comercial, Local 33</p>
              <p className="text-primary text-xs mt-4 font-medium opacity-0 group-hover:opacity-100 transition-all">Ver ubicación</p>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
