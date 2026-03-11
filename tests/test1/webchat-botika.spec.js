const { test, expect } = require('@playwright/test');

test('Test Omni + Webchat (isolated sessions)', async ({ browser }) => {
  const pesan = 'Halo dari Playwright';
  const jawab = 'Ada yang bisa saya bantu?';
  const webchatContext = await browser.newContext();
  const webchat = await webchatContext.newPage();

  await webchat.goto('https://chat.botika.online/t63cIaX');
  await webchat.waitForSelector('#input-message');
  await webchat.fill('#input-message', pesan);
  await webchat.press('#input-message', 'Enter');
  await expect(webchat.getByText(pesan)).toBeVisible();
  await webchat.waitForTimeout(10000);

  const omniContext = await browser.newContext({
    storageState: 'auth/omni-auth.json',
  });
  const omni = await omniContext.newPage();

  await omni.goto(
    'https://omni.botika.online/page/admin/dashboard?id=work0rqtd30lmg'
  );

  await omni.locator('a[href*="console2"]').click();
  await omni.waitForURL(/console2/);
  await omni.waitForLoadState('networkidle');
  await omni.locator('div.listperson').first().click();
  await expect(omni.getByText(pesan).first()).toBeVisible({ timeout: 30000 });
  await omni.getByPlaceholder('Type a message').fill(jawab);
  await omni.getByRole('button', { name: /send/i }).click();
  await expect(webchat.getByText(jawab)).toBeVisible({ timeout: 30000 });
  await webchatContext.close();
  await omniContext.close();
});

