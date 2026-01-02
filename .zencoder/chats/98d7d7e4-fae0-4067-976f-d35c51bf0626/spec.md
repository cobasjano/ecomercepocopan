# Technical Specification: WhatsApp Checkout and Auth Removal

## Technical Context
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: LocalStorage for cart
- **Authentication**: Supabase (to be removed from UI)

## Technical Implementation Brief
1.  **WhatsApp Checkout**:
    - Modify `app/cart/page.tsx` to include a helper function that generates the WhatsApp message.
    - Replace the `Link` to `/checkout` with a button or a direct `a` tag pointing to `wa.me`.
    - Message generation logic:
        ```typescript
        const message = `Hola! Quisiera los siguientes productos:\n` +
          cartItems.map(item => {
            const p = products[item.product_id];
            return `- ${p.name} x ${item.quantity} - $${(p.price * item.quantity).toFixed(2)}`;
          }).join('\n') +
          `\n\nTotal: $${total.toFixed(2)}`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/5492257660073?text=${encodedMessage}`;
        ```
2.  **Authentication Removal**:
    - **Navbar**: Edit `components/Navbar.tsx` to remove links to `/auth` and `/account`.
    - **Routing**: Delete or clear out `app/auth` and `app/account` directories to prevent access.
    - **Redirects**: If necessary, add redirects from `/login`, `/auth`, `/account` to `/`.

## Source Code Structure
- `app/cart/page.tsx`: Main changes for checkout logic.
- `components/Navbar.tsx`: UI changes for auth removal.
- `app/auth/`: Remove or disable.
- `app/account/`: Remove or disable.

## Contracts
No changes to existing data models in `lib/types.ts` are strictly necessary, as we are moving away from DB-stored orders for this simple version. However, we will stop using `Order` and `OrderItem` models for the frontend checkout process.

## Delivery Phases
1.  **Phase 1: WhatsApp Checkout Implementation**: Implement the message generation and redirect in the cart page.
2.  **Phase 2: Auth UI Cleanup**: Remove auth-related links from the Navbar and other components.
3.  **Phase 3: Route Cleanup**: Remove or disable auth/account pages.

## Verification Strategy
- **WhatsApp Checkout**:
    - Add items to cart.
    - Click "Finalizar Compra por WhatsApp".
    - Verify the URL matches `https://wa.me/5492257660073?text=...`.
    - Verify the decoded text contains all products and the total.
- **Auth Removal**:
    - Check Navbar for "Login" or "Cuenta" links.
    - Manually try to navigate to `/auth` or `/account` and ensure they are inaccessible or empty.
