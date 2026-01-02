# Updated Implementation Plan - Session-Based E-Commerce

**Date**: December 24, 2025
**Status**: Phase 1 Revised with New Requirements
**Focus**: Anonymous shopping, session-based carts, WhatsApp notifications, enhanced admin panel

---

## New Architecture Overview

**Old**: User accounts required, Stripe payments, Mercado Libre shipping  
**New**: No user accounts, anonymous sessions, WhatsApp notifications to owner, simple admin panel

---

## Phase 1 (Revised): Core Features

### Step 1.1: Database Schema Migration
**Objective**: Update Supabase schema for session-based carts (not user-based)

**Key Changes**:
1. ✅ Rename `auth.users` references to `sessions` table
2. ✅ Add `sub_category` to products table
3. ✅ Change product price field to `precio_venta`
4. ✅ Add `is_visible` and `is_out_of_stock` boolean toggles to products
5. ✅ Change cart_items to reference `session_id` instead of `user_id`
6. ✅ Simplify orders table (no shipping, no payment processing)
7. ✅ Add WhatsApp fields to orders (whatsapp_sent, whatsapp_message_sid, whatsapp_error)

**SQL Migration File**: `supabase/migrations/01_session_based_schema.sql`
**Seed File**: Update with sub_categories

**Verification**:
- Run migrations in Supabase SQL editor
- Verify tables created successfully
- Check indexes are optimized for session lookups

---

### Step 1.2: Session Management Library
**Objective**: Implement secure session management (not authentication)

**Create**: `lib/session.ts`
**Features**:
1. Generate unique session ID (crypto-random UUID)
2. Store session in httpOnly, secure cookie
3. Load session from cookie on each request
4. Validate session token from database
5. Handle session expiration (30 days)

**Install Dependency**: `iron-session` (secure session middleware)

**API Route**: `app/api/session/route.ts`
- GET: Return current session ID
- POST: Create new session (no auth needed)

**Verification**:
- Test session persistence across page refreshes
- Verify session cookie is httpOnly and secure
- Test multiple simultaneous sessions (2-3 browsers)

---

### Step 1.3: Update Products Table & API
**Objective**: Add sub_category, visibility, and stock fields to products

**Database Changes**:
- Add `sub_category` TEXT field
- Add `is_visible` BOOLEAN (default TRUE)
- Add `is_out_of_stock` BOOLEAN (default FALSE)
- Update seed data with sub_categories

**API Changes**:
1. `app/api/products/route.ts` - Filter by `is_visible = TRUE`
2. `app/api/products/[id]/route.ts` - Check `is_visible` before returning

**Frontend Changes**:
- Update `ProductCard.tsx` to show "Sin Stock" if `is_out_of_stock = TRUE`
- Disable "Agregar al Carrito" button if out of stock

**Verification**:
- GET /api/products returns only visible products
- Hidden products don't appear in catalog
- Out of stock products show disabled button

---

### Step 1.4: Session-Based Shopping Cart
**Objective**: Replace localStorage cart with server-side session cart

**Remove**: localStorage cart logic  
**Add**: Server-side cart storage per session

**Create**:
1. `lib/cart.ts` - Cart calculation utilities (subtotal, tax, total)
2. `app/api/cart/route.ts` - GET/POST/DELETE cart for session
3. `app/api/cart/[productId]/route.ts` - PUT to update quantity

**API Contracts**:

```
GET /api/cart
Response: { items: [{product_id, quantity, product}, ...], subtotal, tax, total }

POST /api/cart
Body: { product_id: UUID, quantity: number }
Response: { success: true, items: [...] }

PUT /api/cart/[productId]
Body: { quantity: number }
Response: { items: [...], total: number }

DELETE /api/cart
Response: { success: true }
```

**Frontend Changes**:
- `components/Cart.tsx` - Fetch cart from `/api/cart`
- `components/ProductCard.tsx` - POST to `/api/cart` on add
- Real-time updates, no page refresh

**Verification**:
- Add item to cart → appears in cart page
- Update quantity → total recalculates
- Refresh page → cart items persist
- Two simultaneous carts → no interference

---

### Step 1.5: Checkout (Simple, No Payment)
**Objective**: Collect customer info and send WhatsApp notification

**Create**: `app/checkout/page.tsx`
**Form Fields**:
- Full Name
- Email
- Phone (for WhatsApp contact)
- Address (optional delivery note)

**On Submit**:
1. Validate form
2. Create order in database (from session cart)
3. Call `/api/notifications/whatsapp` to send message
4. Show success page with order details

**API**: `app/api/checkout/route.ts`
```
POST /api/checkout
Body: {
  customer_name: string,
  customer_email: string,
  customer_phone: string,
  customer_address: string
}
Response: {
  order_id: UUID,
  whatsapp_sent: boolean,
  message: string
}
```

**Verification**:
- Form validates required fields
- Order created in database
- Cart items moved to order_items table
- Cart cleared after order

---

### Step 1.6: Twilio WhatsApp Integration
**Objective**: Send order notification to owner via WhatsApp

**Create**: `lib/twilio.ts`
**Setup**:
1. Sign up for Twilio Account (free trial)
2. Get Twilio WhatsApp Sandbox number
3. Add `.env.local` variables:
   - `TWILIO_ACCOUNT_SID`
   - `TWILIO_AUTH_TOKEN`
   - `TWILIO_PHONE_FROM` (Twilio number)
   - `OWNER_WHATSAPP_NUMBER` (your WhatsApp number)

