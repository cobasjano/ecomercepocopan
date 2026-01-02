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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h1 className="text-4xl font-bold text-text-dark">Productos</h1>
        
        {/* Search Bar */}
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 sticky top-24">
            <h2 className="text-xl font-bold mb-4 text-text-dark">Categorías</h2>
            <div className="max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              <button
                onClick={() => handleCategoryChange(null)}
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
                  onClick={() => handleCategoryChange(category)}
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
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-8">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg border font-bold transition ${
                      currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'border-primary text-primary hover:bg-primary hover:text-white'
                    }`}
                  >
                    Anterior
                  </button>
                  
                  <span className="text-text-dark font-medium">
                    Página {currentPage} de {totalPages}
                  </span>

                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg border font-bold transition ${
                      currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'border-primary text-primary hover:bg-primary hover:text-white'
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
