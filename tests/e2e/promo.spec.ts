import { test, expect } from '../fixtures/coffeeShop';

test('promo popup appears every third time coffee is added', async ({
  coffeeShop,
}) => {
  for (let itemCount = 1; itemCount <= 9; itemCount += 1) {
    await coffeeShop.menu.addCoffee('Espresso');

    if (itemCount % 3 === 0) {
      await expect(coffeeShop.menu.promoOffer).toBeVisible();
      await coffeeShop.menu.dismissPromo();
    } else {
      await expect(coffeeShop.menu.promoOffer).toBeHidden();
    }
  }
});
