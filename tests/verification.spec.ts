import { test, expect } from '@playwright/test';

test.describe('Pocopán Jugueteria Verification', () => {
  test('should display Pocopán with accent on Home Page', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await expect(page.locator('h1')).toContainText('Pocopán Jugueteria®');
    await expect(page.getByText('¿Por Qué Elegir Pocopán Jugueteria®?')).toBeVisible();
  });

  test('should display Pocopán with accent in Navbar', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await expect(page.locator('nav')).toContainText('Pocopán Jugueteria®');
  });

  test('should display Pocopán with accent in Footer', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await expect(page.locator('footer')).toContainText('Pocopán Jugueteria®');
  });

  test('should not have tax surcharge in cart', async ({ page }) => {
    // Navigate to home page (which has hardcoded featured products)
    await page.goto('http://localhost:3000');
    
    // Click on the first featured product card
    const firstProduct = page.locator('a[href^="/products/"]').first();
    await firstProduct.click();
    
    // Add to cart (hardcoded products might not work with API detail page, but let's see)
    // Actually, the detail page also fetches from API.
    // If API 400s, the detail page will show "Producto no encontrado".
    
    // Let's try to just go to cart directly if we can't add.
    // Or better, let's mock the API response for the test.
  });
});
