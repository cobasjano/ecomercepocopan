'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Product } from '@/lib/types';
import Link from 'next/link';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleVisibility = async (product: Product) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ is_visible: !product.is_visible })
        .eq('id', product.id);

      if (error) throw error;
      
      setProducts(products.map(p => 
        p.id === product.id ? { ...p, is_visible: !p.is_visible } : p
      ));
    } catch (error) {
      console.error('Error updating visibility:', error);
    }
  };

  const toggleStock = async (product: Product) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ is_out_of_stock: !product.is_out_of_stock })
        .eq('id', product.id);

      if (error) throw error;
      
      setProducts(products.map(p => 
        p.id === product.id ? { ...p, is_out_of_stock: !p.is_out_of_stock } : p
      ));
    } catch (error) {
      console.error('Error updating stock:', error);
    }
  };

  const makeAllVisibleAndInStock = async () => {
    if (!confirm('¿Estás seguro de que quieres poner todos los productos como VISIBLES y CON STOCK?')) return;
    
    try {
      setLoading(true);
      const { error } = await supabase
        .from('products')
        .update({ is_visible: true, is_out_of_stock: false, stock_quantity: 1 })
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Update all

      if (error) throw error;
      await fetchProducts();
      alert('Todos los productos han sido actualizados');
    } catch (error) {
      console.error('Error in bulk update:', error);
      alert('Error en la actualización masiva');
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Panel de Administración</h1>
        <div className="flex gap-4">
          <button
            onClick={makeAllVisibleAndInStock}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-bold hover:bg-gray-200 transition"
          >
            Restablecer Todos
          </button>
          <Link 
            href="/admin/products/new" 
            className="bg-primary text-white px-4 py-2 rounded-lg font-bold hover:bg-orange-600 transition"
          >
            + Nuevo Producto
          </Link>
        </div>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar por nombre o categoría..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300"
        />
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 table-fixed">
          <thead className="bg-gray-50">
            <tr>
              <th className="w-1/3 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
              <th className="w-1/6 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
              <th className="w-1/8 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
              <th className="w-1/12 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Stock</th>
              <th className="w-1/4 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th className="w-20 px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-gray-500">Cargando productos...</td>
              </tr>
            ) : filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-gray-500">No se encontraron productos</td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 text-sm">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                        {product.image_url ? (
                          <img src={product.image_url} alt="" className="h-8 w-8 object-cover" />
                        ) : (
                          <div className="h-8 w-8 flex items-center justify-center text-sm">📦</div>
                        )}
                      </div>
                      <div className="ml-3">
                        <div className="font-medium text-gray-900 truncate max-w-[200px]" title={product.name}>{product.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-gray-500">
                    {product.category}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-gray-900 font-bold">
                    ${product.price.toFixed(0)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-gray-500 text-center">
                    {product.stock_quantity}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex gap-1">
                      <button
                        onClick={() => toggleVisibility(product)}
                        className={`px-2 py-1 rounded-full text-[10px] font-bold transition-colors ${
                          product.is_visible 
                            ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                            : 'bg-red-100 text-red-800 hover:bg-red-200'
                        }`}
                      >
                        {product.is_visible ? 'VISIBLE' : 'OCULTO'}
                      </button>
                      <button
                        onClick={() => toggleStock(product)}
                        className={`px-2 py-1 rounded-full text-[10px] font-bold transition-colors ${
                          !product.is_out_of_stock
                            ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                            : 'bg-orange-100 text-orange-800 hover:bg-orange-200'
                        }`}
                      >
                        {product.is_out_of_stock ? 'SIN STOCK' : 'CON STOCK'}
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-xs font-medium">
                    <Link 
                      href={`/admin/products/${product.id}`}
                      className="text-primary hover:text-orange-600"
                    >
                      Editar
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
