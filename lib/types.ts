export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  category: string;
  age_group?: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  product_id: string;
  quantity: number;
  product?: Product;
}

export interface Order {
  id: string;
  user_id?: string;
  email: string;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  total_amount: number;
  shipping_method: "mercadolibre" | "pickup";
  shipping_cost: number;
  shipping_address?: string;
  shipping_tracking_number?: string;
  pickup_location?: string;
  payment_method: "stripe" | "bank_transfer" | "cash";
  stripe_payment_intent_id?: string;
  mercadolibre_shipment_id?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  full_name?: string;
  phone?: string;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}

export interface Address {
  id: string;
  user_id: string;
  type: "shipping" | "billing";
  street_address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default: boolean;
  created_at: string;
}
