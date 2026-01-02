export default function ContactPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-light tracking-tight text-text-dark mb-4">Contacto</h1>
        <p className="text-text-gray text-lg max-w-2xl mx-auto">Conectate con nosotros a través de nuestras redes o visítanos en nuestros puntos de venta.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Social Media */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10">
          <h2 className="text-xl font-semibold mb-8 text-text-dark uppercase tracking-wider text-sm">Nuestras Redes</h2>
          <div className="space-y-6">
            <a
              href="https://wa.me/5492257660073"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-5 rounded-xl bg-gray-50 text-text-dark hover:bg-gray-100 transition-all border border-transparent hover:border-gray-200 group"
            >
              <span className="font-medium text-lg">WhatsApp</span>
              <span className="text-text-gray group-hover:text-primary transition-colors">Enviar mensaje →</span>
            </a>

            <a
              href="https://www.instagram.com/pocopanjugueteria/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-5 rounded-xl bg-gray-50 text-text-dark hover:bg-gray-100 transition-all border border-transparent hover:border-gray-200 group"
            >
              <span className="font-medium text-lg">Instagram</span>
              <span className="text-text-gray group-hover:text-primary transition-colors">@pocopanjugueteria →</span>
            </a>
          </div>
        </div>

        {/* Puntos de Venta */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10">
          <h2 className="text-xl font-semibold mb-8 text-text-dark uppercase tracking-wider text-sm">Puntos de Venta</h2>
          <div className="space-y-4">
            <a
              href="https://maps.app.goo.gl/7Ub1zE6dxBUtt6q58"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-5 rounded-xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-200 group"
            >
              <p className="font-semibold text-text-dark group-hover:text-primary transition-colors">Costa del Este</p>
              <p className="text-text-gray text-sm">Las Camelias 93</p>
            </a>
            <a
              href="https://maps.app.goo.gl/AQwasqMQtLsQwsFx7"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-5 rounded-xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-200 group"
            >
              <p className="font-semibold text-text-dark group-hover:text-primary transition-colors">Mar de las Pampas</p>
              <p className="text-text-gray text-sm">Miguel Cané 30</p>
            </a>
            <a
              href="https://maps.app.goo.gl/dDxvRG8rh5iVAy41A"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-5 rounded-xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-200 group"
            >
              <p className="font-semibold text-text-dark group-hover:text-primary transition-colors">Costa Esmeralda</p>
              <p className="text-text-gray text-sm">Paseo Comercial, Local 33</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
