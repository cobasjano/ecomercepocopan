export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-light tracking-tight text-text-dark mb-4">Nuestra Historia</h1>
      </div>
      
      <div className="prose prose-lg max-w-none text-text-dark font-light leading-relaxed">
        <p className="mb-8 text-xl">
          Pocopan Jugueteria® es una juguetería atendida por sus dueños desde 2002.
          Propone una selección de juguetes que conectan con la imaginación y la nostalgia.
          Nuestro catálogo contempla niños, adolescentes y adultos.
        </p>
        
        <h2 className="text-2xl font-medium mt-16 mb-6 tracking-wide uppercase text-sm text-text-gray">Nuestra Visión</h2>
        <p className="mb-8">
          Entendemos el juego como un espacio de aprendizaje, y al juguete como un disparador de curiosidad y de preguntas para investigar.
          Buscamos revalorizar los juegos de mesa como una propuesta de encuentro y diversión.
        </p>
        <p className="italic text-primary font-medium">
          Menos pantallas y más juegos.
        </p>
      </div>
    </div>
  );
}
