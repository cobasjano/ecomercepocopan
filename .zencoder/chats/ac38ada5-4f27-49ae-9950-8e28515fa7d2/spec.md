# Technical Specification: E-Commerce Platform for Educational Toys

---

## Technical Context

**Frontend**: Next.js 14+ (App Router), React 18+, TypeScript, Tailwind CSS  
**Backend**: Next.js API routes (Node.js runtime) with session middleware  
**Database**: Supabase (PostgreSQL)  
**Session Management**: Secure HTTP-only cookies with crypto-random session IDs  
**No User Auth**: Customers shop anonymously; admin uses password
**Notifications**: Twilio WhatsApp API  
**Image Storage**: External URLs (provided by admin)  
**Hosting**: Vercel  
**State Management**: Server-side session store + React Context for cart UI state  

**Key Dependencies to Install**:
- `@supabase/supabase-js` (database)
- `twilio` (WhatsApp notifications)
- `iron-session` (secure session management)
- `zod` (request validation)
- `date-fns` (date formatting)

---

## Technical Implementation Brief

### Key Architectural Decisions

1. **No User Authentication**: Customers shop anonymously. Each visitor gets a unique session ID stored in secure HTTP-only cookies. No login required.

2. **Server-Side Session Management**: Cart data stored in database (not localStorage) per session ID to prevent data loss and enable concurrent user support without interference.

3. **Session Isolation**: Each session ID has its own cart. Two users editing carts simultaneously cannot see or interfere with each other's data. Uses optimistic locking to prevent race conditions.

4. **Supabase as Backend**: PostgreSQL database with proper indexes for session lookups. No authentication module needed; only admin password protection.

5. **Twilio for WhatsApp Notifications**: When customer clicks "Iniciar Compra", Twilio sends WhatsApp message to owner with: product names, quantities, subtotal, total. No payment processing needed.

6. **Admin Dashboard**: Simple password-protected page (hardcoded or environment variable). Admins can add/edit/delete products and toggle visibility/stock status.

7. **Product Fields**: Name, Category, SubCategory, Description, Precio Venta, Image URL (external), is_visible, is_out_of_stock.

8. **Cart Persistence**: Session cart survives page refreshes and 30-day inactivity. Uses secure, signed cookies to prevent tampering.

---

## Source Code Structure

```
project-root/
├── app/
│   ├── layout.tsx                    # Root layout (navbar, footer)
│   ├── page.tsx                      # Homepage with product showcase
│   ├── products/
│   │   ├── page.tsx                  # Product listing (visible products only)
│   │   └── [id]/
│   │       └── page.tsx              # Product detail page
│   ├── cart/
│   │   └── page.tsx                  # Shopping cart review (session-based)
│   ├── checkout/
│   │   ├── page.tsx                  # Checkout form (name, email, address)
│   │   └── success/page.tsx          # Order confirmation after WhatsApp sent
│   ├── admin/
│   │   ├── layout.tsx                # Admin password guard layout
│   │   ├── login/page.tsx            # Admin password login
│   │   ├── dashboard/page.tsx        # Admin home (product management UI)
│   │   ├── products/
│   │   │   ├── page.tsx              # Product list with visibility/stock toggles
│   │   │   ├── new/page.tsx          # Add product form
│   │   │   └── [id]/edit/page.tsx    # Edit product form
│   │   └── logout/route.ts           # Admin logout
│   └── api/
│       ├── session/
│       │   ├── route.ts              # GET session ID, POST create session
│       │   └── validate/route.ts     # POST validate session (internal)
│       ├── products/
│       │   ├── route.ts              # GET (visible products only), POST (admin)
│       │   └── [id]/route.ts         # GET, PATCH (admin), DELETE (admin)
│       ├── cart/
│       │   ├── route.ts              # GET, POST, DELETE (per session)
│       │   └── [productId]/route.ts  # PUT (update quantity per session)
│       ├── checkout/
│       │   └── route.ts              # POST (validate & send WhatsApp)
│       ├── notifications/
│       │   └── whatsapp/route.ts     # POST (send WhatsApp, Twilio)
│       └── admin/
│           ├── login/route.ts        # POST (verify password)
│           ├── products/route.ts     # POST (create), PATCH, DELETE
│           └── logout/route.ts       # POST (clear admin session)
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ProductCard.tsx
│   ├── ProductFilter.tsx
│   ├── Cart.tsx
│   ├── CheckoutForm.tsx
│   └── admin/
│       ├── AdminGuard.tsx            # Password-protected wrapper
│       ├── ProductForm.tsx           # Add/edit product form
│       └── ProductTable.tsx          # Product list with actions
├── lib/
│   ├── supabase.ts                   # Supabase client
│   ├── session.ts                    # Session management (iron-session)
│   ├── twilio.ts                     # Twilio WhatsApp wrapper
│   ├── validations.ts                # Zod schemas
│   ├── types.ts                      # TypeScript interfaces
│   ├── middleware/
│   │   ├── sessionMiddleware.ts      # Attach session ID to requests
│   │   └── adminAuth.ts              # Admin password verification
│   └── utils/
│       ├── cart.ts                   # Cart calculation helpers
│       └── admin.ts                  # Admin password verification
├── hooks/
│   ├── useSession.ts                 # Session context hook (get session ID)
│   ├── useCart.ts                    # Cart state hook (per session)
│   └── useProducts.ts                # Product fetching hook
├── styles/
│   └── globals.css                   # Tailwind setup
├── .env.local                         # Local env vars
├── .env.example                       # Template for env vars
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.mjs
└── supabase/
    ├── migrations/
    │   └── 00_initial_schema.sql     # Database schema
    └── seed.sql                       # Sample data
```

