const { test } = require('@playwright/test');
const { loginOmni } = require('../../helpers/login');

test('Save Omni login state', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await loginOmni(page);
  await context.storageState({ path: 'auth/omni-auth.json' });
  await context.close();
});
