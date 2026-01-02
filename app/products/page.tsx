'use client';

import { useState, useEffect } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { Product } from '@/lib/types';

const CATEGORIES = [
  'Libros',
  'Muñecos',
  'Vehiculos',
  'Ingenio',
  'Madera',
  'Musicales',
  'Nenas',
  'Juego Meza',
  'Bebes',
  'Animales',
  'Popurri',
  'Playa',
  'Bloques',
  'Cartas',
  'Rompecabeza',
  'Cubos',
  'Moviles',
  'Sacapuntas',
  'Lego',
  'Pelotas',
  'Tazas',
  'Tela',
  'Arte',
];

const CATEGORY_NAMES: Record<string, string> = {
  'Libros': 'Libros',
  'Muñecos': 'Muñecos',
  'Vehiculos': 'Vehículos',
  'Ingenio': 'Ingenio',
  'Madera': 'Madera',
  'Musicales': 'Musicales',
  'Nenas': 'Nenas',
  'Juego Meza': 'Juegos de Mesa',
  'Bebes': 'Bebés',
  'Animales': 'Animales',
  'Popurri': 'Popurrí',
  'Playa': 'Playa',
  'Bloques': 'Bloques',
  'Cartas': 'Cartas',
  'Rompecabeza': 'Rompecabezas',
  'Cubos': 'Cubos',
  'Moviles': 'Móviles',
  'Sacapuntas': 'Sacapuntas',
  'Lego': 'Lego',
  'Pelotas': 'Pelotas',
  'Tazas': 'Tazas',
  'Tela': 'Tela',
  'Arte': 'Arte',
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const url = selectedCategory
          ? `/api/products?category=${selectedCategory}`
          : '/api/products';

        const response = await fetch(url);
        const data = await response.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8 text-text-dark">Productos</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
            <h2 className="text-xl font-bold mb-4 text-text-dark">Categorías</h2>
            <button
              onClick={() => setSelectedCategory(null)}
              className={`block w-full text-left py-2 px-3 rounded mb-2 transition font-medium ${
                selectedCategory === null
                  ? 'bg-primary text-white'
                  : 'text-text-dark hover:bg-bg-light'
              }`}
            >
              Todos los Productos
            </button>
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`block w-full text-left py-2 px-3 rounded mb-2 transition font-medium ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'text-text-dark hover:bg-bg-light'
                }`}
              >
                {CATEGORY_NAMES[category] || category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="md:col-span-3">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-lg text-text-gray">Cargando productos...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-text-gray">No se encontraron productos</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
