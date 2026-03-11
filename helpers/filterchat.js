async function openFilter(page) {
  await page
    .locator('a[data-original-title="Filter list person"]')
    .click();

  // tunggu dropdown muncul
  await page.locator('.dropdown-menu.show').waitFor();
}

async function clickFilter(page, text) {
  await page
    .locator('.dropdown-menu.show a.dropdown-item', { hasText: text })
    .click({ force: true });

  // tunggu dropdown update / data reload
  await page.waitForLoadState('networkidle');
}

module.exports = {
  openFilter,
  clickFilter,
};
