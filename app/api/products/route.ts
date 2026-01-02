import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const minPrice = searchParams.get('min_price');
    const maxPrice = searchParams.get('max_price');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '20');

    let query = supabase.from('products').select('*', { count: 'exact' });

    if (category) {
      query = query.eq('category', category);
    }

    if (minPrice) {
      query = query.gte('price', parseFloat(minPrice));
    }

    if (maxPrice) {
      query = query.lte('price', parseFloat(maxPrice));
    }

    if (search) {
      query = query.ilike('name', `%${search}%`);
    }

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, error, count } = await query
      .order('name', { ascending: true })
      .range(from, to);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ 
      products: data || [],
      totalCount: count || 0,
      page,
      totalPages: Math.ceil((count || 0) / pageSize)
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { data, error } = await supabase
      .from('products')
      .insert([body])
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ id: data?.[0]?.id, created: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
