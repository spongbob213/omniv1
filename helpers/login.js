const { expect } = require('@playwright/test');

async function loginOmni(page) {
  await page.goto('https://omni.botika.online/login');
  await page.fill('input[name="username"]', 'rezabotika+2@gmail.com');
  await page.fill('input[name="password"]', 'Mpunbgjgo347');
  await page.click('button[name="login"]');
  await expect(page).toHaveURL(/dashboard/i);
}

module.exports = { loginOmni };
