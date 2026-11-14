[![Netlify Status](https://api.netlify.com/api/v1/badges/626af698-2379-4cfc-888c-3c502fad8f08/deploy-status)](https://app.netlify.com/sites/coffee-cart/deploys)

# Coffee cart

https://coffee-cart.app/. This demo created with Vue 3 + Typescript + Vite.

## Special actions you can do
1. **Double click** on coffee title to translate it to Chinese.
2. **Right click** on coffee icon to open an add to cart `<dialog>`.
3. [Desktop only] **Hover** over Pay button will show a quick cart preview, click to add or remove items.
4. A random promo coffee pop up show up when adding every 3rd items to the cart. (e.g. 3, 6, 9, ...)
5. The add to cart process will be slowing down (intentionally) when the cart has more than 7 items.
6. Slow down page load performance with ads by passing in an `ads` param (e.g. https://coffee-cart.app/?ad=1).

## To run it with slow performance

1. Run with https://coffee-cart.app?ad=1
2. When the cart has more than 7 items, The process will be slowing down.
3. Go to https://goo.gle/devtools-performance to learn more about how to perform performance analysis.

## To record a user flows / start a test

1. Run with https://coffee-cart.app
2. Go to https://goo.gle/devtools-recorder to learn how to record, replay user flows with DevTools Recorder.

## Getting started with this repo

1. Download the project.
2. Run `npm install`.
3. Run `npm run dev` to start a local server.

## End-to-end tests

The Playwright suite uses shared fixtures and page objects for the menu, cart, and payment form.
Each test starts at the menu with a fresh browser page. Checkout data is kept in
`tests/data/checkout.ts`.

After installing dependencies with `npm install`, install the Chromium browser:

```sh
npx playwright install chromium
```

Playwright starts the local Vite server automatically. Use these commands to run and validate the
tests:

- `npm run test:e2e` runs the full suite.
- `npm run test:e2e:headed` runs the suite with a visible browser.
- `npm run test:e2e:types` type-checks the test files.

The tests cover promo visibility at cart counts 3, 6, and 9, verify it stays hidden between those counts, complete checkout and payment, toggle the coffee title translation, confirm the right-click add-to-cart dialog, use the hover cart preview controls, keep the cart usable beyond seven coffee varieties, display the ad banner, and report the breakable-mode console error. GitHub Actions runs the production build, test type-check, and Chromium suite on pushes and pull requests.
