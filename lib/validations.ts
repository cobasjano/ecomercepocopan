import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string(),
  price: z.number().positive("Price must be positive"),
  stock_quantity: z.number().nonnegative("Stock cannot be negative"),
  category: z.string().min(1, "Category is required"),
  age_group: z.string().optional(),
  image_url: z.string().url("Invalid image URL").optional(),
});

export const checkoutSchema = z.object({
  items: z.array(
    z.object({
      product_id: z.string().uuid(),
      quantity: z.number().positive(),
    })
  ),
  email: z.string().email(),
  shipping_method: z.enum(["mercadolibre", "pickup"]),
  shipping_address: z.object({
    street: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1),
    postal_code: z.string().min(1),
  }),
  payment_method: z.enum(["stripe", "bank_transfer", "cash"]),
});

export const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  full_name: z.string().min(1, "Full name is required"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type ProductInput = z.infer<typeof productSchema>;
export type CheckoutInput = z.infer<typeof checkoutSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
