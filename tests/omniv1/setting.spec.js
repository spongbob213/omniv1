const { test, expect } = require('@playwright/test');

test('Timework', async ({ browser }) => {
    const omniContext = await browser.newContext({
    storageState: 'auth/omni-auth.json',
    });
    const omni = await omniContext.newPage();
    await omni.goto('https://omni.botika.online/page/admin/dashboard');
    await omni.waitForLoadState('networkidle');
    await omni.locator('a[href*="setting?id"]').click();
    await omni.waitForURL(/setting/i);
    await omni.waitForTimeout(2000);
    await omni.locator('a[href*="timework?id"]').click();
    await omni.getByRole('button', { name: 'Timework' }).click();
    await omni.locator('.form-timework', { hasText: 'Monday' }).locator('.toggle').click();
    await omni.locator('.form-timework', { hasText: 'Tuesday' }).locator('.toggle').click();
    await omni.locator('.form-timework', { hasText: 'Wednesday' }).locator('.toggle').click();
    await omni.locator('.form-timework', { hasText: 'Thursday' }).locator('.toggle').click();
    await omni.locator('.form-timework', { hasText: 'Friday' }).locator('.toggle').click();
    await omni.locator('.form-timework', { hasText: 'Saturday' }).locator('.toggle').click();
    await omni.getByRole('button', { name: 'Update' }).click();
    await omni.getByRole('button', { name: 'Timework' }).click();
    await omni.locator('.form-timework', { hasText: 'Monday' }).locator('.toggle').click();
    await omni.locator('.form-timework', { hasText: 'Tuesday' }).locator('.toggle').click();
    await omni.locator('.form-timework', { hasText: 'Wednesday' }).locator('.toggle').click();
    await omni.locator('.form-timework', { hasText: 'Thursday' }).locator('.toggle').click();
    await omni.locator('.form-timework', { hasText: 'Friday' }).locator('.toggle').click();
    await omni.locator('.form-timework', { hasText: 'Saturday' }).locator('.toggle').click();
    await omni.locator('.form-timework', { hasText: 'Monday' }).locator('button.addColumn').click();
    await omni.locator('.form-timework', { hasText: 'Tuesday' }).locator('button.addColumn').click();
    await omni.locator('.form-timework', { hasText: 'Wednesday' }).locator('button.addColumn').click();
    await omni.locator('.form-timework', { hasText: 'Thursday' }).locator('button.addColumn').click();
    await omni.locator('.form-timework', { hasText: 'Friday' }).locator('button.addColumn').click();
    await omni.locator('.form-timework', { hasText: 'Saturday' }).locator('button.addColumn').click();
    await omni.getByRole('button', { name: 'Update'}).click();
    await omni.getByRole('button', { name: 'Timework' }).click();
    await omni.locator('.form-timework', { hasText: 'Monday' }).locator('button.removeColumn').click();
    await omni.locator('.form-timework', { hasText: 'Tuesday' }).locator('button.removeColumn').click();
    await omni.locator('.form-timework', { hasText: 'Wednesday' }).locator('button.removeColumn').click();
    await omni.locator('.form-timework', { hasText: 'Thursday' }).locator('button.removeColumn').click();
    await omni.locator('.form-timework', { hasText: 'Friday' }).locator('button.removeColumn').click();
    await omni.locator('.form-timework', { hasText: 'Saturday' }).locator('button.removeColumn').click();
    await omni.getByRole('button', { name: 'Update'}).click();
    
});

test('SLA', async ({ browser }) => {
    const omniContext = await browser.newContext({
    storageState: 'auth/omni-auth.json',
    });
    const omni = await omniContext.newPage();
    await omni.goto('https://omni.botika.online/page/admin/dashboard');
    await omni.waitForLoadState('networkidle');
    await omni.locator('a[href*="setting?id"]').click();
    await omni.waitForURL(/setting/i);
    await omni.waitForTimeout(2000);
    await omni.locator('a[href*="sla?id"]').click();
    await omni.locator('button:has(i.fas.fa-edit)').first().click();
    await omni.locator('#sla_name').fill('Test');
    await omni.locator('input[name="sla[priority][none][respond][value]"]').fill('5');
    await omni.locator('input[name="sla[priority][none][resolve][value]"]').fill('10');
    await omni.getByRole('button', { name: 'Update'}).click();
    await omni.waitForTimeout(13000)
});

