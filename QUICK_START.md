# Quick Start Guide - Pocopán Jugueteria® E-Commerce

## 🚀 Get Running in 5 Minutes

### Prerequisites
- Node.js 18+
- A Supabase account (free at supabase.com)

---

## Step 1: Configure Supabase (2 minutes)

**a) Get Your Credentials:**
1. Create account at https://supabase.com
2. Create a new project (select "Free" plan)
3. Go to Settings → API
4. Copy these three values:
   - Project URL
   - anon key
   - service_role key

**b) Create `.env.local`:**

Copy this template and replace with your actual values:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxxxxxxxxxxxxx
SUPABASE_SERVICE_ROLE_KEY=xxxxxxxxxxxxxxxx
```

---

## Step 2: Set Up Database (2 minutes)

**a) Go to Supabase Dashboard → SQL Editor**

**b) Create New Query, Copy-Paste This:**
```
-- Run the migration script
-- PASTE CONTENT FROM: supabase/migrations/00_initial_schema.sql
```

**c) Execute** → Then Create Another Query and paste seed data:
```
-- PASTE CONTENT FROM: supabase/seed.sql
```

---

## Step 3: Run Locally (1 minute)

```bash
npm run dev
```

✅ Open http://localhost:3000

---

## Try These Features

1. **Browse Products**: Click "Products" in navbar
2. **View Product Details**: Click any product card
3. **Add to Cart**: Select quantity and click button
4. **View Cart**: Click "Cart" in navbar
5. **Sign Up**: Click "Login" → then "Sign up here"
6. **My Account**: After login, click "Account"

---

## Deploy to Vercel (3 minutes)

```bash
# 1. Initialize Git
git init
git add .
git commit -m "Initial commit"

# 2. Create GitHub repo and push
git remote add origin https://github.com/YOUR_USERNAME/pocopan-toys
git push -u origin main
```

**Then:**
1. Go to vercel.com
2. Import your GitHub repo
3. Add same 3 env variables
4. Click Deploy ✅

Your app is live!

---

## What's Included

✅ Product catalog with filtering
✅ Shopping cart (localStorage-based)
✅ User authentication (email/password)
✅ User account dashboard
✅ Order history tracking
✅ Responsive design (mobile/tablet/desktop)
✅ Clean, modern UI with Tailwind CSS

---

## Next: Add Payments & Shipping

See `SETUP_INSTRUCTIONS.md` for full Phase 2 integration:
- Stripe payments
- Mercado Libre shipping
- Admin dashboard
- Order processing

---

## Troubleshooting

**"Supabase credentials not configured"**
- Create `.env.local` file in project root
- Add your 3 credentials
- Restart dev server

**Build fails**
- Run: `npm install --legacy-peer-deps`
- Delete: `node_modules` and `.next` folders
- Run: `npm run build` again

**Database migrations fail**
- Check SQL syntax in SQL Editor
- Verify you copied entire file
- Try executing line by line

---

**You're ready! 🎉**

Visit http://localhost:3000 and start shopping!
