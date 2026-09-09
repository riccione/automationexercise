import { test as base } from '@playwright/test';

export const test = base.extend({
  page: async ({ page }, use) => {
    await page.route('**/*', async (route) => {
      const url = route.request().url();

      if (
        url.includes('googleads') ||
        url.includes('googlesyndication') ||
        url.includes('doubleclick') ||
        url.includes('adservice') ||
        url.includes('adsbygoogle') ||
        url.includes('yango') ||
        url.includes('ads')
      ) {
        await route.abort();
      } else {
        await route.continue();
      }
    });

    await use(page);
  },
});

export { expect } from '@playwright/test';
