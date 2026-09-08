import { test, expect } from '@playwright/test';
import { createTestUser } from '../helpers/user.helper';

test('should create a new account', async ({ request }) => {
  // Create user with default values (generates unique email/username)
  const { response } = await createTestUser(request);

  // Better response code is 201 - created
  expect(response.status(), 'Should be 200').toBe(200);

  const data = await response.json();

  expect(data.responseCode).toBe(201);
  expect(data.message).toBe('User created!');
});

test('negative: should failed because it has a duplicate email', async ({ request }) => {
  // Create user with default values (generates unique email/username)
  const { response } = await createTestUser(request, {
    email: 'test@test.com',
  });

  // Better response code is 400 - bad request
  expect(response.status(), 'Should be 200').toBe(200);

  const data = await response.json();

  expect(data.responseCode).toBe(400);
  expect(data.message).toBe('Email already exists!');
});

test('should verify login with valid credentials', async ({ request }) => {
  const { user } = await createTestUser(request);

  const verifyLogin = await request.post('/api/verifyLogin', {
    form: {
      email: user.email,
      password: user.password,
    },
  });

  expect(verifyLogin.status(), 'Should be 200').toBe(200);
  const verifyLoginData = await verifyLogin.json();
  expect(verifyLoginData.responseCode).toBe(200);
  expect(verifyLoginData.message).toBe('User exists!');
});

test('negative: should verify login with invalid credentials', async ({ request }) => {
  const { user } = await createTestUser(request);

  const verifyLogin = await request.post('/api/verifyLogin', {
    form: {
      email: 'invalid_' + user.email,
      password: user.password,
    },
  });

  // Better response code is 404 - not found
  expect(verifyLogin.status(), 'Should be 200').toBe(200);
  const verifyLoginData = await verifyLogin.json();
  expect(verifyLoginData.responseCode).toBe(404);
  expect(verifyLoginData.message).toBe('User not found!');
});
