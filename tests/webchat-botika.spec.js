import { test, expect } from '@playwright/test';
import { loginOmni, logoutOmni } from '../helpers/login';

test('Test Omni', async ({ browser }) => {
  const pesan = 'Halo dari Playwright';
  const jawab = 'Ada yang bisa saya bantu?';
  const webchat = await browser.newPage();
  const omni = await browser.newPage();
  
  try {
    await webchat.goto('https://chat.botika.online/FznHQoI');
    await webchat.waitForSelector('#input-message');
    await webchat.fill('#input-message', pesan);
    await webchat.press('#input-message', 'Enter');
    await expect(webchat.getByText(pesan)).toBeVisible();
    await loginOmni(omni);
    await omni.locator('a[href*="console2"]').click();
    await omni.waitForURL(/console2/);
    await omni.waitForLoadState('networkidle');
    await omni.locator('div.listperson').first().click();
    await expect(omni.getByText(pesan).first()).toBeVisible({ timeout: 30000 });
    await omni.getByPlaceholder('Type a message').fill(jawab);
    await omni.getByRole('button', { name: /send/i }).click();
    await expect(webchat.getByText(jawab)).toBeVisible({ timeout: 30000 });

  } finally {
    await logoutOmni(omni);
    await webchat.close();
    await omni.close();
  }
});




// import { test, expect } from '@playwright/test';
// import { loginOmni, logoutOmni } from '../helpers/login';
// const pesan = 'Halo dari Playwright';
// const jawab = 'Ada yang bisa saya bantu?';

// test('Kirim pesan ke webchat Botika', async ({ page }) => {
//   await page.goto('https://chat.botika.online/t63cIaX');
//   await page.waitForSelector('#input-message');
//   await page.fill('#input-message', pesan);
//   await page.press('#input-message', 'Enter');
//   await expect(page.getByText(pesan)).toBeVisible();
// });

// test('Cek Respon di Omni', async ({ page }) => {
//   await loginOmni(page);
//   await page.locator('a[href*="console2"]').click();
//   await page.waitForURL(/console2/);
//   await page.waitForLoadState('networkidle');
//   await page.locator('div.listperson').first().click();
//   const chatItem = page.getByText(pesan).first();
//   await expect(chatItem).toBeVisible({ timeout: 30000 });
//   await logoutOmni(page);
// });

// test('Balas dari Omni', async ({ page }) => {
//   await loginOmni(page);
//   await page.locator('a[href*="console2"]').click();
//   await page.waitForURL(/console2/);
//   await page.waitForLoadState('networkidle');
//   await page.locator('div.listperson').first().click();
//   await page.getByPlaceholder('Type a message').fill(jawab);
//   await page.getByRole('button', { name: /send/i }).click();
//   await page.waitForTimeout(5000);
//   await logoutOmni(page);
// });

// test('Cek Respon di Webchat', async ({ page }) => {
//   await page.goto('https://chat.botika.online/t63cIaX');
//   await expect(page.getByText(jawab)).toBeVisible();
// });