test('Timezone', async ({ browser }) => {
    const omniContext = await browser.newContext({
    storageState: 'auth/omni-auth.json',
    });
    const omni = await omniContext.newPage();
    await omni.goto('https://omni.botika.online/page/admin/dashboard');
    await omni.waitForLoadState('networkidle');
    await omni.locator('a[href*="setting?id"]').click();
    await omni.waitForURL(/setting/i);
    await omni.waitForTimeout(2000);
    await omni.locator('a[href*="timezone?id"]').click();
    await omni.locator('#select2-timezone-container').click();
    await omni.locator('.select2-dropdown').waitFor({ state: 'visible' });
    await omni.locator('.select2-results__option', { hasText: '(UTC+07:00) Jakarta' }).click();
    await omni.waitForTimeout(3000);


});

test('Routing', async ({ browser }) => {
    const omniContext = await browser.newContext({
    storageState: 'auth/omni-auth.json',
    });
    const omni = await omniContext.newPage();
    await omni.goto('https://omni.botika.online/page/admin/dashboard');
    await omni.waitForLoadState('networkidle');
    await omni.locator('a[href*="setting?id"]').click();
    await omni.waitForURL(/setting/i);
    await omni.waitForTimeout(2000);
    await omni.locator('a[href*="agent?id"]').click();
    await omni.locator('input[type="radio"][value="manual"]').check();
    await omni.locator('input[id="7"]').check();
    await omni.locator('input[name="0"]').fill('10');
    await omni.getByRole('button', { name: 'Save' }).click();
    await omni.waitForTimeout(3000);
    await omni.locator('a[href*="category?id"]').click();
    await omni.waitForURL(/category/)
    await omni.waitForTimeout(1000);
    await omni.getByRole('button', { name: 'Add Category' }).click();
    await omni.locator('input[placeholder="Type the new category here"]').fill('Testing');
    await omni.getByRole('button', { name: 'Save' }).click();
    await omni.waitForTimeout(1000);
    await omni.locator('i.fas.fa-trash.text-danger').first().click();
    await omni.getByRole('button', { name: 'confirm' }).click();
    await omni.waitForTimeout(1000);
    await omni.locator('a[href*="tags?id"]').click();
    await omni.getByRole('button', { name: 'Add Tags' }).click();
    await omni.locator('input[placeholder="Type the new tag here"]').fill('Testing');
    await omni.getByRole('button', { name: 'Save' }).click();
    await omni.locator('i.fas.fa-trash.text-danger').first().click();
    await omni.waitForTimeout(3000);
});

test('Grant', async ({ browser }) => {
    const omniContext = await browser.newContext({
    storageState: 'auth/omni-auth.json',
    });
    const omni = await omniContext.newPage();
    await omni.goto('https://omni.botika.online/page/admin/dashboard');
    await omni.waitForLoadState('networkidle');
    await omni.locator('a[href*="setting?id"]').click();
    await omni.waitForURL(/setting/i);
    await omni.locator('a[href*="access?id"]').click();
    await omni.locator('a[href*="main?id"]').click();
    await omni.locator('.list-group-item', { hasText: 'Administrator' }).locator('button.dropdown-toggle').click();
    await omni.locator('.list-group-item', { hasText: 'Administrator' }).locator('a.dropdown-item', { hasText: 'Edit' }).click();
    await omni.getByRole('button', { name: 'Save' }).click();
    await omni.locator('.list-group-item', { hasText: 'Supervisor' }).locator('button.dropdown-toggle').click();
    await omni.locator('.list-group-item', { hasText: 'Supervisor' }).locator('a.dropdown-item', { hasText: 'Edit' }).click();
    await omni.getByRole('button', { name: 'Save' }).click();
    await omni.locator('.list-group-item', { hasText: 'Agent' }).locator('button.dropdown-toggle').click();
    await omni.locator('.list-group-item', { hasText: 'Agent' }).locator('a.dropdown-item', { hasText: 'Edit' }).click();
    await omni.getByRole('button', { name: 'Save' }).click();
    await omni.getByRole('link', { name: 'Done' }).click();
    await omni.locator('a[href*="assign-member?id"]').click();
    await omni.getByRole('link', { name: 'Done' }).click();
    await omni.waitForTimeout(2000);


});

