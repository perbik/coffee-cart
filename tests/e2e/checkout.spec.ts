
import { test, expect } from '../fixtures/coffeeShop';
import { checkoutCoffees, validPaymentDetails } from '../data/checkout';

test('adds coffees, handles the third-item promo, and completes checkout', async ({
  coffeeShop,
  page,
}) => {
  // Add all selected coffees to the cart
  for (const [index, coffee] of checkoutCoffees.entries()) {
    await coffeeShop.menu.addCoffee(coffee);

    // A promo popup appears after every third item
    if ((index + 1) % 3 === 0) {
      await expect(coffeeShop.menu.promoOffer).toBeVisible();

      // Dismiss the promo to continue adding products
      await coffeeShop.menu.dismissPromo();
    }
  }

  // Verify that the cart contains the expected number of items
  await expect(coffeeShop.cart.cartLink).toContainText(
    `cart (${checkoutCoffees.length})`,
  );

  // Navigate to the cart
  await coffeeShop.cart.open();
  await expect(page).toHaveURL(/\/cart$/);

  // Verify that every selected coffee is present in the cart
  for (const coffee of checkoutCoffees) {
    await expect(
      coffeeShop.cart.cartItems.getByText(coffee, { exact: true }),
    ).toBeVisible();
  }

  // Proceed to payment
  await coffeeShop.cart.proceedToCheckout();
  await expect(page.getByRole('heading', { name: 'Payment details' })).toBeVisible();

  // Submit payment details
  await coffeeShop.payment.submit(validPaymentDetails);

  // Verify successful checkout
  await expect(
    page.getByText(
      'Thanks for your purchase. Please check your email for payment.',
      { exact: true },
    ),
  ).toBeVisible();

  // Verify that the cart has been emptied
  await expect(coffeeShop.cart.cartLink).toContainText('cart (0)');
});
