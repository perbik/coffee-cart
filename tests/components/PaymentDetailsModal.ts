import type { Page } from '@playwright/test';

export interface PaymentDetails {
  name: string;
  email: string;
  receiveUpdates: boolean;
}

export class PaymentDetailsModal {
  constructor(private readonly page: Page) {}

  async submit(details: PaymentDetails): Promise<void> {
    await this.page.getByLabel('Name', { exact: true }).fill(details.name);
    await this.page.getByLabel('Email', { exact: true }).fill(details.email);

    if (details.receiveUpdates) {
      await this.page.getByRole('checkbox', {
        name: 'Promotion checkbox',
      }).setChecked(details.receiveUpdates);
    }

    await this.page.getByRole('button', { name: 'Submit' }).click();
  }
}
