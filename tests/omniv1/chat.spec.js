const { test, expect } = require('@playwright/test');
const { openFilter, clickFilter } = require('../../helpers/filterchat');
test('Chat Console 1', async ({ browser }) => {
    
    const pesan = 'Halo dari Playwright';
    const webchatContext = await browser.newContext();
    const webchat = await webchatContext.newPage();
    await webchat.goto('https://chat.botika.online/FznHQoI');
    await webchat.waitForLoadState('networkidle');
    await webchat.waitForSelector('#input-message');
    await webchat.fill('#input-message', pesan);
    await webchat.press('#input-message', 'Enter');
    await expect(webchat.getByText(pesan)).toBeVisible({ timeout: 15000 });

    const omniContext = await browser.newContext({
    storageState: 'auth/omni-auth.json',
    });
    const omni = await omniContext.newPage();
    await omni.goto('https://omni.botika.online/page/admin/dashboard');
    await omni.waitForLoadState('networkidle');
    await omni.locator('a[href*="console2?id"]').click();
    await omni.waitForURL(/console2/);
    await omni.locator('a', { hasText: 'Channels' }).click({ force: true });
    await omni.getByRole('button', { name: 'Deselect All' }).click();
    await omni.waitForTimeout(2000);
    await omni.getByRole('toolbar').getByRole('button', { name: 'Select All', exact: true }).click();
    await omni.waitForTimeout(2000);
    await omni.locator('a', { hasText: 'Channels' }).click({ force: true });

    //Pencarian//???BELUM

    await omni.locator('a[data-original-title="Mark All Chat as Read"]').click();
    await expect(omni.locator('.jconfirm-title', { hasText: 'Read All Chat ?' })).toBeVisible();
    await omni.locator('.jconfirm-box').getByRole('button', { name: 'Confirm', exact: true }).click();
    await expect(omni.locator('[data-notify="message"]', { hasText: 'All chat has been read' }))
    .toBeVisible();
    await omni.waitForTimeout(3000);
    await openFilter(omni);
    await clickFilter(omni, 'New');
    await clickFilter(omni, 'Open');
    await clickFilter(omni, 'Hold');
    await clickFilter(omni, 'Solved');
    await clickFilter(omni, 'Today');
    await clickFilter(omni, 'This week');
    await clickFilter(omni, 'Last week');
    await clickFilter(omni, 'This month');
    for (const text of ['Replied', 'Unreplied', 'Read', 'Unread']) {
        const item = omni.locator(`.dropdown-menu.show a.dropdown-item:not(.active):text-is("${text}")`);
        await item.first().click({ force: true });
        await omni.waitForTimeout(1000);
    }
    await omni.waitForLoadState('networkidle');
});

test('In chat', async ({ browser }) => {

//NYOBA WEBCHAT

    const jawab = 'Ada yang bisa saya bantu?'
    const pesan = 'Halo dari Playwright';
    // const webchatContext = await browser.newContext();
    // const webchat = await webchatContext.newPage();
    // await webchat.goto('https://chat.botika.online/ljV9HYx');
    // await webchat.waitForLoadState('networkidle');
    // await webchat.waitForSelector('#input-message');
    // await webchat.fill('#input-message', pesan);
    // await webchat.press('#input-message', 'Enter');
    // await expect(webchat.getByText(pesan)).toBeVisible({ timeout: 15000 });

    const omniContext = await browser.newContext({
    storageState: 'auth/omni-auth.json',
    });
    const omni = await omniContext.newPage();
    await omni.goto('https://omni.botika.online/page/admin/dashboard');
    await omni.waitForLoadState('networkidle');
    await omni.locator('a[href*="console2?id"]').click();
    await omni.waitForURL(/console2/);
    await omni.reload();
    await omni.waitForLoadState('networkidle');
    await omni.locator('div.listperson').first().click();

    //SEBELUM EDIT PROFILE

    await expect(omni.getByText(pesan).first()).toBeVisible({ timeout: 30000 });
    await omni.getByPlaceholder('Type a message').fill(jawab);
    await omni.getByRole('button', { name: /send/i }).click();
    // await expect(omni.locator('.message-content p.m-0.text', { hasText: jawab })).toBeVisible({ timeout: 30000 });
    await omni.locator('button:has(img[data-original-title="Request User Satisfaction"])').click();
    // await expect(omni.locator('.message-content p.m-0.text', { hasText: '(only visible to user)' })).toBeVisible({ timeout: 30000 });
    await omni.locator('button:has(img[data-original-title="End Chat"])').click();
    await omni.getByRole('button', { name: 'Confirm' }).click();
    await expect(omni.getByPlaceholder('Type a message')).toHaveCount(0);
    await omni.waitForTimeout(3000);

    await omni.locator('div.listperson').first().click();
    await omni.locator('button:has(img[data-original-title="Hold Ticket"])').click();
    await omni.getByRole('button', { name: 'Confirm' }).click();
    await omni.waitForTimeout(2000);

    await omni.locator('div.listperson').first().click();
    await omni.locator('button:has(img[data-original-title="Edit Info"])').click();
    await omni.locator('button:has(i.fas.fa-pen)').click();
    await omni.locator('#user-name').fill('testing');
    await omni.locator('#user-nickname').fill('test');
    await omni.locator('#user-email').fill('test@gmail.com');
    await omni.locator('#user-email1').fill('test2@gmail.com');
    await omni.locator('#user-phone').fill('0812345678');
    await omni.locator('#user-phone1').fill('089534242414');
    await omni.locator('#user-address').fill('jalan-jalan');
    await omni.locator('#user-city').fill('yogyakarta');
    await omni.locator('label[for="gendermale"]').click();
    await omni.getByRole('button', { name: 'Update' }).click();
    await omni.waitForTimeout(1000);
    await omni.locator('#pills-ticket-tab').click();
    await expect(omni.locator('#pills-ticket-tab')).toHaveClass(/active/);
    await omni.waitForTimeout(500);

    await omni.locator('#select2-ticket-priority-container').click();
    await omni.selectOption('#ticket-priority', 'low');
    await omni.locator('body').click();
    await omni.locator('#select2-ticket-category-container').click();
    // await omni.selectOption('#ticket-category', 'Question');
    await omni.locator('body').click();
    await omni.fill('#ticket-note', 'testing');
    await omni.getByRole('button', { name: 'Update' }).click();
    await omni.waitForTimeout(5000);

});