**Create**: `app/api/notifications/whatsapp/route.ts`
**Message Format**:
```
Nuevo Pedido #ORDER_ID

Productos:
- Product Name x 2 = $XX.XX
- Product Name x 1 = $XX.XX

Subtotal: $XXX.XX
Impuesto (10%): $XX.XX
Total: $XXX.XX

Cliente: John Doe
Email: john@example.com
Teléfono: +54 9 XXX XXXX
Dirección: Calle 123, Apt 4B
```

**Install Dependency**: `twilio`

**Verification**:
- Submit checkout form
- Check WhatsApp for message (may take 5-10 seconds)
- Message contains all order details
- Failed sends show error (retry logic)

---

### Step 1.7: Admin Dashboard (Password Protected)
**Objective**: Allow admin to manage products without complex auth

**Create**:
1. `app/admin/login/page.tsx` - Simple password form
2. `app/admin/dashboard/page.tsx` - Admin home
3. `app/admin/products/page.tsx` - Product list with toggles
4. `app/admin/products/new/page.tsx` - Add product form
5. `app/admin/products/[id]/edit/page.tsx` - Edit product form

**Setup**:
- `ADMIN_PASSWORD` in `.env.local`
- Session-based admin access (not httpOnly cookie)
- Login stores admin flag in session

**API**:
- `app/api/admin/login/route.ts` - POST password, return session
- `app/api/admin/logout/route.ts` - Clear admin session
- `app/api/admin/products/route.ts` - POST new (admin only)
- `app/api/products/[id]/route.ts` - PATCH, DELETE (admin only)

**Admin Product Form**:
- Name
- Category (dropdown)
- SubCategory (dropdown)
- Description (textarea)
- Precio Venta (number)
- Image URL (text input)
- Mostrar/Ocultar toggle (is_visible)
- Sin Stock toggle (is_out_of_stock)

**Admin Product List**:
- Table showing all products
- Edit button (→ edit page)
- Delete button (→ delete confirmation)
- Toggle "Mostrar/Ocultar" inline
- Toggle "Sin Stock" inline

**Verification**:
- Access `/admin/login` without password
- Login with wrong password → error
- Login with correct password → redirect to dashboard
- Add product → appears in store (if visible)
- Hide product → doesn't appear in shop
- Mark out of stock → add to cart disabled

---

### Step 1.8: Responsive UI & Final Polish
**Objective**: Ensure mobile-first, responsive design

**Tasks**:
1. Test all pages on mobile (375px), tablet (768px), desktop (1440px)
2. Fix any layout issues
3. Optimize images (use next/image where possible)
4. Add loading states
5. Add error messages with user-friendly text

**Verification**:
- Homepage responsive
- Products page responsive
- Cart page responsive
- Checkout responsive
- Admin dashboard responsive
- No horizontal scrolling on mobile

---

## Environment Variables (Updated)

```env
# Supabase (existing)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxxxx
SUPABASE_SERVICE_ROLE_KEY=xxxxxxx

# Twilio (NEW)
TWILIO_ACCOUNT_SID=your-account-sid
TWILIO_AUTH_TOKEN=your-auth-token
TWILIO_PHONE_FROM=whatsapp:+1234567890  # Twilio sandbox number
OWNER_WHATSAPP_NUMBER=whatsapp:+54912345678  # Your number

# Admin (NEW)
ADMIN_PASSWORD=strong-password-here

# Session (NEW)
SESSION_SECRET=random-32-char-string-for-iron-session
```

---

## Dependencies to Install

```bash
npm install twilio iron-session
```

---

## Testing Strategy

### Unit Tests
- Session creation and validation
- Cart calculations (subtotal, tax, total)
- Cart operations (add, remove, update)
- Admin password verification

### Integration Tests
- Complete checkout flow (no Twilio message)
- Session persistence across requests
- Concurrent user carts (simulate 2+ users)

### Manual QA
- Browse products as anonymous user
- Add/remove from cart
- Complete checkout
- Check WhatsApp for message
- Login as admin
- Add, edit, delete product
- Toggle visibility and stock
- Test on mobile

---

## Success Criteria (Updated)

✅ No user authentication required  
✅ Session-based cart works reliably  
✅ 100+ concurrent users can shop simultaneously  
✅ WhatsApp message received on checkout  
✅ Admin can manage products  
✅ Product visibility toggle works  
✅ Stock toggle works  
✅ Mobile responsive  
✅ No data loss or cross-session contamination  
✅ Build passes TypeScript and ESLint  

---

## Timeline

- **Setup & Database**: 30 minutes
- **Session Management**: 1 hour
- **Cart API**: 1 hour
- **Checkout & WhatsApp**: 1.5 hours
- **Admin Dashboard**: 1.5 hours
- **Testing & Polish**: 1 hour

**Total Estimated**: 6-7 hours for production-ready version

---

## Deployment

Same as before:
1. Push to GitHub
2. Connect to Vercel
3. Add environment variables
4. Auto-deploy

---

## Next Steps After Phase 1

- Order management dashboard for admin
- Email notifications (order confirmation to customer)
- Advanced analytics
- Product reviews
- Search optimization

---

**This plan keeps the app simple, production-ready, and focused on your core business needs.**
