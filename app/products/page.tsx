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
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 20;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let url = `/api/products?page=${currentPage}&pageSize=${pageSize}`;
        
        if (selectedCategory) {
          url += `&category=${encodeURIComponent(selectedCategory)}`;
        }
        
        if (searchTerm) {
          url += `&search=${encodeURIComponent(searchTerm)}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        setProducts(data.products || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, searchTerm, currentPage]);

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search change
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div>
          <h1 className="text-4xl font-light tracking-tight text-text-dark mb-2">Colección</h1>
          <p className="text-text-gray font-light">Explorá nuestra selección de juguetes educativos.</p>
        </div>
        
        {/* Search Bar */}
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-0 py-3 bg-transparent border-b border-gray-200 focus:border-primary transition-colors focus:outline-none font-light"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Sidebar Filters */}
        <div className="md:col-span-1">
          <div className="sticky top-24">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-text-gray mb-6">Categorías</h2>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleCategoryChange(null)}
                className={`text-left py-1 transition-all font-light ${
                  selectedCategory === null
                    ? 'text-primary border-l-2 border-primary pl-4'
                    : 'text-text-dark hover:text-primary pl-0'
                }`}
              >
                Todos los Productos
              </button>
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`text-left py-1 transition-all font-light ${
                    selectedCategory === category
                      ? 'text-primary border-l-2 border-primary pl-4'
                      : 'text-text-dark hover:text-primary pl-0'
                  }`}
                >
                  {CATEGORY_NAMES[category] || category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="md:col-span-3">
          {loading ? (
            <div className="py-24 text-center">
              <p className="text-text-gray font-light animate-pulse">Cargando...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-text-gray font-light">No se encontraron resultados.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-8 mt-20 border-t border-gray-50 pt-10">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className={`font-medium transition-colors ${
                      currentPage === 1
                        ? 'text-gray-200 cursor-not-allowed'
                        : 'text-text-dark hover:text-primary'
                    }`}
                  >
                    Anterior
                  </button>
                  
                  <span className="text-text-gray text-sm font-light">
                    {currentPage} / {totalPages}
                  </span>

                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className={`font-medium transition-colors ${
                      currentPage === totalPages
                        ? 'text-gray-200 cursor-not-allowed'
                        : 'text-text-dark hover:text-primary'
                    }`}
                  >
                    Siguiente
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
