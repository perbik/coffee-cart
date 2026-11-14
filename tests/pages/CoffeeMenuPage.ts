import type { Locator, Page } from '@playwright/test';

export class CoffeeMenuPage {
  constructor(private readonly page: Page) {}

  private coffeeHeading(name: string): Locator {
    const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return this.page.getByRole('heading', {
      name: new RegExp(`^${escapedName}\\s+\\$`),
    });
  }

  private coffeeCup(name: string): Locator {
    return this.coffeeHeading(name).locator('..').locator('.cup-body');
  }

  async addCoffee(name: string): Promise<void> {
    await this.coffeeCup(name).click();
  }

  async translateCoffeeToChinese(name: string): Promise<void> {
    await this.coffeeHeading(name).dblclick();
  }

  async openAddToCartDialog(name: string): Promise<void> {
    await this.coffeeCup(name).click({ button: 'right' });
  }

  get promoOffer(): Locator {
    return this.page.getByText(
      "It's your lucky day! Get an extra cup of Mocha for $4.",
      { exact: true },
    );
  }

  async dismissPromo(): Promise<void> {
    await this.page.getByRole('button', { name: "Nah, I'll skip." }).click();
  }

  async acceptPromo(): Promise<void> {
    await this.page.getByRole('button', { name: 'Yes, of course!' }).click();
  }

  get addToCartDialog(): Locator {
    return this.page.getByRole('dialog');
  }

  async confirmAddToCartDialog(): Promise<void> {
    await this.addToCartDialog.getByRole('button', { name: 'Yes' }).click();
  }

  async cancelAddToCartDialog(): Promise<void> {
    await this.addToCartDialog.getByRole('button', { name: 'No' }).click();
  }
}
