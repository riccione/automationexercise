import { APIRequestContext } from '@playwright/test';
import { randomUUID } from 'crypto';

interface CreateUserOptions {
  email?: string;
  password?: string;
  title?: string;
  birth_date?: number;
  birth_month?: number;
  birth_year?: number;
  firstname?: string;
  lastname?: string;
  company?: string;
  address1?: string;
  address2?: string;
  country?: string;
  zipcode?: string;
  state?: string;
  city?: string;
  mobile_number?: string;
}

export async function createTestUser(request: APIRequestContext, options: CreateUserOptions = {}) {
  const uuid = randomUUID().slice(0, 8); // use only first 8 chars

  const username = 'user_' + uuid;
  const email = uuid + '@example.com';

  // hardocded for simplicity
  const birth_date = 16;
  const birth_month = 2;
  const birth_year = 1990;
  const password = 'SecretPassword.7';

  const payload = {
    name: username, // aka username
    email: options.email ?? email,
    password: options.password ?? password, // hardcoded for simplicity
    title: options.title ?? 'Mr', // hardcoded for simplicity
    birth_date: options.birth_date ?? birth_date,
    birth_month: options.birth_month ?? birth_month,
    birth_year: options.birth_year ?? birth_year,
    firstname: options.firstname ?? 'Anna', // hardcoded for simplicity
    lastname: options.lastname ?? 'Doe', // hardcoded for simplicity
    company: options.company ?? 'NA',
    address1: options.address1 ?? 'Some address', // hardcoded for simplicity
    address2: options.address2 ?? '-', // hardcoded for simplicity
    country: options.country ?? 'United States', // hardcoded for simplicity
    zipcode: options.zipcode ?? '11076', // hardocded for simplicity
    state: options.state ?? 'FL', // hardcoded for simplicity
    city: options.city ?? 'London', // hardcoded for simplicity
    mobile_number: options.mobile_number ?? '789134', // hardcoded for simplicity
  };

  const response = await request.post('/api/createAccount', {
    form: payload,
  });

  return {
    response,
    user: {
      email: payload.email,
      password: payload.password,
    },
  };
}
