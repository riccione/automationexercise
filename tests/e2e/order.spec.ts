import { createTestUser } from '../helpers/user.helper';
import { test, expect } from '../../fixtures/fixture';

test('should allow a logged user to place an order successfully', async ({ page, request }) => {
  const { user } = await createTestUser(request);

  await page.goto('/login');
  await page.locator('[data-qa="login-email"]').fill(user.email);
  await page.locator('[data-qa="login-password"]').fill(user.password);
  await page.getByRole('button', { name: 'Login' }).click();

  await page.locator('[data-product-id="1"]').first().hover();
  await page.locator('.product-overlay [data-product-id="1"]').click();
  await expect(page.getByRole('heading', { name: 'Added!' })).toBeVisible();

  await page
    .locator('#cartModal')
    .getByRole('button', {
      name: 'Continue Shopping',
    })
    .click();

  await expect(page.locator('#cartModal')).toBeHidden();
  await page.locator('[data-product-id="3"]').first().hover();
  await page.locator('.product-overlay [data-product-id="3"]').click();

  await page
    .locator('#cartModal')
    .getByRole('button', {
      name: 'Continue Shopping',
    })
    .click();

  await expect(page.locator('#cartModal')).toBeHidden();
  await page.getByRole('link', { name: 'Cart' }).click();
  await expect(page).toHaveURL('https://automationexercise.com/view_cart');
  await expect(page.getByText('Proceed To Checkout')).toBeVisible();
  await page.getByText('Proceed To Checkout').click();

  await expect(page).toHaveURL('https://automationexercise.com/checkout');
  await expect(page.getByRole('heading', { name: 'Your delivery address' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Review Your Order' })).toBeVisible();
  await page.getByRole('link', { name: 'Place Order' }).click();

  await expect(page.getByRole('heading', { name: 'Payment' })).toBeVisible();
  await page.locator('[data-qa="name-on-card"]').fill('john doe');
  await page.locator('[data-qa="card-number"]').fill('3232323232');
  await page.locator('[data-qa="cvc"]').fill('342');
  await page.locator('[data-qa="expiry-month"]').fill('10');
  await page.locator('[data-qa="expiry-year"]').fill('2030');
  await page.getByRole('button', { name: 'Pay and Confirm Order' }).click();

  await expect(page.getByText('Order Placed!')).toBeVisible();
});
