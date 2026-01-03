# Pocopán Jugueteria® E-Commerce Setup Instructions

## Phase 1 Complete ✅

The e-commerce application is built and ready for configuration. Follow these steps to get it running.

---

## Step 1: Configure Supabase

### 1.1 Create a Supabase Project
1. Go to https://supabase.com and sign up/login
2. Create a new project (Free tier is sufficient for testing)
3. Wait for the project to be initialized
4. Go to Project Settings → API → Copy your credentials:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

### 1.2 Create Environment File
Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Add these when ready for payments (Phase 3)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Add these when ready for shipping (Phase 3)
MERCADOLIBRE_ACCESS_TOKEN=your-ml-token
MERCADOLIBRE_SELLER_ID=your-seller-id
```

### 1.3 Run Database Migrations
1. Go to Supabase Dashboard → SQL Editor
2. Create a new query
3. Copy-paste the entire content from `supabase/migrations/00_initial_schema.sql`
4. Execute the query

### 1.4 Seed Sample Data
1. Create another new query in SQL Editor
2. Copy-paste the content from `supabase/seed.sql`
3. Execute the query

---

## Step 2: Run Locally

```bash
# Install dependencies (already done)
npm install

# Start development server
npm run dev
```

Visit http://localhost:3000 to see the app.

### Test Features:
- ✅ Browse products at `/products`
- ✅ View product details
- ✅ Add items to cart
- ✅ View cart at `/cart`
- ✅ Signup at `/auth/signup`
- ✅ Login at `/auth/login`
- ✅ View account at `/account` (after login)

---

## Step 3: Deploy to Vercel (Production Ready)

### 3.1 Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit: E-commerce platform Phase 1"
git remote add origin https://github.com/YOUR_USERNAME/your-repo-name.git
git push -u origin main
```

### 3.2 Connect to Vercel
1. Go to https://vercel.com
2. Click "Import Project"
3. Connect your GitHub account
4. Select your repository
5. In "Environment Variables" section, add all variables from `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
6. Click Deploy

Your app will be live at a Vercel URL within 2-3 minutes.

---

## Phase 2: Shopping Cart & User Accounts

**Next Steps** (In Progress):
- [ ] Implement Stripe payment integration
- [ ] Add checkout flow
- [ ] Integrate Mercado Libre shipping
- [ ] Admin dashboard for product & order management
- [ ] Email notifications
- [ ] Full E2E testing

---

## Available Commands

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm start         # Start production server
npm run lint      # Run linting
npm run type-check # Check TypeScript types
```

---

## Project Structure

```
c:\Users\54225\Desktop\EcommercePocopan\
├── app/                    # Next.js app directory (pages & API routes)
├── components/             # React components
├── lib/                    # Utilities (Supabase, validations, types)
├── styles/                 # Global CSS
├── public/                 # Static assets
├── supabase/               # Database migrations & seeds
├── .env.example            # Environment variables template
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript config
├── tailwind.config.ts      # Tailwind CSS config
└── next.config.mjs         # Next.js config
```

---

## Database Schema Overview

### Tables:
- **products** - All products with pricing and stock
- **orders** - Customer orders
- **order_items** - Items in each order
- **cart_items** - User shopping carts
- **profiles** - Extended user info
- **addresses** - Shipping/billing addresses

All tables have proper indexes for performance and RLS policies for security.

---

## Important Notes

1. **Authentication**: Uses Supabase Auth (email/password)
2. **Database**: PostgreSQL via Supabase
3. **Styling**: Tailwind CSS (no custom CSS files needed)
4. **Images**: Currently using placeholder URLs (configure in next.config.mjs)
5. **Cart**: Stored in localStorage for now (synced with user account in Phase 2)

---

## Next Phase Requirements

To complete Phase 2 (Checkout & Payments):
- Stripe account (free for testing)
- Mercado Libre seller account
- Email service (Resend or SendGrid)

---

## Support

For issues or questions, refer to:
- `/requirements.md` - Feature requirements
- `/spec.md` - Technical specification
- `/plan.md` - Implementation roadmap

---

**Status**: Phase 1 ✅ Complete | Build: ✅ Success | Ready for Deployment: ✅ YES

Generated: 2025-01-24
