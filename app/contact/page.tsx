export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8 text-text-dark">Contacto</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 text-text-dark">Envíanos un mensaje</h2>
          <form className="space-y-4">
            <div>
              <label className="block font-semibold mb-2 text-text-dark">Nombre</label>
              <input type="text" placeholder="Tu nombre" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
            </div>
            <div>
              <label className="block font-semibold mb-2 text-text-dark">Email</label>
              <input type="email" placeholder="tu@email.com" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
            </div>
            <div>
              <label className="block font-semibold mb-2 text-text-dark">Mensaje</label>
              <textarea placeholder="¿En qué podemos ayudarte?" className="w-full px-4 py-2 border border-gray-200 rounded-lg h-32 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-secondary text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition"
            >
              Enviar Mensaje
            </button>
          </form>
        </div>

        {/* Contact Info & Social Media */}
        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-text-dark">Nuestras Redes</h2>
            <div className="space-y-4">
              <a
                href="https://wa.me/5492257660073" // Reemplazar con el número real si se conoce
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition border border-green-100 group"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">WhatsApp</span>
                <span className="font-semibold text-lg">Envíanos un WhatsApp</span>
              </a>

              <a
                href="https://www.instagram.com/pocopanjugueteria/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-lg bg-pink-50 text-pink-700 hover:bg-pink-100 transition border border-pink-100 group"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">Instagram</span>
                <span className="font-semibold text-lg">@pocopanjugueteria</span>
              </a>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
            <h2 className="text-2xl font-bold mb-4 text-text-dark">Nuestros Puntos de Venta</h2>
            <div className="space-y-4">
              <a
                href="https://maps.app.goo.gl/7Ub1zE6dxBUtt6q58"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 rounded-lg hover:bg-bg-light transition group border border-transparent hover:border-gray-200"
              >
                <p className="font-bold text-text-dark group-hover:text-primary transition">Costa del Este</p>
                <p className="text-text-gray">Las Camelias 93</p>
                <p className="text-primary text-xs mt-1 font-semibold">Ver en Google Maps →</p>
              </a>
              <a
                href="https://maps.app.goo.gl/AQwasqMQtLsQwsFx7"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 rounded-lg hover:bg-bg-light transition group border border-transparent hover:border-gray-200"
              >
                <p className="font-bold text-text-dark group-hover:text-primary transition">Mar de las Pampas</p>
                <p className="text-text-gray">Miguel Cané 30</p>
                <p className="text-primary text-xs mt-1 font-semibold">Ver en Google Maps →</p>
              </a>
              <a
                href="https://maps.app.goo.gl/dDxvRG8rh5iVAy41A"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 rounded-lg hover:bg-bg-light transition group border border-transparent hover:border-gray-200"
              >
                <p className="font-bold text-text-dark group-hover:text-primary transition">Costa Esmeralda</p>
                <p className="text-text-gray">Paseo Comercial, Local 33</p>
                <p className="text-primary text-xs mt-1 font-semibold">Ver en Google Maps →</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
