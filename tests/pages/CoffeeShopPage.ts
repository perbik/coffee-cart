import { expect } from '@playwright/test';
import type { Page } from '@playwright/test';
import { CartPage } from './CartPage';
import { CoffeeMenuPage } from './CoffeeMenuPage';
import { PaymentDetailsModal } from '../components/PaymentDetailsModal';

export class CoffeeShopPage {
  readonly menu: CoffeeMenuPage;
  readonly cart: CartPage;
  readonly payment: PaymentDetailsModal;

  constructor(private readonly page: Page) {
    this.menu = new CoffeeMenuPage(page);
    this.cart = new CartPage(page);
    this.payment = new PaymentDetailsModal(page);
  }

  async goto(path = '/'): Promise<void> {
    await this.page.goto(path);
    await expect(
      this.page.getByRole('heading', { name: /^Espresso\s+\$/ }),
    ).toBeVisible();
  }
}
