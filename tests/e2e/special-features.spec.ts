import { test, expect } from '../fixtures/coffeeShop';
import { checkoutCoffees } from '../data/checkout';

test('double-clicking a coffee title toggles its Chinese translation', async ({
  coffeeShop,
  page,
}) => {
  // Double-click the original coffee title to translate it to Chinese
  await coffeeShop.menu.translateCoffeeToChinese('Espresso');

  // Verify that the Chinese translation is displayed
  const translatedTitle = page.getByRole('heading', {
    name: /特浓咖啡/,
  });

  await expect(translatedTitle).toBeVisible();

  // Double-click the translated title to bring it back to English
  await translatedTitle.dblclick();

  // Verify that the original English title is displayed again
  await expect(
    page.getByRole('heading', { name: /^Espresso\s+\$/ }),
  ).toBeVisible();
});

test('right-clicking a coffee icon opens an add-to-cart dialog', async ({
  coffeeShop,
}) => {
  // Right-click the Espresso coffee icon
  await coffeeShop.menu.openAddToCartDialog('Espresso');

  // Verify that the add-to-cart dialog is displayed
  await expect(coffeeShop.menu.addToCartDialog).toBeVisible();

  // Verify that the dialog contains the correct coffee name
  await expect(coffeeShop.menu.addToCartDialog).toContainText(
    'Add Espresso to the cart?',
  );

  // Confirm adding the coffee to the cart
  await coffeeShop.menu.confirmAddToCartDialog();

  // Verify that the cart now contains one item
  await expect(coffeeShop.cart.cartLink).toContainText('cart (1)');
});

test('hovering over checkout shows a cart preview with working quantity controls', async ({
  coffeeShop,
}) => {
  await coffeeShop.menu.addCoffee('Espresso');

  // Preview is hidden until the user hovers the pay or price link on the lower part
  await expect(coffeeShop.cart.cartPreview).toBeHidden();

  await coffeeShop.cart.showCartPreview();
  await expect(coffeeShop.cart.cartPreview).toBeVisible();

  await coffeeShop.cart.cartPreview
    .getByRole('button', { name: 'Add one Espresso' })
    .click();
  await expect(coffeeShop.cart.cartLink).toContainText('cart (2)');

  await coffeeShop.cart.cartPreview
    .getByRole('button', { name: 'Remove one Espresso' })
    .click();
  await expect(coffeeShop.cart.cartLink).toContainText('cart (1)');
});

test('cart remains usable after adding more than seven coffee varieties', async ({
  coffeeShop,
}) => {
  // Add eight varieties
  for (const [index, coffee] of checkoutCoffees.entries()) {
    await coffeeShop.menu.addCoffee(coffee);

    if ((index + 1) % 3 === 0) {
      await expect(coffeeShop.menu.promoOffer).toBeVisible();

      // Dismiss each offer so the loop can continue adding coffees
      await coffeeShop.menu.dismissPromo();
    }
  }

  await expect(coffeeShop.cart.cartLink).toContainText(
    `cart (${checkoutCoffees.length})`,
  );

  await coffeeShop.cart.open();
  await expect(coffeeShop.cart.cartItems).toHaveCount(
    checkoutCoffees.length,
  );
});

test('the ad query displays the advertisement banner', async ({
  coffeeShop,
  page,
}) => {
  // Go to ad mode to render the banner after the app's scheduled load
  await coffeeShop.goto('/?ad=1');

  await expect(
    page.getByRole('button', {
      name: 'free 1 bag of coffe beans advertisement',
    }),
  ).toBeVisible();
});

