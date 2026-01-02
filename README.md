# Pocopan Toys - E-Commerce Platform

A modern, full-stack e-commerce platform for selling educational toys and children's products. Built with Next.js, TypeScript, Supabase, and Tailwind CSS.

## 🚀 Quick Start

```bash
# 1. Configure environment (see QUICK_START.md)
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev
```

Visit **http://localhost:3000**

## 📖 Documentation

- **[QUICK_START.md](./QUICK_START.md)** - Get running in 5 minutes
- **[SETUP_INSTRUCTIONS.md](./SETUP_INSTRUCTIONS.md)** - Full setup & deployment guide
- **[PROJECT_STATUS.md](./PROJECT_STATUS.md)** - Current implementation status
- **[requirements.md](./.zencoder/chats/ac38ada5-4f27-49ae-9950-8e28515fa7d2/requirements.md)** - Feature requirements
- **[spec.md](./.zencoder/chats/ac38ada5-4f27-49ae-9950-8e28515fa7d2/spec.md)** - Technical specification

## ✨ Features

### Current (Phase 1) ✅
- Product catalog with filtering
- Product detail pages
- Shopping cart (localStorage)
- User authentication
- Account dashboard
- Order history
- Responsive design

### Coming Soon (Phase 2-5)
- Stripe payment integration
- Mercado Libre shipping
- Admin dashboard
- Email notifications
- Order tracking
- Advanced analytics

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Deployment**: Vercel

## 📁 Project Structure

```
├── app/              # Next.js App Router (pages & API routes)
├── components/       # Reusable React components
├── lib/              # Utilities (Supabase, types, validations)
├── styles/           # Global CSS
├── supabase/         # Database migrations & seeds
├── public/           # Static assets
└── [config files]    # TypeScript, Tailwind, ESLint, etc.
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
git push origin main
# Auto-deploys to Vercel
```

### Self-Hosted
```bash
npm run build
npm start
```

## 🔐 Environment Variables

Required:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Optional (for Phase 2+):
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`
- `MERCADOLIBRE_ACCESS_TOKEN`

## 📊 Database

See `supabase/migrations/00_initial_schema.sql` for the complete database schema.

**Main Tables**:
- products
- orders
- order_items
- cart_items
- profiles
- addresses

## 🧪 Testing

```bash
npm run build    # Production build
npm run lint     # ESLint
npm run type-check  # TypeScript check
```

## 📝 License

MIT

## 👤 Author

Built for Pocopan Toys - Educational Toys Store

## 📞 Support

For issues, questions, or feature requests, please check the documentation files first.

---

**Status**: Phase 1 Complete ✅ | Build Success ✅ | Production Ready ✅