---

## Contracts

### Database Schema (PostgreSQL)

#### Sessions (Anonymous Cart Storage)
```sql
CREATE TABLE public.sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_token TEXT UNIQUE NOT NULL,  -- Secure token stored in httpOnly cookie
  ip_address TEXT,
  user_agent TEXT,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_sessions_token ON public.sessions(session_token);
CREATE INDEX idx_sessions_expires_at ON public.sessions(expires_at);
```

#### Products (Updated Schema)
```sql
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  sub_category TEXT NOT NULL,  -- NEW: subcategory
  description TEXT,
  precio_venta DECIMAL(10, 2) NOT NULL,
  image_url TEXT,  -- External URL provided by admin
  is_visible BOOLEAN DEFAULT TRUE,  -- Toggle show/hide
  is_out_of_stock BOOLEAN DEFAULT FALSE,  -- Toggle stock status
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_products_category ON public.products(category);
CREATE INDEX idx_products_subcategory ON public.products(sub_category);
CREATE INDEX idx_products_visible ON public.products(is_visible);
CREATE INDEX idx_products_updated_at ON public.products(updated_at DESC);
```

#### Cart Items (Session-Based, No Users)
```sql
CREATE TABLE public.cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES public.sessions(id) ON DELETE CASCADE,  -- NEW: session instead of user
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(session_id, product_id)
);

CREATE INDEX idx_cart_items_session_id ON public.cart_items(session_id);
```

#### Orders (Session-Based)
```sql
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES public.sessions(id),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  customer_address TEXT,
  subtotal DECIMAL(10, 2) NOT NULL,
  tax DECIMAL(10, 2) DEFAULT 0,
  total_amount DECIMAL(10, 2) NOT NULL,
  whatsapp_sent BOOLEAN DEFAULT FALSE,
  whatsapp_message_sid TEXT,
  whatsapp_error TEXT,
  notes TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_orders_session_id ON public.orders(session_id);
CREATE INDEX idx_orders_created_at ON public.orders(created_at DESC);
CREATE INDEX idx_orders_whatsapp_sent ON public.orders(whatsapp_sent);
```

#### Order Items
```sql
CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_order_items_order_id ON order_items(order_id);
```

#### Addresses
```sql
CREATE TABLE public.addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT DEFAULT 'shipping',  -- 'shipping' or 'billing'
  street_address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  country TEXT DEFAULT 'Argentina',
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_addresses_user_id ON addresses(user_id);
```

---

### API Contracts

#### Products API

**GET /api/products**
```json
Response: {
  "products": [
    {
      "id": "uuid",
      "name": "Educational Toy Name",
      "price": 29.99,
      "category": "puzzles",
      "image_url": "https://...",
      "in_stock": true
    }
  ]
}
Query params: ?category=puzzles&min_price=10&max_price=50&search=puzzle
```

**GET /api/products/[id]**
```json
Response: {
  "id": "uuid",
  "name": "Toy Name",
  "description": "...",
  "price": 29.99,
  "stock_quantity": 15,
  "category": "puzzles",
  "age_group": "3-5",
  "image_url": "https://...",
  "created_at": "2025-01-01T00:00:00Z"
}
```

**POST /api/products** (Admin only)
```json
Request: {
  "name": "New Toy",
  "price": 29.99,
  "stock_quantity": 20,
  "category": "puzzles",
  "age_group": "3-5",
  "description": "...",
  "image_url": "https://..."
}
Response: { "id": "uuid", "created": true }
```

#### Cart API

**GET /api/cart**
```json
Response: {
  "items": [
    { "product_id": "uuid", "quantity": 2, "product": {...} }
  ],
  "total": 59.98
}
```

