# Feature Specification: WhatsApp Checkout and Authentication Removal

## User Stories

### User Story 1 - Checkout via WhatsApp
**Acceptance Scenarios**:
1. **Given** a user has items in their cart, **When** they click "Finalizar Compra" in the cart page, **Then** they should be redirected to a WhatsApp message with the list of products, quantities, and total price.
2. **Given** the WhatsApp link is generated, **When** the user clicks it, **Then** it should open WhatsApp with a pre-filled message for the number +5492257660073.

### User Story 2 - Removal of Authentication System
**Acceptance Scenarios**:
1. **Given** the website is running, **When** a user navigates through the site, **Then** they should not see any links or buttons related to "Login", "Register", or "Account".
2. **Given** the authentication routes exist, **When** the system is updated, **Then** these routes should be removed or made inaccessible.

---

## Requirements
-   **Checkout**:
    -   Replace the "Proceder al Pago" link in `/cart` with a "Finalizar Compra por WhatsApp" button.
    -   Generate a WhatsApp message with the format: "Hola! Quisiera los siguientes productos: [Lista detallada: Nombre x Cantidad - $Precio] Total: $Total".
    -   The button should redirect to `https://wa.me/5492257660073?text=[encoded_message]`.
-   **Authentication Cleanup**:
    -   Remove "Login" and "Cuenta" links from `Navbar.tsx`.
    -   Remove or disable pages: `/auth`, `/account`, `/login` (if they exist).
    -   Remove the "Login" component if it's used anywhere.

## Success Criteria
-   Clicking "Finalizar Compra" opens WhatsApp with the correct message and number.
-   No authentication-related UI elements are visible.
-   The user can complete the purchase process without ever seeing a login screen.
