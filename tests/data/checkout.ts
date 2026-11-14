import type { PaymentDetails } from '../components/PaymentDetailsModal';

export const checkoutCoffees = [
  'Espresso',
  'Espresso Macchiato',
  'Cappuccino',
  'Mocha',
  'Flat White',
  'Americano',
  'Cafe Latte',
  'Espresso Con Panna',
] as const;

export const validPaymentDetails: PaymentDetails = {
  name: 'Playwright Test Customer',
  email: 'coffee-test@example.com',
  receiveUpdates: false,
};

export const invalidPaymentDetails: PaymentDetails = {
  name: '',
  email: 'not-an-email',
  receiveUpdates: false,
};
