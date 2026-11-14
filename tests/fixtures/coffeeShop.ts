import { test as base, expect } from '@playwright/test';
import { CoffeeShopPage } from '../pages/CoffeeShopPage';

type Fixtures = {
  coffeeShop: CoffeeShopPage;
};

export const test = base.extend<Fixtures>({
  coffeeShop: async ({ page }, use) => {
    // Create an instance of CoffeeShopPage
    const coffeeShop = new CoffeeShopPage(page);

    // Start tests from the coffee menu page
    await coffeeShop.goto();

    // Provide the coffeeShop fixture to the test
    await use(coffeeShop);
  },
});

export { expect };
