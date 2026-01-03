import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white border-b border-gray-50 py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-6xl font-light tracking-tight text-text-dark mb-6 uppercase">
            Pocopán Jugueteria®
          </h1>
          <p className="text-sm font-light uppercase tracking-widest text-text-gray mb-12">
            Desde 2002 Eligiendo con Imaginacion y Nostalgia
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

      {/* Locations Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Nuestros Locales</h2>
          <h3 className="text-3xl font-light tracking-tight text-text-dark text-center uppercase">Visítanos</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <a 
            href="https://maps.app.goo.gl/7Ub1zE6dxBUtt6q58" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group text-center block p-8 rounded-2xl hover:bg-gray-50 transition-all duration-300 border border-transparent hover:border-gray-100"
          >
            <div className="mb-6 text-3xl grayscale group-hover:grayscale-0 transition-all duration-500">📍</div>
            <h4 className="text-sm font-semibold mb-2 text-text-dark uppercase tracking-widest group-hover:text-primary transition-colors">Costa del Este</h4>
            <p className="text-xs text-text-gray font-light uppercase tracking-widest">Las Camelias 93</p>
          </a>
          
          <a 
            href="https://maps.app.goo.gl/AQwasqMQtLsQwsFx7" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group text-center block p-8 rounded-2xl hover:bg-gray-50 transition-all duration-300 border border-transparent hover:border-gray-100"
          >
            <div className="mb-6 text-3xl grayscale group-hover:grayscale-0 transition-all duration-500">📍</div>
            <h4 className="text-sm font-semibold mb-2 text-text-dark uppercase tracking-widest group-hover:text-primary transition-colors">Mar de las Pampas</h4>
            <p className="text-xs text-text-gray font-light uppercase tracking-widest">Miguel Cané 30</p>
          </a>
          
          <a 
            href="https://maps.app.goo.gl/dDxvRG8rh5iVAy41A" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group text-center block p-8 rounded-2xl hover:bg-gray-50 transition-all duration-300 border border-transparent hover:border-gray-100"
          >
            <div className="mb-6 text-3xl grayscale group-hover:grayscale-0 transition-all duration-500">📍</div>
            <h4 className="text-sm font-semibold mb-2 text-text-dark uppercase tracking-widest group-hover:text-primary transition-colors">Costa Esmeralda</h4>
            <p className="text-xs text-text-gray font-light uppercase tracking-widest">Paseo Comercial, Local 33</p>
          </a>
        </div>
      </section>
    </div>
  );
}
