import { test, expect } from '@playwright/test';

test('should GET products list', async ({ request }) => {
  const response = await request.get(`/api/productsList`);

  expect(response.status(), 'Expected status is 200').toBe(200);

  const data = await response.json();

  expect(data.responseCode).toBe(200);
  expect(data).toHaveProperty('products');
  expect(Array.isArray(data.products), 'products should be array').toBe(true);
  expect(data.products.length, 'products list should not be empty').toBeGreaterThan(0);

  // Verify first product structure - limited due to the scope and time limit
  const product = data.products[0];
  expect(product).toHaveProperty('id');
  expect(typeof product.id, 'id should be a number').toBe('number');
  expect(product).toHaveProperty('name');
  expect(typeof product.name, 'name should be a string').toBe('string');
  expect(product).toHaveProperty('price');
  expect(typeof product.price, 'price should be a string').toBe('string');
  expect(product).toHaveProperty('brand');
  expect(typeof product.brand, 'brand should be a string').toBe('string');
  expect(product).toHaveProperty('category');
  expect(product.category).toHaveProperty('category');
  expect(typeof product.category.category, 'category should be a string').toBe('string');
});
