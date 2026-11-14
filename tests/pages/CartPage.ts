import type { Locator, Page } from '@playwright/test';

export class CartPage {
  constructor(private readonly page: Page) {}

  get cartLink(): Locator {
    return this.page.getByRole('link', { name: 'Cart page' });
  }

  get payButton(): Locator {
    return this.page.getByRole('button', { name: 'Proceed to checkout' });
  }

  get cartPreview(): Locator {
    return this.page.locator('.cart-preview');
  }

  async open(): Promise<void> {
    await this.cartLink.click();
  }

  async showCartPreview(): Promise<void> {
    await this.payButton.hover();
  }

  get cartItems(): Locator {
    return this.page.locator('.list > div > ul > li.list-item');
  }

  cartItem(name: string): Locator {
    return this.cartItems.filter({ hasText: name });
  }

  async proceedToCheckout(): Promise<void> {
    await this.payButton.click();
  }
}