test('Departement', async ({ browser }) => {
    const omniContext = await browser.newContext({
    storageState: 'auth/omni-auth.json',
    });
    const omni = await omniContext.newPage();
    await omni.goto('https://omni.botika.online/page/admin/dashboard');
    await omni.waitForLoadState('networkidle');
    await omni.locator('a[href*="setting?id"]').click();
    await omni.waitForURL(/setting/i);
    await omni.locator('a[href*="departement?id"]').click();
    await omni.getByRole('link', { name: 'Create Departement' }).click();
    await omni.getByLabel('Departement Name').fill('Test');
    await omni.fill('#departementDescription', 'Testing aja');
    await omni.getByRole('button', { name: 'Create' }).click();
    await omni.waitForTimeout(2000);
    await omni.locator('.card-body .dropdown-toggle').first().click();
    await omni.locator('.dropdown-menu.show >> text=Edit').click();
    await omni.locator('button[type="submit"]:has-text("Update")').click();
    await omni.locator('.card-body .dropdown-toggle').first().click();
    await omni.locator('.dropdown-menu.show >> text=Delete').click();
    await omni.locator('button:has-text("yes")').click();
    await omni.reload();
    await omni.locator('a:has(i.fa-eye)').first().click();
    await omni.getByRole('link', { name: 'Add Member' }).click();


});

test('Custom Message', async ({ browser }) => {
    const omniContext = await browser.newContext({
    storageState: 'auth/omni-auth.json',
    });
    const omni = await omniContext.newPage();
    await omni.goto('https://omni.botika.online/page/admin/dashboard');
    await omni.waitForLoadState('networkidle');
    await omni.locator('a[href*="setting?id"]').click();
    await omni.waitForURL(/setting/i);
    await omni.locator('a[href*="personalized-message?id"]').click();
    await omni.locator('a[href*="default?id"]').click();
    await omni
    .locator('tr', { hasText: 'Enable custom messages when agents are offline' })
    .locator('div[data-toggle="toggle"]').click();
    await omni
    .locator('tr', { hasText: 'Enable custom messages when agents are available ?' })
    .locator('div[data-toggle="toggle"]').click();
    await omni
    .locator('tr', { hasText: 'Enable custom messages when off the timework ?' })
    .locator('div[data-toggle="toggle"]').click();
    await omni
    .locator('tr', { hasText: 'Enable custom message queue numbers ?' })
    .locator('div[data-toggle="toggle"]').click();
    await omni
    .locator('tr', { hasText: 'Enable custom message close ticket ?' })
    .locator('div[data-toggle="toggle"]').click();
    await omni
    .locator('tr', { hasText: 'Enable custom message for hold ticket ?' })
    .locator('div[data-toggle="toggle"]').click();
    await omni
    .locator('tr', { hasText: 'Enable custom message for unhold ticket ?' })
    .locator('div[data-toggle="toggle"]').click();
    await omni.getByRole('button', { name: 'Update' }).click();
    await omni.getByRole('link', { name: 'Personalized Custom Message' }).click();    
    await omni.locator('a[href*="nps?id"]').click();
    await omni.locator('#messageContentSatisfactionEmail').fill('Testing');
    await omni.locator('#messageContentSatisfactionChatCon').fill('Testing');
    await omni.getByRole('button', { name: 'Update' }).click();

    
    


    await omni.waitForTimeout(2000);
}) 

test('Personalization', async ({ browser }) => {
    const omniContext = await browser.newContext({
    storageState: 'auth/omni-auth.json',
    });
    const omni = await omniContext.newPage();
    await omni.goto('https://omni.botika.online/page/admin/dashboard');
    await omni.waitForLoadState('networkidle');
    await omni.locator('a[href*="setting?id"]').click();
    await omni.waitForURL(/setting/i);
    await omni.locator('a[href*="personalization?id"]').click();
    await omni.locator('a[href*="workspace?id"]').click();
    await omni.locator('#name').fill('Testing1928374623');
    await omni.getByRole('button', { name: 'Save' }).click();
    await omni.waitForTimeout(2000);
})