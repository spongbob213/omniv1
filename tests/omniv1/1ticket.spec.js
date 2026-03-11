const { test, expect } = require('@playwright/test');

test('Ticket Update', async ({ browser }) => {
    const pesan = 'Halo dari Playwright';
    const webchatContext = await browser.newContext();
    const webchat = await webchatContext.newPage();

    await webchat.goto('https://chat.botika.online/FznHQoI');
    await webchat.waitForLoadState('networkidle');
    await webchat.waitForSelector('#input-message');
    await webchat.fill('#input-message', pesan);
    await webchat.press('#input-message', 'Enter');
    await expect(webchat.getByText(pesan)).toBeVisible();

    const omniContext = await browser.newContext({
    storageState: 'auth/omni-auth.json',
    });
    const omni = await omniContext.newPage();
    await omni.goto('https://omni.botika.online/page/admin/dashboard');
    await omni.waitForLoadState('networkidle');
    await omni.locator('a[href*="ticket?id"]').click();
    await omni.waitForURL(/ticket/);
    await omni.waitForTimeout(2000);
    await omni.reload();
    await omni.waitForLoadState('networkidle');

    const row = omni.locator('tbody tr').first();
    const checkbox = row.locator('input[type="checkbox"]');
    await checkbox.check();
    await expect(checkbox).toBeChecked();
    const statuses = ['New', 'Open'];
    for (const status of statuses) {
    const dropdown1 = omni
    .locator('.select2-selection--single')
    .filter({ hasText: /New|Solved|Open|/ })
    .first();

    await dropdown1.click();
    await omni.locator('.select2-results__option').filter({ hasText: status }).first().click();
    await expect(dropdown1.locator('.select2-selection__rendered'))
    .toHaveAttribute('title', status);
    await omni.locator('button').filter({ hasText: 'Update'}).first().click();
    await omni.waitForTimeout(1000);
    };
    const priorities = ['Low', 'Medium', 'High', 'Urgent'];
    const priorityDropdown = omni
    .locator('[aria-labelledby="select2-updateBatchPriority-container"]')
    .first();
    for (const priority of priorities) {
    await priorityDropdown.click({ force: true });
    const option = omni
    .locator('.select2-results__option')    
    .filter({ hasText: priority })
    .first();
    await expect(option).toBeVisible({ timeout: 10000 });
    await option.click({ force: true });
    await expect(
    priorityDropdown.locator('.select2-selection__rendered')
     ).toHaveAttribute('title', priority);
    await omni.locator('button', { hasText: 'Update' }).first().click();
    await omni.waitForTimeout(1000);
    };
    const assigneeBlock = omni
    .locator('div.form-group')
    .filter({ hasText: 'No Assignee' })
    .first();
    const assigneeDropdown = assigneeBlock
    .locator('.select2-selection--single')
    .first();
    await assigneeDropdown.scrollIntoViewIfNeeded();
    await assigneeDropdown.click({ force: true });
    const option = omni.locator('.select2-results__option').filter({ hasText: 'No Assignee' }).first();
    await option.click({ force: true });
    await expect(
    assigneeDropdown.locator('.select2-selection__rendered')
    ).toHaveAttribute('title', 'No Assignee');
    await omni.locator('button', { hasText: 'Update' }).first().click();
    await omniContext.close();
});

test('Ticket Filter', async ({ browser }) => {
    const omniContext = await browser.newContext({
    storageState: 'auth/omni-auth.json',
    });
    const omni = await omniContext.newPage();
    await omni.goto('https://omni.botika.online/page/admin/dashboard');
    await omni.waitForLoadState('networkidle');
    await omni.locator('a[href*="ticket?id"]').click();
    await omni.waitForURL(/ticket/);
    await omni.waitForLoadState('networkidle');
    const filterButton = omni.locator('button:has(i.fa-filter)');
    await expect(filterButton).toBeVisible();
    await filterButton.click();

    const sourceDropdown = omni
    .locator('#filterSource')
    .locator('xpath=following-sibling::span')
    .locator('.select2-selection--multiple');
    await sourceDropdown.scrollIntoViewIfNeeded();
    await sourceDropdown.click({ force: true });
    await omni.locator(
        '[id^="select2-filterSource-result"][id*="CHATBOTIKAWEBCHAT"]'
    ).click();
    await omni.waitForTimeout(1000);

    const agentDropdown = omni
    .locator('#filterAgents')
    .locator('xpath=following-sibling::span')
    .locator('.select2-selection--multiple');
    await agentDropdown.click({ force: true });
    const noAssigneeOption = omni
    .locator('li.select2-results__option[id^="select2-filterAgents-result"]')
    .filter({ hasText: 'No Assignee' });
    await noAssigneeOption.waitFor({ state: 'visible' });
    await noAssigneeOption.click();
    await omni.waitForTimeout(1000);

    // const categoryDropdown = omni
    // .locator('span.select2-container')
    // .filter({ has: omni.locator('input[placeholder="Any"]') })
    // .locator('.select2-selection--multiple')
    // .first();
    // await categoryDropdown.waitFor({ state: 'visible', timeout: 10000 });
    // await categoryDropdown.scrollIntoViewIfNeeded();
    // await categoryDropdown.click({ force: true });
    // const option = omni.getByRole('treeitem', { name: 'Question' });
    // await option.waitFor({ state: 'visible', timeout: 10000 });
    // await option.click();
    // await omni.waitForTimeout(1000);

    const statusDropdown = omni
    .locator('#filterStatus')
    .locator('xpath=following-sibling::span')
    .locator('.select2-selection--multiple');
    await statusDropdown.waitFor({ state: 'visible', timeout: 10000 });
    await statusDropdown.scrollIntoViewIfNeeded();
    await statusDropdown.click({ force: true });
    const openOption = omni.getByRole('treeitem', { name: 'Open' });
    await openOption.waitFor({ state: 'visible', timeout: 10000 });
    await openOption.click();
    await omni.waitForTimeout(1000);

    const priorityDropdown = omni
    .locator('#filterPriority')
    .locator('xpath=following-sibling::span')
    .locator('.select2-selection--multiple');
    await priorityDropdown.waitFor({ state: 'visible', timeout: 10000 });
    await priorityDropdown.scrollIntoViewIfNeeded();
    await priorityDropdown.click({ force: true });
    const priorityOption = omni.getByRole('treeitem', { name: 'Low' });
    await priorityOption.waitFor({ state: 'visible', timeout: 10000});
    await priorityOption.click();
    await omni.waitForTimeout(1000);

    const applyButton = omni.getByRole('button', { name: 'Apply' });
    await applyButton.waitFor({ state: 'visible', timeout: 10000 });
    await applyButton.click();
});
