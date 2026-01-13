import { expect } from '@playwright/test';


export async function loginOmni(page) {
  await page.goto('https://omni.botika.online/login');
  await page.fill('input[name="username"]', 'YOUR EMAIL');
  await page.fill('input[name="password"]', 'YOUR PW');
  await page.click('button[name="login"]');
  await expect(page).toHaveURL(/dashboard/i);
}

export async function logoutOmni(page) {
  await page.locator('.avatar-sm img.avatar-img').first().click();
  await expect(page.locator('#logout')).toBeVisible();
  await page.click('#logout');
  await expect(page).toHaveURL(/login/, { timeout: 60000 });
}