import { test, expect } from '../../fixtures/fixture';
import { randomUUID } from 'crypto';

test('should allow a new user to register successfully', async ({ page }) => {
  const uuid = randomUUID().slice(0, 8); // use only first 8 chars

  const username = `user_${uuid}`;
  const email = `${uuid}@example.com`;
  const password = 'uisecret77';

  await page.goto('/login');
  await page.getByRole('textbox', { name: 'Name' }).fill(username);
  await page
    .locator('form')
    .filter({ hasText: 'Signup' })
    .getByPlaceholder('Email Address')
    .fill(email);
  await page.getByRole('button', { name: 'Signup' }).click();

  await expect(page.getByText('Enter Account Information')).toBeVisible();
  await page.getByRole('textbox', { name: 'Password *' }).fill(password);
  await page.locator('[data-qa="first_name"]').fill('John');
  await page.locator('[data-qa="last_name"]').fill('Doe');
  await expect(page.getByText('Address Information')).toBeVisible();
  await page.locator('[data-qa="address"]').fill('some address');
  await page.locator('[data-qa="state"]').fill('India');
  await page.locator('[data-qa="city"]').fill('Mumbai');
  await page.locator('[data-qa="zipcode"]').fill('33445');
  await page.locator('[data-qa="mobile_number"]').fill('324343');
  await page.getByRole('button', { name: 'Create Account' }).click();

  await expect(page.getByText('Account Created!')).toBeVisible();

  await page.getByRole('link', { name: 'Continue' }).click();

  await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
  await expect(page.getByText('Logged in as ' + username)).toBeVisible();
});
