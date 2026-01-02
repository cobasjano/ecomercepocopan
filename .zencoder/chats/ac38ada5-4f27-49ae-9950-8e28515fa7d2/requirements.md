# Feature Specification: E-Commerce Platform for Educational Toys

## Overview
A production-ready e-commerce web application for selling educational toys and products. **No user authentication required** - customers shop anonymously with unique session-based shopping carts. Orders are sent to owner via WhatsApp notification. Admin panel for product management with visibility and stock controls.

---

## User Stories

### User Story 1 - Browse Products (No Login Required)
**Acceptance Scenarios**:
1. **Given** a visitor lands on the site, **When** they view homepage, **Then** they see product catalog with categories and subcategories
2. **Given** a visitor browses products, **When** they filter by category/subcategory, **Then** only visible products are shown
3. **Given** a product is marked hidden, **When** a visitor searches, **Then** the product is not visible
4. **Given** a product is out of stock, **When** a visitor views it, **Then** "Sin Stock" label is shown and add-to-cart is disabled
5. **Given** a visitor clicks a product, **When** detail page loads, **Then** they see: name, subcategory, description, price, image (from URL), stock status

---

### User Story 2 - Shopping Cart (Anonymous Session)
**Acceptance Scenarios**:
1. **Given** a visitor selects a product, **When** they click "Agregar al Carrito", **Then** item is added to their unique session cart (no login needed)
2. **Given** two visitors shop simultaneously, **When** they edit their carts, **Then** each visitor sees only their own cart items (no data loss or cross-interference)
3. **Given** a visitor has items in cart, **When** they refresh page or leave/return, **Then** cart items persist (using session ID)
4. **Given** a visitor views their cart, **When** cart displays items, **Then** they see: product name, quantity, unit price, subtotal, and total with tax
5. **Given** a visitor updates quantity, **When** they click +/-, **Then** cart updates instantly and subtotal recalculates

---

### User Story 3 - Checkout & Order Notification
**Acceptance Scenarios**:
1. **Given** a visitor has items in cart, **When** they click "Iniciar Compra", **Then** a WhatsApp message is sent to owner with order details
2. **Given** WhatsApp message is sent, **When** owner receives it, **Then** message includes: products list, quantities, subtotal, total (no payment processing required)
3. **Given** an order is submitted, **When** message is sent successfully, **Then** visitor sees confirmation message with order details
4. **Given** WhatsApp message fails, **When** delivery fails, **Then** system retries and shows error to visitor if needed

---

### User Story 4 - Admin Product Management
**Acceptance Scenarios**:
1. **Given** admin accesses dashboard (with password), **When** they view products, **Then** they see all products with name, category, subcategory, price, image, visibility, and stock status
2. **Given** admin in dashboard, **When** they click "Agregar Producto", **Then** form opens to enter: Name, Category, SubCategory, Description, Precio Venta, Image URL
3. **Given** admin views a product, **When** they click "Editar", **Then** all fields (name, category, subcategory, description, price, image URL) are editable
4. **Given** admin completes edit, **When** they save, **Then** product is updated and visible changes appear immediately on store
5. **Given** admin views a product, **When** they click "Eliminar", **Then** product is deleted from catalog
6. **Given** admin views a product, **When** they toggle "Mostrar/Ocultar", **Then** product visibility changes (hidden products don't appear in shop)
7. **Given** admin views a product, **When** they toggle "Sin Stock", **Then** product is marked unavailable and add-to-cart is disabled for customers

---

## Requirements

### Functional Requirements
- **No User Authentication**: Customers shop anonymously without accounts
- **Session-Based Carts**: Each visitor gets a unique session ID; cart data is stored server-side
- **Product Catalog**: Products with: Name, Category, SubCategory, Description, Precio Venta, Image URL
- **Product Visibility**: Toggle buttons to show/hide products from public catalog
- **Stock Management**: Mark products as "Sin Stock"; disabled add-to-cart when out of stock
- **Concurrent Cart Support**: Multiple simultaneous users can edit their carts independently with zero data loss
- **Shopping Cart**: Add/remove items, update quantities, persistent across sessions
- **Order Notification**: WhatsApp message to owner with: product list, quantities, subtotal, total
- **Admin Dashboard**: Secure admin panel (password-protected) for product CRUD and visibility/stock controls
- **Admin Product CRUD**: Add, edit, delete, and toggle visibility/stock for each product individually
- **Shopping Cart Totals**: Real-time subtotal and total with tax calculation
- **Product Filtering**: Filter by category and subcategory
- **Responsive UI**: Full functionality on mobile, tablet, and desktop

### Non-Functional Requirements
- **Concurrency**: Handle 1, 100, 100,000 simultaneous users without cart interference or data loss
- **Performance**: Page load < 2s, cart updates < 200ms
- **Session Management**: Session persistence for 30+ days using secure HTTP cookies
- **WhatsApp Reliability**: Retry mechanism for failed WhatsApp message delivery
- **Data Integrity**: Session data isolation; each visitor's cart is private
- **Mobile Responsive**: Full functionality and optimized layout on all devices
- **Admin Security**: Password-protected admin panel, no anonymous access
- **Scalability**: Database queries optimized for thousands of concurrent users

---

## Success Criteria

✅ **Anonymous Shopping**: Customers browse and shop without any login required  
✅ **Session-Based Cart**: Each visitor has unique session ID; cart persists across sessions  
✅ **Concurrent Users**: 100+ simultaneous users can shop independently with zero interference  
✅ **Product Catalog**: Products display with Name, Category, SubCategory, Description, Price, Image URL  
✅ **Visibility Control**: Admin can toggle show/hide; hidden products don't appear to customers  
✅ **Stock Management**: Admin can mark "Sin Stock"; customers see disabled add-to-cart  
✅ **Cart Operations**: Add, remove, update quantities in real-time with correct totals  
✅ **Order Notification**: WhatsApp message sent to owner with complete order details on checkout  
✅ **Admin Dashboard**: Password-protected panel for all product CRUD operations  
✅ **Admin Product Management**: Add, edit, delete, toggle visibility, toggle stock for each product  
✅ **Mobile Responsive**: Fully functional on mobile, tablet, and desktop  
✅ **Error-Free**: No JavaScript errors, graceful error handling  
✅ **Performance**: Page loads < 2s, cart updates < 200ms  
✅ **Deployed**: Live on Vercel with optimized database queries  

---

## Deployment & Tech Stack
- **Frontend**: Next.js 14+ with React, Tailwind CSS
- **Backend**: Next.js API routes with session management
- **Database**: Supabase (PostgreSQL) with optimized indexes
- **Session Storage**: Secure HTTP cookies (httpOnly, secure, sameSite)
- **WhatsApp Notifications**: Twilio API (WhatsApp Business integration)
- **Hosting**: Vercel
- **Authentication**: None for customers (session-based), password for admin dashboard
- **Image Storage**: External URLs (customer provides image URL)