**POST /api/cart/validate**
```json
Request: {
  "items": [{ "product_id": "uuid", "quantity": 2 }]
}
Response: {
  "valid": true,
  "items": [...],
  "total": 59.98
}
```

#### Checkout API

**POST /api/checkout**
```json
Request: {
  "items": [{ "product_id": "uuid", "quantity": 2 }],
  "shipping_method": "mercadolibre",
  "shipping_address": {
    "street": "...",
    "city": "...",
    "state": "...",
    "postal_code": "..."
  },
  "payment_method": "stripe"
}
Response: {
  "order_id": "uuid",
  "status": "pending",
  "total": 89.97
}
```

#### Stripe Payment API

**POST /api/payments/stripe**
```json
Request: {
  "order_id": "uuid",
  "email": "customer@example.com"
}
Response: {
  "client_secret": "pi_...",
  "publishable_key": "pk_..."
}
```

**POST /api/payments/stripe/webhook**
```json
Receives Stripe Event:
{
  "type": "payment_intent.succeeded",
  "data": {
    "object": {
      "id": "pi_...",
      "metadata": { "order_id": "uuid" }
    }
  }
}
Action: Update order status to 'confirmed', decrement stock
```

#### Orders API

**GET /api/orders** (User only - returns own orders)
```json
Response: {
  "orders": [
    {
      "id": "uuid",
      "status": "confirmed",
      "total_amount": 89.97,
      "shipping_method": "mercadolibre",
      "created_at": "2025-01-01T00:00:00Z",
      "items": [...]
    }
  ]
}
```

**GET /api/orders/[id]**
```json
Response: {
  "id": "uuid",
  "status": "shipped",
  "total_amount": 89.97,
  "items": [...],
  "shipping_tracking_number": "ML...",
  "created_at": "2025-01-01T00:00:00Z"
}
```

#### Shipping API

**POST /api/shipping/mercadolibre/calculate**
```json
Request: {
  "zip_code": "28001",
  "weight_kg": 1.5
}
Response: {
  "cost": 150.00,
  "delivery_days": 3,
  "carrier": "OCA"
}
```

#### Admin Orders API

**PATCH /api/admin/orders/[id]**
```json
Request: {
  "status": "shipped",
  "shipping_tracking_number": "ML..."
}
Response: {
  "id": "uuid",
  "status": "shipped",
  "updated_at": "2025-01-01T00:00:00Z"
}
Auth: Admin only (checked via RLS policy)
```

---

## Delivery Phases

### Phase 1: Product Catalog & Basic UI (MVP Core)
**Duration**: 2-3 days  
**Deliverable**: Browse products, view details, responsive design

**Tasks**:
1. Setup Next.js project with Tailwind, Supabase, TypeScript
2. Create Supabase database schema (products table)
3. Seed sample product data
4. Build homepage with product showcase
5. Build product listing page with category filter
6. Build product detail page
7. Build responsive navbar & footer
8. Deploy to Vercel (empty cart/auth for now)

**Verification**:
- All product pages load without errors
- Product data displays correctly
- Responsive on mobile/tablet/desktop
- Supabase connection works
- Deployed to Vercel successfully

---

### Phase 2: Shopping Cart & User Accounts
**Duration**: 2-3 days  
**Deliverable**: Add to cart, user signup/login, order history

**Tasks**:
1. Build cart state management (Context API + localStorage)
2. Implement add/remove/update cart UI
3. Setup Supabase Auth (email/password)
4. Build signup/login pages
5. Create user profile/account dashboard
6. Build order history view (fetch from database)
7. Add cart persistence on login/logout

**Verification**:
- Add/remove from cart works
- Cart persists on page reload
- Signup/login flows work
- Auth redirects protect admin pages
- Order history displays correctly

---

### Phase 3: Checkout & Payment (Stripe)
**Duration**: 3-4 days  
**Deliverable**: Complete checkout flow, Stripe payment integration

**Tasks**:
1. Build multi-step checkout form (shipping address, method selection)
2. Implement Stripe integration (client + server)
3. Build shipping cost calculator (Mercado Libre API integration)
4. Create order confirmation page
5. Setup Stripe webhook for payment success
6. Send order confirmation emails
7. Update cart to clear after successful order
8. Implement local payment method UI (for pickup orders)

**Verification**:
- Checkout form validates correctly
- Stripe payment succeeds in test mode
- Order is created in database on payment
- Shipping costs calculated correctly
- Order confirmation email sent
- Stock quantity decremented after purchase

---

### Phase 4: Admin Dashboard & Fulfillment
**Duration**: 2-3 days  
**Deliverable**: Admin can manage products, view & process orders

