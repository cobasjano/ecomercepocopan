'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function EditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
    stock_quantity: 0,
    category: '',
    age_group: '',
    image_url: ''
  });

  const isNew = params.id === 'new';

  useEffect(() => {
    if (!isNew) {
      fetchProduct();
    } else {
      setLoading(false);
    }
  }, [params.id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', params.id)
        .single();

      if (error) throw error;
      if (data) setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      if (isNew) {
        const { error } = await supabase
          .from('products')
          .insert([product]);
        if (error) throw error;
        alert('Producto creado con éxito');
      } else {
        const { error } = await supabase
          .from('products')
          .update(product)
          .eq('id', params.id);
        if (error) throw error;
        alert('Producto actualizado con éxito');
      }
      router.push('/admin/products');
      router.refresh();
    } catch (error: any) {
      console.error('Error saving product:', error);
      alert('Error al guardar: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock_quantity' ? parseFloat(value) || 0 : value
    }));
  };

  if (loading) return <div className="max-w-7xl mx-auto px-4 py-12">Cargando...</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{isNew ? 'Nuevo Producto' : 'Editar Producto'}</h1>
        <Link href="/admin/products" className="text-gray-500 hover:text-gray-700">
          Volver
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 border border-gray-100">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Nombre</label>
            <input
              type="text"
              name="name"
              required
              value={product.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Descripción</label>
            <textarea
              name="description"
              rows={4}
              value={product.description}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Precio ($)</label>
              <input
                type="number"
                name="price"
                step="0.01"
                required
                value={product.price}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Stock</label>
              <input
                type="number"
                name="stock_quantity"
                required
                value={product.stock_quantity}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Categoría</label>
              <input
                type="text"
                name="category"
                required
                value={product.category}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder="Ej: Libros"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Rango de Edad</label>
              <input
                type="text"
                name="age_group"
                value={product.age_group || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder="Ej: 3-5 años"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">URL de Imagen</label>
            <input
              type="text"
              name="image_url"
              value={product.image_url || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              placeholder="https://..."
            />
            {product.image_url && (
              <div className="mt-4 h-48 w-48 bg-gray-100 rounded overflow-hidden">
                <img src={product.image_url} alt="Vista previa" className="h-full w-full object-cover" />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={saving}
            className={`w-full py-3 rounded-lg font-bold text-white transition ${
              saving ? 'bg-gray-400' : 'bg-primary hover:bg-orange-600'
            }`}
          >
            {saving ? 'Guardando...' : 'Guardar Producto'}
          </button>
        </div>
      </form>
    </div>
  );
}