**Tasks**:
1. Build admin layout with role-based access (RLS policies)
2. Create product management page (add/edit/delete)
3. Create order management page with status updates
4. Implement Mercado Libre shipment creation API
5. Build order detail page with fulfillment options
6. Add "Mark as Ready" for pickup orders
7. Generate shipping labels for ML orders

**Verification**:
- Admin can CRUD products
- Only admins can access admin routes
- Order status updates save correctly
- Mercado Libre labels generate
- Stock levels update on product edits

---

### Phase 5: Polish, Testing & Optimization
**Duration**: 1-2 days  
**Deliverable**: Bug fixes, E2E tests, performance optimization

**Tasks**:
1. Write E2E tests (Playwright) for critical flows
2. Fix any bugs found in testing
3. Optimize images (Next.js Image component)
4. Add error boundaries and error pages
5. Implement loading states
6. Add toast notifications for user feedback
7. Security audit (validate all inputs, check RLS policies)
8. Performance monitoring (Web Vitals)

**Verification**:
- All E2E tests pass
- No console errors
- Lighthouse score > 80
- Mobile performance acceptable
- All edge cases handled

---

## Verification Strategy

### Phase 1 Verification

**Automated**:
1. Run `npm run build` — succeeds with no build errors
2. Run `npm run lint` — no TypeScript or linting errors
3. Manual browser inspection — all pages render correctly

**Manual**:
1. Visit `http://localhost:3000` → homepage loads with products
2. Click a product → detail page loads with correct info
3. Resize browser → layout is responsive (mobile, tablet, desktop)
4. Verify Supabase connection in Network tab (XHR requests to Supabase)

---

### Phase 2 Verification

**Automated**:
1. Run `npm run test` (if Jest/Vitest available) or create minimal test script
2. Lint & build checks

**Manual**:
1. Signup with new email → account created in Supabase
2. Login → redirected to account page
3. Click "Add to Cart" → item appears in cart
4. Refresh page → cart persists
5. Logout → redirected to home

**Helper Script**: Create `/scripts/verify-auth.sh` to:
- Check Supabase tables exist
- Verify auth policies are set
- Confirm users table has RLS enabled

---

### Phase 3 Verification

**Automated**:
1. `npm run build` succeeds
2. Lint checks pass

**Manual**:
1. Add item to cart → proceed to checkout
2. Fill shipping address → form validates
3. Select shipping method → cost updates
4. Submit payment (Stripe test card `4242 4242 4242 4242`) → payment succeeds
5. Order created in database (check Supabase dashboard)
6. Confirmation page displays
7. Check email for order confirmation

**Helper Script**: Create `/scripts/verify-stripe.sh` to:
- Check Stripe API keys in env
- Verify webhook endpoint registered
- Test sample payment flow

---

### Phase 4 Verification

**Automated**:
1. Build & lint pass

**Manual**:
1. Login as admin → can access `/admin/dashboard`
2. Navigate to products → can add/edit/delete
3. Navigate to orders → view all orders
4. Update order status → changes in database
5. Mercado Libre label generates for shipped orders

**Helper Script**: Create `/scripts/verify-admin.sh` to:
- Check admin user exists
- Verify RLS policies enforce admin-only access
- Confirm Mercado Libre API keys present

---

### Phase 5 Verification

**Automated**:
1. Run E2E tests: `npx playwright test`
2. Build & lint checks
3. Lighthouse audit (manual or via CI)

**Manual & Automated E2E**:
- Test critical user flows end-to-end with Playwright
- Verify no JavaScript errors in console
- Check mobile responsiveness
- Load performance acceptable

**MCP Servers** (optional for Phase 2+):
- `@modelcontextprotocol/server-npm` — check dependencies, run scripts
- Custom shell-based validation scripts for database/API checks

---

## Environment Variables

Create `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

MERCADOLIBRE_ACCESS_TOKEN=your-ml-token
MERCADOLIBRE_SELLER_ID=your-seller-id
MERCADOLIBRE_API_VERSION=v1

RESEND_API_KEY=your-resend-key  # For emails (optional Phase 2)
```

---

## Key Milestones & Success Criteria

| Phase | Deliverable | Success Criteria |
|-------|-------------|-----------------|
| 1 | Product Catalog | All products display, responsive, no errors, deployed to Vercel |
| 2 | Cart & Auth | Login/signup works, cart persists, order history visible |
| 3 | Checkout & Payment | Stripe payment succeeds, orders created, email sent, stock updated |
| 4 | Admin Dashboard | Can manage products & orders, Mercado Libre integration working |
| 5 | Testing & Polish | E2E tests pass, no console errors, performance acceptable |

